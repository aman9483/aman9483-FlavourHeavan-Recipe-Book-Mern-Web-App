const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({

    title:{

        type: String,
        required: [true, 'please enter the title of the recipe'],
        maxLength: 100,
        trim: true
         
    },

    description:{

        type: String,
        required: [true, 'please enter the description of the recipe'],
        minLength: 10
        
         
    },

    ingredients:[

        {

        type: String,
        required: [true, 'please enter the ingredients of the recipe'],

        }   
    
],

    instructions: {
        type: String,
        required: true,
      },

    image:{

           type: String,

           required: [true, 'please enter the image url of the recipe'],

      },

      cookingTime:{

          type: Number,
          require: [true, 'please enter the cooking time of the recipe'],
      },

      recipeOwner:{

           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
        //    required: true
      }
})

module.exports = mongoose.model("Recipe", RecipeSchema);