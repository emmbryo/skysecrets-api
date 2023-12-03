/**
 * Module for the MoonController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

// import createError from 'http-errors'
import { MoonService } from '../services/MoonService.js'

/**
 * Encapsulates a controller.
 */
export class MoonController {
  /**
   * The service.
   *
   * @type {MoonService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {MoonService} service - A service instantiated from a class with the same capabilities as MoonoService.
   */
  constructor (service = new MoonService()) {
    this.#service = service
  }

  /**
   * Gets the moon phase.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getPhase (req, res, next) {
    try {
      const moonPhase = await this.#service.getPhase()
      res
        .status(200)
        .json(moonPhase)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the time for rise and set of the moon and sun.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getTimes (req, res, next) {
    try {
      const timeData = await this.#service.getTimes(req.body.lat, req.body.lng)
      res
        .status(200)
        .json(timeData)
    } catch (error) {
      next(error)
    }
  }
}
