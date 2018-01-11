const { Readable } = require('stream');

class Well extends Readable {
  constructor(value, opt) {
    super(opt)
    this._constant = value
  }

  _read() {
    const str = '' + this._constant;
    const buf = Buffer.from(str, 'ascii');
    this.push(buf);
  }
}

module.exports = Well
