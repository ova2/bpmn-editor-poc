import {Injectable} from "@angular/core";

import {DrawingService} from "../common/api/drawing.service";

import {NodeElement} from "../common/model/NodeElement";

import {Path} from "../common/model/geometry/Path";
import {SegmentType} from "../common/model/geometry/Segment";
import {Point} from "../common/model/geometry/Point";

import GenericEvent from "../common/event/generic-event";
import SurfaceAction from "../common/model/surface-action";
import {GenericEventService} from "../common/event/generic-event.service";
import {Subscription} from "rxjs";

import {Color} from "../common/model/resource/Color";
import {Resource} from "../common/model/resource/Resource";
import {
	Pattern,
	PatternType,
	StopColor
} from "../common/model/resource/Pattern";
import {ShapeElementType} from "../common/model/ShapeElement";


@Injectable()
export class CanvasDrawingService extends DrawingService
{


	private context2D: CanvasRenderingContext2D;
	private eventService: GenericEventService<SurfaceAction>;
	eventSubscription: Subscription;

	constructor(eventService: GenericEventService<SurfaceAction>)
	{
		super();
		this.eventService = eventService;
	}

	initSurface(element: Element): void
	{
		let canvas: HTMLCanvasElement = <HTMLCanvasElement> element;
		canvas.width = DrawingService.graphicsScaleFactor * canvas.clientWidth;
		canvas.height = DrawingService.graphicsScaleFactor * canvas.clientHeight;
		this.context2D = canvas.getContext("2d");

		// Setup Default ViewPort
		this.getViewPort().setBounds(0, 0, canvas.width, canvas.height);
		this.setZoomFactor(2.0);

		this.showInfo();

		// Setup event handler
		this.eventSubscription = this.eventService.subscribeDrawingEvent(this.handleDrawingEvent.bind(this));
	}

	getSurface(): CanvasRenderingContext2D
	{
		return this.context2D;
	}

	handleResize(width: number, height: number): void
	{
		// TODO
		console.log("Handle Resize here !");
	}

	showInfo(): void
	{
		console.log("Canvas: W: " + this.context2D.canvas.width + " H:  " + this.context2D.canvas.height);
	}


	private handleDrawingEvent(event: GenericEvent<SurfaceAction>)
	{
		switch (event.payload)
		{
			case SurfaceAction.Delete:
			{
				console.info("Handle Delete");
				break;
			}
			case SurfaceAction.ZoomIn:
			{
				this.setZoomFactor(this.getZoomFactor() + 0.5);
				break;
			}
			case SurfaceAction.ZoomOut:
			{
				this.setZoomFactor(this.getZoomFactor() - 0.5);
				break;
			}
			default:
			{
				console.error("Not supported event = " + event.payload);
			}
		}
		this.draw(this.getRootNodeElement());
	}


	private drawGrid(): void
	{
		let stepx = 10;
		let stepy = 10;

		this.context2D.save();

		this.context2D.strokeStyle = "#000000";
		this.context2D.lineWidth = 0.5;
		this.context2D.globalAlpha = 0.1;

		this.context2D.beginPath();
		for (let i = stepx + 0.5; i < this.context2D.canvas.width; i += stepx)
		{
			this.context2D.moveTo(i, 0);
			this.context2D.lineTo(i, this.context2D.canvas.height);
		}
		this.context2D.stroke();

		this.context2D.beginPath();
		for (let i = stepy + 0.5; i < this.context2D.canvas.height; i += stepy)
		{
			this.context2D.moveTo(0, i);
			this.context2D.lineTo(this.context2D.canvas.width, i);
		}
		this.context2D.stroke();
		this.context2D.globalAlpha = 0.0;
		this.context2D.restore();
	}

