const db = require('./dbConfig.js')

module.exports = {
    totalList,
    add,
    erase,
    edit,
    getSolo
}

async function totalList() {
    return db('NOTES');
}

async function add(note) {
    return db('NOTES').insert(note);
}

async function getSolo(id) {
    return db('NOTES')
      .where('id', id).first();
    }

async function erase(id) {
    return db('NOTES')
      .where('id', id)
      .first()
      .del();
  }

  async function edit(id, note) {
    return db('NOTES').where('id', id).first().update(note);
  }
