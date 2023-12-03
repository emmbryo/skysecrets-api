import { MoonService } from '../../src/services/MoonService.js'

/**
 * Mock class for MoonService
 */
export class MoonServiceMock extends MoonService {
  /**
   * Method unique to child class.
   *
   * @returns {object} response.
   */
  getPhase () {
    return {
      current_phase: 'mock phase',
      illumination: 50
    }
  }

  /**
   * Mocks the returning of rise/set times for the sun and moon.
   *
   * @returns {object} response.
   */
  getTimes () {
    return {
      sunrise: '00:00',
      sunset: '00:00',
      moonrise: '00:00',
      moonset: '00:00'
    }
  }
}
