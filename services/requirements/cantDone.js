const axios = require('axios')
require('dotenv')
const { ErrorObject } = require('../../helpers/error')
const encodeBase64 = require('../../helpers/encodeBase64')

const getAuthorization = encodeBase64(`${process.env.ATLASSIAN_USERNAME}:${process.env.ATLASSIAN_TOKEN}`)
const config = {
  method: 'get',
  url: 'https://fktech.atlassian.net/rest/api/3/search?jql=project=ITOC%20AND%20type=Requerimiento%20AND%20statusCategory=Done',
  headers: {
    Authorization: `Basic ${getAuthorization}`,
  },
}

exports.getDone = async () => {
  try {
    const { data } = await axios(config)
    const response = JSON.stringify(data.total)
    console.log(response)
    return response
  } catch (err) {
    throw new ErrorObject(err.message, err.statusCode || 500)
  }
}
