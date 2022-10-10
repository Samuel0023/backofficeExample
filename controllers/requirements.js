const createHttpError = require('http-errors')
const { getDone } = require('../services/requirements/cantDone')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  getDone: catchAsync(async (req, res, next) => {
    try {
      const response = await getDone()
      endpointResponse({
        res,
        message: 'Requirements retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving requirements] - [requirements - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
