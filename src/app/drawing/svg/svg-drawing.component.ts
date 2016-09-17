import {
	Component,
	ViewChild,
	ElementRef,
	AfterViewInit
} from "@angular/core";
import {GraphicsEditor} from "../../graphics/GraphicsEditor";
import {Test} from "../../graphics/Test";


@Component({
	selector: "bpm-svg-drawing",
	templateUrl: "svg-drawing.component.html"
})

export class SvgDrawingComponent implements AfterViewInit
{

	@ViewChild("surface") surface: ElementRef;


	ngAfterViewInit()
	{
		console.log("SVG Drawing Component init");
		let element: Element = this.surface.nativeElement;

		this._graphicsEditor = new GraphicsEditor( element);
		this._graphicsEditor.rootNodeElement = Test.test1();
		this._graphicsEditor.repaint(  );
	}

	private _graphicsEditor:GraphicsEditor;
}
