import { Terminal } from 'xterm';
import {fit} from "xterm/lib/addons/fit/fit";

class Main_app
{
    term: Terminal
    constructor()
    {
        this.term = new Terminal();
        this.term.open(<HTMLDivElement>document.getElementById('terminal_ui'))
        this.init_listener()
        this.fit_screen()
    }

    init_listener()
    {
        this.term.on("data", (data: string) =>
        {
            this.term.write(data)
        })
        this.term.on("key", (key:string, ev: KeyboardEvent) =>
        {
            if(ev.keyCode == 13)
            {
                this.prompt()
            }
        })
        this.term.on('paste', (data) =>
        {
            this.term.write(data);
        });
    }

    prompt()
    {
        this.term.write("\r\n-->: ")
    }
    
    fit_screen()
    {
        fit(this.term)
    }
}
(<any>global).Main_app = Main_app