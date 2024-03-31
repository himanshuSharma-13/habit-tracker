import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})  

app.post('/', (c) => {
  return c.text('POST /api/v1/signin')
})

app.post('/', (c) => {
  return c.text('POST /api/v1/signup')
})

app.get('/', (c) => {
  return c.text('POST /api/v1/fetch')
})

app.put('/', (c) => {
  return c.text('POST /api/v1/update')
})

export default app
