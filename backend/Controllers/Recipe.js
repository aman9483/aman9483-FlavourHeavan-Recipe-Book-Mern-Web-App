const Recipe = require('../../Models/Recipe');


exports.createRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, image, cookingTime,recipeOwner } = req.body;
  
    try {

        const userId = req.user.id;
      
      const existingRecipe = await Recipe.findOne({ title });
  
      if (existingRecipe) {
        return res.status(400).json({
          message: 'Recipe already exists',
        });
      }
  
      
      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
        instructions,
        image,
        cookingTime,
        userId
        
      });
  
      res.status(200).json({
        message: 'Recipe created successfully',
        recipe,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

exports.getAllRecipes = async (req, res) => {
    try {
        let recipes = await Recipe.find().exec();

        if (recipes.length === 0) {
            return res.status(400).json({
                message: 'There is no recipe out there'
            });
        }

        res.status(200).json({
            message: 'Recipes found',
            recipes
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateRecipe = async(req, res)=>{

      let recipe = await Recipe.findById(req.params.id);

      try {
        if(!recipe){

            res.status(400).json({

                  message: 'Recipe NOT FOUND',
                  success: false
            })
       }

       recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body,{

        new: true,
        runValidators: true,
        useFindAndModify: false,
       });

       res.status(200).json({

          message: 'updated successfully',
          recipe
       });
        
      } catch (error) {

       

            res.status(500).json({

                  message: error.message
         
       })
        
      }
}

exports.deleteRecipe = async (req, res) => {

    const recipe = await Recipe.findById(req.params.id);
    try {
       

        if (!recipe) {
            res.status(400).json({
                message: 'Recipe Not Found',
            });
        } else {
            
            await recipe.deleteOne();
            res.status(200).json({
                message: 'Recipe deleted successfully',
                success: true,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
