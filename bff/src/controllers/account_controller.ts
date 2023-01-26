import { z } from "zod";
import { Request } from "../adapters/fatify_request";
import { apiAccount } from "../lib/axios";
import { Account } from "../model/account";
import { ListAccount } from "../services/account/list_accounts";
import { FindAccount } from "../services/account/find_account";
import { CreateAccount } from "../services/account/create_account";

type ListResponse = Array<{
  id: string
  name: string
}>

export class AccountController {

  constructor(
    private readonly listAccountsService: ListAccount,
    private readonly findAccountService: FindAccount,
    private readonly createAccountService: CreateAccount
  ){}

  async list(): Promise<ListResponse> {
    const accounts = await this.listAccountsService.list()

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

    return await this.createAccountService.create(body)
  }
}