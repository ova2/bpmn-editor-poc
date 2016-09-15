import {EventController} from "./EventController";
import {DrawingService} from "../api/drawing.service";
import {Point} from "../model/geometry/Point";
export class SelectionEventController implements EventController
{

	constructor( drawingService:DrawingService)
	{
		this._drawingService = drawingService;
	}

	handleEvent(mouseEvent: MouseEvent)
	{


		let wPos:Point = this._drawingService.convertScreen2World( new Point( mouseEvent.clientX, mouseEvent.clientY));

		console.log(`Selection Controller: (${wPos.getX()},${wPos.getY()})`);
	}

	private _drawingService:DrawingService;
}
