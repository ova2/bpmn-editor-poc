import {DebugHelper} from "../util/DebugHelper";
import {AbstractController} from "./AbstractController";
import {GraphicsEditor} from "../GraphicsEditor";
import {Point} from "../model/geometry/Point";
export class MouseController extends AbstractController
{
	constructor(graphicsEditor: GraphicsEditor)
	{
		super(graphicsEditor);
	}

	public handleMouseEvent(mouseEvent: MouseEvent): void
	{
		let worldPosition: Point = this.graphicsEditor.convertScreen2World(mouseEvent.clientX, mouseEvent.clientY);
		DebugHelper.debugMouseEvent(mouseEvent, worldPosition);

		switch ( mouseEvent.type )
		{
			case "mousemove":
			{
				console.log("Controller Mouse Move");
				break;
			}
		}
	}
}
