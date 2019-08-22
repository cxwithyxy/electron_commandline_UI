"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xterm_1 = require("xterm");
const fit_1 = require("xterm/lib/addons/fit/fit");
class Main_app {
    constructor() {
        this.term = new xterm_1.Terminal();
        this.term.open(document.getElementById('terminal_ui'));
        this.fit_screen();
    }
    fit_screen() {
        fit_1.fit(this.term);
    }
}
global.Main_app = Main_app;
