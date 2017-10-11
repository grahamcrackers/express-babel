import User from '../models/User';
import { errors } from '../utils/constants';
import { setUserInfo } from '../utils/helpers';

export const getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        return res.json(users);
    })
}

export const getUser = (req, res) => {
    if(!req.body.email)
        return res.status(400).send({error: 'Must have unique email to get user'});
    try {
        const {email} = req.body;
        
        User.findOne({email}, (err, info) => {
            let user = setUserInfo(info);
            if(err){
                return res.status(404).send({message: 'No user was found'});
            }

            return res.json(user);
        })
    }
    catch (err){
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
    }
}

export const updateUser = (req, res) => {
    // Update User here
}

export const deleteUser = (req, res) => {
    if (!req.params.id) {
        return res.status(403).end();
    }
    try {
        User.findByIdAndRemove({ _id: req.params.id }, (err) => {
            return res.json({success: true});
        });
    }
    catch (err) {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
    }
}