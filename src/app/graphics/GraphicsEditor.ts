import {DrawingEngine} from "./DrawingEngine";

import {NodeElement} from "./model/NodeElement";
import {Point} from "./model/geometry/Point";
import {EditPolicy} from "./policy/EditPolicy";
import {SelectionEditPolicy} from "./policy/SelectionEditPolicy";
import {MouseEventEditPolicy} from "./policy/MouseEventEditPolicy";
import {Bounds} from "./model/geometry/Bounds";
import {SVGGraphicContext} from "./SVGGraphicContext";
import {CanvasGraphicContext} from "./CanvasGraphicContext";

export class GraphicsEditor
{
	public get rootNodeElement(): NodeElement
	{
		return this._rootNodeElement;
	}

	public set rootNodeElement(value: NodeElement)
	{
		this._rootNodeElement = value;
	}

	constructor(element: Element)
	{
		if( element instanceof HTMLCanvasElement)
		{
			this._drawingEngine = new CanvasGraphicContext( <HTMLCanvasElement> element);
		}
		if( element instanceof SVGElement )
		{
			this._drawingEngine = new SVGGraphicContext(<SVGElement> element);
		}
		// Install EditPolicies
		this._editPolicies.push(new SelectionEditPolicy());
	}


	public repaint()
	{
		this._drawingEngine.draw(null);
		for (let childNode of this._rootNodeElement.getChildList())
		{
			this.iRepaint(childNode);
		}

			for (let nodeElement of this._feedbackNodes )
			{
				this.iRepaint(nodeElement);
			}
	}



	public iRepaint(nodeElement: NodeElement): void
	{
		this._drawingEngine.draw(nodeElement);
		for (let childNode of nodeElement.getChildList())
		{
			this.iRepaint(childNode);
		}

	}

	private findElementRecursive(position: Point, nodeElement: NodeElement, resultList: Array<NodeElement>): void
	{
		let bounds: Bounds = nodeElement.getBounds();
		if (bounds != null && bounds.containsPoint(position.getX(), position.getY()))
		{
			resultList.push(nodeElement);
		}

		for (let childNodeElement of nodeElement.getChildList())
		{
			this.findElementRecursive(position, childNodeElement, resultList);
		}
	}

	public clearSelectedElements(): void
	{
		this._selectedNodeElements = [];
		this._feedbackNodes = [];
	}


	public selectNodeElement(nodeElement: NodeElement): void
	{
		if (!this._selectedNodeElements.includes(nodeElement))
		{
			console.log(`Add NodeElement ${nodeElement.getName()} to selected Elements`);
			this._selectedNodeElements.push(nodeElement);
		}
	}

	public getSelectedNodeElements(): Array<NodeElement>
	{
		return this._selectedNodeElements;
	}

	private _selectedNodeElements: Array<NodeElement> = new Array();


	public findElement(position: Point): Array<NodeElement>
	{
		let retArray: Array<NodeElement> = new Array();


		this.findElementRecursive(position, this._rootNodeElement, retArray);


		return retArray;
	}

	public handleMouseEvent(mouseEvent: MouseEvent): void
	{
		mouseEvent.preventDefault();

		for (let editPolicy of this._editPolicies)
		{

			if (editPolicy instanceof MouseEventEditPolicy)
			{
				let mouseEventEditPolicy: MouseEventEditPolicy = <MouseEventEditPolicy> editPolicy;

				mouseEventEditPolicy.onActivate(this);
				mouseEventEditPolicy.onMouseDown(mouseEvent);
			}
		}

	}


	public convertScreen2World(x: number, y: number): Point
	{
		let element: Element = this._drawingEngine.element;
		let clientRect: ClientRect = element.getBoundingClientRect();

		return new Point(x - clientRect.left, y - clientRect.top);
	}

	public addNodeElement2Layer( layer:string, nodeElement:NodeElement )
	{
		this._feedbackNodes.push(nodeElement);
	}


	private _feedbackNodes:Array<NodeElement> = new Array();

	private _editPolicies: Array<EditPolicy> = new Array();
	private _rootNodeElement: NodeElement;
	private _drawingEngine: DrawingEngine;
}
