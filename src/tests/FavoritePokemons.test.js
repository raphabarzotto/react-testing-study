import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  // É exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.
  it(`É exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoriteText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });

  // É exibido todos os cards de pokémons favoritados.
  it('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const checkboxFavorite = screen.getByRole('checkbox', { name:
      /pokémon favoritado\?/i });
    userEvent.click(checkboxFavorite);
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorites);
    const textNoFavoriteFound = screen.queryByText(/No favorite pokemon found/i);
    expect(textNoFavoriteFound).toBeNull();
  });
});
