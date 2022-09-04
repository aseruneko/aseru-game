import * as PIXI from "pixi.js"
import { ColorObject } from "../constants/constants";

const RawButtonObject = (
    width: number, 
    height: number, 
    buttonColor: ColorObject, 
    label: string,
    fontSize: number,
    labelColor: ColorObject,
    edgeHeight: number,
    edgeColor: ColorObject,
    diffX: number,
    diffY: number,
    borderRadius: number = 8
) => {
    const graphObject = new PIXI.Graphics()
    .beginFill(buttonColor.value)
    .drawRoundedRect(diffX,diffY,width,height - edgeHeight, borderRadius)
    .endFill();
    const graphEdgeObject = new PIXI.Graphics()
        .beginFill(edgeColor.value)
        .drawRoundedRect(diffX,diffY+edgeHeight,width,height - edgeHeight, borderRadius)
        .endFill();
    const labelObject = new PIXI.Text(
        label, 
        new PIXI.TextStyle({
            fill: labelColor.code,
            fontSize: fontSize,
        }));
    labelObject.anchor.set(0.5);
    labelObject.x = width / 2 + diffX;
    labelObject.y = (height - edgeHeight) / 2 + diffY;
    const container = new PIXI.Container();
    container.addChild(graphEdgeObject);
    container.addChild(graphObject);
    container.addChild(labelObject);
    return container;
}

export const ButtonObject = (
        width: number, 
        height: number, 
        buttonColor: ColorObject, 
        pushedButtonColor: ColorObject,
        hoveredButtonColor: ColorObject,
        label: string,
        fontSize: number,
        labelColor: ColorObject,
        borderRadius: number = 8
    ) => {
        const pristineContainer = RawButtonObject(
            width, height, buttonColor, label, fontSize, labelColor, 0, buttonColor, 0, 0, borderRadius
        );
        const dirtyContainer = RawButtonObject(
            width, height, pushedButtonColor, label, fontSize, labelColor, 0, buttonColor, 0, 0, borderRadius
        );
        const hoverContainer = RawButtonObject(
            width, height, hoveredButtonColor, label, fontSize, labelColor, 0, buttonColor, 0, 0, borderRadius
        );
        const container = new PIXI.Container();
        container.addChild(pristineContainer);
        container.addChild(dirtyContainer);
        container.addChild(hoverContainer);
        container.children[1].visible = false;
        container.children[2].visible = false;
        container.interactive = true;
        container.on('mousedown', () => {
            container.children[1].visible = true;
            container.children[0].visible = false;
            container.children[2].visible = false;
        })
        container.on('mouseup', () => {
            container.children[0].visible = true;
            container.children[1].visible = false;
            container.children[2].visible = false;
        })
        container.on('mouseover', () => {
            container.children[2].visible = true;
            container.children[0].visible = false;
            container.children[1].visible = false;
        })
        container.on('mouseout', () => {
            container.children[0].visible = true;
            container.children[1].visible = false;
            container.children[2].visible = false;
        })
        return container;
}

export const EdgedButtonObject = (
    width: number, 
    height: number, 
    buttonColor: ColorObject, 
    label: string,
    fontSize: number,
    labelColor: ColorObject,
    edgeHeight: number,
    edgeColor: ColorObject,
    borderRadius: number = 8
) => {
    const pristineContainer = RawButtonObject(
        width, height, buttonColor, label, fontSize, labelColor, edgeHeight, edgeColor, 0, 0, borderRadius
    );
    const hoverContainer = RawButtonObject(
        width, height - edgeHeight / 8, buttonColor, label, fontSize, labelColor, edgeHeight - edgeHeight / 8, edgeColor, 0, edgeHeight / 8, borderRadius
    );
    const dirtyContainer = RawButtonObject(
        width, height - edgeHeight / 2, buttonColor, label, fontSize, labelColor, edgeHeight / 2, edgeColor, 0, edgeHeight / 2, borderRadius
    );
    const container = new PIXI.Container();
    container.addChild(pristineContainer);
    container.addChild(dirtyContainer);
    container.addChild(hoverContainer);
    container.children[1].visible = false;
    container.children[2].visible = false;
    container.interactive = true;
    container.on('mousedown', () => {
        container.children[1].visible = true;
        container.children[0].visible = false;
        container.children[2].visible = false;
    })
    container.on('mouseup', () => {
        container.children[0].visible = true;
        container.children[1].visible = false;
        container.children[2].visible = false;
    })
    container.on('mouseover', () => {
        container.children[2].visible = true;
        container.children[0].visible = false;
        container.children[1].visible = false;
    })
    container.on('mouseout', () => {
        container.children[0].visible = true;
        container.children[1].visible = false;
        container.children[2].visible = false;
    })
    return container;
}

export const MaskedContainerButtonObject = (
    container: PIXI.Container,
    maskColor: ColorObject,
    alpha: number,
) => {
    const rawContainer = container;
    rawContainer.x = 0;
    rawContainer.y = 0;
    const mask = new PIXI.Graphics()
        .beginFill(maskColor.value, alpha)
        .drawRect(0,0,rawContainer.width, rawContainer.height)
        .endFill();
    const wholeContainer = new PIXI.Container();
    wholeContainer.addChild(rawContainer);
    wholeContainer.addChild(mask);
    wholeContainer.children[1].visible = false;
    wholeContainer.interactive = true;
    wholeContainer.on('mouseover', () => {
        wholeContainer.children[1].visible = true;
    });
    wholeContainer.on('mouseout', () => {
        wholeContainer.children[1].visible = false;
    });
    return wholeContainer;
}