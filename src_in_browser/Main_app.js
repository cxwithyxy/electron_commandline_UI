"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xterm_1 = require("xterm");
class Main_app {
    constructor() {
        var term = new xterm_1.Terminal();
        term.open(document.getElementById('terminal'));
    }
}
global.Main_app = Main_app;
