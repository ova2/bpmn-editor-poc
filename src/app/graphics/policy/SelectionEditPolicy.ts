import {DebugHelper} from "../util/DebugHelper";
import {Point} from "../model/geometry/Point";
import {MouseEventEditPolicy} from "./MouseEventEditPolicy";
import {NodeElement} from "../model/NodeElement";
import {
	ShapeElement,
	ShapeElementType
} from "../model/ShapeElement";
import {Rectangle} from "../model/geometry/Rectangle";
import {Bounds} from "../model/geometry/Bounds";
import {Color} from "../model/resource/Color";
import {
	Stroke,
	LineJoin
} from "../model/resource/Stroke";
export class SelectionEditPolicy extends MouseEventEditPolicy
{

	public onMouseDown( mouseEvent:MouseEvent): void
	{
		let worldPosition: Point = this.graphicsEditor.convertScreen2World(mouseEvent.clientX, mouseEvent.clientY);
		DebugHelper.debugMouseEvent(mouseEvent, worldPosition);

		switch ( mouseEvent.type )
		{
			case "mousedown":
			{
				console.log("Controller Mouse Down");

				if( this.graphicsEditor != null )
				{
					if( !  mouseEvent.ctrlKey )
					{
						this.graphicsEditor.clearSelectedElements();
					}
					let foundElements:Array<NodeElement> = this.graphicsEditor.findElement( worldPosition );
					for( let nodeElement of foundElements )
					{
						if( !this.graphicsEditor.getSelectedNodeElements().includes( nodeElement ))
						{
							let bounds:Bounds = nodeElement.getBounds();

							this.graphicsEditor.selectNodeElement(nodeElement);

							// Build Feedback Shape
							let feedbackNode:NodeElement = new NodeElement("SelectionFeedback");
							let feedbackShape:ShapeElement = new ShapeElement( "FShape", ShapeElementType.STROKE);
							feedbackNode.getShapeElements().push(feedbackShape);
							feedbackShape.shapes.push(new Rectangle(bounds.x, bounds.y, bounds.width, bounds.height));
							feedbackShape.resources.push( new Color(0,0,0));
							let stroke = new Stroke(3);
							stroke.lineJoin = LineJoin.ROUND;
							feedbackShape.resources.push( stroke);
							this.graphicsEditor.addNodeElement2Layer("FEEDBACK", feedbackNode );
						}
					}

					this.graphicsEditor.repaint();
				}

				break;
			}
		}
	}
}

