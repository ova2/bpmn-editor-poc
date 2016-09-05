import {
    Directive,
    ElementRef,
    Renderer,
    HostListener
} from "@angular/core";
import {CanvasGraphics} from "../../inspire/develop/canvas/CanvasGraphics";

@Directive({selector: "[bpmCanvas]"})
export class CanvasDirective {

    // Graphics
    private graphics: CanvasGraphics;

    constructor(el: ElementRef, renderer: Renderer) {
        let htmlCanvasElement: HTMLCanvasElement = el.nativeElement;

        console.log("Size: " + htmlCanvasElement.width + " " + htmlCanvasElement.height);
        this.graphics = new CanvasGraphics(el.nativeElement);

    }

    @HostListener("mouseenter") onMouseEnter() {
        console.log("Mouse Enter");
    }

    @HostListener("mouseleave") onMouseLeave() {
        console.log("Mouse Leave");
    }

    @HostListener("mousemove") onMouseMove() {
        console.log("Mouse Move");
    }

    @HostListener("click") onMouseClick() {
        console.log("Mouse Click");
    }
}

