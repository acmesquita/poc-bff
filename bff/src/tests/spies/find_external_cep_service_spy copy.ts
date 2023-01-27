import { Address } from '../../model/address'

export class FindExternalCepServiceSpy {
  async find({ cep }: { cep: string}): Promise<Address | null> {
    return {
      cep,
      city: 'XPTO',
      neighborhood: 'xpto',
      state: 'xpto',
      street: 'xpto'
    }
  }
}