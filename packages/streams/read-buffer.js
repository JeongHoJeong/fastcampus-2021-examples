// @ts-check

const { log } = console

const fs = require('fs')

const { bigFileName } = require('./common')

const data = fs.readFileSync(bigFileName, 'utf-8')

/** @type {string | undefined} */
let currentChunkCharacter

/** @type {Object.<string, number>} */
const numChunksPerCharacter = {
  a: 0,
  b: 0,
}

for (let i = 0; i < data.length; i += 1) {
  const currentCharacter = data.charAt(i)
  if (currentChunkCharacter !== currentCharacter && currentCharacter) {
    currentChunkCharacter = currentCharacter
    numChunksPerCharacter[currentCharacter] += 1
  }
}

log(numChunksPerCharacter)
