import { BrowserWindow, ipcMain } from "electron";
import _ from "lodash";
import { Handler } from "../commandline";
export class UI
{
    UI_win?: BrowserWindow
    UI_win_setting?: object
    cmd?: Handler

    constructor(win_setting?:object)
    {
        let defalut_setting = {
            width: 600
            ,height: 650
        }
        if(!_.isUndefined(win_setting))
        {
            defalut_setting = _.merge(defalut_setting, win_setting)
        }
        this.UI_win_setting = defalut_setting;
    }

    async init_win(cmd_text?: string)
    {
        this.UI_win = new BrowserWindow(this.UI_win_setting)
        this.UI_win.loadFile(`${__dirname}/../UIPAGES/index.html`)
        await new Promise((succ) =>
        {
            ipcMain.once("ui_loaded", (e:any, msg: any) =>
            {
                succ()
            })
        })
        this.cmd = new Handler(this.UI_win)
        if(!_.isUndefined(cmd_text))
        {
            this.cmd.send(cmd_text)
        }
    }

    send(msg: any)
    {
        (<Handler>this.cmd).send(msg)
    }

    on_msg(_func: (msg: any, handler?: Handler) => void)
    {
        (<Handler>this.cmd).on_msg(_func)
    }
}