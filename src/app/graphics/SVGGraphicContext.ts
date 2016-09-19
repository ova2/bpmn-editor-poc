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
        let width = this.viewPort.width;
        let height = this.viewPort.height;
        
		let path: string = '';

		for (let i = stepx + 0.5; i < width; i += stepx)
		{
			path = path +  `M${i},0L${i},${height}`;
		}

		for (let i = stepy + 0.5; i < height; i += stepy)
		{
			path = path +  `M0,${i}L${width},${i}`;
		}
		
		let p = this._snapSVG.path(path);        
        p.attr({
            stroke: "#cccccc",
            strokeWidth: 0.5
        });
	}
	
    public draw(nodeElement: NodeElement): void
   	{
        this._snapSVG.clear();
   	    this.drawGrid();
        
        let circle = this._snapSVG.circle(100, 100, 25);
        circle.attr({
            fill: "r()#e4e4d9-#215f00",
            stroke: "#000000", 
            strokeWidth: 1
        });
        
        let rect = this._snapSVG.rect(200, 40, 110, 80, 6, 6);
        rect.attr({
            fill: "r()#d2ddfc-#a099e8", 
            stroke: "#000000", 
            strokeWidth: 1
        });
        
        let t1 = this._snapSVG.text(255, 80, "Task 1");
        t1.attr({"alignmentBaseline": "middle", "textAnchor": "middle", "fontSize": 14});
        
        let t2 = this._snapSVG.text(100, 145, "Start 1");
        t2.attr({"alignmentBaseline": "middle", "textAnchor": "middle", "fontSize": 14});
   	}

	private _snapSVG: Snap.Paper;
}
