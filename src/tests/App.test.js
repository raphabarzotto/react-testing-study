import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// O topo da aplicação contém um conjunto fixo de links de navegação.
describe('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  // O primeiro link deve possuir o texto Home.
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });

  // O segundo link deve possuir o texto About.
  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });

  // O terceiro link deve possuir o texto Favorite Pokémons.
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});

// A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
describe('A aplicação é redirecionada corretamente', () => {
  // A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação
  it(`A aplicação é redirecionada para a página inicial, na URL /
  ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  // A aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação
  it(`A aplicação é redirecionada para a página de About, na URL /about, 
  ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  // A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.
  it(`A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites
  , ao clicar no link Favorite Pokémons da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  // A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
  it(`A aplicação é redirecionada para a página Not Found ao entrar em uma URL 
  desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('desconhecida');
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
    })).toBeInTheDocument();
  });
});
