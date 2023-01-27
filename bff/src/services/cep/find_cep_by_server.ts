import { apiCep } from '../../lib/axios';
import { Address } from '../../model/address';

interface Params {
  cep: string
}

export class FindCepByServer {
  async find({ cep }: Params): Promise<Address | null> {
    try {
      const response = await apiCep.get(`/cep/${cep}`)

      const { state, city, neighborhood, street } = response.data

      const data = {
        cep,
        state,
        city,
        neighborhood,
        street
      }

      return data
    } catch (error) {
      return null
    }
  }
}