import {Component} from "@angular/core";
import {GenericEventService} from "../../drawing/common/event/generic-event.service";
import GenericEvent from "../../drawing/common/event/generic-event";
import SurfaceAction from "../../drawing/common/event/surface-action";

@Component({
    selector: "bpm-toolbar",
    templateUrl: "toolbar.component.html"
})
export class ToolbarComponent {

    private eventService: GenericEventService<SurfaceAction>;

    constructor(eventService: GenericEventService<SurfaceAction>) {
        this.eventService = eventService;
    }

    onDelete(event: Event) {
        event.preventDefault();
        this.eventService.emitDrawingEvent(new GenericEvent(SurfaceAction.Delete));
    }

    onZoomIn(event: Event) {
        event.preventDefault();
        this.eventService.emitDrawingEvent(new GenericEvent(SurfaceAction.ZoomIn));
    }

    onZoomOut(event: Event) {
        event.preventDefault();
        this.eventService.emitDrawingEvent(new GenericEvent(SurfaceAction.ZoomOut));
    }
}
