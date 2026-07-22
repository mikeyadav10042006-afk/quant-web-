import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Stats from '../components/Stats';

describe('Stats', () => {
  it('renders the section', () => {
    render(<Stats />);
    expect(screen.getByText('Client Retention')).toBeInTheDocument();
  });

  it('displays Client Retention stat', () => {
    render(<Stats />);
    expect(screen.getByText('Client Retention')).toBeInTheDocument();
  });

  it('displays Projects Delivered stat', () => {
    render(<Stats />);
    expect(screen.getByText('Projects Delivered')).toBeInTheDocument();
  });

  it('displays AI Monitoring stat', () => {
    render(<Stats />);
    expect(screen.getByText('AI Monitoring')).toBeInTheDocument();
  });

  it('has aria-live on the counter for screen readers', () => {
    render(<Stats />);
    const liveRegions = document.querySelectorAll('[aria-live="polite"]');
    expect(liveRegions.length).toBeGreaterThanOrEqual(1);
    expect(liveRegions[0]).toHaveAttribute('aria-atomic', 'true');
  });
});
