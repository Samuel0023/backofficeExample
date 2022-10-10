const { Router } = require('express')
const { getDone } = require('../../controllers/requirements')
// const { validateAtlassianToken } = require('../../middlewares/validateAtlassianToken')

const requirementsRouter = Router()

requirementsRouter.get('/', getDone)

module.exports = requirementsRouter
