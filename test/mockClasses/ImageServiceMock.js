import { ImageService } from '../../src/services/ImageService.js'

/**
 * Mock class for ImageService.
 */
export class ImageServiceMock extends ImageService {
  /**
   * Method to override.
   *
   * @returns {object} response.
   */
  getImage () {
    // Return a Promise that resolves after a short delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          date: '2000.01.01',
          title: 'title',
          explanation: 'explanation',
          url: 'image-url'
        })
      }, 3) // Delay in milliseconds
    })
      .then((value) => {
        // Return the real value synchronously after the Promise resolves
        return value
      })
  }
}
