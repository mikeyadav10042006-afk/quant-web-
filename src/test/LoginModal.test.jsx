import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginModal from '../components/LoginModal';

// Mock the api module
vi.mock('../api', () => ({
  default: { post: vi.fn() },
}));

describe('LoginModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSuccess: vi.fn(),
  };

  it('renders when isOpen is true', () => {
    render(<LoginModal {...defaultProps} />);
    expect(screen.getByText('Admin Access')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<LoginModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Admin Access')).not.toBeInTheDocument();
  });

  it('has role="dialog" on the modal', () => {
    render(<LoginModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<LoginModal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-label on the dialog', () => {
    render(<LoginModal {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Admin login');
  });

  it('email input has proper label association', () => {
    render(<LoginModal {...defaultProps} />);
    const emailInput = screen.getByPlaceholderText('admin@quantionic.com');
    expect(emailInput).toHaveAttribute('id', 'login-email');
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('password input has proper label association', () => {
    render(<LoginModal {...defaultProps} />);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    expect(passwordInput).toHaveAttribute('id', 'login-password');
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<LoginModal {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close login modal'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<LoginModal {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when non-Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<LoginModal {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('has sign in button with aria-label', () => {
    render(<LoginModal {...defaultProps} />);
    expect(screen.getByLabelText('Sign in')).toBeInTheDocument();
  });
});
