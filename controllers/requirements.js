const createHttpError = require('http-errors')
const { getStats } = require('../services/requirements/kpisRequirements')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    const { params: { projectId }, body: { dateInit, dateEnd } } = req
    try {
      const response = await getStats(projectId, dateInit, dateEnd)
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
