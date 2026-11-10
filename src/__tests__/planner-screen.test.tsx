import { Stack } from 'expo-router';
import { fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import PlannerScreen from '@/app/(tabs)/(index,shopping)/index';
import RecipePickerScreen from '@/app/recipe-picker';
import MealPlannerProvider from '@/providers/MealPlannerProvider';

function TestRootLayout() {
  return (
    <MealPlannerProvider>
      <Stack />
    </MealPlannerProvider>
  );
}

function renderPlannerWithPicker(initialUrl = '/') {
  return renderRouter(
    {
      _layout: TestRootLayout,
      index: PlannerScreen,
      'recipe-picker': RecipePickerScreen,
    },
    { initialUrl },
  );
}

describe('PlannerScreen', () => {
  it('renders the seven days with empty lunch and dinner slots', async () => {
    await renderPlannerWithPicker();

    for (const dayLabel of ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']) {
      expect(screen.getByText(dayLabel)).toBeOnTheScreen();
    }
    expect(screen.getAllByRole('button', { name: /^Adicionar (almoço|jantar) de / })).toHaveLength(14);
  });

  it('adds the recipe chosen in the picker to the tapped slot', async () => {
    const router = await renderPlannerWithPicker();

    await fireEvent.press(screen.getByRole('button', { name: 'Adicionar almoço de Segunda' }));

    expect(router).toHavePathname('/recipe-picker');
    expect(router).toHaveSearchParams({ day: 'monday', slot: 'lunch' });

    await fireEvent.press(screen.getByRole('button', { name: 'Macarrão à bolonhesa, 40 min' }));

    expect(router).toHavePathname('/');
    expect(screen.getByText('Macarrão à bolonhesa')).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Adicionar almoço de Segunda' })).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Adicionar jantar de Segunda' })).toBeOnTheScreen();
  });

  it('removes a planned recipe and shows the empty slot again', async () => {
    await renderPlannerWithPicker();
    await fireEvent.press(screen.getByRole('button', { name: 'Adicionar jantar de Sexta' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Omelete de legumes, 20 min' }));

    await fireEvent.press(screen.getByRole('button', { name: 'Remover jantar de Sexta' }));

    expect(screen.queryByText('Omelete de legumes')).not.toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Adicionar jantar de Sexta' })).toBeOnTheScreen();
  });

  it('refuses to plan a meal when the picker is opened with an invalid day or slot', async () => {
    await renderPlannerWithPicker('/recipe-picker?day=funday&slot=brunch');

    expect(screen.getByText('Refeição inválida')).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: /min$/ })).not.toBeOnTheScreen();
  });
});
