## **`<BrowserRouter>`**
A `<Router>` that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

```js
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```
### **basename: string**
The base URL for all locations. If your app is served from a sub-directory on your server, you’ll want to set this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.
```js
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="/calendar/today">
```
### **getUserConfirmation: func**
A function to use to confirm navigation. Defaults to using window.confirm.
```js
// this is the default behavior
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```
### **forceRefresh: bool**
If true the router will use full page refreshes on page navigation. You probably only want this in browsers that don’t support the HTML5 history API.

```js
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
```
### **keyLength: number**
The length of location.key. Defaults to 6.

```js
<BrowserRouter keyLength={12}/>
```

### **children: node**
A single child element to render.

## **`<HashRouter>`**
A `<Router>` that uses the hash portion of the URL (i.e. window.location.hash) to keep your UI in sync with the URL.

**IMPORTANT NOTE**: Hash history does not support location.key or location.state. In previous versions we attempted to shim the behavior but there were edge-cases we couldn’t solve. Any code or plugin that needs this behavior won’t work. As this technique is only intended to support legacy browsers, we encourage you to configure your server to work with `<BrowserHistory>` instead.

```js
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
```

### **basename: string**
The base URL for all locations. A properly formatted basename should have a leading slash, but no trailing slash.
```js
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
```

### **getUserConfirmation: func**
A function to use to confirm navigation. Defaults to using window.confirm.

```js
// this is the default behavior
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<HashRouter getUserConfirmation={getConfirmation}/>
```

### **hashType: string**

The type of encoding to use for window.location.hash. Available values are:

* "slash" - Creates hashes like #/ and #/sunshine/lollipops
* "noslash" - Creates hashes like # and #sunshine/lollipops
* "hashbang" - Creates “ajax crawlable” (deprecated by Google) hashes like #!/ and #!/sunshine/lollipops
Defaults to "slash".

### **children: node**
A single child element to render.

## **`<Link>`**
Provides declarative, accessible navigation around your application.

```js
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```

### **to: string**
The pathname or location to link to.

```js
<Link to="/courses"/>
```

### **to: object**
The location to link to.

```js
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```

### **replace: bool**
When true, clicking the link will replace the current entry in the history stack instead of adding a new one.

```js
<Link to="/courses" replace />
```

## **`<NavLink>`**


A special version of the <Link> that will add styling attributes to the rendered element when it matches the current URL.

```js
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```
### **activeClassName: string**
The class to give the element when it is active. The default given class is active. This will be joined with the className prop.

```js
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```
### **activeStyle: object**
The styles to apply to the element when it is active.

```js
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```

### **exact: bool**
When true, the active class/style will only be applied if the location is matched exactly.

```js
<NavLink
  exact
  to="/profile"
>Profile</NavLink>
```
## **strict: bool**
When true, the trailing slash on a location’s pathname will be taken into consideration when determining if the location matches the current URL. See the <Route strict> documentation for more information.

```js
<NavLink
  strict
  to="/events/"
>Events</NavLink>
```
### **isActive: func**
A function to add extra logic for determining whether the link is active. This should be used if you want to do more than verify that the link’s pathname matches the current URL’s pathname.

```js
// only consider an event active if its event id is an odd number
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>
```
## **location: object**
The isActive compares the current history location (usually the current browser URL). To compare to a different location, a location can be passed.

## **`<Prompt>`**
Re-exported from core Prompt

## **`<MemoryRouter>`**
A <Router> that keeps the history of your “URL” in memory (does not read or write to the address bar). Useful in tests and non-browser environments like React Native.

```js
import { MemoryRouter } from 'react-router'

<MemoryRouter>
  <App/>
</MemoryRouter>
```
### **initialEntries: array**
An array of locations in the history stack. These may be full-blown location objects with { pathname, search, hash, state } or simple string URLs.

```js
<MemoryRouter
  initialEntries={[ '/one', '/two', { pathname: '/three' } ]}
  initialIndex={1}
>
  <App/>
</MemoryRouter>
```
### **initialIndex: number**
The initial location’s index in the array of initialEntries.

getUserConfirmation: func
A function to use to confirm navigation. You must use this option when using <MemoryRouter> directly with a <Prompt>.

## **keyLength: number**
The length of location.key. Defaults to 6.
```js
<MemoryRouter keyLength={12}/>
```
## **children: node**
A single child element to render.

## **`<Redirect>`**
Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.

```js
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```
### **to: string**
The URL to redirect to.
```js
<Redirect to="/somewhere/else"/>
```
### **to: object**
A location to redirect to.

```html
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```

