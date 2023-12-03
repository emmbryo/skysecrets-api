import { AuroraServiceMock } from '../mockClasses/AuroraServiceMock.js'
import { AuroraController } from '../../src/controllers/AuroraController.js'
import { req, res, next } from '../mockObjects/requestCycleObjects.js'

const service = new AuroraServiceMock()
const controller = new AuroraController(service)

it('calls getAuroraParams function correctly with response 200', async () => {
  await controller.getAuroraParams(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls getmagneticLatitude function correctly with response 200', async () => {
  await controller.getMagneticLatitude(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls getChanceForAurora function correctly with response 200', async () => {
  await controller.getChanceForAurora(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls getAuroraAnalysis function correctly with response 200', async () => {
  await controller.getAuroraAnalysis(req, res, next)
  expect(res.code).toEqual(200)
})
