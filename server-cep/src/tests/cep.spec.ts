import { describe, it, expect } from 'vitest';
import { CepController } from '../controllers/cep_controller';
import { FindCepServiceSpy } from './spies/find_cep_service_spy';

describe('CepController', () => {
  it('Should return CEP model when call router provider valid cep', async () => {
    const findCepServiceSpy = new FindCepServiceSpy()
    const sut = new CepController(findCepServiceSpy)

    const result = await sut.find({
      params: {
        cep: '12345678'
      }
    })

    expect(result).toEqual({
      cep: '12345678',
      city: 'XPTO',
      neighborhood: 'xpto',
      state: 'xpto',
      street: 'xpto'
    })

  })

  it('Should throws Error when call router provider whit invalid cep', async () => {
    const findCepServiceSpy = new FindCepServiceSpy()
    const sut = new CepController(findCepServiceSpy)

    const result = sut.find({
      params: {
        cep: '123456'
      }
    })

    expect(result).rejects.toThrow()
  })
})
