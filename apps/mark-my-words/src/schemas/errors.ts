/**
 * Centralized error messages grouped by domain.
 */
export const ERROR_MESSAGES = {
  POKEMON: {
    NOT_FOUND: (name: string) => `Pokemon '${name}' not found.`,
    FETCH_FAILED: (name: string) => `Failed to fetch Pokemon '${name}'.`,
    INVALID_DATA: (name: string, detail: string) => `Invalid data received for Pokemon '${name}': ${detail}`,
    DATA_MISSING: (name: string) => `Data missing for Pokemon '${name}' after fetch.`,
    FETCH_ERROR: 'An unknown error occurred while fetching Pokemon data.',
    TEAM_MIN: 'At least one Pokémon name is required.',
    TEAM_MAX: 'A team can have a maximum of 6 Pokémon.',
  },
  SYSTEM: {
    UNEXPECTED: 'An unexpected error occurred.',
  }
} as const;

/**
 * Base class for all application errors.
 */
export class AppError extends Error {
  constructor(public readonly message: string, public readonly statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * HTTP Status 400 - Client Errors
 */
export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

/**
 * HTTP Status 500 - Server Errors
 */
export class InternalServerError extends AppError {
  constructor(message: string = ERROR_MESSAGES.SYSTEM.UNEXPECTED) {
    super(message, 500);
  }
}

/**
 * Domain-Specific Pokemon Errors
 */
export class PokemonNotFoundError extends BadRequestError {
  constructor(name: string) {
    super(ERROR_MESSAGES.POKEMON.NOT_FOUND(name));
    this.name = 'PokemonNotFoundError';
  }
}

export class PokemonFetchError extends InternalServerError {
  constructor(name: string) {
    super(ERROR_MESSAGES.POKEMON.FETCH_FAILED(name));
    this.name = 'PokemonFetchError';
  }
}

export class PokemonDataInvalidError extends InternalServerError {
  constructor(name: string, detail: string) {
    super(ERROR_MESSAGES.POKEMON.INVALID_DATA(name, detail));
    this.name = 'PokemonDataInvalidError';
  }
}

export class PokemonDataMissingError extends InternalServerError {
  constructor(name: string) {
    super(ERROR_MESSAGES.POKEMON.DATA_MISSING(name));
    this.name = 'PokemonDataMissingError';
  }
}
