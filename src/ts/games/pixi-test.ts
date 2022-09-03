import "../../games/games.scss";
import * as PIXI from "pixi.js";

// ステージを作る
const createApp = () => {
    // キャンバスサイズと背景色を指定してステージを作成
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0xcccccc // 背景色(= #cccccc)
    })
    document.body.appendChild(app.view)
    return app
  }
  
  const app = createApp()