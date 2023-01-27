import { Address } from '../../model/address'

export class FindCepServiceSpy {
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

export class FindCepServiceErrorSpy {
  async find({ cep }: { cep: string}): Promise<Address | null> {
    return null
  }
}