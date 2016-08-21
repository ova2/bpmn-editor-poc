// Import application specific styles (Webpack creates a link to app.css and put it into the index.html)
import "./assets/css/app.scss";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MainModule} from "./app/main.module";

platformBrowserDynamic().bootstrapModule(MainModule);
