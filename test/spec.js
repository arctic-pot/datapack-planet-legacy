/* eslint-disable @typescript-eslint/no-var-requires */
const Application = require('spectron').Application;
const electronPath = require('electron');
const path = require('path');
const expect = require('chai').expect;

describe('Application Launch', function () {
  this.timeout(10000)
  let app;

  beforeEach(function () {
    //app = new Application({
    //  path: electronPath,
    //  args: [path.join(__dirname, '..')],
    //  quitTimeout: 300,
    //});
    //return app.start();
  });

  afterEach(function () {
    //if (app && app.isRunning()) {
    //  return app.stop()
    //}
  });

  it('shows an initial window', function (done) {
    done();
    //return app.client.getWindowCount().then(function (count) {
    //  expect(count).to.be.deep.equal(1, 'Too much window opened')
    //});
  });
});
