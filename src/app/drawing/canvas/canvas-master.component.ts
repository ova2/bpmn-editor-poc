import {NodeElement} from "../../inspire/develop/NodeElement";
import {Component,	OnInit} from "@angular/core";
import {NodeElementTest} from "../../inspire/test/NodeElementTest";
import {CanvasGraphics} from "../../inspire/develop/canvas/CanvasGraphics";


@Component({
	selector: "bpm-canvas-master", templateUrl: "canvas-master.component.html"
})

export class CanvasMasterComponent implements OnInit
{

	constructor()
	{

	}


	ngOnInit()
	{
		console.log("Init CanvasMasterComponent");

	}



	// Graphics
	private graphics: CanvasGraphics;
}
