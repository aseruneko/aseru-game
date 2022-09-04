import "../../../styles/reset.scss";
import "../../../games/maru-surviver/style.scss";
import * as PIXI from "pixi.js";
import { TitleScene } from "./src/scenes/title-scene"

const main = () => {
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0xE9DAC1
    })
    document.getElementById('game-area').appendChild(app.view)
    const titleScene: TitleScene = new TitleScene(); 
    app.stage.addChild(titleScene.container)
}

main();