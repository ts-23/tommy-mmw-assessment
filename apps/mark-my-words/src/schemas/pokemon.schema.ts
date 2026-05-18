import { z } from 'zod';
import { parseCommaSeparatedString } from '@markmywords/toolkit';
import { ERROR_MESSAGES } from './errors.js';

// Query Parameters Schema
export const PokemonTeamQuerySchema = z.object({
  names: z.string().transform(parseCommaSeparatedString).pipe(
    z.array(z.string())
      .min(1, ERROR_MESSAGES.POKEMON.TEAM_MIN)
      .max(6, ERROR_MESSAGES.POKEMON.TEAM_MAX)
  )
});
export type PokemonTeamQuery = z.infer<typeof PokemonTeamQuerySchema>;

// PokeAPI Response Slice Schema (to type the fetch result)
export const PokeApiPokemonSchema = z.object({
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(z.object({ 
    type: z.object({ name: z.string() }) 
  })),
  stats: z.array(z.object({
    base_stat: z.number(),
    stat: z.object({ name: z.string() })
  })),
  sprites: z.object({ 
    front_default: z.string().nullable() 
  })
});

export type PokeApiPokemon = z.infer<typeof PokeApiPokemonSchema>;

// MARK: Final API Payload Structure Types
export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
  image: string | null;
};

export type PokemonTeamSummary = {
  totalWeight: number;
  averageHeight: number;
  totalHp: number;
  typeCounts: Record<string, number>;
};

export type PokemonTeamResponse = {
  team: Pokemon[];
  summary: PokemonTeamSummary;
};
