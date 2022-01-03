import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound', () => {
  // A página contém um heading h2 com o texto Page requested not found 😭;
  it('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const typeH2 = {
      level: 2,
      name: /Page requested not found/i,
    };
    const headingH2 = screen.getByRole('heading', typeH2);
    const headingEmoji = screen.getByRole('img', { name: /crying emoji/i });
    expect(headingH2).toBeInTheDocument();
    expect(headingEmoji).toBeInTheDocument();
  });

  // A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.
  it('a página contém uma imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
