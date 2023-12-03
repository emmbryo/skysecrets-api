import { AuroraService } from '../../src/services/AuroraService.js'
import { server, rest } from '../testServer.js'

const service = new AuroraService()
const lat = 59
const lng = 16

it('fetches correctly', async () => {
  const response = await service.getAuroraParams()
  expect(response.solarWind.speed).toEqual(100)
  expect(response.solarWind.density).toEqual(10)
  expect(response.magneticField.power).toEqual(1)
  expect(response.magneticField.zComponent).toEqual(-1)
  expect(response.Kp.index).toEqual(1)
  expect(response.Kp.scale).toEqual(null)
})

it('on failure, getSolarwind()', async () => {
  server.use(
    rest.get('https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(service.getAuroraParams()).rejects.toThrow('Something went wrong with the fetch')
})

it('on failure, getMagneticField()', async () => {
  server.use(
    rest.get('https://services.swpc.noaa.gov/products/summary/solar-wind-mag-field.json', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(service.getAuroraParams()).rejects.toThrow('Something went wrong with the fetch')
})

it('on failure, getPlanetaryKIndex()', async () => {
  server.use(
    rest.get('https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(service.getAuroraParams()).rejects.toThrow('Something went wrong with the fetch')
})

it('fetches magnetic lat correctly', async () => {
  const response = await service.getMagneticLatitude(lat, lng)
  expect(response.magnetic_latitude).toEqual(55.68)
})

it('on failure, getMagneticLatitude()', async () => {
  server.use(
    rest.get('https://geomag.bgs.ac.uk/cgi-bin/coord_calc', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(service.getMagneticLatitude()).rejects.toThrow('Something went wrong with fetching magnetic coordinates')
})

it('calls isSunOverTheHorizon() correctly', async () => {
  const response = await service.isSunOverHorizon(lat, lng)
  expect(response).toEqual(false)
})

it('on failure, isSunOverHorizon()', async () => {
  server.use(
    rest.get('https://api.visibleplanets.dev/v3', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(service.isSunOverHorizon(lat, lng)).rejects.toThrow('Something went wrong with the fetch')
})

it('calls getChanceForAurora() correctly', async () => {
  const response = await service.getChanceForAurora(lat, lng)
  expect(response).toEqual(false)
})

it('calls getAuroraAnalysis() correctly', async () => {
  const response = await service.getAuroraAnalysis(lat, lng)
  expect(response.chance).toEqual(false)
  expect(typeof response.reasons).toEqual('object')
})

it('calls calculateChanceForAurora() correctly', async () => {
  const response = await service.calculateChanceForAurora(lat, lng)
  expect(response).toEqual(false)
})
