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

export const MONTH_PICKER_DATA = [
  {
    name: 'January',
    shortName: 'Jan',
    value: 'JAN',
  },
  {
    name: 'February',
    shortName: 'Feb',
    value: 'FEB',
  },
  {
    name: 'March',
    shortName: 'Mar',
    value: 'MAR',
  },
  {
    name: 'April',
    shortName: 'Apr',
    value: 'APR',
  },
  {
    name: 'May',
    shortName: 'May',
    value: 'MAY',
  },
  {
    name: 'June',
    shortName: 'Jun',
    value: 'JUN',
  },
  {
    name: 'July',
    shortName: 'Jul',
    value: 'JUL',
  },
  {
    name: 'August',
    shortName: 'Aug',
    value: 'AUG',
  },
  {
    name: 'September',
    shortName: 'Sep',
    value: 'SEP',
  },
  {
    name: 'October',
    shortName: 'Oct',
    value: 'OCT',
  },
  {
    name: 'November',
    shortName: 'Nov',
    value: 'NOV',
  },
  {
    name: 'December',
    shortName: 'Dec',
    value: 'DEC',
  },
];

export const MAIN_EXPENSES_DATA = {
  JAN: [
    {
      id: '11',
      description: 'Client visit dinner payment',
      category: CATG_FOOD,
      amount: 150,
      date: new Date('2021-01-24'),
    },
    {
      id: '12',
      description: 'Beach Visit Expense',
      category: CATG_HOLIDAY,
      amount: 2000,
      date: new Date('2021-01-24'),
    },
    {
      id: '13',
      description: 'Data recharge & Wi-FI payment',
      category: CATG_UTILITY,
      amount: 1102,
      date: new Date('2021-01-22'),
    },
    {
      id: '14',
      description: 'Shop sale purchase',
      category: CATG_SHOPPING,
      amount: 890,
      date: new Date('2021-01-25'),
    },
    {
      id: '15',
      description: 'Meals Lunch Purchase',
      category: CATG_FOOD,
      amount: 2250,
      date: new Date('2021-01-11'),
    },
  ],
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
      description:
        'Water Bill I am adding  a really long text to see how it appears on my device.',
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
    {
      id: '6',
      description: 'Electricity bill payment',
      category: CATG_UTILITY,
      amount: 196,
      date: new Date('2021-02-23'),
    },
    {
      id: '7',
      description: 'Amazon electrical shopping',
      category: CATG_SHOPPING,
      amount: 890,
      date: new Date('2021-02-25'),
    },
    {
      id: '8',
      description: 'Friday Lunch and snacks expense',
      category: CATG_FOOD,
      amount: 2250,
      date: new Date('2021-02-24'),
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
