import {DebugHelper} from "../util/DebugHelper";
import {Point} from "../model/geometry/Point";
import {MouseEventEditPolicy} from "./MouseEventEditPolicy";
import {NodeElement} from "../model/NodeElement";
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
					if( ! mouseEvent.ctrlKey )
					{
						this.graphicsEditor.clearSelectedElements();
					}
					let foundElements:Array<NodeElement> = this.graphicsEditor.findElement( worldPosition );
					for( let nodeElement of foundElements )
					{
						this.graphicsEditor.selectNodeElement( nodeElement );
					}

				}

				break;
			}
		}
	}
}

