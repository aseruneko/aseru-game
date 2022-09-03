import "../../games/games.scss";

class CanvasElement {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this._context = this._canvas.getContext("2d");
    }

    get context(): CanvasRenderingContext2D {
        return this._context
    }

    get width(): number {
        return this._canvas.width;
    }

    get height(): number {
        return this._canvas.height;
    }

}

class CanvasGame {

    private _canvas: CanvasElement;
    private _objects: {[key: string]: CanvasGameObject} = {};
    private _events: {[key: string]: GameEventObject} = {};
    private _renderHitbox: boolean;
    private _timer: number = 0;

    constructor(canvasId: string, renderHitbox: boolean = false) {
        this._canvas = new CanvasElement(canvasId);
        this._renderHitbox = renderHitbox;
    }

    addObj(id: string, obj: CanvasGameObject) {
        this._objects[id] = obj;
    }

    rmObj(id: string) {
        delete this._objects[id];
    }

    addEve(id: string, eve: GameEventObject) {
        this._events[id] = eve;
    }

    rmEve(id: string) {
        delete this._events[id];
    }

    main() {
        if(this._timer === 1024) {
            this._timer = 0;
        }
        this.calc();
        this._timer ++;
        this.clear();
        this.render();
        if(this._renderHitbox) {
            this.renderHitbox();
        }
    }

    private calc() {
        Object.keys(this._events).forEach((key) => this._events[key].execute(this._timer, this._objects));
        Object.keys(this._objects).forEach((key) => this._objects[key].execute(this._canvas.context));
        return;
    }

    private clear() {
        this._canvas.context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    private render() {
        Object.keys(this._objects).forEach((key) => this._objects[key].render(this._canvas.context));
    }

    private renderHitbox() {
        Object.keys(this._objects).forEach((key) => {
            if(this._objects[key].hasHitbox) {
                this._objects[key].hitbox!.renderHitbox(this._canvas.context)
            }
        });
    }

    get canvas(): CanvasElement{
        return this._canvas;
    }

    get ctx(): CanvasRenderingContext2D{
        return this._canvas.context;
    }
}

class GameEventObject {
    interval: number;
    event: (objs: {[key: string]: CanvasGameObject}) => void;
    constructor(interval: number, event: (objs: {[key: string]: CanvasGameObject}) => void) {
        this.interval = interval;
        this.event = event;
    }
    execute(timer: number, objs: {[key: string]: CanvasGameObject}) {
        if(timer % this.interval == 0) {
            this.event(objs);
        }
    }
    static Pop(objId: string): GameEventObject {
        return new GameEventObject(180, ((
            objs: {[key: string]: CanvasGameObject}
        ) => {
            var ball = objs[objId] as Circle
            var mov = ball.mov[0] as SimpleBoundaryMove2D;
            mov.dx = Math.random() * 20;
            mov.dy = Math.random() * 20;
            ball.mov = [mov];
        }));
    }
}

abstract class CanvasGameObject {
    hitbox?: HitboxObject;
    readonly hasHitbox: boolean;
    constructor(hitbox?: HitboxObject) {
        this.hitbox = hitbox;
        hitbox === undefined ? this.hasHitbox = false : this.hasHitbox = true;
    }
    abstract execute(ctx: CanvasRenderingContext2D): void
    abstract render(ctx: CanvasRenderingContext2D): void
}

abstract class Shape extends CanvasGameObject {
    constructor(hitbox?: HitboxObject) {
        super(hitbox);
    }
    abstract execute(ctx: CanvasRenderingContext2D): void
    abstract render(ctx: CanvasRenderingContext2D): void
}

abstract class HitboxObject {
    abstract hit(pos: Position2D): boolean
    abstract renderHitbox(ctx: CanvasRenderingContext2D): void
}

class CircleHitboxObject extends HitboxObject {
    pos: Position2D;
    radius: number;
    constructor(pos: Position2D, radius: number){
        super();
        this.pos = pos;
        this.radius = radius;
    }
    hit(pos: Position2D): boolean {
        const distance: number = (pos.x - this.pos.x)**2 + (pos.y - this.pos.y)**2;
        return distance < ((this.radius)**2) ? true : false;
    }
    renderHitbox(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#FF00FF";
        ctx.fill();
        ctx.closePath();
    }
}

class Circle extends Shape {
    mov: Move2D[];
    pos: Position2D;
    radius: number;
    startAngle: number;
    endAngle: number;
    fillType: FillType;
    counterclockwise: boolean = false;
    constructor(mov: Move2D[], pos: Position2D, radius: number, startAngle: number, endAngle: number, fillType: FillType, hasHitbox: boolean, counterclockwise?: boolean) {
        const hitbox = hasHitbox ? new CircleHitboxObject(pos, radius) : undefined;
        super(hitbox);
        this.mov = mov;
        this.pos = pos;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.fillType = fillType;
        counterclockwise === undefined ? this.counterclockwise = false : this.counterclockwise = true;
    }
    static simple(mov: Move2D[], x: number, y: number, radius: number, color: ColorString): Circle{
        return new Circle(mov, {x: x, y: y} as Position2D, radius, 0, Math.PI*2, {fill: true, color: color} as FillType, true);
    }
    execute(ctx: CanvasRenderingContext2D) {
        if(this.hasHitbox) {
            this.mov.forEach(m => {
                this.pos = m.moveWithHitbox(this.pos, this.hitbox!);
                this.hitbox = new CircleHitboxObject(this.pos, this.radius);
            })
        } else {
            this.mov.forEach(m => {
                this.pos = m.move(this.pos)
            })
        }
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, this.startAngle, this.endAngle, this.counterclockwise);
        if (this.fillType.fill) {
            ctx.fillStyle = this.fillType.color.value;
            ctx.fill();
        }
        ctx.closePath();
    }
}

