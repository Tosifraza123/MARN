const userModel = require('../module/user-model');
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