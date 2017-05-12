/**
 * Created by leo on 12/5/2017.
 */
import React, { PureComponent } from 'react';
import styles from '../styles.scss';

export default class CheckBox extends PureComponent {
  onChange() {
    this.props.onChange();
  }

  render() {
    return (
      <input className={styles.checkbox} type="checkbox" checked={this.props.checked} onChange={this.onChange.bind(this)} />
    );
  }
}
