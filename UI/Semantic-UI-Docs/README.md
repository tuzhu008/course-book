# Semantic 文档

这个文件夹包含用于为[semantic-ui.com](http://www.semantic-ui.com)生成静态网站的模板

## 怎样使用


安装 [DocPad](http://github.com/docpad/docpad)，这个静态站点生成器用于为站点创建HTML。
```bash
npm install -g docpad
docpad install eco;
docpad update; 
docpad upgrade;
```

### 为文档生成SUI

在运行服务器之前，您需要为文档构建您的UI文件。

首先，确保你的文档在正确的位置。
例如，如果SemanticUI（这个就是SemanticUI库的根文件夹）文件夹在`vendor/`下， 像这样...

    vendor/
        SemanticUI/
        ...
        ...

然后你需要把`docs/`（这个docs文件夹是[这个](https://github.com/Semantic-Org/Semantic-UI-Docs)，下载到本地改名就可以了）放在`vendor`下，像这样：

    vendor/
        docs/
        SemanticUI/
        ...
        ...

如果你还没有在你的`./SemanticUI`文件夹中运行`npm install`文件夹，现在就做。接下来，运行命令来构建文档:

```bash
# "ui"可以是任何包含SUI构建文件的文件夹
cd ./ui
gulp build-docs
```

默认情况下，文档构建到`build-docs/`(从相邻的文件夹`docs/`)。
**命令行 _必须_ 从您的UI文件夹中运行！** (这里我们使用`./Semantic-UI`) 

要配置不同的`docs`位置, 响应地修改 [ `Semantic-UI/tasks/config/docs.js`](https://github.com/Semantic-Org/Semantic-UI/blob/master/tasks/config/docs.js)


### 运行服务器

开始docs服务器 (并生成文档):

```bash
# 从包含已编译文档的docs文件夹中运行
# windows用户可以导航到 http://localhost:9778
docpad run
```


从您的UI文件夹中查看更改，并将其服务于文档实例:

```
gulp serve-docs
```


## 帮助纠正拼写错误和错误

如果你发现了任何拼写错误或错误，提交一个补丁很容易！
- 在github上[打开 `documents/` 文件夹](https://github.com/Semantic-Org/Semantic-UI-Docs/tree/master/server/documents)
- Click the “Edit” button on the appropriate page单击适当页面上的“Edit”按钮
- 单击提交一个pull请求

