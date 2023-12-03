/**
 * Mongoose model Image.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import validator from 'validator'

/**
 * Validates that a string is a valid url.
 *
 * @param {string} value the value to validate.
 * @returns {boolean} true if te string is a decimal.
 */
function validateUrl (value) {
  return validator.isURL(value)
}

// Create a schema.
const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 200
  },
  url: {
    type: String,
    trim: true,
    validate: [validateUrl, 'The url is not valid'],
    unique: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000
  },
  copywrite: {
    type: String,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true,
  toObject: {
    virtuals: true, // ensure virtual fields are serialized
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret.__v
      delete ret._id
    }
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

schema.post(['find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete'], function (res) {
  if (!res || !this.mongooseOptions().lean) {
    return
  }

  /**
   * Performs a transformation of the resulting lean object.
   *
   * @param {object} obj - The object to transform.
   */
  const transformLeanObject = (obj) => {
    obj.id = obj._id.toHexString()
    delete obj._id
    delete obj.__v
  }

  if (Array.isArray(res)) {
    res.forEach(transformLeanObject)
  } else {
    transformLeanObject(res)
  }
})

// Create a model using the schema.
export const ImageModel = mongoose.model('Image', schema)
