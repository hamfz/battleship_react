import React, { Component } from 'react';

class GridItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragOver: false,
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDragOver(evt) {
    evt.preventDefault();
    this.setState({
      dragOver: true,
    });
  }

  handleDragLeave(evt) {
    evt.preventDefault();
    this.setState({
      dragOver: false,
    });
  }

  handleDrop(evt) {
    evt.preventDefault();

    this.setState({
      dragOver: false,
    });

    if (evt && evt.dataTransfer) {
      evt.stopPropagation();
      const shipData = JSON.parse(evt.dataTransfer.getData('text'));

      this.props.handleDrop(shipData, this.props.x, this.props.y);
    }
  }

  handleClick() {
    if (this.props.item !== 0) { return false; }
    this.props.handleClick(this.props.x, this.props.y);
  }

  render() {
    let emptyItem;
    if (this.props.item === 0) {
      emptyItem = this.state.dragOver ? ' ' : '-';
    }

    return (
      <span
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        onClick={this.handleClick}
      >
      {
        this.props.item === 0 ?
          <span>|{ emptyItem }|</span>
        :
          <span>|{ this.props.item }|</span>
      }
      </span>
    );
  }
}

export default GridItem;
