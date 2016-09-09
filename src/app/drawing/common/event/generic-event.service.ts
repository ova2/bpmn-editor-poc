import {Injectable} from "@angular/core";
import {Subject, Subscription} from "rxjs";
import GenericEvent from "./generic-event";

@Injectable()
export class GenericEventService<T> {

    private subject: Subject<GenericEvent<T>> = new Subject<GenericEvent<T>>();

    emitDrawingEvent(event: GenericEvent<T>) {
        this.subject.next(event);
    }

    subscribeDrawingEvent(handler: (event: GenericEvent<T>) => void): Subscription {
        return this.subject.asObservable().subscribe(handler);
    }
}
