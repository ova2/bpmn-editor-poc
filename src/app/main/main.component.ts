import {Component, OnInit} from "@angular/core";
import {TestModel} from "../graphics/model/editor/Test";
import {XMLParser} from "../graphics/model/editor/xml/XMLParser";



@Component({
    selector: "bpm-main",
    templateUrl: "main.template.html"
})
export class MainComponent implements OnInit
{
    ngOnInit()
    {
        console.log("Init MainComponent");

        // let testModel:TestModel = new TestModel();
        // let xmlTest:XMLParser = new XMLParser( testModel.getBPMN2EMFModel() );
    }
}
