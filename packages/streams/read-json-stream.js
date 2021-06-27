// @ts-check

const fs = require('fs')

/**
 * @param {number} highWaterMark
 */
function sumDataFromFile(highWaterMark) {
  const { log } = console

  log(`Summing with highWaterMark`, highWaterMark)

  const rs = fs.createReadStream('jsons', {
    encoding: 'utf-8',
    highWaterMark,
  })

  let sum = 0
  let jsonStrAccumulated = ''

  rs.on('data', (chunk) => {
    if (typeof chunk !== 'string') {
      return
    }

    jsonStrAccumulated += chunk

    const lastNewlineIndex = jsonStrAccumulated.lastIndexOf('\n')

    if (lastNewlineIndex === -1) {
      return
    }

    const candidate = jsonStrAccumulated.substring(0, lastNewlineIndex)
    jsonStrAccumulated = jsonStrAccumulated.substring(lastNewlineIndex)

    candidate
      .split('\n')
      .map((jsonStr) => {
        try {
          return JSON.parse(jsonStr)
        } catch {
          return undefined
        }
      })
      .filter((json) => json)
      .map((json) => json.data)
      .forEach((data) => {
        sum += data
      })
  })

  rs.on('end', () => {
    log(`Total sum of data: `, sum)
  })
}

for (let watermark = 1; watermark <= 50; watermark += 1) {
  sumDataFromFile(watermark)
}
