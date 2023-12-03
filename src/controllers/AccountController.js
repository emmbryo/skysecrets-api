/**
 * Module for the AccountController.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { AccountService } from '../services/AccountService.js'

/**
 * Encapsulates a controller.
 */
export class AccountController {
  /**
   * The service.
   *
   * @type {AccountService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {AccountService} service - A service instantiated from a class with the same capabilities as AccountService.
   */
  constructor (service = new AccountService()) {
    this.#service = service
  }

  /**
   * Provide req.account to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the account to load.
   */
  async load (req, res, next, id) {
    try {
      // Get the account data.
      const accountData = await this.#service.getById(id)
      // If no account found, send a 404 (Not Found).
      if (!accountData) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }

      // Provide the account data to req.
      req.account = accountData

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the account id of the authorized user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getIfUser (req, res, next) {
    try {
      const account = await this.#service.getOne({ ownerId: req.user.id })
      res
        .status(200)
        .json({ user: true, location: account.location })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the account id of the authorized user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAccountId (req, res, next) {
    try {
      const allAccounts = await this.#service.get()
      const account = allAccounts.filter((account) => {
        return account.ownerId === req.user.id
      })

      if (account.length !== 1) {
        res
          .status(200)
          .json({ account: false })
      } else {
        res
          .status(200)
          .json({ account: true, accountId: account[0].id })
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Gets the current account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getOne (req, res, next) {
    try {
      if (this._isAuthorized(req)) {
        res
          .status(200)
          .json(req.account)
      } else {
        next(createError(401))
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Adds a new account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addNewAccount (req, res, next) {
    try {
      const account = await this.#service.insert({
        ownerId: req.user.id
      })

      res
        .status(201)
        .json(account)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Adds a new image to the current account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addImage (req, res, next) {
    if (this._isAuthorized(req)) {
      try {
        const uppdatedAccount = await this.#service.update(req.account.id, {
          images: [...req.account.images, req.body.image]
        })

        res
          .status(201)
          .json(uppdatedAccount)
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Returns the images of the authenticated user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getImages (req, res, next) {
    if (this._isAuthorized(req)) {
      try {
        res
          .status(200)
          .json(req.account.images)
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Partially updates the account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async partiallyUpdate (req, res, next) {
    if (this._isAuthorized(req)) {
      try {
        const newData = {}
        for (const key in req.body) {
          switch (key) {
            case 'location':
              newData.location = req.body.location
              break
            case 'images':
              newData.images = req.body.images
              break
            default:
          }
        }

        await this.#service.update(req.account.id, newData)

        res
          .status(204)
          .end()
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Deletes the current account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    if (this._isAuthorized(req)) {
      try {
        await this.#service.delete(req.account.id)
        res
          .status(204)
          .end()
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Adds a new image to the current account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteImage (req, res, next) {
    if (this._isAuthorized(req)) {
      try {
        const updatedImages = req.account.images.filter((image) => {
          return image._id.toString() !== req.body.id
        })
        await this.#service.update(req.account.id, {
          images: updatedImages
        })

        res
          .status(204)
          .end()
      } catch (error) {
        next(error)
      }
    } else {
      next(createError(401))
    }
  }

  /**
   * Checks if the user owns the resource.
   *
   * @param {object} req - Express request object.
   * @returns {boolean} true if owner of resource.
   */
  _isAuthorized (req) {
    return req.account.ownerId === req.user.id
  }
}
