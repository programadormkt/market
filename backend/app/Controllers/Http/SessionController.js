'use strict'
const Database = use('Database');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Session
 */
class SessionController {
  /**
   * Display a single Session.
   * GET Session/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response}) {
    const {
      ra,
    } = request.headers();

    const user = await Database
      .table('users')
      .innerJoin('adverts', 'users.id', 'adverts.user_id')
      .where({ra})
      .first();

    return ( user && Object.keys(user).length > 0 ) ? response.status(200).send(user) : response.status(200).send(false);

  }
}

module.exports = SessionController
