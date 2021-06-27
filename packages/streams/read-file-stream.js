// @ts-check

const { log } = console

const fs = require('fs')
const { bigFileName } = require('./common')

const rs = fs.createReadStream(bigFileName, {
  encoding: 'utf-8',
  highWaterMark: 65536 * 4,
})

let count = 0

/** @type {Object.<string, number>} */
const numChunksPerCharacter = {
  a: 0,
  b: 0,
}

/** @type {string} */
let currentChunkCharacter

rs.on('data', (data) => {
  count += 1
  if (typeof data === 'string') {
    for (let i = 0; i < data.length; i += 1) {
      const currentCharacter = data.charAt(i)
      if (currentChunkCharacter !== currentCharacter && currentCharacter) {
        currentChunkCharacter = currentCharacter
        numChunksPerCharacter[currentCharacter] += 1
      }
    }
  } else {
    log(`Given chunk is not a string!`)
  }
})

rs.on('end', () => {
  log(`Total ${count} chunks.`)
  log(numChunksPerCharacter)
})
