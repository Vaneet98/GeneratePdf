const express= require("express")
const router= express.Router()
const Controller= require("../controller/index")

//add user
router.post("/add",async(req,res)=>{
let user= await Controller.userController.Add(req.body)
res.json(user)
})

//get all user
router.get("/get",async(req,res)=>{
    let user= await Controller.userController.get()
    res.json(user)
})

router.get("/gets",async(req,res)=>{
    let user= await Controller.userController.gets()
    res.json(user)
})
module.exports = router;