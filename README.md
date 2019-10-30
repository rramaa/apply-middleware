# create-middleware [![Build Status](https://travis-ci.org/rramaa/create-middleware.svg?branch=master)](https://travis-ci.org/rramaa/create-middleware) [![npm version](https://img.shields.io/npm/v/create-middleware.svg)](https://www.npmjs.com/package/create-middleware) [![codecov](https://codecov.io/gh/rramaa/create-middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/rramaa/create-middleware)


A small package to implement middleware pattern. This package implements the middleware pattern similar to how express does. You can register global middlewares or event specific middlewares. Refer to [Usage Guide](https://github.com/rramaa/create-middleware#usage-guide) for information on how to use.

* [Installation](https://github.com/rramaa/create-middleware#installation)
* [Usage Guide](https://github.com/rramaa/create-middleware#usage-guide)

## Installation
* Npm: `npm i create-middleware`
* Yarn: `yarn add create-middleware`

## Usage Guide
```javascript
import middlewares from 'create-middlewares'
middlewares.registerMiddleware(middlewareFn1, middlewareFn2, [, fn3, ..., fnn]) // registering global middlewares
middlewares.registerMiddleware("some-event",middlewareFn1, middlewareFn2, [, fn3, ..., fnn]) // registering event specific middlewares

middlewares.execute("some-event", []args) // this will execute global middlewares and event specific middlewares in order they were attached
All the middlewares will recieve the arguments and next as the last argument
```

To create a new set of middlewares in a different context
```javascript
import { createMiddleware } from 'create-middlewares'
const middlewares = createMiddleware()
```

An example of the middleware function
```javascript
async function loggingMiddleware(someObj, next){
    logger.log(someObj)
    await next()
}

async function errorHandlerMiddleware(someObj, next){
    try {
        await next()
    } catch(e) {
        // handle error here
    }
}
```
Typically error handler middleware would registered at the beginning globally for it to catch all errors propagating from the middlewares.

PS: All middlewares should be async functions and every next call should be awaited for this feature to work correctly
