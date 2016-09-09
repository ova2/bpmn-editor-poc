import {Injectable} from "@angular/core";
import {NodeElement} from "../model/NodeElement";
import {Bounds} from "../model/geometry/Bounds";

@Injectable()
export abstract class DrawingService {

    private viewPort: Bounds = new Bounds(0, 0, 100, 100);
    private zoomFactor: number = 1.0;
    static graphicsScaleFactor: number = 2.0;

    abstract initSurface(element: Element): void;

    abstract getSurface(): any;

    abstract draw(nodeElement: NodeElement): void;

    abstract handleResize(width: number, height: number): void;

    getViewPort(): Bounds {
        return this.viewPort;
    }

    getZoomFactor(): number {
        return this.zoomFactor * DrawingService.graphicsScaleFactor;
    }

    setZoomFactor(zoomFactor: number): void {
        this.zoomFactor = zoomFactor;
    }
}
