import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon', () => {
  beforeEach(() => renderWithRouter(<App />));
  // É renderizado um card com as informações de determinado pokémon
  it('É renderizado um card com as informações de determinado pokémon', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Pikachu sprite').src;
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImage).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  // Possui link de navegação para exibir detalhes deste Pokémon.
  it('Possui link de navegação para exibir detalhes deste Pokémon.', () => {
    const btnMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(btnMoreDetails).toBeInTheDocument();
    expect(btnMoreDetails.href).toBe('http://localhost/pokemons/25');
  });

  // Existe um ícone de estrela nos Pokémons favoritados
  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const btnMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(btnMoreDetails);

    const checkboxFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFav);

    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
