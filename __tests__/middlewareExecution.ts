import middleware from '../lib'
type middlewareFn = (...args: any) => any

const eventName = "event"
const timeout = 100

const getExecutedMap = (n = 5) => Array(n).fill(false)

const middlewareFn1: middlewareFn = (obj, next) => {
  obj[0] = true
  next()
}

const middlewareFn2: middlewareFn = (obj, next) => {
  obj[1] = true
  next()
}

const middlewareFn3: middlewareFn = (obj, next) => {
  obj[2] = true
  next()
}

const middlewareFn4: middlewareFn = (obj, next) => {
  obj[3] = true
  next()
}

const middlewareFn5: middlewareFn = (obj, next) => {
  obj[4] = true
  next()
}

describe("All Middlewares should execute in order", () => {
  it("Should execute sync in order middlewares", async () => {
    const executedMap = getExecutedMap()
    middleware.registerMiddleware(middlewareFn1, middlewareFn2)
    middleware.registerMiddleware(eventName, middlewareFn3)
    middleware.registerMiddleware(middlewareFn4)
    middleware.registerMiddleware(eventName, middlewareFn4)
    middleware.registerMiddleware(middlewareFn5)
    await middleware.executeMiddleware(eventName, executedMap)
    expect(executedMap).toEqual([true, true, true, true, true])
  })
})
