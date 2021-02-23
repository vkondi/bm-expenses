/**
 *
 * Collection of commonly used utility methods
 *
 */
import {
  CATG_SHOPPING,
  CATG_FOOD,
  CATG_UTILITY,
  CATG_HOLIDAY,
} from '@constants/Constants';

export function getCategoryIcon(category) {
  switch (category) {
    case CATG_SHOPPING:
      return ['fas', 'shopping-cart'];
    case CATG_FOOD:
      return ['fas', 'hamburger'];
    case CATG_UTILITY:
      return ['fas', 'faucet'];
    case CATG_HOLIDAY:
      return ['fas', 'swimmer'];
    default:
      return ['fas', 'coins'];
  }
}