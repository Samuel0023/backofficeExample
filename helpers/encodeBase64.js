const decodeBase64 = (phrase) => {
  const buff = Buffer.from(phrase, 'utf-8')
  return buff.toString('base64')
}

module.exports = decodeBase64
