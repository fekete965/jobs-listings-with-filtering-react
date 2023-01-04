import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
	it('renders img', () => {
		render(<Header />);
		const img = screen.getByRole('img');
		expect(img).toBeInTheDocument();
	});

	// it('has alt attribute', () => {
	// 	render(<Header />);
	// 	const img = screen.getByRole('img');
	// 	expect(img).toHaveAttribute('alt');
	// });

	it('has empty alt attribute', () => {
		render(<Header />);
		const img = screen.getByRole('img');
		expect(img.alt).toBe('');
	});

	it('is single image element', () => {
		render(<Header />);
		const imgs = screen.getAllByRole('img');
		expect(imgs.length).toBe(1);
	});
});

// ! expect(img).not.toHaveAttribute('alt');
