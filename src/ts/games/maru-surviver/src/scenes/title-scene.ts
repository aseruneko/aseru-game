import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { TextStyleObject, WINDOW_HEIGHT, WINDOW_WIDTH, ColorObject } from "../constants/constants"
import { EdgedButtonObject } from "../objects/button-object";
import { WorldScene } from "./world-scene";

export class TitleScene extends Scene {
    titleString: PIXI.Text;
    versionString: PIXI.Text;
    startButton: PIXI.Container;
    stage: PIXI.Container;
    constructor(stage: PIXI.Container) {
        super();
        this.sceneId = 'title';
        this.stage = stage;
        this.container = new PIXI.Container();
        this.titleString = new PIXI.Text('MARU SURVIVER', TextStyleObject.H1.style);
        this.titleString.anchor.set(0.5);
        this.titleString.x = WINDOW_WIDTH / 2;
        this.titleString.y = 150;
        this.versionString = new PIXI.Text('v0.0.1', TextStyleObject.P.style);
        this.versionString.anchor.set(0.5);
        this.versionString.x = WINDOW_WIDTH / 2;
        this.versionString.y = 200;
        this.startButton = EdgedButtonObject(400, 100, ColorObject.BLUE_1, "PUSH TO START", 40, ColorObject.WHITE_1, 8, ColorObject.BLUE_2);
        this.startButton.x = WINDOW_WIDTH / 2 - 200;
        this.startButton.y = 400;
        this.container.addChild(this.titleString);
        this.container.addChild(this.startButton);
        this.container.addChild(this.versionString);
        this.startButton.on('mousedown', () => {
            this.container.visible = false;
            this.stage.removeChild;
            this.stage.addChild(new WorldScene(stage).container);
        })
    }
}