/**
 * Module for the AccountService.
 *
 * @author Emma FRansson
 * @version 1.0.0
 */

import { MongooseServiceBase } from './MongooseServiceBase.js'
import { AccountRepository } from '../repositories/AccountRepository.js'

/**
 * Encapsulates an Account service.
 */
export class AccountService extends MongooseServiceBase {
  /**
   * Initializes a new instance.
   *
   * @param {AccountRepository} [repository=new AccountRepository()] - A repository instantiated from a class with the same capabilities as AccountRepository.
   */
  constructor (repository = new AccountRepository()) {
    super(repository)
  }
}
