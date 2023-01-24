import { CEP } from '../../model/cep'

export class FindCepServiceSpy {
  async find({ cep }: { cep: string}): Promise<CEP | null> {
    return {
      cep,
      city: 'XPTO',
      neighborhood: 'xpto',
      state: 'xpto',
      street: 'xpto'
    }
  }
}