let members = require('../../Members');
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

//GetAll
router.get('/', (req, res) => res.json(members));

//GetById
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({msg: `No member with the id ${req.params.id}`});
    }
});

//Create
router.post('/', (req,res) => {
    const newMember = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.redirect('/');
});

//Update
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        const uptMember = req.body;
        members.forEach(member => {
            if(member.id == parseInt(req.params.id)) {
                member.name = uptMember.name ? uptMember.name : member.name;
                member.email = uptMember.email ? uptMember.email : member.email;

                res.json({msg: 'Member updated', member});
            }
        });

        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({msg: `No member with the id ${req.params.id}`});
    }
});

//Update
router.delete('/:id', (req, res) => {
    const memberToDelete = members.filter(member => member.id === parseInt(req.params.id));

    if(memberToDelete) {      
        const memberIndex = members.indexOf(memberToDelete[0]);
        members.splice(memberIndex, 1);
        
        res.json({msg: 'Member deleted', memberToDelete});
    }
    else {
        res.status(400).json({msg: `No member with the id ${req.params.id}`});
    }
});

module.exports = router;