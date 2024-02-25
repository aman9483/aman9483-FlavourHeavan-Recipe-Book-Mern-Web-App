const User = require('../../Models/User');
const { use } = require('../../Router/User');


exports.register = async(req, res)=>{

    const {name, email, password} = req.body;

      try{

           let user = await User.findOne({email});

           if(user){

                res.status(400).json({

                    message: 'user already exist',
           })


           }

          user =  await User.create({

               name,
               email, 
               password
          })

          res.status(200).json({

              message: "user created successfully",

              user
          })
           
      }catch(error){

          res.status(500).json({

              message: error.message,
              
          })
      }
}

exports.loginUser = async(req, res)=>{

    const {email, password} = req.body;

    try {

        if(!email || !password){

            res.status(400).json({

                message: "Enter the email and password"
            });
        }

        const user = await User.findOne({email}).select("+password");

        if (!user) {
            return next("Invalid email or password", 401);
          }

          const isPasswordMatched = await user.comparePassword(password);

          if (!isPasswordMatched) {
            return next("Invalid email or password", 401);
          }
    
          const token = user.getJWTToken();
    
          const options = {
              expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
              httpOnly: true,
          };
    
         
          res.cookie('token', token, options);
    
          res.status(200).json({
              success: true,
              token,
          });
        
    } catch (error) {

        res.status(500).json(({

              message: error.message
        }))
        
    }

}

exports.logoutUser = async(req, res,next)=>{

    try{

         res.cookie("token", null,{

              expires: new Date(Date.now()),
              httpOnly: true,


         });

          res.status(200).json({

              message: "LOG OUT SUCCESSFULLY",
              success: true
          })
    }catch(e){

         res.status(500).json({
            
             message: e.message,
             success: false
         })
    }
}


exports.userDetails = async(req,res)=>{

    const user = await User.find();
      try {

        if(!user){

            res.status(400).json({

                message: 'user not found'
            })
        }

        res.status(200).json({

            message: 'user found',
            user
        })
        
      } catch (error) {

        res.status(500).json({

            message: error.message,
            user
        })
        
      }
}



