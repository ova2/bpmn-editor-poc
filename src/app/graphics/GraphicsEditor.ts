import {DrawingEngine} from "./DrawingEngine";
import {Canvas} from "./Canvas";
import {NodeElement} from "./model/NodeElement";
import {Point} from "./model/geometry/Point";
import {EditPolicy} from "./policy/EditPolicy";
import {SelectionEditPolicy} from "./policy/SelectionEditPolicy";
import {MouseEventEditPolicy} from "./policy/MouseEventEditPolicy";
import {Bounds} from "./model/geometry/Bounds";

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

		// Install EditPolicies
		this._editPolicies.push(new SelectionEditPolicy());
	}


	public repaint(nodeElement?: NodeElement): void
	{
		if (nodeElement == null)
		{
			this._drawingEngine.draw(null);
			nodeElement = this._rootNodeElement;
		}
		this._drawingEngine.draw(nodeElement);
		for (let childNode of nodeElement.getChildList())
		{
			this.repaint(childNode);
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


	private _editPolicies: Array<EditPolicy> = new Array();
	private _rootNodeElement: NodeElement;
	private _drawingEngine: DrawingEngine;
}
