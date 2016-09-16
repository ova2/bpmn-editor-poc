
import {Color} from "./model/resource/Color";
import {Pattern, PatternType} from "./model/resource/Pattern";
import {Rectangle} from "./model/geometry/Rectangle";
import {ShapeElementType, ShapeElement} from "./model/ShapeElement";
import {NodeElement} from "./model/NodeElement";
import {Point} from "./model/geometry/Point";

export class Test
{
    public static test1():NodeElement
    {
        let rootNodeElement: NodeElement = new NodeElement("ROOT.NODE");

        let testElement1:NodeElement = new NodeElement("Rectangle 1");
        rootNodeElement.add(testElement1);

        let shapeElement: ShapeElement = new ShapeElement("SHAPE.NODE", ShapeElementType.FILL);
        testElement1.getShapeElements().push(shapeElement);

        shapeElement.getShapes().push(new Rectangle(10, 10, 100, 100));
        let rainBowPattern: Pattern = new Pattern(PatternType.LINEAR, new Point(0, 0), new Point(200, 200));


        rainBowPattern.addStopColor(1 / 7, Color.createColor("#FF0000"));
        rainBowPattern.addStopColor(2 / 7, Color.createColor("#FF7F00"));
        rainBowPattern.addStopColor(3 / 7, Color.createColor("#FFFF00"));
        rainBowPattern.addStopColor(4 / 7, Color.createColor("#00FF00"));
        rainBowPattern.addStopColor(5 / 7, Color.createColor("#0000FF"));
        rainBowPattern.addStopColor(6 / 7, Color.createColor("#4B0082"));
        rainBowPattern.addStopColor(7 / 7, Color.createColor("#8F00FF"));


        shapeElement.getResources().push(rainBowPattern);

        return rootNodeElement;
    }
}
