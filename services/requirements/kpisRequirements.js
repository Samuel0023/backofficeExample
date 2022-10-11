const { ErrorObject } = require('../../helpers/error')
const KpisRequiriments = require('./requirements')

const statusKeys = {
  inProgress: 'indeterminate',
  finished: 'done',
  canceled: 'canceled',
}
const kpisRequeriments = new KpisRequiriments()

exports.getFinished = async () => {
  try {
    const response = kpisRequeriments.countRequirements(statusKeys.finished)
    return response
  } catch (err) {
    throw new ErrorObject(err.message, err.statusCode || 500)
  }
}

exports.getCanceled = async () => {
  try {
    const response = kpisRequeriments.countRequirements(statusKeys.canceled)
    return response
  } catch (err) {
    throw new ErrorObject(err.message, err.statusCode || 500)
  }
}

exports.getInProgress = async () => {
  try {
    const response = kpisRequeriments.countRequirements(statusKeys.inProgress)
    return response
  } catch (err) {
    throw new ErrorObject(err.message, err.statusCode || 500)
  }
}

exports.getStats = async (projectId, dateInit, dateEnd) => {
  try {
    await kpisRequeriments.setRequirimentsData(projectId, dateInit, dateEnd)
    const finished = kpisRequeriments.countRequirements(statusKeys.finished)
    const canceled = kpisRequeriments.countRequirements(statusKeys.canceled)
    const inProgress = kpisRequeriments.countRequirements(statusKeys.inProgress)

    const response = {
      projectId,
      finished,
      canceled,
      inProgress,
    }
    return response
  } catch (err) {
    throw new ErrorObject(err.message, err.statusCode || 500)
  }
}
