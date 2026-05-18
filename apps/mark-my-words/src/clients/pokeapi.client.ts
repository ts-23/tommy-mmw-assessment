import { PokeApiPokemon, PokeApiPokemonSchema } from '../schemas/pokemon.schema.js';
import { 
  ERROR_MESSAGES, 
  InternalServerError,
  PokemonNotFoundError,
  PokemonFetchError,
  PokemonDataInvalidError
} from '../schemas/errors.js';

export class PokeApiClient {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  async fetchPokemon(name: string): Promise<PokeApiPokemon> {
    const response = await fetch(`${this.baseUrl}/pokemon/${name}`);

    if (response.status === 404) {
      throw new PokemonNotFoundError(name);
    }

    if (!response.ok) {
      throw new PokemonFetchError(name);
    }

    const data = await response.json();
    
    const parsed = PokeApiPokemonSchema.safeParse(data);
    if (!parsed.success) {
      throw new PokemonDataInvalidError(name, parsed.error.message);
    }

    return parsed.data;
  }

  async fetchManyPokemon(names: string[]): Promise<PokeApiPokemon[]> {
    try {
      return await Promise.all(names.map(name => this.fetchPokemon(name)));
    } catch (error) {
      if (error instanceof PokemonNotFoundError || 
          error instanceof PokemonFetchError || 
          error instanceof PokemonDataInvalidError) {
        throw error;
      }
      throw new InternalServerError(ERROR_MESSAGES.POKEMON.FETCH_ERROR);
    }
  }
}
