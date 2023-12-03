/**
 * Module for the ImageController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

// import createError from 'http-errors'
import { ImageService } from '../services/ImageService.js'

/**
 * Encapsulates a controller.
 */
export class ImageController {
  /**
   * The service.
   *
   * @type {ImageService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {ImageService} service - A service instantiated from a class with the same capabilities as ImageService.
   */
  constructor (service = new ImageService()) {
    this.#service = service
  }

  /**
   * Gets the Image meta data.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getImage (req, res, next) {
    try {
      const imageData = await this.#service.getImage()
      res
        .status(200)
        .json(imageData)
    } catch (error) {
      next(error)
    }
  }
}
