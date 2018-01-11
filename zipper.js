// takes two streams, returns a single stream that alternates reading from the first stream to the second stream
// if one stream pauses, it will block on that stream, so stream events are guaranteed to alternate
// first event emitted by streamA will be the first event emitted by the zipper stream

let through = require('through2')
const { Readable } = require('stream');

class Zipper extends Readable {
  constructor(streamA, streamB, opt) {
    super(opt);
    this.sourceStreams = [streamA, streamB]
    this.flipper = 0
  }

  _read() { // TODO work in progress
    let nextEvent = this.sourceStreams[this.flipper].read()

    let pushNextEvent = (buf) => {
      this.flipper = (this.flipper + 1) % this.sourceStreams.length
      this.push(buf);
    }

    if (nextEvent != null) {
      pushNextEvent(nextEvent)
    } else {
      this.sourceStreams[this.flipper].once('readable', () => {
        nextEvent = this.sourceStreams[this.flipper].read()
        pushNextEvent(nextEvent)
      })
    }

  }
}

module.exports = Zipper