### **push: bool**
When true, redirecting will push a new entry onto the history instead of replacing the current one.
```html
<Redirect push to="/somewhere/else"/>
```
### **from: string**
A pathname to redirect from. This can only be used to match a location when rendering a <Redirect> inside of a <Switch>. See <Switch children> for more details.
```html
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>
```
**`<Route>`**
The Route component is perhaps the most important component in React Router to understand and learn to use well. Its most basic responsibility is to render some UI when a location matches the route’s path.

Consider the following code:
```js
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```
If the location of the app is / then the UI hierarchy will be something like:
```html
<div>
  <Home/>
  <!-- react-empty: 2 -->
</div>
```
And if the location of the app is /news then the UI hierarchy will be:

```html
<div>
  <!-- react-empty: 1 -->
  <NewsFeed/>
</div>
```
The “react-empty” comments are just implementation details of React’s null rendering. But for our purposes, it is instructive. A Route is always technically “rendered” even though its rendering null. As soon as the app location matches the route’s path, your component will be rendered.

### **Route render methods**
There are 3 ways to render something with a <Route>:

* `<Route component>`
* `<Route render>`
* `<Route children>`

Each is useful in different circumstances. You should use only one of these props on a given <Route>. See their explanations below to understand why you have 3 options. Most of the time you’ll use component.

### **Route props**
All three render methods will be passed the same three route props

* match
* location
* history


### **component**
A React component to render only when the location matches. It will be rendered with route props.

```js
<Route path="/user/:username" component={User}/>

const User = ({ match }) => {
  return <h1>Hello {match.params.username}!</h1>
}
```
When you use component (instead of render or children, below) the router uses React.createElement to create a new React element from the given component. That means if you provide an inline function to the component attribute, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component. When using an inline function for inline rendering, use the render or the children prop (below).

### **render: func**
This allows for convenient inline rendering and wrapping without the undesired remounting explained above.

Instead of having a new React element created for you using the component prop, you can pass in a function to be called when the location matches. The render prop receives all the same route props as the component render prop.

```js
// convenient inline rendering
<Route path="/home" render={() => <div>Home</div>}/>

// wrapping/composing
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```
Warning: <Route component> takes precendence over <Route render> so don’t use both in the same <Route>.

## **children: func**
Sometimes you need to render whether the path matches the location or not. In these cases, you can use the function children prop. It works exactly like render except that it gets called whether there is a match or not.

The children render prop receives all the same route props as the component and render methods, except when a route fails to match the URL, then match is null. This allows you to dynamically adjust your UI based on whether or not the route matches. Here we’re adding an active class if the route matches
```js+html
<ul>
  <ListItemLink to="/somewhere"/>
  <ListItemLink to="/somewhere-else"/>
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
```
This could also be useful for animations:
```js
<Route children={({ match, ...rest }) => (
  {/* Animate will always render, so you can use lifecycles
      to animate its child in and out */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```
Warning: Both <Route component> and <Route render> take precendence over <Route children> so don’t use more than one in the same <Route>.

### **path: string**
Any valid URL path that path-to-regexp understands.

```js
<Route path="/users/:id" component={User}/>
```
Routes without a path always match.

### **exact: bool**
When true, will only match if the path matches the location.pathname exactly.

```js
<Route exact path="/one" component={About}/>
```
| path      |    location.pathname | exact  | matches? |
| :--------: | :--------:| :--: | :--:|
|/oner | /one/two |  true   |no|
|/oner | /one/two |  false   |yes|

### **strict: bool**
When true, a path that has a trailing slash will only match a location.pathname with a trailing slash. This has no effect when there are additional URL segments in the location.pathname.

```js
<Route strict path="/one/" component={About}/>
```

| path      |    location.pathname | matches?   | 
| :--------: | :--------:| :--: |
|/one/ | /one |  no   |
|/one/| /one/ |  yes   |
|/one/| /one/two |  yes   |

Warning: strict can be used to enforce that a location.pathname has no trailing slash, but in order to do this both strict and exact must be true.
```js
<Route exact strict path="/one" component={About}/>
```
path	location.pathname	matches?
/one	/one	yes
/one	/one/	no
/one	/one/two	no

| path      |    location.pathname | matches?   | 
| :--------: | :--------:| :--: |
|/one | /one |  yes   |
|/one | /one/ |  no   |
|/one | /one/two |  no   |

### **location: object**
A <Route> element tries to match its path to the current history location (usually the current browser URL). However, a location with a different pathname can also be passed for matching.

This is useful in cases when you need to match a <Route> to a location other than the current history location, as shown in the Animated Transitions example.

