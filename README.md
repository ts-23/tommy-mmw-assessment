# Mark My Words - Tommy Ling

## Tech Stack & Monorepo
This project is organised as a **Monorepo** using **pnpm workspaces** and **Turborepo**. 
- **pnpm**: A fast, disk-space efficient package manager.
- **Turborepo**: A high-performance build system that makes managing multiple apps and packages in one repository easy.

### Project Structure
- `apps/`: Contains the deployable applications.
  - `mark-my-words`: The main Pokemon Data Processor service.
- `packages/`: Contains shared code (libraries, shared UI components, utilities) that can be imported by applications or packages. This promotes code reuse and consistency.

## Getting Started

### Prerequisites
Ensure you have [pnpm](https://pnpm.io/installation) installed globally.

If you are using Windows, highly recommend using WSL (Windows Subsystem for Linux). Pnpm may not work well with Windows, and this monorepo is not tested using Windows without WSL.

### Installation
From the root directory, run:
```bash
pnpm install
```

### Running the App
To start the `mark-my-words` backend in development mode:
```bash
pnpm dev
```
The server will start at `http://localhost:3000`.

### Useful Commands
- `pnpm build`: Build all apps and packages.
- `pnpm test`: Run tests across the entire workspace.
- `pnpm lint`: Lint the whole codebase.

## API Usage
**Example:** `http://localhost:3000/pokemon/team?names=pikachu,charizard,bulbasaur,Pikachu,mr-rime,Sprigatito`
- Fetches detailed data for up to 6 Pokemons.
- Returns a team summary (total weight, average height, etc.).


## TODOs

There's lots more to do before going to production such as adding logging, monitoring services, api/integration tests, CI/CD, formatters, linters, env variables, etc
