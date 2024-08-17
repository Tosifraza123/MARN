const userModel = require('../module/user-model');
var jwt = require('jsonwebtoken');
class ApiController{
    // getUser = (req,res) => {
        
    //      let userData=[
    //         {
    //             name:"Tosif",
    //             email:"raza@gmail.com"
    //         }

    //      ];
        
        
    //     res.send({
    //        data:userData,
    //         status:"success"
    //     })
    // }
    // updateUser=(req,res)=>{
    //     res.send({
    //         data:userData,
    //         status:"success",
    //         message : "hello"
    //     })
    // }
    login=async(req,res)=>{
        try {
            console.log(req.body)
            let userData = await userModel.findOne({ email: req.body.email });
            console.log(userData)
            if (userData) {
                let User = new userModel();
                let checkPassword = User.compareHash(req.body.password, userData.password);
                console.log(checkPassword)

                if (checkPassword == true) {
                    let payload = {
                        id: userData._id,
                        email: userData.email,
                    }

                    let expTime = '12h';

                    var token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:expTime});
                    res.status(200).send({
                        data:userData,
                        message:"login successful",
                        token:token,
                        status:200

                    });
                }else{
                    res.status(200).send({
                        data:{},
                        status:"email or password is wrong"
                    });
                }
            }else{
                res.status(200).send({
                    data:{},
                        status:"User not found"
                });
            }            
        } catch (err) {
            console.log(err)
            res.send({
                data:err,
                status :"Error"
            })
            
            
        }
    }


    getUser = async (req, res) => {
        try {
            let userData = await userModel.find({ age: { $eq: 20 } });
    
            res.status(401).send({
                data: userData,
                status: "Data fetched success"
            })
        } catch (err) {
            console.log(err)
            res.send({
                data: err,
                status: "Error"
            })
        }
    }
    
    addUser = async (req, res) => {
        try {
            // console.log(req.body,'req.body')
            let User = new userModel();
            req.body.password = User.generateHash(req.body.password);
            let userData = new userModel(req.body);
            let saveData = await userData.save();

            res.send({
                "message": "Data added successfully",
                "data": saveData
            })
        } catch (err) {
            console.log(err);
            res.send({"message": "Error",
                data: err
            })
        }
}
getSingleData = async (req, res) => {
    try {
        // console.log(req.params.id,'==req.params==')
        let userSingleData = await userModel.findOne({_id:req.params.id});

        res.send({
            "message": "Data added successfully",
            "data": userSingleData
        })
    } catch (err) {
        res.send({
            "message": "Error",
            data: err
        })
    }
}
updateUser = async (req, res) => {
    try {
        console.log(req.body)
        let reqData = {
            name: req.body.name,
            phone: req.body.phone
        };

        let updateData = await userModel.findByIdAndUpdate(req.body.id, reqData);
        let userSingleData = await userModel.findOne({ _id: req.body.id });

        res.send({
            "message": "Data added successfully",
            "data": userSingleData
        })

    } catch (err){
        console.log(err)
        res.send({
            "message": "Error",
            data: err
        })
    }
}
deleteUser = async (req, res) => {
    try {
        let reqData = {
            delete_status: true
        }
        
        let deleteData = await userModel.findByIdAndDelete(req.params.id, reqData);
        let userSingleData = await userModel.findOne({ _id: req.params.id });

        res.send({
            "message": "Data deleted successfully",
            "data": userSingleData
        })

    } catch (err){
        res.send({
            "message": "Error",
            data: err
        })
    }
}
}

module.exports =new ApiController();



// getUser = async (req, res) => {
//     try {
//         let userData = await userModel.find({ age: { $eq: 20 } });

//         res.status(401).send({
//             data: userData,
//             status: "Data fetched success"
//         })
//     } catch (err) {
//         console.log(err)
//         res.send({
//             data: err,
//             status: "Error"
//         })
//     }
// };

// upd