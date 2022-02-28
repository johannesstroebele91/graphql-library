# 1. Understanding via Developer Tools

Open developer tools and go to

- Network
- WS

Mostly there are two connections:

# 2.1. sockjs-node:

sockjs-node is a connection to port 3000

- on localhost:3000 runs web development server
- the dev server uses
- WebSockets to automatically reload web page
- if there were changes

# 3.2. graphl:

graphl is a connection to port 9000

- on localhost:9000 runs the backend server
- the subscrition works as follows:

A subscription starts

- with an HTTP get request
- and the server responds with an 101 swiching protocols
- so although WebSockets are a different protocol than HTTP
- the browser initiates the ws connectin with an HTTP request
- via the connection upgrade websocket header

If a connection is established

- all the messages can be seen
- in the messages tab

More details can be seen

- in the section `Inspecting the WebSocket Protocol`
- from the GraphQL by example Udemy course
