'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('ra', 80).notNullable().unique()
      table.string('whatsapp', 15).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')

    this.create('users', (table) => {
      table.increments()
      table.string('ra', 80).notNullable().unique()
      table.string('whatsapp', 15).notNullable().unique()
      table.timestamps()
    })
  }
}

module.exports = UserSchema
