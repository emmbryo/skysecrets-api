/**
 * Aurora routes.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves an AuroraController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a AuroraController object.
 */
const resolveAuroraController = (req) => req.app.get('container').resolve('AuroraController')

// GET
router.get('/', (req, res, next) => resolveAuroraController(req).getAuroraParams(req, res, next))

// POST
router.post('/magnetic', (req, res, next) => resolveAuroraController(req).getMagneticLatitude(req, res, next))

router.post('/chance', (req, res, next) => resolveAuroraController(req).getChanceForAurora(req, res, next))

router.post('/analysis', (req, res, next) => resolveAuroraController(req).getAuroraAnalysis(req, res, next))
