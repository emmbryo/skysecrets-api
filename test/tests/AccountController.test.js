/* eslint-disable jsdoc/require-jsdoc */
import { AccountController } from '../../src/controllers/AccountController.js'
import { AccountServiceMock } from '../mockClasses/AccountServiceMock.js'
import { req, res, next } from '../mockObjects/requestCycleObjects.js'

const accountServiceMock = new AccountServiceMock()
const controller = new AccountController(accountServiceMock)
const id = 'XX'

it('calls insert function correctly with status 201', async () => {
  await controller.addNewAccount(req, res, next)
  expect(res.code).toEqual(201)
})

it('calls load correctly - latitude value', async () => {
  await controller.load(req, res, next, id)
  expect(req.account.location.lat).toEqual('50.5050')
})

it('calls load correctly - logitude value', async () => {
  await controller.load(req, res, next, id)
  expect(req.account.location.lng).toEqual('12.1212')
})

it('load calls next at the end of successful method', async () => {
  const mockNext = jest.fn()
  await controller.load(req, res, mockNext, id)
  expect(mockNext).toHaveBeenCalled()
})

it('calls getIfUser correctly', async () => {
  res.code = 500
  await controller.getIfUser(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls getAccountId correctly', async () => {
  res.code = 500
  req.account.ownerId = 0
  await controller.getAccountId(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls addNewAccount correctly', async () => {
  res.code = 500
  await controller.addNewAccount(req, res, next)
  expect(res.code).toEqual(201)
})

it('calls addImage correctly', async () => {
  res.code = 500
  req.account.images = []
  await controller.addImage(req, res, next)
  expect(res.code).toEqual(201)
})

it('calls getImage correctly', async () => {
  res.code = 500
  req.account.images = []
  await controller.getImages(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls patiallyUpdate correctly', async () => {
  res.code = 500
  req.account.ownerId = 0
  await controller.partiallyUpdate(req, res, next)
  expect(res.code).toEqual(204)
})

it('calls getOne correctly', async () => {
  res.code = 500
  await controller.getOne(req, res, next)
  expect(res.code).toEqual(200)
})

it('calls delete correctly', async () => {
  res.code = 500
  req.account.ownerId = 0
  await controller.delete(req, res, next)
  expect(res.code).toEqual(204)
})

it('calls deleteImage correctly', async () => {
  res.code = 500
  req.account.ownerId = 0
  req.account.images = []
  await controller.deleteImage(req, res, next)
  expect(res.code).toEqual(204)
})

it('calls _isAuthorized correctly', () => {
  res.code = 500
  req.account.ownerId = 0
  const authorized = controller._isAuthorized(req)
  expect(authorized).toEqual(true)
})

// Test for error handling

it('load calls next when no data found', async () => {
  const mockNext = jest.fn()
  await controller.load(req, res, mockNext, 'no data')
  expect(mockNext).toHaveBeenCalled()
})

it('load calls next(error) when an error is thrown.', async () => {
  const mockNext = jest.fn()
  await controller.load(req, res, mockNext, 'error')
  expect(mockNext).toHaveBeenCalled()
})
