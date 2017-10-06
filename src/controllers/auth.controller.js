//import User from '../models/User';

export const isAuthenticated = (req, res, next) => {

    console.log('req: ' + JSON.stringify(req.body));
    return next();

    res.redirect('/');

    // // Find User
    // User.findOne({
    //     email: req.body.email
    // }, (err, user) => {
    //     if (err) throw err;

    //     if(!user) {
    //         // check to see if password matches
    //         if (user.password != req.body.password) {
    //             res.json({ success: false, message: 'Authentication failed. Wrong password' });
    //         } else {
    //             // if user is found and password is right
    //             // create token with only our given payload
    //             // don't pass the entire user since it contains the password
    //             const payload = {
    //                 admin: user.admin
    //             };

    //             let token = jwt.sign(payload, app.get('superSecret'), {
    //                 expiresInMinuets: 1440 // expires in 24 hours
    //             });

    //             // return the information including token as JSON
    //             res.json({
    //                 success: true,
    //                 message: 'Enjoy your token!',
    //                 token: token
    //             })
    //         }
    //     }
    // })

}