export type ShapeType = "Task" | "Text" | "StartEvent" | "EndEvent" | "UnidirectConnector";

export interface ShapeElement {
    id: string;
    type: ShapeType;
    children?: ShapeElement[];
    draw(surface: any): void;
}

