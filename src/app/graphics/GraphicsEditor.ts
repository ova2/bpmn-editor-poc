import {DrawingEngine} from "./DrawingEngine";
import {Canvas} from "./Canvas";
import {NodeElement} from "./model/NodeElement";
import {Point} from "./model/geometry/Point";
import {DebugHelper} from "./util/DebugHelper";
import {AbstractController} from "./controller/AbstractController";
import {SelectionController} from "./controller/SelectionController";

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

	constructor(htmlCanvasElement: HTMLCanvasElement)
	{
		this._drawingEngine = new Canvas(htmlCanvasElement);

		this._currentController = new SelectionController(this);
		console.log("Drawing Engine: " + this._drawingEngine);
	}


	public draw(nodeElement: NodeElement): void
	{
		this._drawingEngine.draw(nodeElement);
	}

	public handleMouseEvent(mouseEvent: MouseEvent): void
	{
		mouseEvent.preventDefault();
		if( this._currentController != null )
		{
			this._currentController.handleMouseEvent(mouseEvent);
		}
	}


	public convertScreen2World(x: number, y: number): Point
	{
		let element: Element = this._drawingEngine.element;
		let clientRect: ClientRect = element.getBoundingClientRect();

		return new Point(x - clientRect.left, y - clientRect.top);
	}


	private _currentController: AbstractController;
	private _rootNodeElement: NodeElement;
	private _drawingEngine: DrawingEngine;
}
