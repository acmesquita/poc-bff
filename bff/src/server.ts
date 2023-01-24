import fastify from 'fastify'
import { cepRouter, accountRouter } from './routes'
import fastifyCors from '@fastify/cors'

const app = fastify()
app.register(fastifyCors)

app.register(cepRouter)
app.register(accountRouter)

app.listen({ port: 3003 }).then(() => {
  console.log(`Server listening at http://localhost:3003`)
})
