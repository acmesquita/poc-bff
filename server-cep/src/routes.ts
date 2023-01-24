import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { api } from './lib/axios'

export function cepRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/cep/:cep', async (request, reply) => {
    const createParams = z.object({
      cep: z.string().length(8)
    })

    const { cep } = createParams.parse(request.params)

    const response = await api.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

    if (response.status === 200) {
      const { cep, state, city, neighborhood, street } = response.data

      return {
        cep,
        state,
        city,
        neighborhood,
        street
      }

    } else {
      return 'Deu merda, não achei'
    }
  })

  done()
}
