import { BrowserWindow, ipcMain } from "electron";

export class Handler
{
    win: BrowserWindow
    on_msg_callback: Function

    constructor(_w: BrowserWindow)
    {
        this.win = _w
        this.on_msg_callback = () => {}
        ipcMain.on(`cmd_stdin`, (e: any, msg: any) =>
        {
            this.on_msg_callback(msg, this)
        })
    }

    send(msg: any)
    {
        this.win.webContents.send(`cmd_stdout`, msg)
    }

    cls()
    {
        this.win.webContents.send(`cmd_cls`)
    }

    on_msg(_func: (msg: any, handler?: Handler) => void)
    {
        this.on_msg_callback = _func
    }

    set_title(title_text: string)
    {
        this.win.webContents.send(`cmd_title_set`, title_text)
    }


}