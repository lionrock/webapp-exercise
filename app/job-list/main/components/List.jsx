import React, { PureComponent } from 'react';
import CounterEmitter from './CountEmitter';
import ListItems from './ListItems';

export default class List extends PureComponent {
  _handleCheckAll(index) {
    CounterEmitter.emit('checkAll', index);
  }

  render() {
    const jobList = this.props.data;
    return (
      <div>
        {
          jobList.map((v, index) => {
            return (
              <div key={index}>
                <input type="checkbox" id={index} checked={v.checked} value={`checkbox-${index}`}
                  onChange={this._handleCheckAll.bind(this, index)} />
                <span>{v.depart}</span>
                <span>{v.total}</span>
                <ListItems items={v.subJobs} index={index} />
              </div>
            );
          })
        }
      </div>
    );
  }
}
