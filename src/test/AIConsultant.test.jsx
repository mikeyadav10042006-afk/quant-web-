import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AIConsultant from '../components/AIConsultant';

// Mock the api module
vi.mock('../api', () => ({
  default: { post: vi.fn() },
}));

describe('AIConsultant', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  it('renders when isOpen is true', () => {
    render(<AIConsultant {...defaultProps} />);
    expect(screen.getByText('Quantobot')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<AIConsultant {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Quantobot')).not.toBeInTheDocument();
  });

  it('has role="dialog" on the modal', () => {
    render(<AIConsultant {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<AIConsultant {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-label on the dialog', () => {
    render(<AIConsultant {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'AI Consultant chat');
  });

  it('has a visually hidden label for the chat input', () => {
    render(<AIConsultant {...defaultProps} />);
    const input = screen.getByPlaceholderText('Ask about technologies, services or booking...');
    expect(input).toHaveAttribute('id', 'chat-input');
    expect(screen.getByLabelText('Type your message')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<AIConsultant {...defaultProps} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close AI chat'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<AIConsultant {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when non-Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<AIConsultant {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('has aria-live on messages container', () => {
    render(<AIConsultant {...defaultProps} />);
    const messagesContainer = screen.getByLabelText('AI Consultant chat').querySelector('[aria-live="polite"]');
    expect(messagesContainer).toBeInTheDocument();
  });

  it('has send button with aria-label', () => {
    render(<AIConsultant {...defaultProps} />);
    expect(screen.getByLabelText('Send message')).toBeInTheDocument();
  });
});
