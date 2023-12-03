/**
 * Class for mocking a mongo DB.
 */
export class MongoMock {
// getById, insert, delete, update

  /**
   * Mock for: Inserts an object in the db.
   *
   * @param {object} data - the data to "insert"
   * @returns {Promise} - ...
   */
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

  /**
   * Mock for: Gets an object.
   *
   * @param {string} idIn the id.
   * @returns {object} data
   */
  async getById (idIn) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: 'your data',
          id: idIn
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  /**
   * Mock: Deletes an object in the db.
   *
   * @param {string} idIn the id.
   * @returns {object} data
   */
  async delete (idIn) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          deleted: true,
          id: idIn
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  /**
   * Mock: Updates an object.
   *
   * @param {string} idIn the id.
   * @param {object} newValue the new values.
   * @returns {object} data
   */
  async update (idIn, newValue) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          updated: true,
          id: idIn
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }
}
