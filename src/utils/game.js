import { SHIP_DATA } from '../constants/ships';

export const calculateGameReady = (shipsA, shipsB) => {
  if (shipsA.length + shipsB.length === (Object.keys(SHIP_DATA).length * 2)) {
    return true;
  }
  return false;
}

export const calculateGameOver = (ships) => {
  if (ships.length === 0) {
    return true;
  }
  return false;
};
