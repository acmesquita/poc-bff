import fastify from 'fastify'
import { cepRouter } from './routes'
import fastifyCors from '@fastify/cors'

const app = fastify()
app.register(fastifyCors)
app.register(cepRouter)

app.listen({ port: 3001 }).then(() => {
  console.log(`Server listening at http://localhost:3001`)
})
