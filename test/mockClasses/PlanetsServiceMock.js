import { PlanetsService } from '../../src/services/PlanetsService.js'

/**
 * Mock class for PlanetsService
 */
export class PlanetsServiceMock extends PlanetsService {
  /**
   * Method to override.
   *
   * @param {string} planet the planet to look up.
   * @param {number} lat latitude.
   * @param {number} lng longitude.
   * @returns {object} response.
   */
  getPlanet (planet, lat, lng) {
    // Return a Promise that resolves after a short delay
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
}
