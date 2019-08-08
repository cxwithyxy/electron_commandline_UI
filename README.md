# electron_commandline_UI

## 使用

#### 基础例子

```typescript
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
```

#### init_win

async函数，初始化界面，所有功能需要在初始化界面后才有效，因此所有函数调用都需要在init_win之后

#### set_title

设置界面标题

#### on_msg

通过一个回调函数来获得在界面中用户输入的内容

#### enable_save_log_file

启动自动保存log文件的功能，log文件会保存界面中用户输入的内容以及程序向用户输入的内容

#### disable_save_log_file

关闭自动保存log文件的功能