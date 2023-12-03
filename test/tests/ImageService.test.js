import { ImageService } from '../../src/services/ImageService'
import { server, rest } from '../testServer.js'
// import { server, rest } from './testServer.js'

const imageService = new ImageService()

it('fetches correctly', async () => {
  const response = await imageService.getImage()
  expect(response.data.title).toEqual('test-title')
})

it('on failure', async () => {
  server.use(
    rest.get('https://api.nasa.gov/planetary/apod', (req, res, ctx) => {
      return res(ctx.status(404))
    })
  )
  await expect(imageService.getImage()).rejects.toThrow('Something went wrong with the fetch')
})
