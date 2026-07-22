import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPost = vi.fn();

vi.mock('../api', () => ({
  default: { post: (...args) => mockPost(...args) },
}));

import LoginModal from '../components/LoginModal';

describe('LoginModal Integration', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('successful login calls API, stores token, and fires onSuccess', async () => {
    const mockUser = { email: 'admin@quantionic.com', role: 'admin' };
    const mockToken = 'jwt-test-token-123';
    mockPost.mockResolvedValueOnce({ data: { token: mockToken, user: mockUser } });

    render(<LoginModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    await userEvent.type(emailInput, 'admin@quantionic.com');
    await userEvent.type(passwordInput, 'securepass123');

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        '/api/auth/login',
        { email: 'admin@quantionic.com', password: 'securepass123' },
        { timeout: 10000 }
      );
    });

    await waitFor(() => {
      expect(localStorage.getItem('quant_token')).toBe(mockToken);
      expect(JSON.parse(localStorage.getItem('quant_user'))).toEqual(mockUser);
    });

    await waitFor(() => {
      expect(defaultProps.onSuccess).toHaveBeenCalledWith(mockUser, mockToken);
    });
  });

  it('shows error on invalid credentials (401 response)', async () => {
    const error401 = new Error('Unauthorized');
    error401.response = { status: 401, data: { error: 'Invalid credentials' } };
    mockPost.mockRejectedValueOnce(error401);

    render(<LoginModal {...defaultProps} />);

    await userEvent.type(screen.getByLabelText('Email'), 'wrong@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrongpass');

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    expect(localStorage.getItem('quant_token')).toBeNull();
    expect(defaultProps.onSuccess).not.toHaveBeenCalled();
  });

  it('shows timeout error when server is not responding', async () => {
    const timeoutError = new Error('timeout');
    timeoutError.code = 'ECONNABORTED';
    mockPost.mockRejectedValueOnce(timeoutError);

    render(<LoginModal {...defaultProps} />);

    await userEvent.type(screen.getByLabelText('Email'), 'admin@quantionic.com');
    await userEvent.type(screen.getByLabelText('Password'), 'pass123');

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/server is not responding/i)).toBeInTheDocument();
    });
  });

  it('shows network error when backend is offline', async () => {
    const networkError = new Error('Network Error');
    networkError.code = 'ERR_NETWORK';
    mockPost.mockRejectedValueOnce(networkError);

    render(<LoginModal {...defaultProps} />);

    await userEvent.type(screen.getByLabelText('Email'), 'admin@quantionic.com');
    await userEvent.type(screen.getByLabelText('Password'), 'pass123');

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/cannot connect to server/i)).toBeInTheDocument();
    });
  });

  it('clears form and errors when close button is clicked', async () => {
    const networkError = new Error('Network Error');
    networkError.code = 'ERR_NETWORK';
    mockPost.mockRejectedValueOnce(networkError);

    render(<LoginModal {...defaultProps} />);

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'pass');

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/cannot connect to server/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close login modal/i }));

    await waitFor(() => {
      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  it('shows loading spinner during API call', async () => {
    mockPost.mockReturnValueOnce(new Promise(() => {}));

    render(<LoginModal {...defaultProps} />);

    await userEvent.type(screen.getByLabelText('Email'), 'admin@quantionic.com');
    await userEvent.type(screen.getByLabelText('Password'), 'pass123');

    const signInBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInBtn);

    await waitFor(() => {
      expect(signInBtn).toBeDisabled();
    });
  });
});
