import React, { PureComponent } from 'react';
import CounterEmitter from './CountEmitter';
import ListItems from './ListItems';
import CheckBox from './CheckBox';
import styles from '../styles.scss';

export default class List extends PureComponent {
  _handleCheckAll(index) {
    CounterEmitter.emit('checkAll', index);
  }

  _handleCollapse(index) {
    CounterEmitter.emit('collapse', index);
  }

  render() {
    const jobList = this.props.data;
    return (
      <div>
        {
          jobList.map((v, index) => {
            return (
              <div key={index}>
                <div className={styles.container}>
                  <div className={styles.left}>
                    <CheckBox checked={v.checked} onChange={this._handleCheckAll.bind(this, index)} />
                    <span className={styles.title_depart}>{v.depart}</span>
                    <div className={v.collapsed ? styles.arrow_up : styles.arrow_down} onClick={this._handleCollapse.bind(this, index)}></div>
                  </div>
                  <div className={styles.right}>
                    <span className={[styles.span_total, styles.badge].join(' ')}>{v.total}</span>
                  </div>
                </div>
                { v.collapsed ? '' : <ListItems items={v.subJobs} index={index} /> }
              </div>
            );
          })
        }
      </div>
    );
  }
}
