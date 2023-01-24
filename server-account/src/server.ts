import fastify from 'fastify'
import { accountRouter } from './routes'
import fastifyCors from '@fastify/cors'

const app = fastify()
app.register(fastifyCors)

app.register(accountRouter)

app.listen({ port: 3002 }).then(() => {
  console.log(`Server listening at http://localhost:3002`)
})