interface Position2D {
    x: number;
    y: number;
}

interface ColorString {
    value: string;
}

const RED: ColorString = {value: "#FF0000"} as ColorString
const BLUE: ColorString = {value: "#00FF00"} as ColorString
const GREEN: ColorString = {value: "#0000FF"} as ColorString

interface FillType {
    fill: boolean;
    color: ColorString;
}

abstract class Move2D {
    abstract move(pos: Position2D): Position2D 
    abstract moveWithHitbox(pos: Position2D, hitbox: HitboxObject): Position2D
}

class SimpleMove2D extends Move2D {
    dx: number;
    dy: number;
    constructor(dx: number, dy: number) {
        super();
        this.dx = dx;
        this.dy = dy;
    }
    move(pos: Position2D): Position2D {
        return {x: pos.x + this.dx, y: pos.y + this.dy} as Position2D;
    }
    moveWithHitbox(pos: Position2D, hitbox: HitboxObject): Position2D {
        return this.move(pos);
    }
}

class Acceralation2D {
    ax: number;
    ay: number;
    constructor(ax: number, ay: number){
        this.ax = ax;
        this.ay = ay;
    }
    static Gravity(ay: number = 0.5): Acceralation2D {
        return new Acceralation2D(0, ay);
    }
    static Zero(): Acceralation2D {
        return new Acceralation2D(0, 0);
    }
    accel(dx: number, dy: number): [number, number] {
        var next_dx = dx + this.ax;
        var next_dy = dy + this.ay;
        return [next_dx, next_dy];
    }
}

