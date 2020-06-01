'use strict';

const Database = use('Database');
const { validate } = use('Validator');



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with User
 */
class UserController {
  /**
   * Create/save a new User.
   * POST User
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      ra: 'required|unique:users,ra',
      whatsapp: 'required|unique:users,whatsapp'
    }

    const validation = await validate(request.all(), rules);

    if(validation.fails()) return response.status(400).json({ error: "Erro ao criar novo usuário. Verifique se os dados inseriros são validos.", validation });

    const whatsapp = validation._data.whatsapp.replace(/\D+/g, '')
    const ra = validation._data.ra.replace(/\D+/g, '')

    try {
      const userId = await Database
        .table('users')
        .insert({
          ra,
          whatsapp
        });

      const user = await Database
        .select('*')
        .table('users')
        .where('id', userId)
        .first();

      return response.status(200).send(user);
    } catch (error) {
      return response.status(400).send(error);
    }
  }

  /**
   * Display a single User.
   * GET User/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const { id } = params;
    const user = await Database
      .select('*')
      .from('users')
      .where('id', id)
      .first();
    return response.status(200).send(user);
  }

  /**
   * Update User details.
   * PUT or PATCH User/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const rules = {
      whatsapp: 'required'
    }

    const validation = await validate(request.all(), rules);

    if(validation.fails()) return response.status(400).json({ error: "Erro ao criar novo usuário. Verifique se os dados inseriros são validos.", validation });

    const { id } = params;
    const { whatsapp } = request.only(['whatsapp']);

    try {
      await Database
        .table('users')
        .where('id',id)
        .update('whatsapp', whatsapp.replace(/\D+/g, ''));

      const user = await Database
        .select('*')
        .table('users')
        .where('id',id)
        .first();

      return response.status(200).send(user);

    } catch (error) {
      return response.status(400).send(error);
    }
  }

  /**
   * Delete a User with id.
   * DELETE User/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id } = params;

    try {
      await Database
        .table('users')
        .where('id', id)
        .delete();

      return response.status(410).send();

    } catch (error) {

      return response.status(400).send(error);

    }
  }
}

module.exports = UserController
