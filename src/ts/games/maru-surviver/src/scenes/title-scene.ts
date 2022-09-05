import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { TextStyleObject, WINDOW_HEIGHT, WINDOW_WIDTH, ColorObject } from "../constants/constants"
import { EdgedButtonObject } from "../objects/button-object";
import { WorldScene } from "./world-scene";

export class TitleScene extends Scene {
    constructor(stage: PIXI.Container) {
        super();
        this.sceneId = 'title';
        this.container = new PIXI.Container();
        const titleString = new PIXI.Text('MARU SURVIVER', TextStyleObject.H1.style);
        titleString.anchor.set(0.5);
        titleString.x = WINDOW_WIDTH / 2;
        titleString.y = 150;
        const versionString = new PIXI.Text('v0.0.1', TextStyleObject.P.style);
        versionString.anchor.set(0.5);
        versionString.x = WINDOW_WIDTH / 2;
        versionString.y = 200;
        const startButton = EdgedButtonObject(400, 100, ColorObject.BLUE_1, "PUSH TO START", 40, ColorObject.WHITE_1, 8, ColorObject.BLUE_2);
        startButton.x = WINDOW_WIDTH / 2 - 200;
        startButton.y = 400;
        this.container.addChild(titleString);
        this.container.addChild(startButton);
        this.container.addChild(versionString);
        startButton.on('mousedown', () => {
            this.container.visible = false;
            stage.removeChild;
            stage.addChild(new WorldScene(stage).container);
        })
    }
}