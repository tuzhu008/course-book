# context.router

React Router 使用 `context.router` 来方便`<Router>`和它的后代[`<Route>`](Route.md)、[`<Link>`](../../../react-router-dom/docs/api/Link.md)s, [`<Prompt>`](Prompt.md)s, 等等进行通信。

`context.router`不应该被认为是公共的API。 因为它身是一个实验性的，在未来的React中可能会发生变化, 你应该避免在你的组件中直接访问 `this.context.router` 。相反，您可以通过传递给您的[`<Route>`](Route.md)组件或包装在[`withRouter`](withRouter.md)中的组件的props来访问我们在上下文环境中存储的变量。