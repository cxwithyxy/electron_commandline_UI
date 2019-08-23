import { Terminal } from 'xterm';
import {fit} from "xterm/lib/addons/fit/fit";
import { ipcRenderer, IpcRendererEvent } from "electron";

class Main_app
{
    term: Terminal
    prompt_str: string
    constructor()
    {
        this.prompt_str = "-->: "
        this.term = new Terminal();
        this.term.open(<HTMLDivElement>document.getElementById('terminal_ui'))
        this.init_listener()
        this.fit_screen()
        this.prompt()
    }

    init_listener()
    {
        // this.term.on("data", (data: string) =>
        // {
        //     console.log(JSON.stringify({a:data}))
        //     if(!(data == ""))
        //     {
        //         // this.term.write(data)
        //     }
        // })
        // this.term.on("linefeed", () =>
        // {
        //     this.prompt()
        // })
        ipcRenderer.on("terminal_stdout", (ev: IpcRendererEvent, msg: Uint8Array) =>
        {
            console.log(msg);
            
            this.term.writeUtf8(msg)
        })
        this.term.on("key", (key:string, ev: KeyboardEvent) =>
        {
            this.term.write(key)
            ipcRenderer.send("terminal_stdin", key)
            if(ev.keyCode == 13)
            {
                ipcRenderer.send("terminal_stdin", "\n")
            }
            console.log(key);
        })
        // this.term.on("key", (key:string, ev: KeyboardEvent) =>
        // {
        //     if(ev.keyCode == 13)
        //     {
        //         this.prompt()
        //         console.log(this.term.rows)
        //     }
        //     else if
        //     (
        //         ev.keyCode == 8
        //         && this.term.buffer.cursorX > this.prompt_str.length
        //     ){
        //         this.term.write("\b \b")
        //     }
        //     else
        //     {
        //         this.term.write(key)
        //     }
            
        //     console.log(ev.keyCode)
        
        // })
        // this.term.attachCustomKeyEventHandler((ev: KeyboardEvent) =>
        // {
        //     if([38, 40 /* 37, 39 */].indexOf(ev.keyCode) != -1)
        //     {
        //         console.log(`方向键被按下`)
        //         return false
        //     }
        //     if(
        //         ev.keyCode == 37 
        //         && this.term.buffer.cursorX <= this.prompt_str.length
        //     ){
        //         return false
        //     }
        //     return true
        // })
        // this.term.on('paste', (data) =>
        // {
        //     this.term.write(data);
        // });
    }

    prompt()
    {
        this.term.write(`\r\n${this.prompt_str}`)
    }
    
    fit_screen()
    {
        fit(this.term)
    }
}
(<any>global).Main_app = Main_app