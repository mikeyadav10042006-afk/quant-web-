import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  mockPost: vi.fn(),
}));

vi.mock('../api', () => ({
  default: { post: (...args) => mocks.mockPost(...args) },
}));

import AIConsultant from '../components/AIConsultant';

describe('AIConsultant Integration', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends message via API and displays AI response', async () => {
    mocks.mockPost.mockResolvedValueOnce({
      data: { reply: 'We offer custom AI pipelines and enterprise CRM integrations.' },
    });

    render(<AIConsultant {...defaultProps} />);

    const chatInput = screen.getByPlaceholderText(/ask about technologies/i);
    await userEvent.type(chatInput, 'What services do you offer?');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(mocks.mockPost).toHaveBeenCalledWith('/api/chat', {
        message: 'What services do you offer?',
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/we offer custom ai pipelines/i)).toBeInTheDocument();
    });
  });

  it('shows user message immediately and AI response after API reply', async () => {
    mocks.mockPost.mockResolvedValueOnce({
      data: { reply: 'Hello! How can I help you today?' },
    });

    render(<AIConsultant {...defaultProps} />);

    const chatInput = screen.getByPlaceholderText(/ask about technologies/i);
    await userEvent.type(chatInput, 'Hi there');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText('Hi there')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Hello! How can I help you today?')).toBeInTheDocument();
    });
  });

  it('shows fallback message when API fails (server offline)', async () => {
    mocks.mockPost.mockRejectedValueOnce(new Error('Network Error'));

    render(<AIConsultant {...defaultProps} />);

    const chatInput = screen.getByPlaceholderText(/ask about technologies/i);
    await userEvent.type(chatInput, 'Tell me about services');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/quantionic specializes in/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('sends suggested question and receives AI response', async () => {
    mocks.mockPost.mockResolvedValueOnce({
      data: { reply: 'We specialize in Agentic AI and Node.js development.' },
    });

    render(<AIConsultant {...defaultProps} />);

    fireEvent.click(screen.getByText(/what services does quantionic provide/i));

    await waitFor(() => {
      expect(mocks.mockPost).toHaveBeenCalledWith('/api/chat', {
        message: 'What services does Quantionic provide?',
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/agentic ai and node\.js/i)).toBeInTheDocument();
    });
  });

  it('shows loading indicator while waiting for API response', async () => {
    mocks.mockPost.mockReturnValueOnce(new Promise(() => {}));

    render(<AIConsultant {...defaultProps} />);

    const chatInput = screen.getByPlaceholderText(/ask about technologies/i);
    await userEvent.type(chatInput, 'Testing loading state');

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/ai is analyzing/i)).toBeInTheDocument();
    });
  });

  it('send button is disabled when input is empty', () => {
    render(<AIConsultant {...defaultProps} />);

    const sendBtn = screen.getByRole('button', { name: /send message/i });
    expect(sendBtn).toBeDisabled();
  });

  it('does not send empty message on submit', async () => {
    render(<AIConsultant {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(mocks.mockPost).not.toHaveBeenCalled();
  });

  it('shows booking fallback when user asks about booking', async () => {
    mocks.mockPost.mockRejectedValueOnce(new Error('fail'));

    render(<AIConsultant {...defaultProps} />);

    const chatInput = screen.getByPlaceholderText(/ask about technologies/i);

    await userEvent.type(chatInput, 'How do I book a consultation?');
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/book a technical consultation/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('dialog has proper accessibility attributes', () => {
    render(<AIConsultant {...defaultProps} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'AI Consultant chat');
  });
});
