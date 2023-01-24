import { FastifyRequest } from "fastify";
import { FastifyRequestType } from "fastify/types/type-provider";

export interface Request extends Partial<FastifyRequestType> {}

export const adapter = (request: FastifyRequest): Request => {
  return request
}