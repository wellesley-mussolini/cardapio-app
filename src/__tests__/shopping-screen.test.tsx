import { fireEvent, render, screen } from '@testing-library/react-native';
import { type PropsWithChildren, useEffect } from 'react';

import ShoppingScreen from '@/app/(tabs)/(index,shopping)/shopping';
import useMealPlanner from '@/hooks/useMealPlanner';
import recipesMock from '@/mock/recipesMock';
import MealPlannerProvider from '@/providers/MealPlannerProvider';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}));

const [frangoComLegumes, macarraoBolonhesa] = recipesMock;

function PlannedWeekSetup({ children }: PropsWithChildren) {
  const { addRecipe } = useMealPlanner();
  useEffect(() => {
    addRecipe('monday', 'lunch', frangoComLegumes);
    addRecipe('tuesday', 'dinner', macarraoBolonhesa);
  }, [addRecipe]);
  return children;
}

function renderShoppingScreenWithPlannedWeek() {
  return render(
    <MealPlannerProvider>
      <PlannedWeekSetup>
        <ShoppingScreen />
      </PlannedWeekSetup>
    </MealPlannerProvider>,
  );
}

describe('ShoppingScreen', () => {
  it('lists the aggregated ingredients under their supermarket aisle', async () => {
    await renderShoppingScreenWithPlannedWeek();

    expect(screen.getByText('Hortifrúti')).toBeOnTheScreen();
    expect(screen.getByText('Açougue')).toBeOnTheScreen();
    expect(screen.getByText('Mercearia')).toBeOnTheScreen();
    expect(screen.queryByText('Padaria')).not.toBeOnTheScreen();
    expect(screen.getByRole('checkbox', { name: 'Cebola, 3 un' })).toBeOnTheScreen();
    expect(screen.getByRole('checkbox', { name: 'Peito de frango, 500 g' })).toBeOnTheScreen();
  });

  it('strikes through and dims an item after tapping it, and restores it on the second tap', async () => {
    await renderShoppingScreenWithPlannedWeek();
    const cebolaRow = screen.getByRole('checkbox', { name: 'Cebola, 3 un' });

    await fireEvent.press(cebolaRow);

    expect(cebolaRow).toBeChecked();
    expect(screen.getByText('Cebola')).toHaveStyle({ textDecorationLine: 'line-through' });
    expect(cebolaRow).toHaveStyle({ opacity: 0.4 });
    expect(screen.getByText('1 de 7 comprados')).toBeOnTheScreen();

    await fireEvent.press(cebolaRow);

    expect(cebolaRow).not.toBeChecked();
    expect(screen.getByText('Cebola')).not.toHaveStyle({ textDecorationLine: 'line-through' });
    expect(cebolaRow).toHaveStyle({ opacity: 1 });
  });

  it('shows an empty state when no meal is planned', async () => {
    await render(
      <MealPlannerProvider>
        <ShoppingScreen />
      </MealPlannerProvider>,
    );

    expect(screen.getByText('Sua lista está vazia')).toBeOnTheScreen();
    expect(screen.queryByRole('checkbox')).not.toBeOnTheScreen();
  });
});
