
const express = require('express')

const server = express()

const notes = require('./notesModel.js')

server.use(express.json())

module.exports = server;

server.get('/home', async (req,res) => {
    const rows = await notes.totalList();

    res.status(200).json(rows)
})

server.post('/new', async (req,res) => {
    const noteDATA = req.body;
    if (noteDATA.title && noteDATA.textBody) {
        const ids = await notes.add(noteDATA)
        res.status(201).json(ids)
    }

    else {
        res.status(422).json({"message": "You are missing info"})
    }
})