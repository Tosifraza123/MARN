const express = require('express');
const router = express.Router();
const ApiControler = require('../controller/api-controller.js');
// router.get('/user',function(req,res){
//     let userData=[
//         {
//             name:"john",
//             email:" test@gmail.com"
//         }
//     ]
//     res.send({
//         data:userData,
//         status:"success",
//         message : "hello"
//     })
// });
router.get('/user/list',ApiControler.getUser);
router.post('/user/add', ApiControler.addUser);
router.get('/user/info/:id', ApiControler.getSingleData);
router.post('/user/update', ApiControler.updateUser);
router.get('/user/delete/:id', ApiControler.deleteUser);
router.post('/login', ApiControler.login);

// router.get('/user/update',ApiControler.updateUser);
module.exports = {
    route : router
}


