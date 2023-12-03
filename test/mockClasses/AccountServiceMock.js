/* eslint-disable jsdoc/require-jsdoc */
import { AccountService } from '../../src/services/AccountService'

/**
 * Mock class for AccountService
 */
export class AccountServiceMock extends AccountService {
  async insert (data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  async getById (id) {
    if (id === 'error') {
      throw new Error('fetch failed')
    } else if (id === 'no data') {
      return null
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            location: {
              lat: '50.5050',
              lng: '12.1212'
            }
          })
        }, 3) // Delay in milliseconds
      })
        .then((value) => {
          // Return the real value synchronously after the Promise resolves
          return value
        })
    }
  }

  async get () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          location: {
            lat: '50.5050',
            lng: '12.1212'
          },
          ownerId: 0,
          images: []
        }])
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  async getOne () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{
          location: {
            lat: '50.5050',
            lng: '12.1212'
          },
          user: true
        }])
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  async update (id, newData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          updated: true,
          id,
          newData
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  async delete (id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          deleted: true
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }
}
