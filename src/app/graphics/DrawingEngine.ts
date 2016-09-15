import {NodeElement} from "./model/NodeElement";

export abstract class DrawingEngine
{
    constructor( element:Element )
    {
        this._element = element;

    }

    public draw(nodeElement: NodeElement): void
    {
        console.log("Drawing Engine: draw");
    }

    public get element(): Element
    {
        return this._element;
    }

    private _element:Element;


}
