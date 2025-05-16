import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BaseButton from '../../../components/ui/base-button/BaseButton';

describe('BaseButton', () => {
  it('renders button with correct text and attributes', () => {
    const mockClick = vi.fn();

    render(
      <BaseButton
        type="button"
        title="Click me"
        className="test-button"
        onClick={mockClick}
        disabled={false}
      >
        Click me
      </BaseButton>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('test-button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  it('calls onClick when clicked (user-event)', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(
      <BaseButton
        type="button"
        title="Click me"
        className="test-button"
        onClick={mockClick}
        disabled={false}
      >
        Click me
      </BaseButton>,
    );

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled (user-event)', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    render(
      <BaseButton
        type="button"
        title="Disabled button"
        className="test-button"
        onClick={mockClick}
        disabled
      >
        Disabled
      </BaseButton>,
    );

    const button = screen.getByRole('button', { name: /disabled/i });
    await user.click(button);

    expect(mockClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });
});
