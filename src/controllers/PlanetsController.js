/**
 * Module for the PlanetsController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

// import createError from 'http-errors'
import { PlanetsService } from '../services/PlanetsService.js'

/**
 * Encapsulates a controller.
 */
export class PlanetsController {
  /**
   * The service.
   *
   * @type {PlanetsService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {PlanetsService} service - A service instantiated from a class with the same capabilities as PlanetsService.
   */
  constructor (service = new PlanetsService()) {
    this.#service = service
  }

  /**
   * Returns all planets currently above horizon for given location.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {object} all planets above horizon
   */
  async getAllPLanets (req, res, next) {
    try {
      const planetsOverHorizon = {
        mercury: await this.#service.getPlanet('Mercury', req.body.lat, req.body.lng),
        venus: await this.#service.getPlanet('Venus', req.body.lat, req.body.lng),
        mars: await this.#service.getPlanet('Mars', req.body.lat, req.body.lng),
        jupiter: await this.#service.getPlanet('Jupiter', req.body.lat, req.body.lng),
        saturn: await this.#service.getPlanet('Saturn', req.body.lat, req.body.lng)
      }

      res
        .status(200)
        .json(planetsOverHorizon)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns true if jupiter is above the horizon for given coords.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} planet - The planet so look up.
   * @returns {boolean} true if above horizon.
   */
  async getIsPlanetOverHorizon (req, res, next, planet) {
    try {
      const isOverHorizon = await this.#service.getPlanet(planet, req.body.lat, req.body.lng)

      res
        .status(200)
        .json({ planetOverHorizon: isOverHorizon })
    } catch (error) {
      next(error)
    }
  }
}
