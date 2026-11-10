import { useCallback } from 'react';

import type { RecipeOptionRowProps } from '@/types/components';

export default function useRecipeOptionRow({ recipe, onChoose }: RecipeOptionRowProps) {
  const chooseThisRecipe = useCallback(() => onChoose(recipe), [onChoose, recipe]);

  return {
    accessibilityLabel: `${recipe.title}, ${recipe.prepTime} min`,
    recipeDetails: `${recipe.prepTime} min · ${recipe.ingredients.length} ingredientes`,
    chooseThisRecipe,
  };
}
