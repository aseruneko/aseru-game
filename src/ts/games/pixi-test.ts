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


let key: string = "";
const keyDownHandler = (event: KeyboardEvent) => {
  key = event.key;
}
const keyUpHandler = (event: KeyboardEvent) => {
  key = "";
}
  
let click = 0;
const app = createApp()
let text1 = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
let text2 = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
let text3 = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
let grp = new PIXI.Graphics().beginFill(0xff0000).drawRect(100,100,400,300).endFill();
grp.interactive = true;
grp.on('mousedown', (() => {click += 1}))
let tex = PIXI.Sprite.from("../src/games/onepiece01_luffy2.png");
app.stage.addChild(grp);
app.stage.addChild(text1);
app.stage.addChild(text2);
app.stage.addChild(text3);
app.stage.addChild(tex);
text2.position.x = 0;
text2.position.y = 30;
text3.position.x = 0;
text3.position.y = 60;
tex.position.x = 400;
window.addEventListener("keydown",keyDownHandler)
window.addEventListener("keyup", keyUpHandler)
app.ticker.add((delta) => {
  const position = app.renderer.plugins.interaction.mouse.getLocalPosition(app.stage);
  text1.text = `x: ${position.x}, y: ${position.y}`;
  text2.text = `red-rect-click: ${click}`;
  text3.text = `key: ${key}`;
});