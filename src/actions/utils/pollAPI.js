class PollAPI {
  constructor(interval = 1000) {
    this.interval = interval;
    this.timer;
    this.pollingFn;
  }

  setFn(pollingFn) {
    this.pollingFn = pollingFn;
  }

  start() {
    console.log('startttt')
    this.timer = setInterval(this.pollingFn, this.interval);
  }

  stop() {
    console.log('stopppp')

    clearInterval(this.timer);
  }
}

export default new PollAPI();
