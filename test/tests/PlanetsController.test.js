import { PlanetsServiceMock } from '../mockClasses/PlanetsServiceMock.js'
import { PlanetsController } from '../../src/controllers/PlanetsController.js'
import { req, res, next } from '../mockObjects/requestCycleObjects.js'

const service = new PlanetsServiceMock()
const controller = new PlanetsController(service)

it('calls getIsPlanetOverHorizon function correctly with response 200', async () => {
  await controller.getIsPlanetOverHorizon(req, res, next, 'Jupiter')
  expect(res.code).toEqual(200)
})

it('calls getAllPlanet function correctly with response 200', async () => {
  await controller.getAllPLanets(req, res, next)
  expect(res.code).toEqual(200)
})
