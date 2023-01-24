import { FastifyInstance } from "fastify";
import { CepController } from "./controllers/cep_controller";
import { FindCep } from "./service/find_cep";
import { adapter } from "./adapters/fatify_request";

const findCepService = new FindCep()
const cepController = new CepController(findCepService)

export function cepRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/cep/:cep', async (request) => cepController.find(adapter(request)))
  done()
}
