import { MoonService } from '../../src/services/MoonService.js'
import { server, rest } from '../testServer.js'

const moonService = new MoonService()
const lat = 'XX'
const lng = 'YY'

it('fetches correctly', async () => {
  const response = await moonService.getPhase()
  expect(response.current_phase).toEqual('Waxing Crescent')
  expect(response.illumination).toEqual(56)
})

it('on failure', async () => {
  server.use(
    rest.get('http://api.farmsense.net/v1/moonphases', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(moonService.getPhase()).rejects.toThrow('Something went wrong with the fetch')
})

it('fetches moon- amd sunrise/set times correctly', async () => {
  const response = await moonService.getTimes(lat, lng)
  expect(response.sunrise).toEqual('00:00')
  expect(response.sunset).toEqual('00:00')
  expect(response.moonrise).toEqual('00:00')
  expect(response.moonset).toEqual('00:00')
})

it('on failure', async () => {
  server.use(
    rest.get('https://api.ipgeolocation.io/astronomy', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(moonService.getTimes()).rejects.toThrow('Something went wrong with the fetch')
})