	private appyResource(resource: Resource): void
	{
		if (resource instanceof Color)
		{
			let color: Color = <Color> resource;
			this.context2D.strokeStyle = color.toRGBString();
		} else if (resource instanceof Pattern)
		{
			let pattern: Pattern = <Pattern> resource;
			switch (pattern.getType())
			{
				case PatternType.LINEAR:
				{
					let linearGradient = this.context2D.createLinearGradient(pattern.getPoints()[0].getX(), pattern.getPoints()[0].getY(), pattern.getPoints()[1].getX(), pattern.getPoints()[1].getY())
					for (let stopColor of pattern.getStopColors())
					{

						linearGradient.addColorStop(stopColor.getStop(), stopColor.getColor().toHex());
					}
					this.context2D.fillStyle = linearGradient;
					break;
				}
			}
		}
	}

	public draw(nodeElement: NodeElement): void
	{

		// Clear Background
		this.context2D.fillStyle = "#FFFFFF";
		this.context2D.fillRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);

		this.context2D.rect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);
		var grd = this.context2D.createLinearGradient(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);


		this.context2D.fillStyle = grd;
		this.context2D.fill();

		this.context2D.save();

		let xOffset: number = this.getViewPort().getX();
		let yOffset: number = this.getViewPort().getY();

		let width: number = this.getViewPort().getWidth();
		let height: number = this.getViewPort().getHeight();


		this.context2D.translate(-xOffset, -yOffset);
		this.context2D.scale(this.getZoomFactor(), this.getZoomFactor());


		this.drawGrid();
		this.internalDraw(nodeElement);

		this.drawInfo();
		this.context2D.restore();
	}

	private drawPath(path: Path, type: ShapeElementType): void
	{
		this.context2D.beginPath();

		for (let segment of path.getSegments())
		{
			let points: Array<Point> = segment.getPoints();

			switch (segment.getType())
			{
				case SegmentType.CLOSE:
				{
					this.context2D.closePath();
					break;
				}

				case SegmentType.LINE_TO:
				{
					this.context2D.lineTo(points[0].getX(), points[0].getY());
					break;
				}

				case SegmentType.MOVE_TO:
				{
					this.context2D.moveTo(points[0].getX(), points[0].getY());
					break;
				}

				case SegmentType.CUBIC_TO:
				{
					this.context2D.bezierCurveTo(points[0].getX(), points[0].getY(), points[1].getX(), points[1].getY(), points[2].getX(), points[2].getY());
					break;
				}

				case SegmentType.QUAD_TO:
				{
					this.context2D.quadraticCurveTo(points[0].getX(), points[0].getY(), points[1].getX(), points[1].getY());
					break;
				}
			}
		}

		this.context2D.lineWidth = 5;
		this.context2D.strokeStyle = "blue";


		switch (type)
		{
			case ShapeElementType.STROKE:
			{
				this.context2D.stroke();
				break;
			}

			case ShapeElementType.FILL:
			{
				this.context2D.fill();
				break;
			}
		}

	}


	private internalDraw(nodeElement: NodeElement): void
	{
		this.context2D.save();
		for (let shapeElement  of nodeElement.getShapeElements())
		{

			for (let resource of  shapeElement.getResources())
			{
				this.appyResource(resource);
			}
			for (let iGeometry of shapeElement.getShapes())
			{
				let path: Path = iGeometry.getPath();
				this.drawPath(path, shapeElement.getType());
			}
		}
		this.context2D.restore();
	}

	private drawInfo(): void
	{
		this.context2D.save();
		let xOffset: number = this.getViewPort().getX();
		let yOffset: number = this.getViewPort().getY();

		let xSize = this.getViewPort().getWidth();
		let ySize = this.getViewPort().getHeight();


		this.context2D.font = "12px Arial";
		this.context2D.strokeStyle = "#000000";
		this.context2D.fillStyle = "#000000";
		this.context2D.lineWidth = 1;
		//this.context2D.strokeText(`ViewPort: (${xOffset},${yOffset}) -> (${xSize},${ySize})`, 100, 100 );
		this.context2D.fillText(`ViewPort: (${xOffset},${yOffset}) -> (${xSize},${ySize})`, 100, 100);
		this.context2D.restore();
	}

}
