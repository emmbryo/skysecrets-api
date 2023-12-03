/**
 * Module for the AuroraController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

// import createError from 'http-errors'
import { AuroraService } from '../services/AuroraService.js'

/**
 * Encapsulates a controller.
 */
export class AuroraController {
  /**
   * The service.
   *
   * @type {AuroraService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {AuroraService} service - A service instantiated from a class with the same capabilities as AuroraService.
   */
  constructor (service = new AuroraService()) {
    this.#service = service
  }

  /**
   * Gets the Image meta data.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAuroraParams (req, res, next) {
    try {
      const auroraData = await this.#service.getAuroraParams()
      res
        .status(200)
        .json(auroraData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the magnetic latitude for geographic coords.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getMagneticLatitude (req, res, next) {
    try {
      const magneticLatitude = await this.#service.getMagneticLatitude(req.body.lat, req.body.lng)
      res
        .status(200)
        .json(magneticLatitude)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the if there is a possibility for aurora at current location.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getChanceForAurora (req, res, next) {
    try {
      const chance = await this.#service.getChanceForAurora(req.body.lat, req.body.lng)
      res
        .status(200)
        .json(chance)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the analysis of the current aurora status at given location.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAuroraAnalysis (req, res, next) {
    try {
      const chance = await this.#service.getAuroraAnalysis(req.body.lat, req.body.lng)
      res
        .status(200)
        .json(chance)
    } catch (error) {
      next(error)
    }
  }
}
