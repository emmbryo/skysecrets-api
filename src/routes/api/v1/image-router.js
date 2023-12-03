/**
 * Image routes.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves an ImageController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a ImageController object.
 */
const resolveImageController = (req) => req.app.get('container').resolve('ImageController')

// GET
router.get('/', (req, res, next) => resolveImageController(req).getImage(req, res, next))
