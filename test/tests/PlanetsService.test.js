import { PlanetsService } from '../../src/services/PlanetsService.js'
import { server, rest } from '../testServer.js'

const service = new PlanetsService()

it('fetches correctly', async () => {
  const response = await service.getPlanet('planet name', 0, 0)
  expect(typeof response).toEqual('boolean')
})

it('calls getObjectsAboveHorizon correctly with object response', async () => {
  const response = await service.getObjectsAboveHorizon(59, 16)
  expect(response.data[0].name).toEqual('Planet')
})

it('on failure', async () => {
  server.use(
    rest.get('https://api.visibleplanets.dev/v3', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(service.getObjectsAboveHorizon()).rejects.toThrow('Something went wrong with the fetch')
})
