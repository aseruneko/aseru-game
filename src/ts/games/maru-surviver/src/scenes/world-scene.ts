import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { TextStyleObject, WINDOW_HEIGHT, WINDOW_WIDTH, ColorObject } from "../constants/constants"
import { MaskedContainerButtonObject } from "../objects/button-object";

export class WorldScene extends Scene {
    titleString: PIXI.Text;
    stage: PIXI.Container;
    constructor(stage: PIXI.Container) {
        super();
        this.sceneId = 'world';
        this.stage = stage;
        this.container = new PIXI.Container();
        this.titleString = new PIXI.Text('WORLD SELECT', TextStyleObject.H2.style);
        this.titleString.x = 24;
        this.titleString.y = 24;
        this.addStageSelects();
        this.container.addChild(this.titleString);
    }
    private addStageSelects() {
        const STAGE_THUMBNAIL_SIZE = 150;
        var cntX = 24;
        var cntY = 96;
        this.addStageSelect(StageThumbnail.Stage01Thumbnail, cntX, cntY, cntX + STAGE_THUMBNAIL_SIZE / 2, cntY + STAGE_THUMBNAIL_SIZE + 16);
        cntX += STAGE_THUMBNAIL_SIZE + 24;
        this.addStageSelect(StageThumbnail.Stage02Thumbnail, cntX, cntY, cntX + STAGE_THUMBNAIL_SIZE / 2, cntY + STAGE_THUMBNAIL_SIZE + 16);
    }
    private addStageSelect(thumbnail: StageThumbnail, stageX: number, stageY: number, labelX: number, labelY: number) {
        const stageSelect = MaskedContainerButtonObject(thumbnail.image, ColorObject.WHITE_1, 0.2);
        stageSelect.x = stageX;
        stageSelect.y = stageY;
        stageSelect.interactive = true;
        stageSelect.on('mousedown', () => {this.selectStage(thumbnail.stageId)});
        const stageLabel = new PIXI.Text(thumbnail.title, TextStyleObject.P.style);
        stageLabel.anchor.set(0.5);
        stageLabel.x = labelX;
        stageLabel.y = labelY;
        this.container.addChild(stageSelect);
        this.container.addChild(stageLabel);
    }
    private selectStage(stageId: string) {
        console.log(stageId);
    }
}

class StageThumbnail {
    title: string;
    stageId: string;
    image: PIXI.Container;
    constructor(title: string, stageId: string, image: PIXI.Container) {
        this.title = title;
        this.image = image;
        this.stageId = stageId;
    }
    static Stage01Thumbnail: StageThumbnail = new StageThumbnail(
        "草原",
        "glassland",
        new PIXI.Graphics().beginFill(ColorObject.GREEN_0.value).drawRect(0,0,150,150).endFill()
    )
    static Stage02Thumbnail: StageThumbnail = new StageThumbnail(
        "砂浜",
        "beach",
        new PIXI.Graphics().beginFill(ColorObject.BROWN_0.value).drawRect(0,0,150,150).endFill()
    )
}