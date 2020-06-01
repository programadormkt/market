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
      whatsapp
    } = request.headers();


    try {

      const user = await Database
        .from('users')
        .where({ ra, whatsapp })
        .first();

        return ( user ) ? response.status(200).send(true) : response.status(200).send(false);

    } catch (error) {
      return response.status(400).send(error)
    }
  }
}

module.exports = SessionController
