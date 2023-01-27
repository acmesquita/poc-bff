import { z } from "zod";
import { Request } from "../adapters/fatify_request";
import { Address } from "../model/address";
import { FindCepByServer } from "../services/cep/find_cep_by_server";
import { FindCepByExternalAPI } from "../services/cep/find_cep_by_external_api";

export class CepController {
  addresses: Address[]

  constructor(
    private readonly findCepByServer: FindCepByServer,
    private readonly findCepByExtrenalAPI: FindCepByExternalAPI,
  ){
    this.addresses = []
  }

  async find(request: Request): Promise<Address | null> {
    const cep = this.validate(request)

    const addressLocal = this.findLocalAddressByCep(cep)

    if (addressLocal) {
      return addressLocal
    }

    const addressRemote = await this.findCepByServer.find({ cep }) || await this.findCepByExtrenalAPI.find({ cep })

    if (addressRemote) {
      this.addresses.push(addressRemote)
    }

    return addressRemote;
  }

  private validate(request: Request): string | never {
    const createParams = z.object({
      cep: z.string().length(8)
    })

    const { cep } = createParams.parse(request.params)

    return cep
  }

  private findLocalAddressByCep(cep: string) {
    return this.addresses.find(address => address.cep === cep)
  }

}