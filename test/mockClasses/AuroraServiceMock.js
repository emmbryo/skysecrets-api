import { AuroraService } from '../../src/services/AuroraService.js'

/**
 * Mock class for AuroraService
 */
export class AuroraServiceMock extends AuroraService {
  /**
   * Method to override.
   *
   * @returns {object} response.
   */
  getAuroraParams () {
    // Return a Promise that resolves after a short delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          solarWind: {
            speed: 100,
            density: 10
          },
          magneticField: {
            power: 1,
            zComponent: -1
          },
          Kp: {
            index: 0,
            scale: null
          }
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  /**
   * Method to override.
   *
   * @returns {object} response.
   */
  getMagneticLatitude () {
    // Return a Promise that resolves after a short delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          magnetic_latitude: 55.68
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  /**
   * Method to override.
   *
   * @param {number} lat the geographic latitude.
   * @param {number} lng the geographic longitude.
   * @returns {object} response.
   */
  async getChanceForAurora (lat, lng) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }

  /**
   * Method to override.
   *
   * @param {number} lat the geographic latitude.
   * @param {number} lng the geographic longitude.
   * @returns {object} response.
   */
  async getAuroraAnalysis (lat, lng) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          chance: true,
          reason: []
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }
}
