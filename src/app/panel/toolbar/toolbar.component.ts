import {Component} from "@angular/core";

@Component({
    selector: "bpm-toolbar",
    templateUrl: "toolbar.component.html"
})
export class ToolbarComponent {

    onDelete(event: Event) {
        event.preventDefault();

        // TODO
    }

    onZoomIn(event: Event) {
        event.preventDefault();
        console.log("Zoom In");
    }

    onZoomOut(event: Event) {
        event.preventDefault();
        console.log("Zoom Out");
        // TODO
    }
}
