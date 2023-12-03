import { ImageServiceMock } from '../mockClasses/ImageServiceMock.js'
import { ImageController } from '../../src/controllers/ImageController.js'
import { req, res, next } from '../mockObjects/requestCycleObjects.js'

const service = new ImageServiceMock()
const controller = new ImageController(service)

it('calls getImage function correctly with response 200', async () => {
  await controller.getImage(req, res, next)
  expect(res.code).toEqual(200)
})
