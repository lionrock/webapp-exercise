import React, { PureComponent } from 'react';
import CounterEmitter from './CountEmitter';
import styles from '../styles.scss';

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
              <div key={subIndex}>
                <div className={styles.sub_container}>
                  <div className={styles.left}>
                    <input type="checkbox" id={subIndex} checked={item.checked} onChange={this._handleCheck.bind(this, subIndex)} />
                    <span className={styles.item}>{item.name}</span>
                  </div>
                  <div className={styles.right}>
                    <span className={styles.span_total}>{item.total}</span>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
