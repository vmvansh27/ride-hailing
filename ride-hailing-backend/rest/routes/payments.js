const express = require("express");
const router = express.Router();
const payments = require("../controllers/payments");
router.post("/", payments.pay);
module.exports = router;
