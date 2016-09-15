import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import {ShapeElement} from "../graphics/model/ShapeElement";



@Injectable()
export class DataLoadService {

    private payloadUrl = "app/payload";

    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getPayload(): Observable<ShapeElement[]> {
        return this.http.get(this.payloadUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response): ShapeElement[] {
        let body = res.json();
        return body.data as ShapeElement[] || [];
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";

        return Observable.throw(errMsg);
    }
}
