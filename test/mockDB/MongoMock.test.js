import { MongoMock } from './MongoMock'

const mongodb = new MongoMock()
const data = {
  id: 'XX',
  value: 'data'
}
const id = data.id

it('inserts correctly', async () => {
  const response = await mongodb.insert(data)
  expect(response.data.id).toEqual('XX')
})

it('gets correctly', async () => {
  const response = await mongodb.getById(id)
  expect(response.id).toEqual('XX')
})

it('updates correctly', async () => {
  const response = await mongodb.update(id, data)
  expect(response.id).toEqual('XX')
})

it('deletes correctly', async () => {
  const response = await mongodb.delete(id)
  expect(response.deleted).toEqual(true)
})
