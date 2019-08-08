import { BrowserWindow } from "electron";
export declare class Handler {
    win: BrowserWindow;
    on_msg_callback: Function;
    constructor(_w: BrowserWindow);
    send(msg: any): void;
    cls(): void;
    on_msg(_func: (msg: any, handler?: Handler) => void): void;
    set_title(title_text: string): void;
}
