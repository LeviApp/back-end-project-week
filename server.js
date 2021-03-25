
const express = require('express')
const cors = require('cors')

const server = express()

const quotes = require('./quotesModel.js')

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send({ message: 'working so far' });
  });

server.get('/home', async (req,res) => {
    try {
        const rows = await quotes.totalList();
        res.status(200).json(rows)
    }
    catch(err) {
        res.status(500).json({"message": `Could not retrieve quotes. ${err} ${id}`})
    }
})

server.get('/quote/:id', async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
    let soloQuote = await quotes.getSolo(id);
    
        if (soloQuote) {res.json(soloQuote)}
    
        else {
            res
            .status(404)
            .json({"message": "Quote with that id does not exist"})
        }
    
    }
    
    catch(err) {
        res.status(500).json({"message": `Could not retrieve action. ${err} ${id}`})
    }
    } 
)

server.post('/new', async (req,res) => {
    const quoteDATA = req.body;
    console.log(`req.body`, req.body)
    if (quoteDATA.title && quoteDATA.textBody && quoteDATA.img_url) {
        const ids = await quotes.add(quoteDATA)
        res.status(201).json(ids)
    }

    else {
        res.status(422).json({"message": "You are missing info"})
    }
})

server.delete('/quote/:id', async (req,res) => {
    const {id} = req.params;
    
    try {
        let count = await quotes.erase(id);

        if (count) {
        res.json({message: "Quote deleted"})}
    
        else {
        res.status(404).json({message: "Quote with this ID does not exist."})
        }
    }
    catch(err) {
        res
        .status(500)
        .json({message: `Quote could not be deleted ${err}`})
    }
    })

    server.put('/quote/edit/:id', async (req,res) => {
        const editedQUOTE  = req.body;
        const {id} = req.params;
        
        if (editedQUOTE.title !== '' || editedQUOTE.textBody !== '' || editedQUOTE.img_url !== '') {
            try {
            let count = await quotes.edit(id, editedQUOTE);

                if (count) {
                    res.status(200).json(editedQUOTE)
                }
        
                else { res.status(404).json({message:`The quote with the specified ID does not exist.`})}
            }
            catch(err) {
                
                    res.status(500).json({error: `The quote could not be updated ${err}`})
                
            }
        
        }
        
        else {
            res
            .status(400)
            .json({error: "missing quotes id, description, url, or quotes"})
        }
        
        })

module.exports = server;
