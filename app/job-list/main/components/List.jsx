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
          jobList.map((job, index) => {
            return (
              <div key={index}>
                <div className={styles.container}>
                  <div className={styles.left}>
                    <CheckBox checked={job.checked} onChange={this._handleCheckAll.bind(this, index)} />
                    <span className={styles.title_depart}>{job.depart}</span>
                    <div className={job.collapsed ? styles.arrow_up : styles.arrow_down} onClick={this._handleCollapse.bind(this, index)}></div>
                  </div>
                  <div className={styles.right}>
                    <span className={[styles.span_total, styles.badge].join(' ')}>{job.total}</span>
                  </div>
                </div>
                <div className={job.collapsed ? [styles.panel, styles.panel_hidden].join(' ') : styles.panel}>
                  <ListItems items={job.subJobs} index={index} />
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
