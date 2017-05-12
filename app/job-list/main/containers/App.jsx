
import React, { PureComponent } from 'react';
import List from '../components/List';
import CounterEmitter from '../components/CountEmitter';
import styles from '../styles.scss';

// mock data
const mockData = [
  {
    depart: '工程研发部门',
    subJobs: [{ name: 'Mac开发工程师', total: 9 }, { name: 'iOS App 测试工程师', total: 17 }],
  },
  {
    depart: '产品设计部门',
    subJobs: [{ name: '网页设计师', total: 47 }, { name: 'ID／工业设计师', total: 39 }],
  },
];

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jobs: mockData.map(job => {
        let count = 0;
        job.checked = false;
        job.collapsed = false;
        job.subJobs = job.subJobs.map(subItem => {
          subItem.checked = false;
          count += subItem.total;
          return subItem;
        });
        job.total = count;
        return job;
      }),
    };
  }

  componentDidMount() {
    CounterEmitter.addListener('checkOne', (index, subIndex) => {
      // console.log(`CheckOne: ${index} - ${subIndex}`);
      const jobs = this.state.jobs;
      jobs[index].subJobs[subIndex].checked = !jobs[index].subJobs[subIndex].checked;
      jobs[index].subJobs = [...jobs[index].subJobs];
      const checkedLen = jobs[index].subJobs.filter(subJob => subJob.checked).length;
      jobs[index].checked = checkedLen === jobs[index].subJobs.length;
      this.setState({
        jobs: [...jobs],
      });
    });

    CounterEmitter.addListener('checkAll', (index) => {
      // console.log(`CheckAll: ${index}`);
      const jobs = this.state.jobs;
      const job = jobs[index];
      jobs[index].subJobs = job.subJobs.map(subJob => {
        subJob.checked = !job.checked;
        return subJob;
      });
      jobs[index].checked = !job.checked;
      this.setState({
        jobs: [...jobs],
      });
    });

    CounterEmitter.addListener('collapse', (index) => {
      const jobs = this.state.jobs;
      const job = jobs[index];
      jobs[index].collapsed = !job.collapsed;
      this.setState({
        jobs: [...jobs],
      });
    });
  }

  clearAll() {
    const jobs = this.state.jobs.map(job => {
      job.checked = false;
      job.subJobs = job.subJobs.map(subJob => {
        subJob.checked = false;
        return subJob;
      });
      return job;
    });
    this.setState({
      jobs: [...jobs],
    });
  }

  render() {
    return (
      <div id="jobListRoot" className={styles.job_list}>
        <div className={styles.container}>
          <div className={styles.left}>
            <span className={styles.title}>招聘职位</span>
          </div>
          <div className={styles.right}>
            <button className={styles.btn_clear} onClick={this.clearAll.bind(this)}>清空</button>
          </div>
        </div>
        <List data={this.state.jobs} />
      </div>
    );
  }

}
