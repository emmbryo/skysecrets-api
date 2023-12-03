/**
 * Module for the PlanetsService.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

/**
 * Encapsulates an planets service.
 */
export class PlanetsService {
  /**
   * Gets the parameters for the planet.
   *
   * @param {string} planet the planet to look up.
   * @param {number} lat latitude.
   * @param {number} lng longitude.
   * @returns {object} jupiter data.
   */
  async getPlanet (planet, lat, lng) {
    const aboveHorizon = await this.getObjectsAboveHorizon(lat, lng)
    const isOverHorizon = this.isPlanetOverHorizon(planet, aboveHorizon)

    return isOverHorizon
  }

  /**
   * Returns all solar system bodies (incl. moon) above horizon.
   *
   * @param {number} lat latitude.
   * @param {number} lng longitude.
   * @returns {object} all planets above horizon
   */
  async getObjectsAboveHorizon (lat, lng) {
    const url = `${process.env.URL_VISIBLEPLANETS_API}?latitude=${lat}&longitude=${lng}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Something went wrong with the fetch.')
    }
    return await response.json()
  }

  /**
   * Returns true if requested planet is over horizon.
   *
   * @param {string} planet the planet to look for.
   * @param {object} allAboveHorizon all objects currently over the horizon.
   * @returns {boolean} true if over horizon, else false.
   */
  async isPlanetOverHorizon (planet, allAboveHorizon) {
    let planetOverHorizon = false
    allAboveHorizon.data.forEach(above => {
      if (above.name === planet) {
        planetOverHorizon = true
      }
    })
    return planetOverHorizon
  }
}
