import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

mongoose.connect('mongodb://localhost/friends', {
    useNewUrlParser: true
});

const friendSchema = new mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "gender": String,
    "age": Number,
    "language": String,
    "email": String,
    "contacts": Array
})

//Mongodb
const Friends = mongoose.model('friends', friendSchema);

//SqlLite
const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: './aliens.sqlite'
});

const Aliens = sequelize.define('aliens', {
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING},
    planet: {type: Sequelize.STRING}
});

Aliens.sync({force: true}).then( () => {
    _.times(10, (i) => {
        Aliens.create({
            firstName: casual.first_name,
            lastName: casual.last_name,
            planet: casual.word
        })
    })
})

export { Friends, Aliens };