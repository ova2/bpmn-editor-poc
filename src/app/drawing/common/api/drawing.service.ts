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

    public getViewPort(): Bounds {
        return this.viewPort;
    }

    public getZoomFactor(): number {
        return this.zoomFactor * DrawingService.graphicsScaleFactor;
    }

    public setZoomFactor(zoomFactor: number): void {
        this.zoomFactor = zoomFactor * DrawingService.graphicsScaleFactor;
    }

    public getRootNodeElement():NodeElement
    {
        return this.rootNodeElement;
    }

    public setRootNodeElement(nodeElement:NodeElement)
    {
        this.rootNodeElement = nodeElement;
    }

    private rootNodeElement:NodeElement;
}
