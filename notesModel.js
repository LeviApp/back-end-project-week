const db = require('./dbConfig.js')

module.exports = {
    totalList,
    add
}

async function totalList() {
    return db('NOTES');
}

async function add(note) {
    return db('NOTES').insert(note);
}