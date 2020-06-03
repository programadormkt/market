'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertsSchema extends Schema {
  up () {
    this.create('adverts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').unique()
      table.string('title')
      table.string('description')
      table.string('address')
      table.string('week', 100)
      table.string('open')
      table.string('close')
      table.string('instagram')
      table.string('facebook')
      table.string('photo')
      table.timestamps()
    });
  }

  down () {
    this.drop('adverts');
  }
}

module.exports = AdvertsSchema
