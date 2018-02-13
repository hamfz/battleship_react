import React, { Component } from 'react';
import { SHIP_DATA } from '../constants/ships';

class ShipMapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentShip: null,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
  }

  handleDragStart(evt) {
    evt.dataTransfer.setData("text", JSON.stringify(SHIP_DATA[this.state.currentShip]));
    evt.dataTransfer.setDragImage(evt.target.cloneNode(true), 0, 0);
  }

  render() {
    return (
      <div>
        {
          this.props.availableShips.map((ship) => {
            return (
              <div key={ship}>
                <img
                  draggable="true"
                  onMouseDown={() => this.setState({ currentShip: ship})}
                  onDragStart={this.handleDragStart}
                  alt={ship}
                  src={SHIP_DATA[ship].img}
                />
                <br/>
              </div>
            );
          })
        }
        {
          this.props.availableShips.length === 0 ?
            <button onClick={this.props.handleClick}>Done</button>
          :
            null
        }
      </div>
    );
  }
}

export default ShipMapper;
