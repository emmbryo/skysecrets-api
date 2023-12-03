/**
 * Module for AccountRepository.
 *
 * @author Mats Loock
 * @author Emma Fransson
 * @version 1.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { AccountModel } from '../models/Account.js'

/**
 * Encapsulates an Account repository.
 */
export class AccountRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {AccountModel} [model=AccountModel] - A class with the same capabilities as AccountModel.
   */
  constructor (model = AccountModel) {
    super(model)
  }
}
