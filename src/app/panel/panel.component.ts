import {Component, ViewChild, ElementRef, AfterViewInit} from "@angular/core";

@Component({
    selector: "bpm-panel",
    templateUrl: "panel.component.html"
})
export class PanelComponent implements AfterViewInit {

    @ViewChild("phref")
    phref: ElementRef;

    ngAfterViewInit() {
        let hDiv: HTMLDivElement = this.phref.nativeElement;
        if (hDiv.childElementCount === 0) {
            // header is empty ==> remove the header div
            setTimeout(() => hDiv.remove(), 0);
        }
    }
}
