import { z } from 'zod';
import { CEP } from "../model/cep";
import { FindCep } from '../service/find_cep';
import { Request } from '../adapters/fatify_request';

export class CepController {

  constructor(private findCepService: FindCep) {}

  async find(request: Request): Promise<CEP | null> {
    const createParams = z.object({
      cep: z.string().length(8)
    })

    const { cep } = createParams.parse(request.params)

    return await this.findCepService.find({ cep })
  }
}