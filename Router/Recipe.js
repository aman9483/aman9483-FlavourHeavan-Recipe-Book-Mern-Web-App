const express = require('express');
const {createRecipe, getAllRecipes, updateRecipe, deleteRecipe} = require('../backend/Controllers/Recipe')
const { isAuthenticatedUser } = require('../backend/Middleware/auth');

const router = express.Router();

router.route('/newRecipe').post(isAuthenticatedUser,createRecipe);
router.route('/getAllRecipes').get(getAllRecipes);
router.route('/updateRecipe/:id').put(isAuthenticatedUser,updateRecipe);
router.route('/deleteRecipe/:id').delete(isAuthenticatedUser,deleteRecipe);



module.exports = router;