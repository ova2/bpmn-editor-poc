import {
	Component,
	ViewChild,
	ElementRef,
	AfterViewInit
} from "@angular/core";


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
	}
}
