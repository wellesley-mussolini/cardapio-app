import type { Recipe } from '@/types/meal';

const recipesMock: Recipe[] = [
  {
    id: 'rec_frango_legumes',
    title: 'Frango grelhado com legumes',
    prepTime: 35,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400',
    ingredients: [
      { id: 'ing_peito_frango', name: 'Peito de frango', amount: 500, unit: 'g', category: 'acougue' },
      { id: 'ing_cebola', name: 'Cebola', amount: 1, unit: 'un', category: 'hortifruti' },
      { id: 'ing_abobrinha', name: 'Abobrinha', amount: 2, unit: 'un', category: 'hortifruti' },
      { id: 'ing_azeite', name: 'Azeite', amount: 30, unit: 'ml', category: 'mercearia' },
    ],
  },
  {
    id: 'rec_macarrao_bolonhesa',
    title: 'Macarrão à bolonhesa',
    prepTime: 40,
    image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400',
    ingredients: [
      { id: 'ing_carne_moida', name: 'Carne moída', amount: 400, unit: 'g', category: 'acougue' },
      { id: 'ing_cebola', name: 'Cebola', amount: 2, unit: 'un', category: 'hortifruti' },
      { id: 'ing_tomate', name: 'Tomate', amount: 4, unit: 'un', category: 'hortifruti' },
      { id: 'ing_macarrao', name: 'Macarrão espaguete', amount: 500, unit: 'g', category: 'mercearia' },
      { id: 'ing_azeite', name: 'Azeite', amount: 20, unit: 'ml', category: 'mercearia' },
    ],
  },
  {
    id: 'rec_sanduiche_natural',
    title: 'Sanduíche natural',
    prepTime: 15,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
    ingredients: [
      { id: 'ing_pao_forma', name: 'Pão de forma integral', amount: 4, unit: 'fatias', category: 'padaria' },
      { id: 'ing_tomate', name: 'Tomate', amount: 1, unit: 'un', category: 'hortifruti' },
      { id: 'ing_alface', name: 'Alface', amount: 1, unit: 'maço', category: 'hortifruti' },
      { id: 'ing_peito_frango', name: 'Peito de frango', amount: 150, unit: 'g', category: 'acougue' },
    ],
  },
  {
    id: 'rec_omelete',
    title: 'Omelete de legumes',
    prepTime: 20,
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400',
    ingredients: [
      { id: 'ing_ovo', name: 'Ovo', amount: 3, unit: 'un', category: 'mercearia' },
      { id: 'ing_cebola', name: 'Cebola', amount: 0.5, unit: 'un', category: 'hortifruti' },
      { id: 'ing_tomate', name: 'Tomate', amount: 1, unit: 'un', category: 'hortifruti' },
      { id: 'ing_pao_frances', name: 'Pão francês', amount: 2, unit: 'un', category: 'padaria' },
    ],
  },
];

export default recipesMock;
