import { Terminal } from 'xterm';
import {fit} from "xterm/lib/addons/fit/fit";

class Main_app
{
    term: Terminal
    constructor()
    {
        this.term = new Terminal();
        this.term.open(<HTMLDivElement>document.getElementById('terminal_ui'))
        this.fit_screen()
    }
    
    fit_screen()
    {
        fit(this.term)
    }
}
(<any>global).Main_app = Main_app