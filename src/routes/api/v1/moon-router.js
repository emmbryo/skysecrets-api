/**
 * Moon routes.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves an MoonController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a MoonController object.
 */
const resolveMoonController = (req) => req.app.get('container').resolve('MoonController')

// GET
router.get('/', (req, res, next) => resolveMoonController(req).getPhase(req, res, next))

router.post('/times', (req, res, next) => resolveMoonController(req).getTimes(req, res, next))
