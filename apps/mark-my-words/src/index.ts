import Fastify from 'fastify';
import {
  validatorCompiler,
  serializerCompiler
} from 'fastify-type-provider-zod';
import { pokemonRoutes } from './controllers/pokemon.controller.js';

const fastify = Fastify({
  logger: true
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(pokemonRoutes);

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
