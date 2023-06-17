const router = require('express').Router();
const model = require('../models/todoitem');


//ADD ITEM
router.post("/api/add",async (req,res)=>{
    try {
        const newItem = new model({
            item : req.body.item
        })

        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (error) {
     res.json(error);   
    }
});


//DELETE 
router.delete('/api/delete/:id', async (req,res)=>{
    try {
        const del = await model.findByIdAndDelete(req.params.id);
        res.status(200).json('DELETED ' + req.params.id);
    } catch (error) {
        res.json(error);
    }
});

//GET ITEMS
router.get("/api/get",async (req,res)=>{
    try {
        const allItems = await model.find({});
        res.status(200).json(allItems);
    } catch (error) {
     res.json(error);   
    }
});

//UPDATE
router.put('/api/update/:id', async(req,res)=>{
    try {
        const updateItem = await model.findByIdAndUpdate(req.params.id, {$set : req.body});
        res.status(200).json("Successfully Updated !!");
    } catch (error) {
        res.json(error);
    }
});
module.exports = router;