const express = require('express');
const route = express.Router();
const caseController = require('../controller/caseController');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const render = require('../services/render');
const { isAuthenticated } = require('../middleware/auth');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', render.homeRoutes);

/**
 * @description update case
 * @method PUT /updateCase
 */
try {
    route.put('/updateCase/:id', caseController.updateCase);
} catch (err) {
    console.log(err);
}

/**
 * @description case management
 *  @method GET /allCases
 */

route.get('/allCases', caseController.getAllCases);

/**
 * @description add case
 * @method POST /addCase
 */

route.post('/addCase', caseController.addCase);


/**
 * @description delete case
 * @method DELETE /deleteCase
 */
route.delete('/deleteCase/:caseId', caseController.deleteCase);


//! Authentication Routes

/**
 * @description Signup
 * @method POST /signup
 */
route.post('/signup', authController.signup);


/**
 * @description Signin
 * @method POST /signin
 */
route.post('/signin', authController.signin);

/**
 * @description Logout
 * @method  /logout
 */

route.get('/logout', authController.logout);

/**
 * @description user profile
 * @method  /me
 */

route.get('/me', isAuthenticated, authController.userProfile);

//! User Routes

/**
 * @description get all users
 * @method GET /allusers
 */
route.get("/allusers", isAuthenticated, userController.allUsers);

/**
 * @description get Single users
 * @method GET /user/:id
 */
route.get("/user/:id", isAuthenticated, userController.singleUser);

/**
 * @description get all users
 * @method PUT /users
 */
route.put("/user/edit/:id", isAuthenticated, userController.editUser);



module.exports = route;