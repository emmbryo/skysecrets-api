/**
 * Module for bootstrapping.
 *
 * @author Mats Loock
 * @author Emma Fransson
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'

import { AccountModel } from '../models/Account.js'

import { ImageService } from '../services/ImageService.js'
import { MoonService } from '../services/MoonService.js'
import { AccountService } from '../services/AccountService.js'
import { AuroraService } from '../services/AuroraService.js'
import { PlanetsService } from '../services/PlanetsService.js'

import { ImageController } from '../controllers/ImageController.js'
import { MoonController } from '../controllers/MoonController.js'
import { AccountController } from '../controllers/AccountController.js'
import { AuroraController } from '../controllers/AuroraController.js'
import { PlanetsController } from '../controllers/PlanetsController.js'

import { AccountRepository } from '../repositories/AccountRepository.js'

const iocContainer = new IoCContainer()

iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

iocContainer.register('AccountModelType', AccountModel, { type: true })

iocContainer.register('AccountRepositorySingleton', AccountRepository, {
  dependencies: [
    'AccountModelType'
  ],
  singleton: true
})

iocContainer.register('ImageServiceSingleton', ImageService, {
  singleton: true
})

iocContainer.register('MoonServiceSingleton', MoonService, {
  singleton: true
})

iocContainer.register('AuroraServiceSingleton', AuroraService, {
  singleton: true
})

iocContainer.register('PlanetsServiceSingleton', PlanetsService, {
  singleton: true
})

iocContainer.register('AccountServiceSingleton', AccountService, {
  dependencies: [
    'AccountRepositorySingleton'
  ],
  singleton: true
})

iocContainer.register('ImageController', ImageController, {
  dependencies: [
    'ImageServiceSingleton'
  ]
})

iocContainer.register('MoonController', MoonController, {
  dependencies: [
    'MoonServiceSingleton'
  ]
})

iocContainer.register('AuroraController', AuroraController, {
  dependencies: [
    'AuroraServiceSingleton'
  ]
})

iocContainer.register('PlanetsController', PlanetsController, {
  dependencies: [
    'PlanetsServiceSingleton'
  ]
})

iocContainer.register('AccountController', AccountController, {
  dependencies: [
    'AccountServiceSingleton'
  ]
})

export const container = Object.freeze(iocContainer)
