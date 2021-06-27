// @ts-check
const { log } = console

const fs = require('fs')
const { bigFileName } = require('./common')

const ws = fs.createWriteStream(bigFileName)
ws.setDefaultEncoding('utf-8')

const numChunks = 500
/** @type {Object.<string, number>} */
const numChunksForCharacter = {}

for (let i = 0; i < numChunks; i += 1) {
  log(`Writing chunk ${i}...`)
  const character = i % 2 === 0 ? 'a' : 'b'
  const chunk = character.repeat(1024 * 1024)
  ws.write(chunk)

  const prevNumChunks = numChunksForCharacter[character]
  numChunksForCharacter[character] = prevNumChunks ? prevNumChunks + 1 : 1
}

log(numChunksForCharacter)
