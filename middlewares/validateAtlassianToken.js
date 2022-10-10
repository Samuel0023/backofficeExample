const createHttpError = require('http-errors')

exports.validateAtlassianToken = async (req, res, next) => {
  const token = req.header('atl-token')
  try {
    const name = await 'Soy el token'
    console.log(name, token)
    next()
  } catch (err) {
    const httpError = createHttpError(
      404,
      'invalid Atlassian Token',
    )
    next(httpError)
  }
}
