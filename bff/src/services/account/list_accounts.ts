import { apiAccount } from "../../lib/axios";
import { Account } from "../../model/account";

export class ListAccount {
  async list(): Promise<Account[]> {
    const response = await apiAccount.get('/accounts')

    return response.data.accouts as Account[]
  }
}