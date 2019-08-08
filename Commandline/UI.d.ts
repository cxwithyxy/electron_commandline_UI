import { BrowserWindow } from "electron";
import { Handler } from "../commandline";
export declare class UI {
    UI_win?: BrowserWindow;
    UI_win_setting?: object;
    cmd?: Handler;
    log_file_handle?: number;
    static current_ui: UI;
    static set_current_ui(_ui: UI): void;
    static get_current_ui(): UI;
    /**
     * 在当前cmd界面上显示内容, 注意是当前
     *
     * @static
     * @param {(string | number)} msg
     * @memberof UI
     */
    static log(msg: string | number): void;
    constructor(win_setting?: object);
    /**
     * 启动自动保存log文件的功能
     *
     * @param {string} [log_file_path=`ui_log.txt`] log文件路径
     * @memberof UI
     */
    enable_save_log_file(log_file_path?: string): void;
    /**
     * 关闭自动保存log文件功能
     *
     * @memberof UI
     */
    disable_save_log_file(): void;
    /**
     * 写入log文件
     *
     * @param {string} log_str 要写入log文件的内容
     * @memberof UI
     */
    save_log_file(log_str: string): void;
    /**
     * 初始化cmd窗口, 注意这个是异步函数要await
     *
     * @param {{cmd_text: string, cmd_title: string}} [_option]
     * @memberof UI
     */
    init_win(_option?: {
        cmd_text: string;
        cmd_title: string;
    }): Promise<void>;
    /**
     * 在cmd界面上显示内容
     *
     * @param {*} msg 要显示的内容
     * @memberof UI
     */
    send(msg: any): void;
    /**
     * 设置回调函数, 处理用户输入后内容
     *
     * @param {(msg: any, handler?: Handler) => void} _func 一个函数, msg就是用户输入的内容
     * @memberof UI
     */
    on_msg(_func: (msg: any, handler?: Handler) => void): void;
    /**
     * 清空屏幕
     *
     * @memberof UI
     */
    cls(): void;
    /**
     * 设置窗口标题
     *
     * @param {string} title_text
     * @memberof UI
     */
    set_title(title_text: string): void;
}
