const express = require("express");
const router = express.Router();

const {addSchool} = require("../controllers/addSchool");
const {listSchool} = require("../controllers/listSchool");

router.post('/addSchool',addSchool);
router.get('/listSchools/:latitude/:longitude',listSchool);

module.exports = router;