import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import { makeGrid, placeShipGrid, markSalvoGrid  } from '../utils/grid';
import { initShip, checkSalvoHit, getShipsAvailable } from '../utils/ship';
import { calculateGameReady, calculateGameOver } from '../utils/game';

import { DESTROYER, VERT, MOUSE } from '../constants/ships';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('makes grid correctly', () => {
  const testGrid = [[0,0],[0,0]];
  expect(makeGrid(2)).toEqual(testGrid);
});

it('places ship on grid correctly if available', () => {
  const testGrid = [['s',0,0,0],['s',0,0,0],[0,0,0,0],[0,0,0,0]];
  expect(placeShipGrid(makeGrid(4), 0, 0, 2, 'vertical')).toEqual(testGrid);
});

it('doesnt place ship if not available', () => {
  const testGrid = [['s',0,0,0],['s',0,0,0],[0,0,0,0]];
  expect(placeShipGrid(testGrid, 2, 2, 3, 'vertical')).toEqual(false);
});

it('marks grid with fired salvo', () => {
  const testGrid = [[0,0],[0,0]];
  const xMark = [[0,0],[0,'x']];
  const missMark = [[0,0],[0,'*']];

  expect(markSalvoGrid(testGrid, 1, 1, 'HIT')).toEqual(xMark);
  expect(markSalvoGrid(testGrid, 1, 1, 'SUNK')).toEqual(xMark);
  expect(markSalvoGrid(testGrid, 1, 1, 'MISS')).toEqual(missMark);
});


it('salvo hits ship if ship at location', () => {
  const testShips = [
    { '0,1': 0 },
    {
      '1,2': 0,
      '1,3': 0,
    },
  ];

  const sunk = checkSalvoHit(testShips, 0, 1);
  expect(sunk.result).toEqual('SUNK');

  const hit = checkSalvoHit(testShips, 1, 2);
  expect(hit.result).toEqual('HIT');

  const miss = checkSalvoHit(testShips, 4, 1);
  expect(miss.result).toEqual('MISS')
});

it('should remove ship if ship sunk', () => {
  const testShips = [
    { '0,1': 0 },
  ];

  const sunk = checkSalvoHit(testShips, 0, 1);
  expect(sunk.ships).toEqual([]);
});

it('should add a ship', () => {
  let testShips = [];

  testShips = initShip(testShips, 1, 1, 3, 'vertical');
  expect(testShips.length).toEqual(1);
});

it('should filter ship list', () => {
  const testShips = [
    {
      '1,2': 0,
      '1,3': 0,
    },
  ];

  const availableShips = getShipsAvailable(testShips);
  expect(availableShips).toEqual([DESTROYER, VERT]);
});

it('should know game is ready when players have placed all ships', () => {
  const testShips = [
    { '1,1': 0 },
    {
      '1,2': 0,
      '1,3': 0,
    },
    { '2,2': 0 },
  ];

  const testShips2 = [
    { '1,1': 0 },
    {
      '1,2': 0,
      '1,3': 0,
    },
    { '2,2': 0 },
  ];

  expect(calculateGameReady(testShips, [])).toEqual(false);
  expect(calculateGameReady(testShips, testShips2)).toEqual(true);
});

it('should know when game is over when one players ships are empty', () => {
  const testShips = [];
  const testShips2 = [
    { '1,1': 0},
  ];

  expect(calculateGameOver(testShips)).toEqual(true);
  expect(calculateGameOver(testShips2)).toEqual(false);
});
