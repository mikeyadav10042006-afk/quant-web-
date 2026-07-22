import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ContactPage from '../components/ContactPage';

// Mock the api module
vi.mock('../api', () => ({
  default: { post: vi.fn() },
  getRecaptchaToken: vi.fn().mockResolvedValue('mock-token'),
  sendAdminEmail: vi.fn().mockResolvedValue(),
  sendUserEmail: vi.fn().mockResolvedValue(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactPage', () => {
  it('renders the contact form', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText(/Send Us a Message/i)).toBeInTheDocument();
  });

  it('displays the correct phone number', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText('+91 124 4077 001')).toBeInTheDocument();
  });

  it('name input has proper label association', () => {
    renderWithRouter(<ContactPage />);
    const nameInput = screen.getByPlaceholderText('John Doe');
    expect(nameInput).toHaveAttribute('id', 'name');
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('email input has proper label association', () => {
    renderWithRouter(<ContactPage />);
    const emailInput = screen.getByPlaceholderText('john@company.com');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('newsletter input has a visually hidden label', () => {
    renderWithRouter(<ContactPage />);
    const newsletterInput = screen.getByPlaceholderText('Email Address');
    expect(newsletterInput).toHaveAttribute('id', 'contact-newsletter-email');
    expect(screen.getByLabelText('Newsletter email address')).toBeInTheDocument();
  });

  it('displays trust badges', () => {
    renderWithRouter(<ContactPage />);
    expect(screen.getByText('SOC 2 Compliant')).toBeInTheDocument();
    expect(screen.getByText('HIPAA Certified')).toBeInTheDocument();
    expect(screen.getByText('ISO 27001')).toBeInTheDocument();
  });
});
