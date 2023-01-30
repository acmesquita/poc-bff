import { FastifyInstance } from "fastify";
import { AccountController } from "../controllers/account_controller";
import { adapter } from "../adapters/fatify_request";
import { ListAccount } from "../services/account/list_accounts";
import { FindAccount } from "../services/account/find_account";
import { CreateAccount } from "../services/account/create_account";


export function accountRouter(app: FastifyInstance, _: any, done: any) {
  const accountController = new AccountController({
    createAccountService: new CreateAccount(),
    findAccountService: new FindAccount(),
    listAccountsService: new ListAccount(),
  })
  app.get('/accounts', async () => accountController.list())
  app.get('/accounts/:id', async (request) => accountController.find(adapter(request)))
  app.post('/accounts', async (request) => accountController.create(adapter(request)))

  done()
}