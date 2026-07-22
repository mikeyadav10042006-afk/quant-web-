import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockPost: vi.fn(),
  mockGetRecaptchaToken: vi.fn(),
  mockSendAdminEmail: vi.fn(),
  mockSendUserEmail: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { post: (...args) => mocks.mockPost(...args) },
  getRecaptchaToken: (...args) => mocks.mockGetRecaptchaToken(...args),
  sendAdminEmail: (...args) => mocks.mockSendAdminEmail(...args),
  sendUserEmail: (...args) => mocks.mockSendUserEmail(...args),
}));

import ContactPage from '../components/ContactPage';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ContactPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockGetRecaptchaToken.mockResolvedValue('mock-recaptcha-token');
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('form submit triggers API call with correct data and shows success', async () => {
    mocks.mockPost.mockResolvedValueOnce({ data: { success: true } });
    mocks.mockSendAdminEmail.mockResolvedValueOnce({});
    mocks.mockSendUserEmail.mockResolvedValueOnce({});

    renderWithRouter(<ContactPage />);

    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Rahul Sharma');
    await userEvent.type(screen.getByPlaceholderText('john@company.com'), 'rahul@test.com');
    await userEvent.type(screen.getByPlaceholderText('Your company'), 'Test Corp');
    await userEvent.type(screen.getByPlaceholderText('How can we help?'), 'AI Integration');
    await userEvent.type(screen.getByPlaceholderText(/Tell us about your project/), 'Need AI chatbot');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(mocks.mockGetRecaptchaToken).toHaveBeenCalledWith('contact_form');
    });

    await waitFor(() => {
      expect(mocks.mockPost).toHaveBeenCalledWith('/api/consultations', {
        name: 'Rahul Sharma',
        email: 'rahul@test.com',
        enterprise: 'Test Corp',
        requirements: 'Need AI chatbot',
        recaptchaToken: 'mock-recaptcha-token',
      });
    });

    await waitFor(() => {
      expect(mocks.mockSendAdminEmail).toHaveBeenCalled();
      expect(mocks.mockSendUserEmail).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it('form submit blocks if required fields are empty', async () => {
    renderWithRouter(<ContactPage />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(mocks.mockPost).not.toHaveBeenCalled();
    });
    expect(mocks.mockGetRecaptchaToken).not.toHaveBeenCalled();
  });

  it('shows error message when API call fails', async () => {
    mocks.mockPost.mockRejectedValueOnce(new Error('Network Error'));

    renderWithRouter(<ContactPage />);

    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Test User');
    await userEvent.type(screen.getByPlaceholderText('john@company.com'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText(/Tell us about your project/), 'Some message');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('newsletter submit triggers API call with correct data', async () => {
    mocks.mockPost.mockResolvedValueOnce({ data: { success: true } });
    mocks.mockSendAdminEmail.mockResolvedValueOnce({});
    mocks.mockSendUserEmail.mockResolvedValueOnce({});

    renderWithRouter(<ContactPage />);

    const newsletterInput = screen.getByPlaceholderText('Email Address');
    await userEvent.type(newsletterInput, 'subscriber@test.com');

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(mocks.mockGetRecaptchaToken).toHaveBeenCalledWith('newsletter');
    });

    await waitFor(() => {
      expect(mocks.mockPost).toHaveBeenCalledWith('/api/newsletter', {
        email: 'subscriber@test.com',
        recaptchaToken: 'mock-recaptcha-token',
      });
    });

    await waitFor(() => {
      expect(screen.getAllByText(/subscribed|success/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('newsletter shows duplicate email error on 409 response', async () => {
    const error409 = new Error('Conflict');
    error409.response = { status: 409 };
    mocks.mockPost.mockRejectedValueOnce(error409);

    renderWithRouter(<ContactPage />);

    const newsletterInput = screen.getByPlaceholderText('Email Address');
    await userEvent.type(newsletterInput, 'existing@test.com');

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    await waitFor(() => {
      expect(screen.getByText(/already subscribed/i)).toBeInTheDocument();
    });
  });

  it('form submit disables button while loading', async () => {
    mocks.mockPost.mockReturnValueOnce(new Promise(() => {}));

    renderWithRouter(<ContactPage />);

    await userEvent.type(screen.getByPlaceholderText('John Doe'), 'Test');
    await userEvent.type(screen.getByPlaceholderText('john@company.com'), 't@t.com');
    await userEvent.type(screen.getByPlaceholderText(/Tell us about your project/), 'msg');

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });
});
