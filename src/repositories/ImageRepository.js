/**
 * Module for ImageRepository.
 *
 * @author Mats Loock
 * @author Emma Fransson
 * @version 1.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { ImageModel } from '../models/Image.js'

/**
 * Encapsulates an Image repository.
 */
export class AccountRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {ImageModel} [model=ImageModel] - A class with the same capabilities as ImageModel.
   */
  constructor (model = ImageModel) {
    super(model)
  }
}
