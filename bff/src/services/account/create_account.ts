import { apiAccount } from "../../lib/axios";
import { Account } from "../../model/account";

interface BodyCreateAccount {
  name: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
}

export class CreateAccount {
  async create(body: BodyCreateAccount): Promise<void> {
    return await apiAccount.post(`/accounts`, body)
  }
}