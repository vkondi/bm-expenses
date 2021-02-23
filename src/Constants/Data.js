/**
 * Static data to be used across app
 */

import {
  CATG_SHOPPING,
  CATG_FOOD,
  CATG_UTILITY,
  CATG_HOLIDAY,
} from '@constants/Constants';

export const CATEGORIES = [
  {
    name: CATG_FOOD,
    icon: ['fas', 'hamburger'],
  },
  {
    name: CATG_SHOPPING,
    icon: ['fas', 'shopping-cart'],
  },
  {
    name: CATG_UTILITY,
    icon: ['fas', 'faucet'],
  },
  {
    name: CATG_HOLIDAY,
    icon: ['fas', 'swimmer'],
  },
];
export const CATEGORY_ICON_MAPPER = {
  CATG_FOOD: ['fas', 'hamburger'],
  CATG_SHOPPING: ['fas', 'shopping-cart'],
  CATG_UTILITY: ['fas', 'faucet'],
  CATG_HOLIDAY: ['fas', 'swimmer'],
};

export const MAIN_EXPENSES_DATA = {
  JAN: [],
  FEB: [
    {
      id: '1',
      description: 'Pizza Lunch',
      category: CATG_FOOD,
      amount: 150,
      date: new Date('2021-02-23'),
    },
    {
      id: '2',
      description: 'Weekend Tour',
      category: CATG_HOLIDAY,
      amount: 2000,
      date: new Date('2021-02-23'),
    },
    {
      id: '3',
      description: 'Water Bill I am adding  a really long text to see how it appears on my device.',
      category: CATG_UTILITY,
      amount: 196,
      date: new Date('2021-02-22'),
    },
    {
      id: '4',
      description: 'Flipkart Buy',
      category: CATG_SHOPPING,
      amount: 890,
      date: new Date('2021-02-21'),
    },
    {
      id: '5',
      description: 'Office Brunch',
      category: CATG_FOOD,
      amount: 2250,
      date: new Date('2021-02-21'),
    },
  ],
  MAR: [],
  APR: [],
  MAY: [],
  JUN: [],
  JUL: [],
  AUG: [],
  SEP: [],
  OCT: [],
  NOV: [],
  DEC: [],
};
