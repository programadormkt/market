'use strict'

const Database = use('Database');
const Advert = use('App/Models/Advert');
const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with advert
 */
class AdvertController {
  /**
   * Show a list of all advert.
   * GET advert
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ response, request }) {
    const page = request.headers().page;

    const adverts = await Database
      .table('adverts')
      .innerJoin('users', 'adverts.user_id', 'users.id')
      .paginate(page, 10);

    return response.status(200).send(adverts);
  }

  /**
   * Create/save a new advert.
   * POST advert
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ response, request }) {

    const {
      title,
      description,
      address,
      week,
      open,
      close,
      instagram,
      facebook,
      whatsapp,
      RA
    } = request.all();

    let advert = {
      RA,
      whatsapp,
      title,
      description,
      address,
      week,
      open,
      close,
      instagram,
      facebook
    }

    const photo = request.file('photo', {
      types: ['image'],
      size: '2mb'
    })

    await photo.move(Helpers.publicPath('uploads'),{
      name: `image.jpg`,
      overwrite: true
    });

    advert = {
      ...advert,
      photo
    }

    if( !photo.moved() ) return response.status(400).send({error: photo.error()});

    return response.status(200).header('Content-type', 'multipart/form-data').json(advert);

    // try {
    //   const advert = await Advert.create({
    //     user_id,
    //     title,
    //     description,
    //     address,
    //     week: JSON.stringify(week),
    //     open,
    //     close,
    //     instagram,
    //     facebook,
    //     photo
    //   });

    //   return response.status(200).send(advert);
    // } catch (error) {
    //   return response.status(400).send(error);
    // }
  }

  /**
   * Display a single advert.
   * GET advert/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const { id } = params;

    try {
      const advert = await Advert.find(id);
      return response.status(200).send(advert);
    } catch (error) {
      return response.status(404).send(error);
    }
  }

  /**
   * Update advert details.
   * PUT or PATCH advert/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { id } = params;
    const {
      title,
      description,
      address,
      week,
      open,
      close,
      instagram,
      facebook,
      photo
    } = request.all();

    try {
      const advert = await Advert.find(id);
      advert.save({
        title,
        description,
        address,
        week: JSON.stringify(week),
        open,
        close,
        instagram,
        facebook,
        photo
      });
      return response.status(200).send(advert);
    } catch (error) {
      return response.status(404).send(error);
    }
  }

  /**
   * Delete a advert with id.
   * DELETE advert/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const { id } = params;
    try {
      const advert = await Advert.find(id);
      advert.delete();
      return response.status(204).send(advert);
    } catch (error) {
      return response.status(400).send(error);
    }
  }
}

module.exports = AdvertController
