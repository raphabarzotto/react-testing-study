import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex', () => {
  const pokemonName = 'pokemon-name';

  beforeEach(() => renderWithRouter(<App />));

  // A página contém um heading h2 com o texto Encountered pokémons
  it('A página contém um heading h2 com o texto Encountered pokémons', () => {
    const typeH2 = {
      level: 2,
      name: /encountered pokémons/i,
    };
    const pokedexTitle = screen.getByRole('heading', typeH2);
    expect(pokedexTitle).toBeInTheDocument();
  });

  // É exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado
  it(`É exibido o próximo Pokémon da lista quando o botão 
  Próximo pokémon é clicado`, () => {
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(nextButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  // É mostrado apenas um Pokémon por vez
  it('É mostrado apenas um Pokémon por vez', () => {
    const pokemonVisible = screen.getAllByTestId(pokemonName);
    expect(pokemonVisible.length).toBe(1);
  });

  // A Pokédex tem os botões de filtro
  it('A Pokédex tem os botões de filtro', () => {
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    // Constante para mudar length se quiser
    const filterLength = 7;
    expect(filterButtons.length).toBe(filterLength);
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    expect(filterButtons[1].textContent).toBe('Fire');
    userEvent.click(filterButtons[1]);
    const pokemonFireFilter = screen.getByTestId(pokemonName).textContent;
    expect(pokemonFireFilter).toBe('Charmander');
  });

  // A Pokédex contém um botão para resetar o filtro
  it('A Pokédex contém um botão para resetar o filtro', () => {
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(filterButtons[1]);
    expect(screen.getByTestId(pokemonName).textContent).toBe('Charmander');
    userEvent.click(allButton);
    expect(screen.getByTestId(pokemonName).textContent).toBe('Pikachu');
  });
});
