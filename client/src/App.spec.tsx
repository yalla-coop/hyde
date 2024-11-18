import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import App, { history } from './App';

function renderApp() {
  history.push('/');
  const { asFragment } = render(<App ReactGA={() => {}} />);
  return asFragment;
}

describe('App', () => {
  it('renders component', async () => {
    const asFragment = renderApp();
    //await waitFor(() => {
    //  expect(screen.queryByTestId('no-access-error')).not.toBeNull()
    //})
    expect(asFragment()).toMatchSnapshot();
  });
});
