'use strict'

const fs = require('fs');
const path = require('path');

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

    const photo = request.file('photo', {
      types: ['image'],
      size: '2mb'
    })

    await photo.move(Helpers.publicPath('uploads'),{
      name: `${Date.now()}.jpg`,
      overwrite: true
    });

    const urlPhoto = `${photo.fileName}`;

    if( !photo.moved() ) return response.status(400).send({error: photo.error()});

    try {

      const user_id = await Database
        .table('users')
        .insert({
          RA,
          whatsapp,
          created_at: Database.fn.now(),
          updated_at : Database.fn.now()
        });

      if( !user_id[0] ) return response.status(400).send({error: "Erro ao criar o usuário"});


      const advert_id = await Database
        .table('adverts')
        .insert({
          user_id: user_id[0],
          title,
          description,
          address,
          week,
          open,
          close,
          instagram,
          facebook,
          photo: urlPhoto,
          created_at: Database.fn.now(),
          updated_at : Database.fn.now()
        });

      if( !advert_id ) return response.status(400).send({error: "Erro ao criar anúncio"});

      return response.status(200).send(advert_id[0]);
    } catch (error) {
      return response.status(400).send({error, message: "Erro ao criar novo anúncio"});
    }
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
      const advert = await Database
        .table('adverts')
        .innerJoin('users', 'adverts.user_id', 'users.id')
        .first();
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
      whatsapp
    } = request.all();

    var newDataAdvert = {
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
    });

    if( photo ) {

      var advert = await Database.select("photo").from("adverts").where("id", id).first();

      const file = await Helpers.publicPath(`/uploads/${advert.photo}`);

      await fs.unlinkSync(file);

      await photo.move(Helpers.publicPath('uploads'),{
        name: `${Date.now()}.jpg`,
        overwrite: true
      });

      if( !photo.moved() ) return response.status(400).send({error: photo.error()});

      newDataAdvert = {
        ...newDataAdvert,
        photo: photo.fileName
      }

    }

    try {

      const updatedAdvert = await Database
      .table('adverts')
      .where('id', id)
      .update({
        ...newDataAdvert,
        updated_at : Database.fn.now()
      });

      if( !updatedAdvert ) return response.status(400).send({error: "Erro ao atualizar anúncio"});

      const user_id = await Database.select('user_id').table('adverts').where({'id': id}).first();

      const updatedUser = await Database
        .table('users')
        .where('id', user_id.user_id)
        .update({
          whatsapp,
          updated_at : Database.fn.now()
        });

      if( !updatedUser ) return response.status(400).send({error: "Erro ao criar o usuário"});

      return response.status(200).send(updatedAdvert);
    } catch (error) {
      return response.status(400).send({error, message: "Erro ao tentar atualizar"});
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
