import { api } from '../../lib/axios';
import { Address } from '../../model/address';

interface Params {
  cep: string
  addresses: Address[]
}

export class FindCepByExternalAPI {
  async find({ addresses, cep }: Params): Promise<Address | null> {
    try {
      const response = await api.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

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

    } catch (error) {
      return null
    }
  }
}