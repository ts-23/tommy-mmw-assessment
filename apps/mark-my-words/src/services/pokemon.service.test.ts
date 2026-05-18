import { describe, it, expect, vi } from 'vitest';
import { PokemonService } from './pokemon.service.js';
import { PokeApiClient } from '../clients/pokeapi.client.js';
import { PokeApiPokemon } from '../schemas/pokemon.schema.js';

describe('PokemonService', () => {
  const mockPokeApiClient = {
    fetchManyPokemon: vi.fn()
  } as unknown as PokeApiClient;

  const pokemonService = new PokemonService(mockPokeApiClient);

  const mockPikachu: PokeApiPokemon = {
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: [{ type: { name: 'electric' } }],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
      { base_stat: 40, stat: { name: 'defense' } }
    ],
    sprites: { front_default: 'https://example.com/pikachu.png' }
  };

  it('should deduplicate names and calculate summary correctly', async () => {
    vi.mocked(mockPokeApiClient.fetchManyPokemon).mockResolvedValue([mockPikachu]);

    const result = await pokemonService.getTeamData(['pikachu', 'pikachu']);

    expect(mockPokeApiClient.fetchManyPokemon).toHaveBeenCalledWith(['pikachu']);
    expect(result.team).toHaveLength(2);
    expect(result.team[0].name).toBe('pikachu');
    expect(result.team[1].name).toBe('pikachu');

    expect(result.summary.totalWeight).toBe(120);
    expect(result.summary.totalHp).toBe(70);
    expect(result.summary.averageHeight).toBe(4);
    expect(result.summary.typeCounts).toEqual({ electric: 2 });
  });

  // TODO: more tests

});
