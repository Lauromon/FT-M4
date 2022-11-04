const { Router } = require('express');
const { Ability } = require('../db');
const router = Router();

router.post('/', async(req,res)=>{
    const {name,mana_cost} = req.body
    try{
        if(!name || !mana_cost){
            res.status(404).send('Falta enviar datos obligatorios')
        }
        const ability = await Ability.create(req.body)
        res.status(201).send(ability)
    }catch(e){
    
    }
})

router.put('/setCharacter', async(req,res)=>{
    const {idAbility,codeCharacter}=req.body
    const ability = await Ability.findByPk(idAbility);
    await ability.setCharacter(codeCharacter)
    res.status(200).json(ability)
})

module.exports = router;