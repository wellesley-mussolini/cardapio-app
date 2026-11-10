import type { MealSlot, WeekDay } from '@/types/meal';

export const WEEK_DAYS: WeekDay[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const MEAL_SLOTS: MealSlot[] = ['lunch', 'dinner'];

export const WEEK_DAY_LABELS: Record<WeekDay, string> = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export const MEAL_SLOT_LABELS: Record<MealSlot, string> = {
  lunch: 'Almoço',
  dinner: 'Jantar',
};
