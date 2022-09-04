import * as PIXI from 'pixi.js'

export class ColorObject {
    value: number;
    code: string;
    constructor(value: number) {
        this.value = value;
        this.code = `#${value.toString(16)}`
    }
    static BLUE_1: ColorObject = new ColorObject(0x9ed2c6);

    static BLUE_2: ColorObject = new ColorObject(0x54bab9);

    static BROWN_0: ColorObject =  new ColorObject(0xf7ecde);

    static BROWN_1: ColorObject =  new ColorObject(0xe9dac1);

    static BLACK_1: ColorObject = new ColorObject(0x333333);

    static WHITE_1: ColorObject = new ColorObject(0xeeeeee);

    static GREEN_0: ColorObject = new ColorObject(0xb1d7b4);
}

export class TextStyleObject {
    style: PIXI.TextStyle;
    constructor(style: PIXI.TextStyle) {
        this.style = style;
    }
    static H1: TextStyleObject = new TextStyleObject(
        new PIXI.TextStyle({
            fontFamily: 'Antonio',
            fontSize: 64
        })
    )
    static H2: TextStyleObject = new TextStyleObject(
        new PIXI.TextStyle({
            fontFamily: 'Antonio',
            fontSize: 48
        })
    )
    static P: TextStyleObject = new TextStyleObject(
        new PIXI.TextStyle({
            fontSize: 16
        })
    )
}

export const WINDOW_WIDTH: number = 800;

export const WINDOW_HEIGHT: number = 600;

