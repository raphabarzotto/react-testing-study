import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente PokemonDetails', () => {
  beforeEach(() => renderWithRouter(<App />));

  // As informações do Pokémon selecionado são mostradas na tela.
  it('As informações do Pokémon selecionado são mostradas na tela.', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const { name } = pokemons[0];
    const title = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`${name} Details`);
  });

  // Não deve existir link de navegação para os detalhes do Pokémon selecionado
  it('Não deve existir link de navegação para os detalhes do Pokémon selecionado', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  // A seção de detalhes deve conter um heading h2 com o texto Summary
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
  });

  // Deve conter parágrafo com descrição do pokémon
  it('Deve conter parágrafo com descrição do pokémon', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const text = screen.getByText(/This intelligent pokémon roasts hard berries/i);
    expect(text).toBeInTheDocument();
  });

  // Existe um heading h2 com o texto Game Locations of <name>
  it('Existe um heading h2 com o texto Game Locations of <name>', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const { name } = pokemons[0];
    const locatTitle = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locatTitle).toBeInTheDocument();
  });

  // A imagem deve ter atributo alt e src
  it('A imagem deve ter atributo alt e src', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const map = screen.getAllByAltText('Pikachu location');
    expect(map[0]).toBeInTheDocument();
    expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  // O usuário pode favoritar um pokémon através da página de detalhes
  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
  });
});
