const express = require('express')
const { addCategory, readCategories,updateCategories, deleteCategory, fetchSingle, checkCategory, uploadImageCategory } = require('../controllers/categories');
const router = express.Router();

router.post('/addCategory',uploadImageCategory().single("image"), addCategory);
router.post("/checkCategory", checkCategory);

router.get('/', readCategories)
router.get('/:id', fetchSingle)
router.delete('/:id', deleteCategory)
router.post("/updateCategory", updateCategories);


module.exports = router;