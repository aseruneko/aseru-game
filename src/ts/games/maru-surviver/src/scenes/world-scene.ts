import * as PIXI from "pixi.js";
import { Scene } from "./scene";
import { TextStyleObject, WINDOW_HEIGHT, WINDOW_WIDTH, ColorObject } from "../constants/constants"
import { EdgedButtonObject, MaskedContainerButtonObject } from "../objects/button-object";
import { TitleScene } from "./title-scene";
import { GameScene } from "./game-scene";

export class WorldScene extends Scene {
    parent: PIXI.Container;
    constructor(stage: PIXI.Container) {
        super();
        this.sceneId = 'world';
        this.container = new PIXI.Container();
        this.parent = stage;
        const titleString = new PIXI.Text('WORLD SELECT', TextStyleObject.H2.style);
        titleString.x = 24;
        titleString.y = 24;
        const backButton = EdgedButtonObject(100, 50, ColorObject.BLUE_1, '戻る', 16, ColorObject.WHITE_1, 8, ColorObject.BLUE_2, 8);
        backButton.x = 350;
        backButton.y = 526;
        backButton.interactive = true;
        backButton.on('mousedown', () => {
            this.container.visible = false;
            stage.removeChild;
            stage.addChild(new TitleScene(stage).container);
        })
        this.addStageSelects();
        this.container.addChild(titleString);
        this.container.addChild(backButton);
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
        this.container.visible = false;
        this.parent.removeChild;
        this.parent.addChild(new GameScene(this.parent, stageId).container);
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