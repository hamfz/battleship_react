import React, { Component } from 'react';

import { makeGrid, placeShipGrid, markSalvoGrid  } from './utils/grid';
import { initShip, checkSalvoHit, getShipsAvailable } from './utils/ship';
import { calculateGameReady, calculateGameOver } from './utils/game';

import GridItem from './components/gridItem';
import ShipMapper from './components/shipMapper';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = this.initialState();

    this.switchPlayer = this.switchPlayer.bind(this);
    this.getOppositeTurn = this.getOppositeTurn.bind(this);
    this.getPlayerData = this.getPlayerData.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
    this.handleGridDrop = this.handleGridDrop.bind(this);
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.renderGameOver = this.renderGameOver.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.gameReady && this.state.gameReady) {
      // reuse boards for representing enemy tiles
      this.setState({
        aBoard: makeGrid(8),
        bBoard: makeGrid(8),
      });
    }
  }

  initialState() {
    return {
      aBoard: makeGrid(8),
      aShips: [],
      bBoard: makeGrid(8),
      bShips: [],
      turn: 'a',
      gameReady: false,
      gameOver: false,
    };
  }

  switchPlayer() {
    this.setState({
      turn: this.getOppositeTurn(),
      gameReady: this.state.gameReady ? true : calculateGameReady(this.state.aShips, this.state.bShips),
    });
  }

  getOppositeTurn() {
    return this.state.turn === 'a' ? 'b' : 'a';
  }

  getPlayerData(turn) {
    const { [`${turn}Board`]: board, [`${turn}Ships`]: ships} = this.state;
    return { player: turn, board, ships };
  }

  handleGridClick(x, y) {
    if (!this.state.gameReady) { return false; }
    const currentPlayer = this.getPlayerData(this.state.turn);
    const enemyPlayer = this.getPlayerData(this.getOppositeTurn());

    const checkHit = checkSalvoHit(enemyPlayer.ships, x, y);
    this.setState({
      [`${currentPlayer.player}Board`]: markSalvoGrid(currentPlayer.board, x, y, checkHit.result),
      [`${enemyPlayer.player}Ships`]: checkHit.ships,
      gameOver: calculateGameOver(checkHit.ships),
    });
    alert(checkHit.result);

    this.switchPlayer();
  }

  handleGridDrop(ship, x, y) {
    const currentPlayer = this.getPlayerData(this.state.turn);
    const shipPlaced = placeShipGrid(currentPlayer.board, x, y, ship.size, ship.direction);

    if (shipPlaced) {
      this.setState({
        [`${currentPlayer.player}Board`]: shipPlaced,
        [`${currentPlayer.player}Ships`]: initShip(currentPlayer.ships, x, y, ship.size, ship.direction),
      });
    }
  }

  handlePlaceShipClick() { this.switchPlayer(); }

  handleReset() { this.setState(this.initialState); }

  renderGameOver() {
    return (
      <div>
        <h3>Player { this.getOppositeTurn().toUpperCase() } wins!</h3>
        <button onClick={this.handleReset}>Reset game</button>
      </div>
    );
  }

  render() {
    const currentPlayer = this.getPlayerData(this.state.turn);

    if (this.state.gameOver) { return this.renderGameOver(); }
    return (
      <div>
        <div>
          <h3>Player { this.state.turn.toUpperCase() }&apos;s turn</h3>
          {
            this.state.gameReady ?
              <span>Select enemy tile to attack:</span>
            :
              <span>Drag and drop your ships to the board:</span>
          }
          <br />
          <pre>
            ========================
            {
              currentPlayer.board.map((row, yIndex) => {
                return (
                  <div key={`${yIndex}_row`}>
                    {
                      row.map((column, xIndex) => {
                        return (
                          <GridItem
                            key={`${xIndex},${yIndex}_grid`}
                            x={xIndex}
                            y={yIndex}
                            handleClick={this.handleGridClick}
                            handleDrop={this.handleGridDrop}
                            item={column}
                            gameReady={this.state.gameReady}
                          />);
                      })
                    }
                    <br />
                  </div>
                );
              })
            }
          ========================
          </pre>
        </div>
        {
          this.state.gameReady ?
            null
          :
            <ShipMapper
              handleClick={this.handlePlaceShipClick}
              availableShips={getShipsAvailable(currentPlayer.ships)}
            />
        }
        <br/>
        <br/>
        <div>
          <strong>Legend</strong>
          <br />
          - : Empty / Unknown <br />
          x : Hit <br />
          * : Miss <br />
          s : Ship <br />
        </div>
      </div>
    );
  }
}

export default App;
