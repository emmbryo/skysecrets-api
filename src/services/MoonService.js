/**
 * Module for the MoonService.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'

/**
 * Encapsulates a moon service.
 */
export class MoonService {
  /**
   * Gets the moon phase from farmsense free API.
   *
   * @returns {object} moon phase
   */
  async getPhase () {
    const unixTimestamp = Math.floor(Date.now() / 1000)
    const url = `${process.env.URL_FARMSENSE_MOON_PHASE}?d=${unixTimestamp}`

    const response = await fetch(url)

    if (!response.ok) {
      throw createError(404, 'Something went wrong with the fetch')
    }

    const moondata = await response.json()

    if (moondata[0].Error === 0) {
      const phase = moondata[0].Phase || 'no phase available'
      const illuminationData = Math.round(parseFloat(moondata[0].Illumination) * 100) || 0
      return {
        current_phase: phase,
        illumination: illuminationData
      }
    } else {
      throw createError(400, moondata[0].Error_msg)
    }
  }

  /**
   * Gets the rise and setting times of the sun and the moon at specified location.
   *
   * @param {string} lat - the latitude.
   * @param {string} lng - the longitude.
   * @returns {object} the rise/set for sun/moon.
   */
  async getTimes (lat, lng) {
    const url = `${process.env.URL_IPGEOLOCATION_ASTRONOMY}?apiKey=${process.env.IPGEOLOCATION_API_KEY}&lat=${lat}&long=${lng}`

    const response = await fetch(url)

    if (!response.ok) {
      throw Error('Something went wrong with the fetch')
    }
    const timedata = await response.json()

    return {
      sunrise: timedata.sunrise,
      sunset: timedata.sunset,
      moonrise: timedata.moonrise,
      moonset: timedata.moonset
    }
  }
}
