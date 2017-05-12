import React, { PureComponent } from 'react';
import CounterEmitter from './CountEmitter';

export default class ListItems extends PureComponent {
  _handleCheck(subIndex) {
    CounterEmitter.emit('checkOne', this.props.index, subIndex);
  }

  render() {
    const subItems = this.props.items;
    return (
      <div>
        {
          subItems.map((item, subIndex) => {
            return (
              <li key={subIndex}>
                <input type="checkbox" id={subIndex} checked={item.checked} onChange={this._handleCheck.bind(this, subIndex)} />
                <span>{item.name}</span>
                <span>{item.total}</span>
              </li>
            );
          })
        }
      </div>
    );
  }
}
