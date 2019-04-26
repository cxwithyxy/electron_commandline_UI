import { UI } from "../Commandline";
import { app } from "electron";

app.on("ready", () =>
{
    new UI().init_win()
})