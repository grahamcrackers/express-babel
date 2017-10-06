import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', (req, res, next) => {
    let languages = [
        {
            language: 'Spanish'
        },
        {
            language: 'French'
        },
        {
            language: 'German'
        },
    ];
    res.json(languages);
})

// Finds all users
router.get('/users', (req, res, next) => {
    User.find({}, (err, users) => {
        res.json(users);
    })
})

router.post('/user/create', (req, res) => {
    let user = new User(req.body.name, req.body.username, req.body.email);
    res.json(user);
});

 export default router;