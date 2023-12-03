/**
 * Planets routes.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves an PlanetsController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a AuroraController object.
 */
const resolvePlanetsController = (req) => req.app.get('container').resolve('PlanetsController')

// GET
router.get('/', (req, res, next) => resolvePlanetsController(req).getPlanets(req, res, next))

// POST
router.post('/', (req, res, next) => resolvePlanetsController(req).getAllPLanets(req, res, next))
router.post('/mercury', (req, res, next) => resolvePlanetsController(req).getIsPlanetOverHorizon(req, res, next, 'Mercury'))
router.post('/venus', (req, res, next) => resolvePlanetsController(req).getIsPlanetOverHorizon(req, res, next, 'Venus'))
router.post('/mars', (req, res, next) => resolvePlanetsController(req).getIsPlanetOverHorizon(req, res, next, 'Mars'))
router.post('/jupiter', (req, res, next) => resolvePlanetsController(req).getIsPlanetOverHorizon(req, res, next, 'Jupiter'))
router.post('/saturn', (req, res, next) => resolvePlanetsController(req).getIsPlanetOverHorizon(req, res, next, 'Saturn'))
