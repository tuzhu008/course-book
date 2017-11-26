---
components: Dialog, DialogTitle, DialogContent, DialogActions, Slide
---

# Dialogs

对话框

[Dialogs](https://material.io/guidelines/components/dialogs.html)告诉用户一个特定的任务，可能包含关键信息，需要决策，或者涉及多个任务。

对话框包含文本和UI控件。他们一直保有焦点，直到被驳回或采取必要的行动。尽量少使用对话框，因为它们是阻断的。


## 简单的对话框

简单的对话框可以提供关于一个列表项的附加细节或操作。
例如，它们可以显示头像、图标、澄清潜台词或正交操作(比如添加一个帐户)。

接触力学:
- 选择选项立即提交选项并关闭菜单
- 触碰对话框，或按下后，取消动作并关闭对话框

{{demo='pages/demos/dialogs/SimpleDialog.js'}}

## Alerts （警报）

警报是紧急中断，需要确认，告知用户有关情况的信息。

大多数警报都不需要标题。
他们在一两句话中概述了一个决定:

- 问一个问题 (比如. "删除这段对话?")
- 造一个与动作按钮相关的语句

仅在高风险情况下使用标题栏警告，例如可能失去连接。用户应该能够根据标题和按钮文本来理解这些选项。

如果需要一个标题:

- 在内容区使用一个明确的问题或声明，例如“删除USB存储器?”。
- 避免道歉、模棱两可或问题，如“警告！”或者“你确定吗?”

{{demo='pages/demos/dialogs/AlertDialog.js'}}

您也可以换出过渡，下一个示例使用`Slide`。

{{demo='pages/demos/dialogs/AlertDialogSlide.js'}}

## Confirmation dialogs （确认对话框）

确认对话框要求用户在提交选项之前显式地确认他们的选择。
例如，用户可以收听多个铃声，但只有在触摸“OK”时才会做出最后的选择。

在确认对话框中触摸“取消”或按下“取消”，取消动作，丢弃任何更改，并关闭对话框。

{{demo='pages/demos/dialogs/ConfirmationDialog.js'}}

## Full-screen dialogs （全屏对话框）

{{demo='pages/demos/dialogs/FullScreenDialog.js'}}

## Form dialogs （表单对话框）
 
表单对话框允许用户填写对话框中的表单字段。
例如，如果你的网站提示潜在的用户填写他们的电子邮件地址，他们可以填写电子邮件地址，并点击“提交”。

{{demo='pages/demos/dialogs/FormDialog.js'}}

## Responsive full-screen （响应式全屏对话框）

您可以使用`withMobileDialog`来使一个`Dialog`成为一个响应式的全屏对对话框。默认情况下,`withMobileDialog()(Dialog)`在sm[screen size](/layout/basics)及以下的全屏幕响应。[译者注：它会在sm的时候变成全屏，其余时候只是一个小对话框]

{{demo='pages/demos/dialogs/ResponsiveDialog.js'}}
