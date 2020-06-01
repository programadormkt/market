'use strict'

const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with adverts
 */
class AdvertController {
  /**
   * Show a list of all adverts.
   * GET adverts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, request }) {
    const { page = 1 } = request.header('page');
    const adverts = await Database
      .table('adverts')
      .innerJoin('users', 'adverts.user_id', 'users.id')
      .paginate(page, 10);

    return response.status(200).send(adverts);
  }
}

module.exports = AdvertController
