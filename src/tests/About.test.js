import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About', () => {
  // A página contém um heading h2 com o texto About Pokédex.
  it('a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const typeH2 = {
      level: 2,
      name: 'About Pokédex',
    };
    expect(screen.getByRole('heading', typeH2)).toBeInTheDocument();
  });

  // A página contém dois parágrafos com texto sobre a Pokédex.
  it('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstText = screen.getByText(/this application simulates a pokédex/i);
    const secondText = screen.getByText(/one can filter pokémons by type/i);
    expect(firstText).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
  });

  // A página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.
  it('a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
