import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders the contact section', () => {
    render(<Footer />);
    expect(screen.getByText(/Book A Technical Consultation/i)).toBeInTheDocument();
  });

  it('name input has proper label association', () => {
    render(<Footer />);
    const nameInput = screen.getByPlaceholderText('e.g. Rahul Sharma');
    expect(nameInput).toHaveAttribute('id', 'booking-name');
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
  });

  it('email input has proper label association', () => {
    render(<Footer />);
    const emailInput = screen.getByPlaceholderText('e.g. rahul@enterprise.com');
    expect(emailInput).toHaveAttribute('id', 'booking-email');
    expect(screen.getByLabelText('Work Email')).toBeInTheDocument();
  });

  it('enterprise input has proper label association', () => {
    render(<Footer />);
    const enterpriseInput = screen.getByPlaceholderText('e.g. Apex Health Systems');
    expect(enterpriseInput).toHaveAttribute('id', 'booking-enterprise');
    expect(screen.getByLabelText('Enterprise Domain / Company')).toBeInTheDocument();
  });

  it('requirements textarea has proper label association', () => {
    render(<Footer />);
    const requirementsTextarea = screen.getByPlaceholderText(/What automated flows/i);
    expect(requirementsTextarea).toHaveAttribute('id', 'booking-requirements');
    expect(screen.getByLabelText('System & Integration Requirements')).toBeInTheDocument();
  });

  it('newsletter input has a visually hidden label', () => {
    render(<Footer />);
    const newsletterInput = screen.getByPlaceholderText('Enter your enterprise email');
    expect(newsletterInput).toHaveAttribute('id', 'newsletter-email');
    expect(screen.getByLabelText('Newsletter email address')).toBeInTheDocument();
  });

  it('newsletter subscribe button has aria-label', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Subscribe to newsletter')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });
});
