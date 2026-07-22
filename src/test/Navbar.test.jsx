import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../components/Navbar';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar', () => {
  const defaultProps = {
    onOpenChat: vi.fn(),
    onOpenAdmin: vi.fn(),
  };

  it('renders the logo', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByText('QUAN')).toBeInTheDocument();
    expect(screen.getByText('TIONIC')).toBeInTheDocument();
  });

  it('logo button has aria-label', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('mobile AI button has aria-label', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByLabelText('Open AI Consultant')).toBeInTheDocument();
  });

  it('hamburger button has aria-label and aria-expanded', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    const hamburger = screen.getByLabelText('Open menu');
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('hamburger toggles aria-expanded on click', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('has navigation links', () => {
    renderWithRouter(<Navbar {...defaultProps} />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });
});
