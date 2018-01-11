let through = require('through2')
let Counter = require('./counter.js')
let Well = require('./well.js')
let Zipper = require('./zipper.js')

let numberSource = new Counter()
let newLines = new Well('\n')

let zipper = new Zipper(numberSource, newLines)

zipper.pipe(process.stdout)
