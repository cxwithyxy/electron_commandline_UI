import { BrowserWindow, ipcMain } from "electron";
import _ from "lodash";
import { Handler } from "../commandline";
export class UI
{
    UI_win?: BrowserWindow
    UI_win_setting?: object
    cmd?: Handler

    static current_ui: UI

    static set_current_ui(_ui: UI)
    {
        this.current_ui = _ui
    }

    static get_current_ui(): UI
    {
        return this.current_ui
    }

    static log(msg: string | number)
    {
        this.get_current_ui().send(msg)
    }

    constructor(win_setting?:object)
    {
        UI.set_current_ui(this)
        
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

    async init_win(_option?: {cmd_text: string, cmd_title: string})
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
        if(!_.isUndefined(_option))
        {
            this.set_title(_option.cmd_title)
            this.cmd.send(_option.cmd_text)
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

    set_title(title_text: string)
    {
        (<Handler>this.cmd).set_title(title_text)
    }
}