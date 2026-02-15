# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Devine la Carte" (Guess the Card), a card guessing game built with React, TypeScript, and Vite. The player attempts to guess a randomly selected card from a French playing card deck.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production (runs TypeScript check + Vite build)
npm run build

# Lint codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Service Layer Pattern

The codebase follows a clean service-oriented architecture:

- **GameService** (`src/services/GameService.ts`): Core game logic class that manages:
  - Secret card selection via `secretCard` private property
  - Game state initialization and reset
  - Guess validation logic returning `GameResult` type ('plus', 'moins', 'gagné !!')
  - Deck management

### Models

- **Card** (`src/models/Card.ts`): Core domain model
  - French suits: 'Coeur', 'Carreau', 'Trèfle', 'Pique'
  - Ranks with numeric values (2=1, 3=2, ..., As=13)
  - `createDeck()` factory function generates full 52-card deck
  - `RANKS` and `SUITS` constants define the card space

### Component Structure

- **App** (`src/App.tsx`): Main component that:
  - Instantiates `GameService` via `useState` (singleton per game session)
  - Manages UI state (result, attempts, gameWon)
  - Displays unique cards (one per rank) for user selection
  - Uses inline styles for all UI elements

- **CardButton** (`src/components/CardButton.tsx`): Presentational component
  - Receives card and click handler via props
  - All styling is inline (no CSS modules or styled-components)

### Key Design Decisions

1. **State Management**: GameService is instantiated once and held in component state, not recreated on re-renders
2. **Card Display**: Only shows one card per rank (13 buttons total) by filtering deck using `RANKS.map()`
3. **Styling**: All styles are inline objects; no external CSS files
4. **Type Safety**: Strong typing throughout with TypeScript interfaces and type aliases

## Tech Stack

- **React 19.2.0** with hooks (useState, useEffect)
- **TypeScript 5.9.3** with strict configuration
- **Vite 7.3.1** for build tooling and dev server
- **ESLint 9.x** with React-specific rules
