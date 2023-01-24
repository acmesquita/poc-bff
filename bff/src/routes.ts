import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { api, apiAccount, apiCep } from './lib/axios'

interface Address {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

interface Account {
  id: string
  name: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

const addresses: Address[] = []

export function cepRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/cep/:cep', async (request) => {
    const createParams = z.object({
      cep: z.string().length(8)
    })

    const { cep } = createParams.parse(request.params)

    const addressLocal = addresses.find(address => address.cep === cep)

    if (addressLocal) {
      return addressLocal
    }

    return apiCep.get(`/cep/${cep}`).then(response => {
      console.log('2ª tentativa')
      const { state, city, neighborhood, street } = response.data

      const data = {
        cep,
        state,
        city,
        neighborhood,
        street
      }

      addresses.push(data)

      return data
    }).catch(() => {
      console.log('3ª tentativa')
      return api.get(`https://brasilapi.com.br/api/cep/v2/${cep}`).then((response) => {

        const { cep, state, city, neighborhood, street } = response.data

        const data = {
          cep,
          state,
          city,
          neighborhood,
          street
        }

        addresses.push(data)

        return data
      })

    })
  })

  done()
}

export function accountRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/accounts', async () => {
    const response = await apiAccount.get('/accounts')

    const accounts = response.data.accouts as Account[]

    return accounts.map(account => ({
      id: account.id,
      name: account.name,
    }))
  })

  app.get('/accounts/:id', async (request) => {
    const createParam = z.object({
      id: z.string().uuid()
    })

    const { id } = createParam.parse(request.params)

    const response = await apiAccount.get(`/accounts/${id}`)

    return response.data
  })

  app.post('/accounts', async (request) => {
    const createAccountBody = z.object({
      name: z.string(),
      cep: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      street: z.string(),
    })

    const {
      name,
      cep,
      state,
      city,
      neighborhood,
      street,
    } = createAccountBody.parse(request.body)

    const response = await apiAccount.post(`/accounts`, {
      name,
      cep,
      state,
      city,
      neighborhood,
      street,
    })

    return response.data
  })
  done()
}