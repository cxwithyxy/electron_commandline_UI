"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class Handler {
    constructor(_w) {
        this.win = _w;
        this.on_msg_callback = () => { };
        electron_1.ipcMain.on(`cmd_stdin`, (e, msg) => {
            this.on_msg_callback(msg, this);
        });
    }
    send(msg) {
        this.win.webContents.send(`cmd_stdout`, msg);
    }
    cls() {
        this.win.webContents.send(`cmd_cls`);
    }
    on_msg(_func) {
        this.on_msg_callback = _func;
    }
    set_title(title_text) {
        this.win.webContents.send(`cmd_title_set`, title_text);
    }
}
exports.Handler = Handler;
