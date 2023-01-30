import { z } from "zod";
import { Request } from "../adapters/fatify_request";
import { Account } from "../model/account";
import { ListAccount } from "../services/account/list_accounts";
import { FindAccount } from "../services/account/find_account";
import { CreateAccount } from "../services/account/create_account";

type ListResponse = Array<{
  id: string
  name: string
}>

type Params = {
  listAccountsService: ListAccount,
  findAccountService: FindAccount,
  createAccountService: CreateAccount
}

export class AccountController {

  private listAccountsService: ListAccount
  private findAccountService: FindAccount
  private createAccountService: CreateAccount

  constructor(params: Params) {
    this.listAccountsService = params.listAccountsService
    this.findAccountService = params.findAccountService
    this.createAccountService = params.createAccountService
  }

  async list(): Promise<ListResponse> {
    const accounts = await this.listAccountsService.list()

    if (accounts.length === 0) {
      return []
    }

    return accounts.map(account => ({
      id: account.id,
      name: account.name,
    }))
  }

  async find(request: Request): Promise<Account> {
    const createParam = z.object({
      id: z.string().uuid()
    })

    const { id } = createParam.parse(request.params)

    return await this.findAccountService.find(id)
  }

  async create(request: Request) {
    const createAccountBody = z.object({
      name: z.string(),
      cep: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      street: z.string(),
    })

    const body = createAccountBody.parse(request.body)

    const response = await this.createAccountService.create(body)

    return response
  }
}