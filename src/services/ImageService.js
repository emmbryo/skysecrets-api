/**
 * Module for the ImageService.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'

/**
 * Encapsulates an image service.
 */
export class ImageService {
  /**
   * Gets the image from NASA API.
   *
   * @returns {object} imageData
   */
  async getImage () {
    const url = `${process.env.URL_IMAGE_OF_DAY}?api_key=${process.env.NASA_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      throw createError(400, 'Something went wrong with the fetch')
    }
    const imageData = await response.json()
    return imageData
  }
}
