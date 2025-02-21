const express = require('express');
const Place = require('../models/PlacesSchema'); // Assurez-vous que le chemin est correct
const router = express.Router();

// Route POST pour créer un nouvel endroit
router.post('/places', (req, res) => {
  const { nickname, name, latitude, longitude } = req.body;
  // Création d'un nouveau document Place
  const newPlace = new Place({
    nickname: nickname,
    name: name,
    latitude: latitude,
    longitude: longitude,
  });
  // Sauvegarde du document dans la base de données
  newPlace.save()
    .then((data) => {
        console.log(data);
        // Réponse avec le document sauvegardé
        res.json({result : true  })
    }
);});



router.get('/places/:nickname', (req,res) => {
const {nickname} = req.params // ceci proviens depuis le front.
console.log(nickname);

Place.find({nickname: {$regex: new RegExp(nickname, 'i')}})
 // ceci proviens depuis le schema + quand on utilise des regex avec mongoos on utilise la syntaxe.
.then(data =>{res.status(200).json({result: true, places: data})}) // on rajouter.status 200 pr infos : ca marche.
.catch((error) => {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la sauvegarde de nickname.' });
    });
})

router.delete('/places', (req, res) => {
    Place.deleteOne({ nickname:{$regex : new RegExp(req.body.nickname, 'i')},name:{$regex: new RegExp( req.body.name ,'i')}})
    .then((data) => {

      //res.json({data}) => deletedCount chercher dans Tender client pour trouver deletedCount.
      
      if(data.deletedCount>0){
        res.status(200).json({result:true})
                                 }
         else {
       res.status(200).json({result:false, info: 'user not found'})}
       }) 
       
       .catch(error=>{
        console.error(error);
        res.status(500).json({error:error})  
    })
   });


module.exports = router;