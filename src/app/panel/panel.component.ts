import {Component, ViewChild, ElementRef, AfterContentInit} from "@angular/core";

@Component({
    selector: "bpm-panel",
    templateUrl: "panel.component.html"
})
export class PanelComponent implements AfterContentInit {

    @ViewChild("phref")
    phref: ElementRef;

    ngAfterContentInit() {
        let hDiv: HTMLDivElement = this.phref.nativeElement;
        if (hDiv.childElementCount === 0) {
            // header is empty ==> remove the header div
            setTimeout(() => hDiv.remove(), 0);
        }
    }
}
