/* eslint-disable no-param-reassign */
const axios = require('axios')
require('dotenv')

const { ErrorObject } = require('../../helpers/error')
const encodeBase64 = require('../../helpers/encodeBase64')

const getAuthorization = encodeBase64(`${process.env.ATLASSIAN_USERNAME}:${process.env.ATLASSIAN_TOKEN}`)
const generateUrl = (projectId, dateInit, dateEnd) => {
  if (dateInit === null) {
    dateInit = 'startOfMonth%28%29'
  }
  if (dateEnd === null) {
    dateEnd = 'now%28%29'
  }
  return `jql=project=${projectId}%20AND%20issuetype=10010%20AND%20createdDate%3E%3D${dateInit}%20AND%20updatedDate%3C%3D${dateEnd}`
}
class KpisRequiriments {
  constructor() {
    this.authorization = getAuthorization
    this.data = []
  }

  async setRequirimentsData(projectId, dateInit = null, dateEnd = null) {
    try {
      const queryJQL = generateUrl(projectId, dateInit, dateEnd)
      const { data } = await axios({
        method: 'get',
        url: `https://fktech.atlassian.net/rest/api/3/search?${queryJQL}`,
        headers: {
          Authorization: `Basic ${getAuthorization}`,
        },
      })
      this.data = data
    } catch (error) {
      throw new ErrorObject(error.message, error.statusCode || 500)
    }
  }

  filterByState(state) {
    return this.data.issues.filter((issue) => issue.fields.status.statusCategory.key === state)
  }

  countRequirements(state) {
    const dataFiltered = this.filterByState(state)
    return dataFiltered.length
  }
}

module.exports = KpisRequiriments
