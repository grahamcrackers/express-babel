import User from '../models/user';
import { secret } from '../config/database';

import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';
//import sanitizeHtml from 'sanitize-html';


const errors = {
    REGISTER_USERNAME_TAKEN: 'username unavailable',
    REGISTER_GENERAL_ERROR: 'an error has occured',
    LOGIN_INVALID: 'invalid username/password combo',
    LOGIN_GENERAL_ERROR: 'sorry, an error has occured. please try again later',
};

export function register(req, res) {
  console.log(req.body);
  if (!req.body.username || !req.body.password) {
    return res.status(403).end();
  }

  const newUser = new User(req.body);

  //newUser.username = newUser.username;

  newUser.save((err, saved) => {
    if (err) {
      if(err.message.indexOf('duplicate key error') !== -1) {
        return res.status(500).send({err: errors.REGISTER_USERNAME_TAKEN});
      }
      else {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
      }
    }
    return res.json({
        user: {            
          username: saved.username,
        } 
    });
  });
}

export function login(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(403).end();
  }

  const username = req.body.username;

  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({err: errors.LOGIN_GENERAL_ERROR});
    }
    else if(!user) {
      return res.json({err: errors.LOGIN_GENERAL_ERROR});
    }

    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) throw err;

      if(isMatch) {
        var token = jwt.sign({'id':user._id}, secret, {
          expiresIn: 31536e3
        });
        return res.json({
           user: {
            username: user.username,
           },
          token: token,
        });
      }
      else {
        return res.json({err: errors.LOGIN_INVALID});
      }
    });
  });
}

export function updateUserInfo(req, res) {
    if (!req.body.password) {
      return res.status(403).end();
    }
    try {
      // TODO sanitize req.headers.authorization
      var decoded = jwt.verify(req.headers.authorization, secret.secret);
      User.findOne({ _id: decoded.id }).exec((err, user) => {
        if (err) {
          return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
        }

        if(req.body.password !== undefined){ 
          user.password = req.body.password; 
        }

        user.save((err, saved) => {
          if (err) {
              return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
          }
          return res.json({
            user: {
              username: saved.username
            } 
          });        
        });
      });
    } catch(err) {
      // error during JWT verify
      return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
    }
}

export function getAllUsers(req, res){
    User.find({}, (err, users) => {
        return res.json(users);
    })
}

export const deleteUser = (req, res) => {
    if (!req.params.id) {
        return res.status(403).end();
    }
    try {
        console.log(req.params);
        User.findByIdAndRemove({ _id: req.params.id }, (err) => {
            return res.json({success: true});
        });
        //User.findOne({ _id: decoded.id }).exec((err, user) => {
            // if (err) {
            //   return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
            // }
    
            // if(req.body.password !== undefined){ 
            //   user.password = req.body.password; 
            // }
    
            // user.((err, saved) => {
            //   if (err) {
            //       return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
            //   }
            //   return res.json({
            //     user: {
            //       username: saved.username
            //     } 
            //   });        
            // });
        //});
    }
    catch (err) {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
    }
}