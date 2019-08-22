"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xterm_1 = require("xterm");
const fit_1 = require("xterm/lib/addons/fit/fit");
class Main_app {
    constructor() {
        this.term = new xterm_1.Terminal();
        this.term.open(document.getElementById('terminal_ui'));
        this.init_listener();
        this.fit_screen();
    }
    init_listener() {
        this.term.on("data", (data) => {
            this.term.write(data);
        });
        this.term.on("key", (key, ev) => {
            if (ev.keyCode == 13) {
                this.prompt();
            }
        });
        this.term.on('paste', (data) => {
            this.term.write(data);
        });
    }
    prompt() {
        this.term.write("\r\n-->: ");
    }
    fit_screen() {
        fit_1.fit(this.term);
    }
}
global.Main_app = Main_app;
