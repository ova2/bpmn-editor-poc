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

@Injectable()
export class CanvasDrawingService extends DrawingService {

    private context2D: CanvasRenderingContext2D;
    private eventService: GenericEventService<SurfaceAction>;
    eventSubscription: Subscription;

    constructor(eventService: GenericEventService<SurfaceAction>) {
        super();
        this.eventService = eventService;
    }

    initSurface(element: Element): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> element;

        this.context2D = canvas.getContext("2d");

        canvas.width = DrawingService.graphicsScaleFactor * canvas.clientWidth;
        canvas.height = DrawingService.graphicsScaleFactor * canvas.clientHeight;

        // Setup Default ViewPort
        this.getViewPort().setBounds(0, 0, canvas.width, canvas.height);
        this.setZoomFactor(2.0);

        this.showInfo();

        // Setup event handler
        this.eventSubscription = this.eventService.subscribeDrawingEvent(this.handleDrawingEvent);
    }

    getSurface(): CanvasRenderingContext2D {
        return this.context2D;
    }

    handleResize(width: number, height: number): void {
        // TODO
        console.log("Handle Resize here !");
    }

    showInfo(): void {
        console.log("Canvas: W: " + this.context2D.canvas.width + " H:  " + this.context2D.canvas.height);
    }

    draw(nodeElement: NodeElement): void {

        // Clear Background
        this.context2D.fillStyle = "#FFFFFF";
        this.context2D.fillRect(0, 0, this.context2D.canvas.width, this.context2D.canvas.height);

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

    private drawGrid(): void {
        let stepx = 10;
        let stepy = 10;

        this.context2D.save();

        this.context2D.strokeStyle = "#000000";
        this.context2D.lineWidth = 0.5;
        this.context2D.globalAlpha = 0.1;

        this.context2D.beginPath();
        for (let i = stepx + 0.5; i < this.context2D.canvas.width; i += stepx) {
            this.context2D.moveTo(i, 0);
            this.context2D.lineTo(i, this.context2D.canvas.height);
        }
        this.context2D.stroke();

        this.context2D.beginPath();
        for (let i = stepy + 0.5; i < this.context2D.canvas.height; i += stepy) {
            this.context2D.moveTo(0, i);
            this.context2D.lineTo(this.context2D.canvas.width, i);
        }
        this.context2D.stroke();
        this.context2D.globalAlpha = 0.0;
        this.context2D.restore();
    }

    private drawPath(path: Path): void {
        this.context2D.beginPath();

        for (let segment of path.getSegments()) {
            let points: Array<Point> = segment.getPoints();

            switch (segment.getType()) {
                case SegmentType.CLOSE: {
                    this.context2D.closePath();
                    break;
                }

                case SegmentType.LINE_TO: {
                    this.context2D.lineTo(points[0].getX(), points[0].getY());
                    break;
                }

                case SegmentType.MOVE_TO: {
                    this.context2D.moveTo(points[0].getX(), points[0].getY());
                    break;
                }

                case SegmentType.CUBIC_TO: {
                    this.context2D.bezierCurveTo(points[0].getX(), points[0].getY(), points[1].getX(), points[1].getY(), points[2].getX(), points[2].getY());
                    break;
                }

                case SegmentType.QUAD_TO: {
                    this.context2D.quadraticCurveTo(points[0].getX(), points[0].getY(), points[1].getX(), points[1].getY());
                    break;
                }
            }
        }

        this.context2D.lineWidth = 5;
        this.context2D.strokeStyle = "blue";
        this.context2D.stroke();
    }

    private internalDraw(nodeElement: NodeElement): void {
        for (let shapeElement  of nodeElement.getShapeElements()) {
            for (let iGeometry of shapeElement.getShapes()) {
                let path: Path = iGeometry.getPath();
                this.drawPath(path);
            }
        }
    }

    private drawInfo(): void {
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

    private handleDrawingEvent(event: GenericEvent<SurfaceAction>) {
        switch (event.payload) {
            case SurfaceAction.Delete:
                console.info("Handle Delete");
                break;
            case SurfaceAction.ZoomIn:
                console.info("Handle ZoomIn");
                break;
            case SurfaceAction.ZoomOut:
                console.info("Handle ZoomOut");
                break;
            default:
                console.error("Not supported event = " + event.payload);
        }
    }
}
