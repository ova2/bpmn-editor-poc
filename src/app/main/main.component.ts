import {Component, OnInit} from "@angular/core";
import {TestModel} from "../graphics/model/editor/Test";

@Component({
    selector: "bpm-main",
    templateUrl: "main.template.html"
})
export class MainComponent implements OnInit
{
    ngOnInit()
    {
        console.log("Init MainComponent");

        let testModel:TestModel = new TestModel();
    }
}
