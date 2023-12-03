import { MoonServiceMock } from '../mockClasses/MoonServiceMock.js'
import { MoonController } from '../../src/controllers/MoonController.js'
import { req, res, next } from '../mockObjects/requestCycleObjects.js'

const service = new MoonServiceMock()
const controller = new MoonController(service)

it('calls setPhase function correctly with response 200', async () => {
  await controller.getPhase(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls getTimes function correctly with response 200', async () => {
  await controller.getTimes(req, res, next)
  expect(res.code).toEqual(200)
})
