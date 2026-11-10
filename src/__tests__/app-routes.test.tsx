import { renderRouter } from 'expo-router/testing-library';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

const APP_DIRECTORY = 'src/app';

describe('app routes', () => {
  it('opens the shopping deep link inside the Compras tab', async () => {
    const router = await renderRouter(APP_DIRECTORY, { initialUrl: '/shopping' });

    expect(router.getSegments()).toEqual(['(tabs)', '(shopping)', 'shopping']);
  });

  it('opens the root url inside the Cardápio tab', async () => {
    const router = await renderRouter(APP_DIRECTORY, { initialUrl: '/' });

    expect(router.getSegments()).toEqual(['(tabs)', '(index)']);
  });
});
