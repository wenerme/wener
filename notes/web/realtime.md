# Pushing

* [Push technology](https://en.wikipedia.org/wiki/Push_technology) wikipedia
* [REAL-TIME WEB TECHNOLOGIES GUIDE](http://www.leggetter.co.uk/real-time-web-technologies-guide/)
* [websocketd](http://websocketd.com) WebSockets the Unix way

> Note that HTTP/2 does not support protocol upgrade, so you will have to disable HTTP/2 in order to use this directive successfully on secure connections.

## Vs
https://jersey.java.net/documentation/latest/sse.html

Polling
With polling a client repeatedly sends new requests to a server. If the server has no new data, then it send appropriate indication and closes the connection. The client then waits a bit and sends another request after some time (after one second, for example).

Long-polling
With long-polling a client sends a request to a server. If the server has no new data, it just holds the connection open and waits until data is available. Once the server has data (message) for the client, it uses the connection and sends it back to the client. Then the connection is closed.

Server-Sent events
SSE is similar to the long-polling mechanism, except it does not send only one message per connection. The client sends a request and server holds a connection until a new message is ready, then it sends the message back to the client while still keeping the connection open so that it can be used for another message once it becomes available. Once a new message is ready, it is sent back to the client on the same initial connection. Client processes the messages sent back from the server individually without closing the connection after processing each message. So, SSE typically reuses one connection for more messages (called events). SSE also defines a dedicated media type that describes a simple format of individual events sent from the server to the client. SSE also offers standard javascript client API implemented most modern browsers. For more information about SSE, see the SSE API specification.

WebSocket
WebSocket technology is different from previous technologies as it provides a real full duplex connection. The initiator is again a client which sends a request to a server with a special HTTP header that informs the server that the HTTP connection may be "upgraded" to a full duplex TCP/IP WebSocket connection. If server supports WebSocket, it may choose to do so. Once a WebSocket connection is established, it can be used for bi-directional communication between the client and the server. Both client and server can then send data to the other party at will whenever it is needed. The communication on the new WebSocket connection is no longer based on HTTP protocol and can be used for example for for online gaming or any other applications that require fast exchange of small chunks of data in flowing in both directions.


## Server-Sent Events demo

```java
public class HelloServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/event-stream");
		response.setCharacterEncoding("UTF-8");

		PrintWriter writer = response.getWriter();

		for (int i = 0; i < 20; i++) {

			writer.write("data: "+ System.currentTimeMillis() +"\n\n");
			writer.flush();

			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		writer.close();
	}

}
```

```html
<!DOCTYPE HTML>
<html>
<head>
	<title>Server-Sent Events Servlet example</title>
	<style>
		body {
			font-family: sans-serif;
		}
	</style>
</head>
<body>
	Time: <span id="foo"></span>
	<br><br>
	<button onclick="start()">Start</button>

	<script>
	function start() {
		var eventSource = new EventSource("HelloServlet");
		eventSource.onmessage = function(event) {
			document.getElementById('foo').innerHTML = event.data;
		};
	}
	</script>
</body>
</html>
```

## WebSocket demo

```bash
cat <<'SH' > handle.sh
#!/bin/bash

# Count from 1 to 10, pausing for a second between each iteration.
for COUNT in $(seq 1 10); do
  echo $COUNT
  sleep 1
done
SH
chmod +x ./handle.sh
websocketd --port=8080 ./handle.sh
```

```js
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log('Count is: ' + event.data);
};
```
