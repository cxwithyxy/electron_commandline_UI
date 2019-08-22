"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const moment_1 = __importDefault(require("moment"));
const child_process = __importStar(require("child_process"));
class UI {
    static set_current_ui(_ui) {
        this.current_ui = _ui;
    }
    static get_current_ui() {
        return this.current_ui;
    }
    /**
     * 在当前cmd界面上显示内容, 注意是当前
     *
     * @static
     * @param {(string | number)} msg
     * @memberof UI
     */
    static log(msg) {
        this.get_current_ui().send(msg);
    }
    constructor(win_setting) {
        // UI.set_current_ui(this)
        // let defalut_setting = {
        //     width: 600
        //     ,height: 600 / 4 * 3
        //     ,webPreferences: {
        //         preload: `${__dirname}/../src_in_browser/Main_app.js`
        //     }
        // }
        // if(!_.isUndefined(win_setting))
        // {
        //     defalut_setting = _.merge(defalut_setting, win_setting)
        // }
        // this.UI_win_setting = defalut_setting;
    }
    /**
     * 启动自动保存log文件的功能
     *
     * @param {string} [log_file_path=`ui_log.txt`] log文件路径
     * @memberof UI
     */
    enable_save_log_file(log_file_path = `ui_log.txt`) {
        if (util_1.isUndefined(this.log_file_handle)) {
            this.log_file_handle = fs_1.default.openSync(log_file_path, "a");
        }
    }
    /**
     * 关闭自动保存log文件功能
     *
     * @memberof UI
     */
    disable_save_log_file() {
        if (!util_1.isUndefined(this.log_file_handle)) {
            fs_1.default.closeSync(this.log_file_handle);
            delete this.log_file_handle;
        }
    }
    /**
     * 写入log文件
     *
     * @param {string} log_str 要写入log文件的内容
     * @memberof UI
     */
    save_log_file(log_str) {
        if (!util_1.isUndefined(this.log_file_handle)) {
            fs_1.default.writeSync(this.log_file_handle, log_str);
        }
    }
    /**
     * 初始化cmd窗口, 注意这个是异步函数要await
     *
     * @param {{cmd_text: string, cmd_title: string}} [_option]
     * @memberof UI
     */
    async init_win(_option) {
        this.enable_save_log_file();
        let cmd_p = child_process.spawn("conhost");
        cmd_p.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
            this.save_log_file(data);
        });
        cmd_p.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        setInterval(() => {
            if (!cmd_p.killed) {
                cmd_p.stdin.write("echo 1");
                console.log("adasdasdasd");
            }
        }, 1e3);
        await new Promise((succ) => {
        });
        // this.UI_win = new BrowserWindow(this.UI_win_setting)
        // await this.UI_win.loadURL(`${__dirname}/../UIPAGES/index.html`)
        // this.UI_win.webContents.executeJavaScript(`main_app = new Main_app()`)
        // this.UI_win.on("resize", () =>
        // {
        //     this.UI_win.webContents.executeJavaScript(`main_app.fit_screen()`)
        // })
        // await new Promise((succ) =>
        // {
        //     ipcMain.once("ui_loaded", (e:any, msg: any) =>
        //     {
        //         succ()
        //     })
        // })
        // this.cmd = new Handler(this.UI_win)
        // if(!_.isUndefined(_option))
        // {
        //     this.set_title(_option.cmd_title)
        //     this.cmd.send(_option.cmd_text)
        // }
    }
    /**
     * 在cmd界面上显示内容
     *
     * @param {*} msg 要显示的内容
     * @memberof UI
     */
    send(msg) {
        let time_str = moment_1.default().format('YYYY-MM-DD_HH:mm:ss:SSS');
        this.save_log_file(`${time_str} cmd_out: ${msg}\n`);
        this.cmd.send(msg);
    }
    /**
     * 设置回调函数, 处理用户输入后内容
     *
     * @param {(msg: any, handler?: Handler) => void} _func 一个函数, msg就是用户输入的内容
     * @memberof UI
     */
    on_msg(_func) {
        ;
        this.cmd.on_msg((msg, handler) => {
            let time_str = moment_1.default().format('YYYY-MM-DD_HH:mm:ss:SSS');
            this.save_log_file(`${time_str} cmd_in: ${msg}\n`);
            _func(msg, handler);
        });
    }
    /**
     * 清空屏幕
     *
     * @memberof UI
     */
    cls() {
        this.cmd.cls();
    }
    /**
     * 设置窗口标题
     *
     * @param {string} title_text
     * @memberof UI
     */
    set_title(title_text) {
        this.cmd.set_title(title_text);
    }
}
exports.UI = UI;
