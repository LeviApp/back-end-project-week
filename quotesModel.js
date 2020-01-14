const db = require('./dbConfig.js')

module.exports = {
    totalList,
    add,
    erase,
    edit,
    getSolo
}

async function totalList() {
    return db('quotes');
}

async function add(quote) {
    return db('quotes')
    .insert(quote)
    .returning('id')
    .then(
      function (){
        return db('quotes')
        .insert(quote)
      }
  )
}

async function getSolo(id) {
    return db('quotes')
      .where('id', id).first();
    }

async function erase(id) {
    return db('quotes')
      .where('id', id)
      .first()
      .del();
  }

  async function edit(id, quote) {
    return db('quotes').where('id', id).first().update(quote);
  }
