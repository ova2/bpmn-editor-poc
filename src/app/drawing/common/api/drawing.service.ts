import {Injectable} from "@angular/core";
import {ShapeElement} from "../model/shape-element";

@Injectable()
export abstract class DrawingService {

    abstract initSurface(element: Element): void;
    
    abstract getSurface(): any;

    draw(shapes: ShapeElement[]): void {
        // iterate over merged shapes and invoke draw() on every shape
        for (let shape of shapes) {
            // TODO children should be iterated recursive too
            shape.draw(this.getSurface());
        }
    }
}
