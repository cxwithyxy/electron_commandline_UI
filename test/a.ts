import { UI } from "../Commandline";
import { app } from "electron";

app.on("ready", async () =>
{
    let my_ui = new UI()
    await my_ui.init_win()
    my_ui.set_title("test")
    my_ui.on_msg( (msg:string ) => 
    {
        my_ui.send(`resv: ${msg}`)
    })
    my_ui.enable_save_log_file()
    my_ui.disable_save_log_file()
})