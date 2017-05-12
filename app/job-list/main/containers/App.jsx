
import React, { PureComponent } from 'react';
import List from '../components/List';
import CounterEmitter from '../components/CountEmitter';

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
        job.total = 0;
        job.checked = false;
        job.subJobs = job.subJobs.map(subItem => {
          subItem.checked = false;
          return subItem;
        });
        return job;
      }),
    };
  }

  componentDidMount() {
    CounterEmitter.addListener('checkOne', (index, subIndex) => {
      console.log(`CheckOne: ${index} - ${subIndex}`);
      const jobs = this.state.jobs;
      jobs[index].subJobs[subIndex].checked = !jobs[index].subJobs[subIndex].checked;
      jobs[index].subJobs = [...jobs[index].subJobs];
      this.setState({
        jobs: [...jobs],
      });
    });

    CounterEmitter.addListener('checkAll', (index) => {
      console.log(`CheckAll: ${index}`);
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
    console.log(this.state);
    return (
      <div
        id="jobListRoot">
        <div>招聘职位</div>
        <button onClick={this.clearAll.bind(this)}>清空</button>
        <List data={this.state.jobs} />
      </div>
    );
  }

}