If a <Route> element is wrapped in a <Switch> and matches the location passed to the <Switch> (or the current history location), then the location prop passed to <Route> will be overridden by the one used by the <Switch> (given here).

## **`<Router>`**
The common low-level interface for all router components. Typically apps will use one of the high-level routers instead:

* `<BrowserRouter`>
* `<HashRouter>`
* `<MemoryRouter>`
* `<NativeRouter>`
* `<StaticRouter>`

The most common use-case for using the low-level <Router> is to synchronize a custom history with a state management lib like Redux or Mobx. Note that this is not required to use state management libs alongside React Router, it’s only for deep integration.

```js
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```
### **history: object**
A history object to use for navigation.

```js
import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()
<Router history={customHistory}/>
```
### **children: node**
A single child element to render.

```html
<Router>
  <App/>
</Router>
```

## **`<StaticRouter>`**
A <Router> that never changes location.

This can be useful in server-side rendering scenarios when the user isn’t actually clicking around, so the location never actually changes. Hence, the name: static. It’s also useful in simple tests when you just need to plug in a location and make assertions on the render output.

Here’s an example node server that sends a 302 status code for <Redirect>s and regular HTML for other requests:
```js
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

createServer((req, res) => {

  // This context object contains the results of the render
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(html)
    res.end()
  }
}).listen(3000)
```
### **basename: string**
The base URL for all locations. A properly formatted basename should have a leading slash, but no trailing slash.

```js
<StaticRouter basename="/calendar">
  <Link to="/today"/> // renders <a href="/calendar/today">
</StaticRouter>
```
### **location: string**
The URL the server received, probably req.url on a node server.

```js
<StaticRouter location={req.url}>
  <App/>
</StaticRouter>
```
### **location: object**
A location object shaped like { pathname, search, hash, state }

```js
<StaticRouter location={{ pathname: '/bubblegum' }}>
  <App/>
</StaticRouter>
```
### **context: object**
A plain JavaScript object. During the render, components can add properties to the object to store information about the render.
```js
const context = {}
<StaticRouter context={context}>
  <App />
</StaticRouter>
```
When a <Route> matches, it will pass the context object to the component it renders as the staticContext prop. Check out the Server Rendering guide for more information on how to do this yourself.

After the render, these properties can be used to to configure the server’s response.
```js
if(context.status === '404') {
  // ...
}
```
### **children: node**
A single child element to render.

## **`<Switch>`**
Renders the first child <Route> or <Redirect> that matches the location.

How is this different than just using a bunch of <Route>s?

<Switch> is unique in that it renders a route exclusively. In contrast, every <Route> that matches the location renders inclusively. Consider this code:
```js
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```
If the URL is /about, then <About>, <User>, and <NoMatch> will all render because they all match the path. This is by design, allowing us to compose <Route>s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc.

Occasionally, however, we want to pick only one <Route> to render. If we’re at /about we don’t want to also match /:user (or show our “404” page). Here’s how to do it with Switch:

```js
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```
Now, if we’re at /about, <Switch> will start looking for a matching <Route>. <Route path="/about"/> will match and <Switch> will stop looking for matches and render <About>. Similarly, if we’re at /michael then <User> will render.

This is also useful for animated transitions since the matched <Route> is rendered in the same position as the previous one.
```
<Fade>
  <Switch>
    {/* there will only ever be one child here */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* there will always be two children here,
      one might render null though, making transitions
      a bit more cumbersome to work out */}
</Fade>
```
### **Switch props**
location: object
A location object to be used for matching children elements instead of the current history location (usually the current browser URL).

children: node
All children of a <Switch> should be <Route> or <Redirect> elements. Only the first child to match the current location will be rendered.

<Route> elements are matched using their path prop and <Redirect> elements are matched using their from prop. A <Route> with no path prop or a <Redirect> with no from prop will always match the current location.

When you include a <Redirect> in a <Switch>, it can use any of the <Route>'s location matching props: path, exact, and strict. from is just an alias for the path prop.

If a location prop is given to the <Switch>, it will override the location prop on the matching child element.

```
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/users" component={Users}/>
  <Redirect from="/accounts" to="/users"/>

  <Route component={NoMatch}/>
</Switch>
```
## **`history`**
The term “history” and "history object" in this documentation refers to the history package, which is one of only 2 major dependencies of React Router (besides React itself), and which provides several different implementations for managing session history in JavaScript in various environments.

The following terms are also used:

