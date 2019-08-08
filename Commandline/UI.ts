import { BrowserWindow, ipcMain } from "electron";
import _ from "lodash";
import { Handler } from "../commandline";
import fs from "fs"
import { isUndefined, log } from "util";
export class UI
{
    UI_win?: BrowserWindow
    UI_win_setting?: object
    cmd?: Handler
    log_file_handle?: number

    static current_ui: UI

    static set_current_ui(_ui: UI)
    {
        this.current_ui = _ui
    }

    static get_current_ui(): UI
    {
        return this.current_ui
    }

    
    /**
     * 在当前cmd界面上显示内容, 注意是当前
     *
     * @static
     * @param {(string | number)} msg
     * @memberof UI
     */
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


    /**
     * 启动自动保存log文件的功能
     *
     * @param {string} [log_file_path=`ui_log.txt`] log文件路径
     * @memberof UI
     */
    enable_save_log_file(log_file_path: string = `ui_log.txt`)
    {
        if(isUndefined(this.log_file_handle))
        {
            this.log_file_handle = fs.openSync(log_file_path, "a")
        }
    }

    
    /**
     * 关闭自动保存log文件功能
     *
     * @memberof UI
     */
    disable_save_log_file()
    {
        if(!isUndefined(this.log_file_handle))
        {
            fs.closeSync(this.log_file_handle)
            delete this.log_file_handle
        }
    }

    /**
     * 写入log文件
     *
     * @param {string} log_str 要写入log文件的内容
     * @memberof UI
     */
    save_log_file(log_str: string)
    {
        if(!isUndefined(this.log_file_handle))
        {
            fs.writeSync(this.log_file_handle, log_str)
        }
    }

    /**
     * 初始化cmd窗口, 注意这个是异步函数要await
     *
     * @param {{cmd_text: string, cmd_title: string}} [_option]
     * @memberof UI
     */
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

    
    /**
     * 在cmd界面上显示内容
     *
     * @param {*} msg 要显示的内容
     * @memberof UI
     */
    send(msg: any)
    {
        this.save_log_file(`cmd_out: ${msg}\n`)
        ;(<Handler>this.cmd).send(msg)
    }

    
    /**
     * 设置回调函数, 处理用户输入后内容
     *
     * @param {(msg: any, handler?: Handler) => void} _func 一个函数, msg就是用户输入的内容
     * @memberof UI
     */
    on_msg(_func: (msg: any, handler?: Handler) => void)
    {

        ;(<Handler>this.cmd).on_msg((msg, handler) =>
        {
            this.save_log_file(`cmd_in: ${msg}\n`)
            _func(msg, handler)
        })
    }


    /**
     * 清空屏幕
     *
     * @memberof UI
     */
    cls()
    {
        (<Handler>this.cmd).cls()
    }


    /**
     * 设置窗口标题
     *
     * @param {string} title_text
     * @memberof UI
     */
    set_title(title_text: string)
    {
        (<Handler>this.cmd).set_title(title_text)
    }
}