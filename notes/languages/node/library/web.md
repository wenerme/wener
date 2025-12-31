---
title: Node.js Web Frameworks
---

# Node.js Web Frameworks

## Frameworks

- **Express**: The standard for Node.js web apps.
- **Koa**: Next gen web framework for Node.js.
- **Hapi**: Rich framework for building applications and services.

## Comparison

- [Express vs Koa vs Hapi](https://savvycomsoftware.com/express-koa-or-hapi-better-performance-with-the-right-nodejs-framework/)

## Example (Express + Mongoose)

```js
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://user:pass@cluster.mongodb.net/DB?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Define routes
// var routes = require("./api/routes/leaderboardRoutes");
// routes(app);

app.listen(port);
console.log('API server started on ' + port);
```
