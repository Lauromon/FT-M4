const { Router } = require('express');
const { Op, Character, Role, Ability} = require('../db');

const router = Router();

router.post('/', async (req, res) => {
   const { code, name, hp, mana } = req.body;

   if (!code || !name || !hp || !mana) {
      return res.status(404).send('Falta enviar datos obligatorios');
   }
   try {
      const personaje = await Character.create(req.body);
      res.status(201).json(personaje);
   } catch (e) {
      res.status(404).send("Error en alguno de los datos provistos");
   }
});

router.get('/', async (req, res) => {
   const { race, age } = req.query;
   try {
      if (!race && !age) {
         const todos = await Character.findAll();
         res.json(todos);
      } else {
         const filtro = {};
         if (race) filtro['race'] = race;
         if (age) filtro['age'] = age;
         const filter = await Character.findAll({
            where: filtro
         });
         res.json(filter);
      }
   } catch (e) {  res.status(404).send(e.message)}
})

router.get('/young', async (req, res) => {
   try {
      const young = await Character.findAll({
         where: {
            age: {
               [Op.lt]: 25
            }
         }
      });
      res.json(young);
   } catch (e) {  res.status(404).send(e.message)}
})

router.get('/:code', async (req, res) => {
   const { code } = req.params;
   try {
      const pj = await Character.findByPk(code);
      if (pj !== null) {
         res.json(pj);
      } else {
         res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
      }
   } catch (e) { res.status(404).send(e.message) }
})


router.put('/addAbilities', async(req,res)=>{
   const {codeCharacter,abilities} = req.body
   try {
      const nability = await Ability.bulkCreate(abilities)
      const pj = await Character.findByPk(codeCharacter)
      await pj.addAbility(nability)
   } catch (e) {
      res.status(404).send(e.message)
   }
})

router.put('/roles/:code', async(req,res)=>{
   const {code} = req.params
   try {
      const pj = await Character.findByPk(code,{ include:{
         model: Role,
      }})
      res.status(200).json(pj)
   } catch (e) {
      res.status(404).send(e.message)
   }
})

router.put('/:attribute', async (req, res) => {
   const { attribute } = req.params;
   const { value } = req.query;
   try {
      await Character.update({ 
         [attribute]: value 
      },{ 
         where: { [attribute]: null }
      }
      );
      res.status(200).send('Personajes actualizados')
   } catch (e) {
      res.status(404).send(e.message)
   }
})


module.exports = router;