import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { AudioManager } from './audio/AudioManager';

jest.mock('./audio/AudioManager');

describe('App', () => {
  it('initializes AudioManager when the button is clicked', () => {
    const mockInitialize = jest.fn();
    AudioManager.prototype.initialize = mockInitialize;

    render(<App />);
    const button = screen.getByText(/Begin/i);
    fireEvent.click(button);

    expect(mockInitialize).toHaveBeenCalled();
  });
});
