import {
	HostListener,
	Component,
	ElementRef,
	AfterViewInit,
	ViewChild,
	OnDestroy
} from "@angular/core";
import {GraphicsEditor} from "../../graphics/GraphicsEditor";
import {Test} from "../../graphics/Test";


@Component({
	selector: "bpm-canvas-drawing",
	templateUrl: "canvas-drawing.component.html",
})
export class CanvasDrawingComponent implements AfterViewInit, OnDestroy
{

	@ViewChild("surface") surface: ElementRef;

    onMouseDown(event:MouseEvent)
	{
		this._graphicsEditor.handleMouseEvent( event );
	}

	onMouseClick(event:MouseEvent)
	{
		this._graphicsEditor.handleMouseEvent( event );
	}

	onMouseEnter(event:MouseEvent)
	{
		this._graphicsEditor.handleMouseEvent( event );
	}

	onMouseLeave(event:MouseEvent)
	{
		this._graphicsEditor.handleMouseEvent( event );
	}

	onMouseMove(event:MouseEvent)
	{
		this._graphicsEditor.handleMouseEvent( event );
	}

	ngAfterViewInit()
	{
		console.log("CANVAS Drawing Component init");
		let element: Element = this.surface.nativeElement;

		let canvas: HTMLCanvasElement = <HTMLCanvasElement> element;

        this._graphicsEditor = new GraphicsEditor( <HTMLCanvasElement> canvas);
        this._graphicsEditor.rootNodeElement = Test.test1();
        this._graphicsEditor.draw( this._graphicsEditor.rootNodeElement );
	}

	ngOnDestroy()
	{
		// (<CanvasDrawingService>this.drawingService).eventSubscription.unsubscribe();
	}

	private _graphicsEditor:GraphicsEditor;
}