class SimpleBoundaryMove2D extends Move2D {
    dx: number;
    dy: number;
    max_x: number;
    min_x: number;
    max_y: number;
    min_y: number;
    bound: boolean;
    restitution?: number;
    accelaration?: Acceralation2D;
    constructor(dx: number, dy: number, max_x: number, min_x: number, max_y: number, min_y: number, bound: boolean, restitution?: number, accelaration?: Acceralation2D) {
        super();
        this.dx = dx;
        this.dy = dy;
        this.max_x = max_x;
        this.min_x = min_x;
        this.max_y = max_y;
        this.min_y = min_y;
        this.bound = bound;
        this.restitution = restitution;
        this.accelaration = accelaration;
    }
    static boundWindow(dx: number, dy: number, canvas: CanvasGame): SimpleBoundaryMove2D {
        return new SimpleBoundaryMove2D(dx, dy, canvas.canvas.width, 0, canvas.canvas.height, 0, true, 0.7);
    }
    static boundGraviticWindow(dx: number, dy: number, canvas: CanvasGame): SimpleBoundaryMove2D {
        return new SimpleBoundaryMove2D(dx, dy, canvas.canvas.width, 0, canvas.canvas.height, 0, true, 0.85, Acceralation2D.Gravity());
    }
    private accel(){
        [this.dx, this.dy] = this.accelaration!.accel(this.dx, this.dy);
    }
    move(pos: Position2D): Position2D {
        const cnt_x = pos.x;
        const cnt_y = pos.y;
        var nxt_x = pos.x + this.dx;
        var nxt_y = pos.y + this.dy;
        if (nxt_x < this.min_x) {
            if(this.bound) {
                this.dx = this.dx * (-1);
            }
            nxt_x = this.min_x;
        } else if (nxt_x > this.max_x) {
            if(this.bound) {
                this.dx = this.dx * (-1);
            }
            nxt_x = this.max_x;
        }
        if (nxt_y < this.min_y) {
            if(this.bound) {
                this.dy = this.dy * (-1);
            }
            nxt_y = this.min_y;
        } else if (nxt_y > this.max_y) {
            if(this.bound) {
                this.dy = this.dy * (-1);
            }
            nxt_y = this.max_y;
        }
        if(this.accelaration) this.accel();
        return {x: nxt_x, y: nxt_y} as Position2D;
    }
    moveWithHitbox(pos: Position2D, hitbox: HitboxObject): Position2D {
        const cnt_x = pos.x;
        const cnt_y = pos.y;
        var nxt_x = pos.x + this.dx;
        var nxt_y = pos.y + this.dy;
        if (hitbox.hit({x: this.min_x, y: cnt_y} as Position2D)) {
            nxt_x = cnt_x;
            if(this.bound) {
                nxt_x = cnt_x - this.dx;
                this.dx = this.dx * (-1) * (this.restitution !== undefined ? this.restitution : 1);
            }
        } else if (hitbox.hit({x: this.max_x, y: cnt_y} as Position2D)) {
            nxt_x = cnt_x;
            if(this.bound) {
                nxt_x = cnt_x - this.dx;
                this.dx = this.dx * (-1) * (this.restitution !== undefined ? this.restitution : 1);
            }
        }
        if (hitbox.hit({x: cnt_x, y: this.min_y} as Position2D)) {
            nxt_y = cnt_y;
            if(this.bound) {
                nxt_y = cnt_y - this.dy;
                this.dy = this.dy * (-1) * (this.restitution !== undefined ? this.restitution : 1);
            }
        } else if (hitbox.hit({x: cnt_x, y: this.max_y} as Position2D)) {
            nxt_y = cnt_y;
            if(this.bound) {
                nxt_y = cnt_y - this.dy;
                this.dy = this.dy * (-1) * (this.restitution !== undefined ? this.restitution : 1);
            }
        }
        if(this.accelaration) this.accel();
        return {x: nxt_x, y: nxt_y} as Position2D;
    }
}

var game = new CanvasGame("canvas");
game.addObj("ball1", Circle.simple([SimpleBoundaryMove2D.boundGraviticWindow(2, 1, game)], game.canvas.width / 2, game.canvas.height / 2, 10, RED))
game.addObj("ball2", Circle.simple([SimpleBoundaryMove2D.boundGraviticWindow(3, 3, game)], game.canvas.width / 2 + 4, game.canvas.height / 2 + 4, 15, BLUE))
game.addObj("ball3", Circle.simple([SimpleBoundaryMove2D.boundGraviticWindow(4, 4, game)], game.canvas.width / 2 + 8, game.canvas.height / 2 + 8, 20, GREEN))
game.addEve("pop1", GameEventObject.Pop("ball1"));
game.addEve("pop2", GameEventObject.Pop("ball2"));
game.addEve("pop3", GameEventObject.Pop("ball3"));
setInterval(() => {game.main()}, 10);