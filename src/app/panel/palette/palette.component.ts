import {Component} from "@angular/core";

import PaletteMode from "./palette-mode";

@Component({
    selector: "bpm-palette",
    templateUrl: "palette.component.html"
})
export class PaletteComponent {

    mode: PaletteMode;

    onClick(mode: string) {
        this.mode = PaletteMode[mode];
    }
}
