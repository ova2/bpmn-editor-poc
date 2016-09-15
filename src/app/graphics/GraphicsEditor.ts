import {DrawingEngine} from "./DrawingEngine";
import {Canvas} from "./Canvas";
import {Test} from "./Test";
import {NodeElement} from "./model/NodeElement";
import {Point} from "./model/geometry/Point";
import {DebugHelper} from "./util/DebugHelper";
import {IController} from "./controller/IController";

export class GraphicsEditor
{
    get rootNodeElement(): NodeElement
    {
        return this._rootNodeElement;
    }

    set rootNodeElement(value: NodeElement)
    {
        this._rootNodeElement = value;
    }

    constructor( htmlCanvasElement:HTMLCanvasElement)
    {
        this._drawingEngine = new Canvas( htmlCanvasElement );
        console.log( "Drawing Engine: " + this._drawingEngine );
    }


    public draw(nodeElement: NodeElement): void
    {
        this._drawingEngine.draw(nodeElement);
    }

    public handleMouseEvent( mouseEvent:MouseEvent):void
    {
        mouseEvent.preventDefault();
        let worldPosition:Point = this.convertScreen2World( mouseEvent.clientX, mouseEvent.clientY );
        DebugHelper.debugMouseEvent(mouseEvent,worldPosition);
    }




    public convertScreen2World( x:number, y:number):Point
    {
        let element:Element = this._drawingEngine.element;
        let clientRect:ClientRect = element.getBoundingClientRect();

        return new Point( x - clientRect.left, y - clientRect.top);
    }


    private _iController:IController;
    private _rootNodeElement:NodeElement;
    private _drawingEngine:DrawingEngine;
}
