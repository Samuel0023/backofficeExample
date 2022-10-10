const { ErrorObject } = require('../../helpers/error')

exports.getEnded = async () => {
  try {
    const comments = await 'Hi comments'

    return comments
  } catch (err) {
    throw new ErrorObject(err.message, 500)
  }
}
