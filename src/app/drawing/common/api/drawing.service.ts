import {Injectable} from "@angular/core";
import {Resource} from "../model/resource/Resource";
import {Shape} from "../model/shape/Shape";


@Injectable()
export abstract class DrawingService
{

	public abstract initSurface(element: Element): void;

	public abstract getSurface(): any;

	public abstract draw(): void;
}
