const { Router } = require('express');
const { Op, Character, Role, } = require('../db');
const router = Router();

router.post('/', async(req,res)=>{
    const {code,name,hp,mana} = req.body;
    
    if(!code || !name || !hp || !mana){
    return res.status(404).send('Falta enviar datos obligatorios');
    }  
    try{  
        const personaje = await Character.create(req.body);
        res.status(201).json(personaje);
    }catch(e){
        res.status(404).send("Error en alguno de los datos provistos");
    }
});

router.get('/', async(req,res)=>{
    const {race} = req.query;
    if(!race){
        const todos = await Character.findAll();
        res.json(todos);  
    }else{
        const raza = await Character.findAll({
            where: {
                race: race
            }
        });
        res.json(raza);
    }
    
})

router.get('/:code', async(req,res)=>{
    const {code} = req.params; 
    const pj = await Character.findByPk(code);
    if(pj !== null){    
        res.json(pj);
    }else{
        res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    }
})

module.exports = router;