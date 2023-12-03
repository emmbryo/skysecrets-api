import { AccountService } from '../../src/services/AccountService.js'
import { MongoMock } from '../mockDB/MongoMock.js'

const accountRepositoryMock = new MongoMock()
const service = new AccountService(accountRepositoryMock)

const data = {
  location: {
    lat: '50.5050',
    lng: '12.1212'
  },
  id: 'XX'
}

it('calls insert function correctly', async () => {
  const response = await service.insert(data)
  expect(response.data.id).toEqual('XX')
})
