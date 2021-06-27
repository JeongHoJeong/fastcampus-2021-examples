// @ts-check

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const { promisify } = require('util')

const { log } = console

/**
 * @param {string} fileName
 */
async function compress(fileName) {
  return promisify(stream.pipeline)(
    fs.createReadStream(fileName),
    zlib.createGzip(),
    fs.createWriteStream(`${fileName}.gz`)
  )
}

/**
 * @param {string} fileName
 */
async function unzip(fileName) {
  return promisify(stream.pipeline)(
    fs.createReadStream(fileName),
    zlib.createGunzip(),
    fs.createWriteStream(`${fileName}.deflated`)
  )
}

async function main() {
  log('compressing...')
  await compress('local/big-file')
  log('deflating...')
  await unzip('local/big-file.gz')
}

main()
