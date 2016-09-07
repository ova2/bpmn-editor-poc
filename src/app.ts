// Import style sheets. Webpack creates a link to app.css and put it into the index.html
import "./assets/css/app.scss";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
