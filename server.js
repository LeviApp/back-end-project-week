
const express = require('express')
const cors = require('cors')

const server = express()

const notes = require('./notesModel.js')

server.use(express.json())
server.use(cors())


module.exports = server;

server.get('/home', async (req,res) => {
    const rows = await notes.totalList();

    res.status(200).json(rows)
})

server.get('/note/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
    let soloNote = await notes.getSolo(id);
    
        if (soloNote) {res.json(soloNote)}
    
        else {
            res
            .status(404)
            .json({"message": "Note with that id does not exist"})
        }
    
    }
    
    catch(err) {
        res.status(500).json({"message": `Could not retrieve action. ${err} ${id}`})
    }
    } 
)

server.post('/new', async (req,res) => {
    const noteDATA = req.body;
    console.log(`req.body`, req.body)
    if (noteDATA.title && noteDATA.textBody && editedNOTE.img_url) {
        const ids = await notes.add(noteDATA)
        res.status(201).json(ids)
    }

    else {
        res.status(422).json({"message": "You are missing info"})
    }
})

server.delete('/note/:id', async (req,res) => {
    const {id} = req.params;
    
    try {
        let count = await notes.erase(id);

        if (count) {
        res.json({message: "Note deleted"})}
    
        else {
        res.status(404).json({message: "Note with this ID does not exist."})
        }
    }
    catch(err) {
        res
        .status(500)
        .json({message: `Note could not be deleted ${err}`})
    }
    })

    server.put('/note/edit/:id', async (req,res) => {
        const editedNOTE  = req.body;
        const {id} = req.params;
        
        if (editedNOTE.title && editedNOTE.textBody && editedNOTE.img_url) {
            try {
            let count = await notes.edit(id, editedNOTE);

                if (count) {
                    res.status(200).json(editedNOTE)
                }
        
                else { res.status(404).json({message:`The note with the specified ID does not exist.`})}
            }
            catch(err) {
                
                    res.status(500).json({error: `The note could not be updated ${err}`})
                
            }
        
        }
        
        else {
            res
            .status(400)
            .json({message: "missing notes id, description, url, or notes"})
        }
        
        })

