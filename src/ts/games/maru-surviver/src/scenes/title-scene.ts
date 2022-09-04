import * as PIXI from "pixi.js";
import { Scene } from "./scene"
import { TITLE_TEXT_STYLE } from "../constants/constants"

export class TitleScene extends Scene {
    titleString: PIXI.Text;
    constructor() {
        super();
        this.sceneId = 'title';
        this.container = new PIXI.Container();
        this.titleString = new PIXI.Text('MARU SURVIVER', TITLE_TEXT_STYLE);
        this.container.addChild(this.titleString);
    }
}