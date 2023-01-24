import { api } from "../lib/axios";
import { CEP } from "../model/cep";

interface Params {
  cep: string
}

export class FindCep {
  async find({ cep }: Params): Promise<CEP | null> {
    try {
      const response = await api.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

      const { state, city, neighborhood, street } = response.data

      return {
        cep,
        state,
        city,
        neighborhood,
        street
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }
}