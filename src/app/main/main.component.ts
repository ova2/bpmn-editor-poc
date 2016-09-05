import {Component, OnInit} from "@angular/core";

@Component({
    selector: "bpm-main",
    templateUrl: "main.template.html"
})
export class MainComponent implements OnInit
{
    ngOnInit()
    {
        console.log("Init MainComponent");
    }
}
