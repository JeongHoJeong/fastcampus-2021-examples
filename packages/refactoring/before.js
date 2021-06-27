/* eslint-disable */

const https = require('https')

// 모든 가문의 캐릭터들을 놓고 봤을 때 가장 부정적인 가문과 가장 긍정적인 가문을 알아보자.
const resultsByHouseSlugs = {}

https.get(`https://game-of-thrones-quotes.herokuapp.com/v1/houses`, (res) => {
  let jsonStr = ''
  res.setEncoding('utf-8')
  res.on('data', (data) => {
    jsonStr += data
  })
  res.on('end', () => {
    const houses = JSON.parse(jsonStr)

    let numMembersDone = 0
    let numTotalMembers = 0
    houses.forEach((house) => {
      numTotalMembers += house.members.length
    })

    houses.forEach((house) => {
      const houseSlug = house.slug
      const members = house.members

      members.forEach((member) => {
        const characterSlug = member.slug

        setTimeout(() => {
          https.get(
            `https://game-of-thrones-quotes.herokuapp.com/v1/character/${characterSlug}`,
            (res) => {
              let jsonStr = ''
              res.setEncoding('utf-8')
              res.on('data', (data) => {
                jsonStr += data
              })
              res.on('end', () => {
                const json = JSON.parse(jsonStr)
                const mergedQuotes = json[0].quotes
                  .join(' ')
                  .replace(/[^a-zA-Z0-9., ]/g, '')
                const body = JSON.stringify({
                  text: mergedQuotes,
                })

                const postReq = https.request(
                  {
                    hostname: 'sentim-api.herokuapp.com',
                    method: 'POST',
                    path: '/api/v1/',
                    headers: {
                      Accept: 'application/json; encoding=utf-8',
                      'Content-Type': 'application/json; encoding=utf-8',
                      'Content-Length': body.length,
                    },
                  },
                  (res) => {
                    let jsonStr = ''
                    console.log(body, res.statusCode, res.statusMessage)
                    res.setEncoding('utf-8')
                    res.on('data', (data) => {
                      jsonStr += data
                    })
                    res.on('end', () => {
                      const result = JSON.parse(jsonStr)

                      resultsByHouseSlugs[houseSlug] =
                        resultsByHouseSlugs[houseSlug] || []
                      resultsByHouseSlugs[houseSlug].push({
                        character: characterSlug,
                        polarity: result.result.polarity,
                      })

                      numMembersDone += 1

                      if (numMembersDone === numTotalMembers) {
                        const resultSlugs = Object.keys(resultsByHouseSlugs)
                        const finalResult = resultSlugs
                          .map((slug) => {
                            let sum = 0
                            resultsByHouseSlugs[slug].forEach(
                              (value) => (sum += value.polarity)
                            )

                            return {
                              slug,
                              polarity: sum / resultsByHouseSlugs[slug].length,
                            }
                          })
                          .sort((a, b) => a.polarity - b.polarity)

                        console.log('sorted', finalResult)
                      }
                    })
                  }
                )

                postReq.write(body)
              })
            }
          )
        }, Math.random() * 10000)
      })
    })
  })
})
