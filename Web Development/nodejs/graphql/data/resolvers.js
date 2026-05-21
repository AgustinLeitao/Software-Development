import moongose from 'mongoose';
import { Friends, Aliens } from './dbConnectors';

export const resolvers = { 
    Query: {
        getFriend: (root, {id} ) => {
            return new Promise( (resolve, reject) => {
                Friends.findById( id, (err, friend) => {
                    if(err) reject(err);
                    else resolve(friend);
                })
            })
        },
        getFriends: () => {
            return new Promise( (resolve, reject) => {
                Friends.find((err, friends) => {
                    if(err) reject(err);
                    else resolve(friends);
                })
            })
        },
        getAliens: () => {
            return Aliens.findAll();
        }
    },
    Mutation: {
        createFriend: (root, {input}) => {
           const newFriend = new Friends({
               firstName: input.firstName,
               lastName: input.lastName,
               gender: input.gender,
               age: input.age,
               language: input.language,
               email: input.email,
               contacts: input.contacts
           })

           newFriend.id = newFriend._id;

           return new Promise( (resolve, reject) => {
               newFriend.save( (err) => {
                   if(err) reject(err);
                   else resolve(newFriend);
               })
           })
        },
        updateFriend: (root, {input}) => {
            return new Promise( (resolve, reject) => {
                Friends.findOneAndUpdate({_id: input.id}, input, {new: true}, (err, friend) => {
                    if(err) reject(err);
                    else resolve(friend);
                })
            })        
        },
        deleteFriend: (root, {id}) => {
            return new Promise( (resolve, reject) => {
                Friends.deleteOne({_id: id}, (err) => {
                    if(err) reject(err);
                    else resolve('Friend Deleted');
                })
            })     
        }
    }
}