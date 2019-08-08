"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var lodash_1 = __importDefault(require("lodash"));
var commandline_1 = require("../commandline");
var fs_1 = __importDefault(require("fs"));
var util_1 = require("util");
var moment_1 = __importDefault(require("moment"));
var UI = /** @class */ (function () {
    function UI(win_setting) {
        UI.set_current_ui(this);
        var defalut_setting = {
            width: 600,
            height: 650
        };
        if (!lodash_1.default.isUndefined(win_setting)) {
            defalut_setting = lodash_1.default.merge(defalut_setting, win_setting);
        }
        this.UI_win_setting = defalut_setting;
    }
    UI.set_current_ui = function (_ui) {
        this.current_ui = _ui;
    };
    UI.get_current_ui = function () {
        return this.current_ui;
    };
    /**
     * 在当前cmd界面上显示内容, 注意是当前
     *
     * @static
     * @param {(string | number)} msg
     * @memberof UI
     */
    UI.log = function (msg) {
        this.get_current_ui().send(msg);
    };
    /**
     * 启动自动保存log文件的功能
     *
     * @param {string} [log_file_path=`ui_log.txt`] log文件路径
     * @memberof UI
     */
    UI.prototype.enable_save_log_file = function (log_file_path) {
        if (log_file_path === void 0) { log_file_path = "ui_log.txt"; }
        if (util_1.isUndefined(this.log_file_handle)) {
            this.log_file_handle = fs_1.default.openSync(log_file_path, "a");
        }
    };
    /**
     * 关闭自动保存log文件功能
     *
     * @memberof UI
     */
    UI.prototype.disable_save_log_file = function () {
        if (!util_1.isUndefined(this.log_file_handle)) {
            fs_1.default.closeSync(this.log_file_handle);
            delete this.log_file_handle;
        }
    };
    /**
     * 写入log文件
     *
     * @param {string} log_str 要写入log文件的内容
     * @memberof UI
     */
    UI.prototype.save_log_file = function (log_str) {
        if (!util_1.isUndefined(this.log_file_handle)) {
            fs_1.default.writeSync(this.log_file_handle, log_str);
        }
    };
    /**
     * 初始化cmd窗口, 注意这个是异步函数要await
     *
     * @param {{cmd_text: string, cmd_title: string}} [_option]
     * @memberof UI
     */
    UI.prototype.init_win = function (_option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.UI_win = new electron_1.BrowserWindow(this.UI_win_setting);
                        this.UI_win.loadFile(__dirname + "/../UIPAGES/index.html");
                        return [4 /*yield*/, new Promise(function (succ) {
                                electron_1.ipcMain.once("ui_loaded", function (e, msg) {
                                    succ();
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.cmd = new commandline_1.Handler(this.UI_win);
                        if (!lodash_1.default.isUndefined(_option)) {
                            this.set_title(_option.cmd_title);
                            this.cmd.send(_option.cmd_text);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 在cmd界面上显示内容
     *
     * @param {*} msg 要显示的内容
     * @memberof UI
     */
    UI.prototype.send = function (msg) {
        var time_str = moment_1.default().format('YYYY-MM-DD_HH:mm:ss:SSS');
        this.save_log_file(time_str + " cmd_out: " + msg + "\n");
        this.cmd.send(msg);
    };
    /**
     * 设置回调函数, 处理用户输入后内容
     *
     * @param {(msg: any, handler?: Handler) => void} _func 一个函数, msg就是用户输入的内容
     * @memberof UI
     */
    UI.prototype.on_msg = function (_func) {
        var _this = this;
        ;
        this.cmd.on_msg(function (msg, handler) {
            var time_str = moment_1.default().format('YYYY-MM-DD_HH:mm:ss:SSS');
            _this.save_log_file(time_str + " cmd_in: " + msg + "\n");
            _func(msg, handler);
        });
    };
    /**
     * 清空屏幕
     *
     * @memberof UI
     */
    UI.prototype.cls = function () {
        this.cmd.cls();
    };
    /**
     * 设置窗口标题
     *
     * @param {string} title_text
     * @memberof UI
     */
    UI.prototype.set_title = function (title_text) {
        this.cmd.set_title(title_text);
    };
    return UI;
}());
exports.UI = UI;
