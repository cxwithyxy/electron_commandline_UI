"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var Handler = /** @class */ (function () {
    function Handler(_w) {
        var _this = this;
        this.win = _w;
        this.on_msg_callback = function () { };
        electron_1.ipcMain.on("cmd_stdin", function (e, msg) {
            _this.on_msg_callback(msg, _this);
        });
    }
    Handler.prototype.send = function (msg) {
        this.win.webContents.send("cmd_stdout", msg);
    };
    Handler.prototype.on_msg = function (_func) {
        this.on_msg_callback = _func;
    };
    Handler.prototype.set_title = function (title_text) {
        this.win.webContents.send("cmd_title_set", title_text);
    };
    return Handler;
}());
exports.Handler = Handler;
