/**
 * Account routes.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export const router = express.Router()
const publicKey = Buffer.from(process.env.PUBLIC_KEY, 'base64').toString('ascii')

/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const cookiePairs = req.headers?.cookie?.split(';')
    const cookies = {}
    cookiePairs?.forEach(pair => {
      const [key, value] = pair.trim().split('=')
      cookies[key] = value
    })

    if ('jwt' in cookies) {
      const payload = jwt.verify(cookies?.jwt, publicKey, {
        algorithm: 'RS256'
      })
      req.user = {
        username: payload.username,
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        id: payload.sub
      }
    } else {
      throw new Error('Invalid cookie.')
    }

    next()
  } catch (err) {
    const error = createError(403)
    error.cause = err
    next(error)
  }
}

/**
 * Resolves an AccountController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a ImageController object.
 */
const resolveAccountController = (req) => req.app.get('container').resolve('AccountController')

// Provide req.swettings to the route if :id is present in the route path.
router.param('id',
  (req, res, next, id) => resolveAccountController(req).load(req, res, next, id))

// GET - get the account id for authorized user.
router.get('/',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).getAccountId(req, res, next))

router.get('/user',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).getIfUser(req, res, next))

// GET
router.get('/:id',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).getOne(req, res, next))

router.get('/:id/images',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).getImages(req, res, next))

// POST
router.post('/',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).addNewAccount(req, res, next))

// PUT
router.put('/:id/images',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).addImage(req, res, next))

router.put('/:id',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).update(req, res, next))

// PATCH
router.patch('/:id',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).partiallyUpdate(req, res, next))

// DELETE
router.delete('/:id',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).delete(req, res, next))

router.delete('/:id/images',
  authenticateJWT,
  (req, res, next) => resolveAccountController(req).deleteImage(req, res, next))
