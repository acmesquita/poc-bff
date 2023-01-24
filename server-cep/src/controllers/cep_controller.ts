import { z } from 'zod'
import { api } from '../lib/axios'
import { CEP } from "../model/cep";
import { FastifyRequest } from 'fastify';
import { FindCep } from '../service/find_cep';

export class CepController {

  constructor(private findCepService: FindCep) {}

  async find(request: FastifyRequest): Promise<CEP | null> {
    const createParams = z.object({
      cep: z.string().length(8)
    })

    const { cep } = createParams.parse(request.params)

    return await this.findCepService.find({ cep })
  }
}