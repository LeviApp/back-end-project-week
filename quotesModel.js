const db = require('./dbConfig.js')

module.exports = {
    totalList,
    add,
    erase,
    edit,
    getSolo
}

async function totalList() {
    try {
      return db('quotes');
    }
    catch (error) {
      return []
    }
}

async function add(quote) {
  try {
    const [quoteId] = await db('quotes')
    .insert(quote)
    .returning('id')
    return quoteId
  }

  catch (error) {
    return {
      "message": "Note could not be added"
    }
  }
}

async function getSolo(id) {
  try {
    return db('quotes')
      .where('id', id).first();
    }
  
  catch (error) {
    return {
      "message": "Note could not be deleted"
    }
    }
  }



async function erase(id) {
  try {
    return db('quotes')
    .where('id', id)
    .first()
    .del();
  }

  catch (error) {
    return {
      "message": "Note could not be deleted"
    }
  }
  }

  async function edit(id, quote) {
    try {
      return db('quotes').where('id', id).first().update(quote);
    }

  catch (error) {
      return {
        "message": "Note could not be editted"
      }
    }
  }
