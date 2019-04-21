import { BrowserWindow } from "electron";
import _ from "lodash";
export class UI
{
    UI_win?: BrowserWindow
    UI_win_setting?: object

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
}