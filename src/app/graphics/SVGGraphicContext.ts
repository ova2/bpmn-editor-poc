import {DrawingEngine} from "./DrawingEngine";
import {NodeElement} from "./model/NodeElement";
import {Bounds} from "./model/geometry/Bounds";
import "snapsvg-cjs";


export class SVGGraphicContext extends DrawingEngine
{

	constructor(element: Element)
	{
		super(element);

		if (element instanceof SVGElement)
		{
			this._snapSVG = Snap(element);
			this.viewPort = new Bounds( 0,0, element.clientWidth, element.clientHeight);
		}

		console.log("HTML: " + element.innerHTML);
	}



	private drawGrid(): void
	{
		let stepx = 10;
		let stepy = 10;


		let pathPoints:string = '<path stroke="#000000" "0.5px" stroke-opacity:0.3 d="';

		for (let i = stepx + 0.5; i < this.viewPort.width; i += stepx)
		{
			pathPoints = pathPoints +  `M ${i} 0 L ${i} ${this.viewPort.height} `;

		}

		for (let i = stepy + 0.5; i < this.viewPort.height; i += stepy)
		{
			pathPoints = pathPoints +  `M 0 ${i} L ${this.viewPort.height} ${i}  `;
		}

		pathPoints = pathPoints +  '"/>';


		console.log("pathPoints: " + pathPoints);



	}

	private _snapSVG: Snap.Paper;

	public draw(nodeElement: NodeElement): void
	{

		this._snapSVG.circle(10,10, 100);
		this.drawGrid();
	}


}
