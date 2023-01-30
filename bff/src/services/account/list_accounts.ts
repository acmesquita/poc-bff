import { apiAccount } from "../../lib/axios";
import { Account } from "../../model/account";

export class ListAccount {
  async list(): Promise<Account[]> {
    try {
      const response = await apiAccount.get('/accounts')
      return response.data.accounts as Account[]
    } catch (error) {
      return []
    }
  }
}