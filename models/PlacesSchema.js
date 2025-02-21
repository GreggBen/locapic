const mongoose = require('mongoose');


// Définition du schéma de l'utilisateur
const PlacesSchema = mongoose.Schema({
    nickname: String,
    name: String,
    latitude: Number,
    longitude: Number,
})
// Création du modèle
const Place = mongoose.model('Places', PlacesSchema);
module.exports = Place;

// Middleware pour mettre à jour le champ updatedAt à chaque sauvegarde
// userSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

