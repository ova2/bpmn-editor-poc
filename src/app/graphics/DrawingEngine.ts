import {NodeElement} from "./model/NodeElement";
import {Bounds} from "./model/geometry/Bounds";

export abstract class DrawingEngine
{
    public get rootNodeElement(): NodeElement
    {
        return this._rootNodeElement;
    }

    public set rootNodeElement(value: NodeElement)
    {
        this._rootNodeElement = value;
    }

    public get viewPort(): Bounds
    {
        return this._viewPort;
    }

    public set viewPort(value: Bounds)
    {
        this._viewPort = value;
    }

    public get zoomFactor(): number
    {
        return this._zoomFactor;
    }

    public set zoomFactor(value: number)
    {
        this._zoomFactor = value;
    }
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


    private _rootNodeElement: NodeElement;
    private _viewPort: Bounds   = new Bounds(0, 0, 100, 100);
    private _zoomFactor: number = 1.0;


}
