import { apiAccount } from "../../lib/axios";

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
    const response = await apiAccount.post(`/accounts`, body)

    return response.data
  }
}