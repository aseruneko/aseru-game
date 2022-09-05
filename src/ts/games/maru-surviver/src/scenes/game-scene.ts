import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { TextStyleObject, WINDOW_HEIGHT, WINDOW_WIDTH, ColorObject } from "../constants/constants"
import { EdgedButtonObject } from "../objects/button-object";
import { WorldScene } from "./world-scene";
import { Stage } from "../objects/stage";

export class GameScene extends Scene {
    constructor(parent: PIXI.Container, stageId: string) {
        super();
        this.sceneId = 'game';
        this.container = new PIXI.Container();
        const stage = Stage.stages(stageId)
        const titleString = new PIXI.Text(stage.name, TextStyleObject.P.style);
        titleString.anchor.set(0.5);
        titleString.x = WINDOW_WIDTH / 2;
        titleString.y = 20;
        const backButton = EdgedButtonObject(100, 50, ColorObject.BLUE_1, '戻る', 16, ColorObject.WHITE_1, 8, ColorObject.BLUE_2, 8);
        backButton.x = 350;
        backButton.y = 526;
        backButton.interactive = true;
        backButton.on('mousedown', () => {
            this.container.visible = false;
            parent.removeChild;
            parent.addChild(new WorldScene(parent).container);
        });
        this.container.addChild(titleString);
        this.container.addChild(backButton);
    }
}