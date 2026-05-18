import { PokeApiClient } from '../clients/pokeapi.client.js';
import { PokemonDataMissingError } from '../schemas/errors.js';
import {
  PokeApiPokemon,
  Pokemon,
  PokemonTeamResponse,
  PokemonTeamSummary
} from '../schemas/pokemon.schema.js';

export class PokemonService {
  constructor(private readonly pokeApiClient: PokeApiClient) { }

  async getTeamData(names: string[]): Promise<PokemonTeamResponse> {
    const uniqueNames = [...new Set(names)];

    const uniquePokemonData = await this.pokeApiClient.fetchManyPokemon(uniqueNames);

    const pokemonMap = new Map<string, PokeApiPokemon>();
    uniquePokemonData.forEach(p => pokemonMap.set(p.name.toLowerCase(), p));

    // Reconstruct the team in the requested order (including duplicates)
    const team: Pokemon[] = names.map(name => {
      const data = pokemonMap.get(name.toLowerCase());
      if (!data) {
        throw new PokemonDataMissingError(name);
      }
      return this.transformPokemon(data);
    });

    const summary = this.calculateSummary(team);

    return { team, summary };
  }

  private transformPokemon(data: PokeApiPokemon): Pokemon {
    const stats = {
      hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 0,
      attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0,
      defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0,
    };

    return {
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
      stats,
      image: data.sprites.front_default
    };
  }

  private calculateSummary(team: Pokemon[]): PokemonTeamSummary {
    let totalWeight = 0;
    let totalHeight = 0;
    let totalHp = 0;
    const typeCounts: Record<string, number> = {};

    team.forEach(p => {
      totalWeight += p.weight;
      totalHeight += p.height;
      totalHp += p.stats.hp;
      p.types.forEach(type => {
        typeCounts[type] = (typeCounts[type] ?? 0) + 1;
      });
    });

    return {
      totalWeight,
      averageHeight: team.length > 0 ? totalHeight / team.length : 0,
      totalHp,
      typeCounts
    };
  }
}
