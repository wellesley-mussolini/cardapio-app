export type CategoryAisle = 'hortifruti' | 'acougue' | 'mercearia' | 'padaria';

export type Ingredient = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: CategoryAisle;
};

export type Recipe = {
  id: string;
  title: string;
  prepTime: number;
  image: string;
  ingredients: Ingredient[];
};

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type MealSlot = 'lunch' | 'dinner';

export type DayMealPlan = {
  day: WeekDay;
  lunch: Recipe | null;
  dinner: Recipe | null;
};

export type ShoppingItem = {
  key: string;
  ingredientId: string;
  name: string;
  totalAmount: number;
  unit: string;
  category: CategoryAisle;
};

export type ShoppingSection = {
  category: CategoryAisle;
  title: string;
  data: ShoppingItem[];
};

export type MealPlanner = {
  weekPlan: DayMealPlan[];
  aggregatedIngredients: ShoppingItem[];
  addRecipe: (day: WeekDay, slot: MealSlot, recipe: Recipe) => void;
  removeRecipe: (day: WeekDay, slot: MealSlot) => void;
};

export type RecipePickerParams = {
  day?: string;
  slot?: string;
};
