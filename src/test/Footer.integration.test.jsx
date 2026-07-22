import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

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

import Footer from '../components/Footer';

describe('Footer Integration', () => {
  const defaultProps = {
    onOpenChat: vi.fn(),
    onOpenAdmin: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockGetRecaptchaToken.mockResolvedValue('footer-recaptcha-token');
    localStorage.clear();
  });

  describe('Booking Form', () => {
    it('submit triggers API call with correct data and shows success', async () => {
      mocks.mockPost.mockResolvedValueOnce({ data: { success: true } });
      mocks.mockSendAdminEmail.mockResolvedValueOnce({});
      mocks.mockSendUserEmail.mockResolvedValueOnce({});

      render(<Footer {...defaultProps} />);

      await userEvent.type(screen.getByPlaceholderText('e.g. Rahul Sharma'), 'Rahul Sharma');
      await userEvent.type(screen.getByPlaceholderText('e.g. rahul@enterprise.com'), 'rahul@enterprise.com');
      await userEvent.type(screen.getByPlaceholderText('e.g. Apex Health Systems'), 'Apex Health');
      await userEvent.type(screen.getByPlaceholderText(/What automated flows/i), 'Need Salesforce integration');

      fireEvent.click(screen.getByRole('button', { name: /register consultation/i }));

      await waitFor(() => {
        expect(mocks.mockGetRecaptchaToken).toHaveBeenCalledWith('consultation');
      });

      await waitFor(() => {
        expect(mocks.mockPost).toHaveBeenCalledWith('/api/consultations', expect.objectContaining({
          name: 'Rahul Sharma',
          email: 'rahul@enterprise.com',
          enterprise: 'Apex Health',
          requirements: 'Need Salesforce integration',
          recaptchaToken: 'footer-recaptcha-token',
        }));
      });

      await waitFor(() => {
        expect(mocks.mockSendAdminEmail).toHaveBeenCalled();
        expect(mocks.mockSendUserEmail).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByText(/booked|submitted|success/i)).toBeInTheDocument();
      }, { timeout: 10000 });
    });

    it('shows success even when API fails (localStorage fallback)', async () => {
      mocks.mockPost.mockRejectedValueOnce(new Error('Server down'));

      render(<Footer {...defaultProps} />);

      await userEvent.type(screen.getByPlaceholderText('e.g. Rahul Sharma'), 'Rahul');
      await userEvent.type(screen.getByPlaceholderText('e.g. rahul@enterprise.com'), 'r@test.com');
      await userEvent.type(screen.getByPlaceholderText(/What automated flows/i), 'Integration work');

      fireEvent.click(screen.getByRole('button', { name: /register consultation/i }));

      await waitFor(() => {
        expect(screen.getByText(/booked|submitted|success/i)).toBeInTheDocument();
      }, { timeout: 10000 });

      const bookings = JSON.parse(localStorage.getItem('quant_bookings') || '[]');
      expect(bookings.length).toBe(1);
      expect(bookings[0].name).toBe('Rahul');
    });
  });

  describe('Newsletter Form', () => {
    it('submit triggers newsletter API call with correct data', async () => {
      mocks.mockPost.mockResolvedValueOnce({ data: { success: true } });
      mocks.mockSendAdminEmail.mockResolvedValueOnce({});
      mocks.mockSendUserEmail.mockResolvedValueOnce({});

      render(<Footer {...defaultProps} />);

      const newsletterInput = screen.getByPlaceholderText('Enter your enterprise email');
      await userEvent.type(newsletterInput, 'subscriber@enterprise.com');

      fireEvent.click(screen.getByRole('button', { name: /subscribe to newsletter/i }));

      await waitFor(() => {
        expect(mocks.mockGetRecaptchaToken).toHaveBeenCalledWith('newsletter');
      });

      await waitFor(() => {
        expect(mocks.mockPost).toHaveBeenCalledWith('/api/newsletter', {
          email: 'subscriber@enterprise.com',
          recaptchaToken: 'footer-recaptcha-token',
        });
      });

      await waitFor(() => {
        expect(screen.getByText(/subscribed|success|thank you/i)).toBeInTheDocument();
      }, { timeout: 10000 });
    });

    it('shows success even when newsletter API fails (localStorage fallback)', async () => {
      mocks.mockPost.mockRejectedValueOnce(new Error('Server down'));

      render(<Footer {...defaultProps} />);

      const newsletterInput = screen.getByPlaceholderText('Enter your enterprise email');
      await userEvent.type(newsletterInput, 'sub@test.com');

      fireEvent.click(screen.getByRole('button', { name: /subscribe to newsletter/i }));

      await waitFor(() => {
        expect(screen.getByText(/subscribed|success|thank you/i)).toBeInTheDocument();
      }, { timeout: 10000 });

      const subscribers = JSON.parse(localStorage.getItem('quant_subscribers') || '[]');
      expect(subscribers.length).toBe(1);
      expect(subscribers[0].email).toBe('sub@test.com');
    });
  });
});
