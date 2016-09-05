import {ShapeElement, ShapeType} from "./shape-element";

abstract class Task implements ShapeElement {

    id: string;
    type: ShapeType = "Task";
    xy: [number, number];
    width: number;
    height: number;
    rxy: [number, number];
    fill: string[];
    stroke: string;
    strokeWidth: number;
    fillOpacity: number;
    strokeOpacity: number;

    abstract draw(surface: any);
}
