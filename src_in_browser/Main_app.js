"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xterm_1 = require("xterm");
const fit_1 = require("xterm/lib/addons/fit/fit");
class Main_app {
    constructor() {
        this.prompt_str = "-->: ";
        this.term = new xterm_1.Terminal();
        this.term.open(document.getElementById('terminal_ui'));
        this.init_listener();
        this.fit_screen();
        this.prompt();
    }
    init_listener() {
        // this.term.on("data", (data: string) =>
        // {
        //     console.log(JSON.stringify({a:data}))
        //     if(!(data == ""))
        //     {
        //         // this.term.write(data)
        //     }
        // })
        // this.term.on("linefeed", () =>
        // {
        //     this.prompt()
        // })
        this.term.on("key", (key, ev) => {
            if (ev.keyCode == 13) {
                this.prompt();
                console.log(this.term.rows);
            }
            else if (ev.keyCode == 8
                && this.term.buffer.cursorX > this.prompt_str.length) {
                this.term.write("\b \b");
            }
            else {
                this.term.write(key);
            }
            console.log(ev.keyCode);
        });
        this.term.attachCustomKeyEventHandler((ev) => {
            if ([38, 40 /* 37, 39 */].indexOf(ev.keyCode) != -1) {
                console.log(`方向键被按下`);
                return false;
            }
            if (ev.keyCode == 37
                && this.term.buffer.cursorX <= this.prompt_str.length) {
                return false;
            }
            return true;
        });
        this.term.on('paste', (data) => {
            this.term.write(data);
        });
    }
    prompt() {
        this.term.write(`\r\n${this.prompt_str}`);
    }
    fit_screen() {
        fit_1.fit(this.term);
    }
}
global.Main_app = Main_app;