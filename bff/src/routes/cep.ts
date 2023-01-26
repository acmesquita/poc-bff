import { FastifyInstance } from "fastify";
import { CepController } from "../controllers/cep_controller";
import { adapter } from "../adapters/fatify_request";
import { FindCepByServer } from "../services/cep/find_cep_by_server";
import { FindCepByExternalAPI } from "../services/cep/find_cep_by_external_api";

const cepController = new CepController(
  new FindCepByServer(),
  new FindCepByExternalAPI()
)

export function cepRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/cep/:cep', async (request) => cepController.find(adapter(request)))

  done()
}
