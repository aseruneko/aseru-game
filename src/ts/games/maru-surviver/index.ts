import "../../../styles/reset.scss";
import "../../../games/maru-surviver/style.scss";
import * as PIXI from "pixi.js";
import { TitleScene } from "./src/scenes/title-scene"
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "./src/constants/constants"

const main = () => {
    const app = new PIXI.Application({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        backgroundColor: 0xE9DAC1
    })
    document.getElementById('game-area').appendChild(app.view)
    const titleScene: TitleScene = new TitleScene(app.stage); 
    app.stage.addChild(titleScene.container)
}

main();