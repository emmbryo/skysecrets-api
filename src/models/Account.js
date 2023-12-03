/**
 * Mongoose model Account.
 *
 * @author Emma Fransson
 * @author Mats Loock
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import validator from 'validator'
import { ImageModel } from './Image.js'

/**
 * Validates that a string is a decimal.
 *
 * @param {string} value the value to validate.
 * @returns {boolean} true if te string is a decimal.
 */
function validateDecimal (value) {
  return validator.isDecimal(value, {
    force_decimal: true
  })
}

// Create a schema.
const schema = new mongoose.Schema({
  location: {
    lat: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 10,
      validate: [validateDecimal, 'The latitude must be a decimal']
    },
    lng: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 10,
      validate: [validateDecimal, 'The longitude must be a decimal']
    }
  },
  images: {
    type: [ImageModel.schema],
    maxlength: 500
  },
  ownerId: {
    type: String,
    required: [true, 'ownerId is required.'],
    unique: true
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
export const AccountModel = mongoose.model('Account', schema)
