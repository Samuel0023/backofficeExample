const { Router } = require('express')
const { get } = require('../../controllers/requirements')
// const { validateAtlassianToken } = require('../../middlewares/validateAtlassianToken')

const requirementsRouter = Router()

requirementsRouter.get('/:projectId', get)

module.exports = requirementsRouter
