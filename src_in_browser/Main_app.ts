import { Terminal } from 'xterm';

class Main_app
{
    constructor()
    {
        var term = new Terminal();
        term.open(<HTMLDivElement>document.getElementById('terminal'));
    }
}
(<any>global).Main_app = Main_app