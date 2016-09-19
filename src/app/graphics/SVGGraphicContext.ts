import {DrawingEngine} from "./DrawingEngine";
import {NodeElement} from "./model/NodeElement";
import {Bounds} from "./model/geometry/Bounds";
import "snapsvg-cjs";
import {Path} from "./model/geometry/Path";
import {ShapeElementType} from "./model/ShapeElement";
import {Point} from "./model/geometry/Point";
import {SegmentType} from "./model/geometry/Segment";
import {Resource} from "./model/resource/Resource";
import {Color} from "./model/resource/Color";
import {
	Pattern,
	PatternType
} from "./model/resource/Pattern";
import {
	Stroke,
	LineJoin
} from "./model/resource/Stroke";
import {Shadow} from "./model/resource/Shadow";


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


		let pathPoints:string = "";

		for (let i = stepx + 0.5; i < this.viewPort.width; i += stepx)
		{
			pathPoints = pathPoints +  `M ${i} 0 L ${i} ${this.viewPort.height} `;

		}

		for (let i = stepy + 0.5; i < this.viewPort.height; i += stepy)
		{
			pathPoints = pathPoints +  `M 0 ${i} L ${this.viewPort.height} ${i}  `;
		}




		console.log( "Path: " + pathPoints);
		let pathElement:Snap.Element = this._snapSVG.path( pathPoints );

		pathElement.attr(
		{
			stroke: "#000",
			strokeWidth: 1
		});




	}



	private _snapSVG: Snap.Paper;

	public draw(nodeElement: NodeElement): void
	{

		let svgElement:Snap.Element = null;
		console.log("Draw: " + (nodeElement == null ? " NONE " : nodeElement.getName()));

		let xOffset: number = this.viewPort.x;
		let yOffset: number = this.viewPort.y;

		let width: number = this.viewPort.width;
		let height: number = this.viewPort.height;


		if (nodeElement == null)
		{

			this._snapSVG.clear();
			// Clear Background
			svgElement = this._snapSVG.rect(0, 0, width,height);
			svgElement.attr(
				{
					fill:"#DDDDDD"
				}
			);
			// let g = this._snapSVG.gradient("L(0, 0, 100, 100)#000-#f00:25-#fff");
			// this._snapSVG.circle(50, 50, 40).attr({	fill: g, stroke: "#000000", strokewidth: 3	});

		}


		if (nodeElement == null)
		{
			// this.drawGrid();
		}

		if( nodeElement != null )
		{
			this.internalDraw(nodeElement);
		}

	}


	private drawPath(path: Path, type: ShapeElementType): Snap.Element
	{

		let svgElement:Snap.Element = null;
		let pathString = "";

		for (let segment of path.getSegments())
		{
			let points: Array<Point> = segment.getPoints();


			switch (segment.getType())
			{
				case SegmentType.CLOSE:
				{
					pathString += "Z";
					break;
				}

				case SegmentType.LINE_TO:
				{
					pathString += `L ${points[0].getX()} ${points[0].getY()} `;
					break;
				}

				case SegmentType.MOVE_TO:
				{
					pathString += `M ${points[0].getX()} ${points[0].getY()} `;
					break;
				}

				case SegmentType.CUBIC_TO:
				{
					pathString += `C ${points[0].getX()} ${points[0].getY()} ${points[1].getX()} ${points[1].getY()} ${points[2].getX()} ${points[2].getY()}`;
					break;
				}

				case SegmentType.QUAD_TO:
				{
					pathString += `Q ${points[0].getX()} ${points[0].getY()} ${points[1].getX()} ${points[1].getY()}`;
					break;
				}
			}
		}



		switch (type)
		{
			case ShapeElementType.STROKE:
			{
				// this._context2D.stroke();
				break;
			}

			case ShapeElementType.FILL:
			{
				// this._context2D.fill();
				break;
			}
		}

		return this._snapSVG.path(pathString);

	}

	private appyResource(svgElement:Snap.Element, resource: Resource): void
	{
		if (resource instanceof Color)
		{
			let color: Color = <Color> resource;
			svgElement.attr( { stroke:color.toRGBString()});

		}
		else if (resource instanceof Pattern)
		{
			let pattern: Pattern = <Pattern> resource;
			switch (pattern.getType())
			{
				case PatternType.LINEAR:
				{
					let gradientString = `L(${pattern.getPoints()[0].getX()}, ${pattern.getPoints()[0].getY()}, ${pattern.getPoints()[1].getX()}, ${pattern.getPoints()[1].getY()})`;
					let isFirst:boolean = true;
					for (let stopColor of pattern.getStopColors())
					{
						if( ! isFirst )
						{
							gradientString += "-";
						}
						gradientString += `${stopColor.getColor().toHex()}`;
						isFirst = false;
					}
					console.log("Gradient: " + gradientString);
					let gradientElement:Snap.Element = this._snapSVG.gradient( gradientString );
					svgElement.attr( { fill:gradientElement });
					break;
				}
			}
		}
		else if( resource instanceof  Stroke)
		{
			let stroke:Stroke = <Stroke> resource;

			if( stroke.getWidth() != null )
			{
				svgElement.attr( `strokeWidth:${stroke.getWidth()}`);
			}

			if( stroke.lineJoin != null )
			{
				switch (stroke.lineJoin )
				{
					case LineJoin.BEVEL:
					{
						// this._context2D.lineJoin = "bevel";
						break;
					}

					case LineJoin.ROUND:
					{
						// this._context2D.lineJoin = "round";
						break;
					}

					case LineJoin.MITER:
					{
						// this._context2D.lineJoin = "miter";
						break;
					}
				}
			}
		}
		else if( resource instanceof Shadow)
		{
			let shadow:Shadow = <Shadow> resource;
			// this._context2D.shadowColor = shadow.color.toRGBString();
			// this._context2D.shadowOffsetX = shadow.offsetX;
			// this._context2D.shadowOffsetY = shadow.offsetY;

			// this._context2D.shadowBlur = 2.0;
		}
	}



	private internalDraw(nodeElement: NodeElement): void
	{

		for (let shapeElement  of nodeElement.getShapeElements())
		{

			for (let iGeometry of shapeElement.getShapes())
			{
				let path: Path = iGeometry.getPath();
				let svgElement:Snap.Element = this.drawPath(path, shapeElement.getType());

				for (let resource of  shapeElement.getResources())
				{
					this.appyResource(svgElement,resource);
				}

			}
		}
	}

}
