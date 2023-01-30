import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { randomUUID } from 'node:crypto';

interface Account {
  id: string
  name: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

const accounts: Account[] = []


export function accountRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/accounts', async () => {
    return {
      accounts
    }
  })

  app.get('/accounts/:id', async (request) => {
    const createParam = z.object({
      id: z.string().uuid()
    })

    const { id } = createParam.parse(request.params)

    return accounts.find(account => account.id === id) ?? {}
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

    const data = {
      id: randomUUID(),
      name,
      cep,
      state,
      city,
      neighborhood,
      street,
    }

    accounts.push(data)

    return data
  })

  done()
}