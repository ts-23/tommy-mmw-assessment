import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { PokemonTeamQuerySchema } from '../schemas/pokemon.schema.js';
import { PokemonService } from '../services/pokemon.service.js';
import { PokeApiClient } from '../clients/pokeapi.client.js';
import { AppError, ERROR_MESSAGES } from '../schemas/errors.js';

export async function pokemonRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  const server = fastify.withTypeProvider<ZodTypeProvider>();
  
  const pokeApiClient = new PokeApiClient();
  const pokemonService = new PokemonService(pokeApiClient);

  server.get('/pokemon/team', {
    schema: {
      querystring: PokemonTeamQuerySchema
    }
  }, async (request, reply) => {
    try {
      const { names } = request.query;
      const result = await pokemonService.getTeamData(names);
      return result;
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      return reply.status(500).send({ error: ERROR_MESSAGES.SYSTEM.UNEXPECTED });
    }
  });
}
