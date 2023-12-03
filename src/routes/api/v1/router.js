/**
 * API version 1 routes.
 *
 * @author Emma Fransson
 * @version 1.0.0
 */

import express from 'express'
import { router as imageRouter } from './image-router.js'
import { router as moonRouter } from './moon-router.js'
import { router as accountRouter } from './account-router.js'
import { router as auroraRouter } from './aurora-router.js'
import { router as planetsRouter } from './planets-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1.0.0 of the SkySecrets API!' }))
router.use('/image', imageRouter)
router.use('/moon', moonRouter)
router.use('/account', accountRouter)
router.use('/aurora', auroraRouter)
router.use('/planets', planetsRouter)
