import { apiAccount } from "../../lib/axios";
import { Account } from "../../model/account";

export class FindAccount {
  async find(id: string): Promise<Account> {
    return await (await apiAccount.get(`/accounts/${id}`)).data
  }
}