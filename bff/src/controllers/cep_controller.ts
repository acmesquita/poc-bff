import { z } from "zod";
import { Request } from "../adapters/fatify_request";
import { Address } from "../model/address";
import { FindCepByServer } from "../services/cep/find_cep_by_server";
import { FindCepByExternalAPI } from "../services/cep/find_cep_by_external_api";

export class CepController {
  addresses: Address[] = []

  constructor(
    private readonly findCepByServer: FindCepByServer,
    private readonly findCepByExtrenalAPI: FindCepByExternalAPI,
  ){}

  async find(request: Request): Promise<Address | null> {
    const createParams = z.object({
      cep: z.string().length(8)
    })

    const { cep } = createParams.parse(request.params)

    const addressLocal = this.addresses.find(address => address.cep === cep)

    if (addressLocal) {
      return addressLocal
    }

    const response = await this.findCepByServer.find({ addresses: this.addresses, cep })

    if (!response) {
      return await this.findCepByExtrenalAPI.find({ addresses: this.addresses, cep })
    }

    return response;
  }
}