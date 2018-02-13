import { DESTROYER, VERT, MOUSE, SHIP_DATA } from '../constants/ships';

export const initShip = (ships, x, y, size, direction) => {
  const newShips = [...ships];

  let ship = {};
  for (var i = 0; i < size; i++) {
    if (direction === 'vertical') {
      ship[`${x},${(y + i)}`] = 0;
    } else {
      ship[`${(x + i)},${y}`] = 0;
    }
  }

  newShips.push(ship);
  return newShips;
};

export const checkSalvoHit = (ships, x, y) => {
  let hitIndex;
  let shipHit = false;
  let newShips = [...ships];

  newShips.forEach((ship, index) => {
    if (typeof ship[`${x},${y}`] === 'undefined') { return; }
    shipHit = Object.assign({}, ship);
    shipHit[`${x},${y}`] = 1;
    hitIndex = index;
    newShips[hitIndex] = shipHit;
  });

  if (!shipHit) { return { ships: newShips, result: 'MISS' }; }

  const shipHitCount = Object.keys(shipHit).reduce((result, key) => {
    return result + parseInt(shipHit[key], 10);
  }, 0);

  if (shipHit && Object.keys(shipHit).length === shipHitCount) {
    newShips.splice(hitIndex, 1);
    return { ships: newShips, result: 'SUNK'};
  }

  return { ships: newShips, result: 'HIT'};
};

export const getShipsAvailable = (ships) => {
  const shipsToFilter = [];
  let availableShips = [DESTROYER, VERT, MOUSE];

  if (ships.length === 0) { return availableShips; }
  ships.forEach((ship, index) => {
    let shipHitTotal = Object.keys(ship).length;
    if (shipHitTotal === SHIP_DATA[DESTROYER].size) { shipsToFilter.push(DESTROYER); }
    if (shipHitTotal === SHIP_DATA[VERT].size) { shipsToFilter.push(VERT); }
    if (shipHitTotal === SHIP_DATA[MOUSE].size) { shipsToFilter.push(MOUSE); }
  });

  availableShips = availableShips.filter(ship => shipsToFilter.indexOf(ship) === -1);
  return availableShips;
}