* “browser history” - A DOM-specific implementation, useful in web browsers that support the HTML5 history API
* “hash history” - A DOM-specific implementation for legacy web browsers
* “memory history” - An in-memory history implementation, useful in testing and non-DOM environments like React Native
history objects typically have the following properties and methods:

* length - (number) The number of entries in the history stack
* action - (string) The current action (PUSH, REPLACE, or POP)
* location - (object) The current location. May have the following properties:
    - pathname - (string) The path of the URL
    - search - (string) The URL query string
    - hash - (string) The URL hash fragment
    - state - (string) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
* push(path, [state]) - (function) Pushes a new entry onto the history stack
* replace(path, [state]) - (function) Replaces the current entry on the history stack
* go(n) - (function) Moves the pointer in the history stack by n entries
* goBack() - (function) Equivalent to go(-1)
* goForward() - (function) Equivalent to go(1)
* block(prompt) - (function) Prevents navigation (see the history docs)

### **history is mutable**

The history object is mutable. Therefore it is recommended to access the location from the render props of <Route>, not from history.location. This ensures your assumptions about React are correct in lifecycle hooks. For example:

```js
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // will be true
    const locationChanged = nextProps.location !== this.props.location

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```
Additional properties may also be present depending on the implementation you’re using. Please refer to the history documentation for more details.

## **`location`**
Locations represent where the app is now, where you want it to go, or even where it was. It looks like this:

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```
The router will provide you with a location object in a few places:

* Route component as this.props.location
* Route render as ({ location }) => ()
* Route children as ({ location }) => ()
* withRouter as this.props.location


It is also found on history.location but you shouldn’t use that because its mutable. You can read more about that in the history doc.

A location object is never mutated so you can use it in the lifecycle hooks to determine when navigation happens, this is really useful for data fetching and animation.

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // navigated!
  }
}
```
You can provide locations instead of strings to the various places that navigate:

* Web Link to
* Native Link to
* Redirect to
* history.push
* history.replace


Normally you just use a string, but if you need to add some “location state” that will be available whenever the app returns to that specific location, you can use a location object instead. This is useful if you want to branch UI based on navigation history instead of just paths (like modals).

```js
// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere'
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```
Finally, you can pass a location to the following components:

* Route
* Switch


This will prevent them from using the actual location in the router’s state. This is useful for animation and pending navigation, or any time you want to trick a component into rendering at a different location than the real one.

## **`match`**
A match object contains information about how a <Route path> matched the URL. match objects contain the following properties:

* params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
* isExact - (boolean) true if the entire URL was matched (no trailing characters)
* path - (string) The path pattern used to match. Useful for building nested <Route>s
* url - (string) The matched portion of the URL. Useful for building nested <Link>s


You’ll have access match objects in various places:

* Route component as this.props.match
* Route render as ({ match }) => ()
* Route children as ({ match }) => ()
* withRouter as this.props.match
* matchPath as the return value


If a Route does not have a path, and therefore always matches, you’ll get the closest parent match. Same goes for withRouter.

## **`matchPath`**
This lets you use the same matching code that <Route> uses except outside of the normal render cycle, like gathering up data dependencies before rendering on the server.

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false
})
```
### **pathname**
The first argument is the pathname you want to match. If you’re using this on the server with Node.js, it would be req.url.

### **props**
The second argument are the props to match against, they are identical to the matching props Route accepts:
```js
{
  path, // like /users/:id
  strict, // optional, defaults to false
  exact // optional, defaults to false
}
```
### **withRouter**
You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order component. withRouter will re-render its component every time the route changes with the same props as <Route> render props: { match, location, history }.
```js
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <div>You are now at {location.pathname}</div>
    )
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
```
Important Note
If you are using withRouter to prevent updates from being blocked by shouldComponentUpdate, it is important that withRouter wraps the component that implements shouldComponentUpdate. For example, when using Redux:
```js
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))

// This does not
connect(...)(withRouter(MyComponent))
```

See this guide for more information.

Static Methods and Properties

All non-react specific static methods and properties of the wrapped component are automatically copied to the "connected" component.

### **Component.WrappedComponent**
The wrapped component is exposed as the static property WrappedComponent on the returned component, which can be used for testing the component in isolation, among other things.
```js
// MyComponent.js
export default withRouter(MyComponent)

// MyComponent.test.js
import MyComponent from './MyComponent'
render(<MyComponent.WrappedComponent location={{...}} ... />)
```
### **wrappedComponentRef: func**
A function that will be passed as the ref prop to the wrapped component.
```js
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething()  
  }

  render() {
    return (
      <MyComponent wrappedComponentRef={c => this.component = c}/>
    )
  }
}
```