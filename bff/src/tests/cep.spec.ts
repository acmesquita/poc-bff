import { describe, it, expect } from 'vitest';
import { CepController } from '../controllers/cep_controller';
import { FindCepServiceErrorSpy, FindCepServiceSpy } from './spies/find_cep_service_spy';
import { FindExternalCepServiceSpy } from './spies/find_external_cep_service_spy copy';

describe('CepController', () => {
  it('Should return Address model when call router provider valid cep', async () => {
    const sut = new CepController(
      new FindCepServiceSpy(),
      new FindExternalCepServiceSpy()
    )

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

  it('Should return Address model when call but principal service off', async () => {
    const sut = new CepController(
      new FindCepServiceErrorSpy(),
      new FindExternalCepServiceSpy()
    )

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

  it('Should return Address model when call router provider valid cep twice', async () => {
    const sut = new CepController(
      new FindCepServiceSpy(),
      new FindExternalCepServiceSpy()
    )

    await sut.find({
      params: {
        cep: '12345678'
      }
    })

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

    expect(sut.addresses).toHaveLength(1)

  })


  it('Should throws Error when call router provider whit invalid cep', async () => {
    const sut = new CepController(
      new FindCepServiceSpy(),
      new FindExternalCepServiceSpy()
    )

    const result = sut.find({
      params: {
        cep: '123456'
      }
    })

    expect(result).rejects.toThrow()
  })
})
