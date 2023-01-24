import { FastifyInstance } from "fastify";
import { CepController } from "./controllers/cep_controller";
import { FindCep } from "./service/find_cep";

const findCepService = new FindCep()
const cepController = new CepController(findCepService)

export function cepRouter(app: FastifyInstance, _: any, done: any) {
  app.get('/cep/:cep', cepController.find)
  done()
}
