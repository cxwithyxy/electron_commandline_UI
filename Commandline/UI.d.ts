import { BrowserWindow } from "electron";
import { Handler } from "../commandline";
export declare class UI {
    UI_win?: BrowserWindow;
    UI_win_setting?: object;
    cmd?: Handler;
    static current_ui: UI;
    static set_current_ui(_ui: UI): void;
    static get_current_ui(): UI;
    static log(msg: string | number): void;
    constructor(win_setting?: object);
    init_win(_option?: {
        cmd_text: string;
        cmd_title: string;
    }): Promise<void>;
    send(msg: any): void;
    on_msg(_func: (msg: any, handler?: Handler) => void): void;
    cls(): void;
    set_title(title_text: string): void;
}
