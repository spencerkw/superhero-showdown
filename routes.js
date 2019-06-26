"use strict";
const express = require("express");
const router = express.Router();
const pool = require("./connection");

//endpoints here

router.get("/heroes", (req, res) => {
  pool.query("select * from heroes order by attack_type_id, id").then(result => {
    res.json(result.rows); 
  });
});

router.get("/attack-types", (req, res) => {
  pool.query("select * from attack_types order by id").then(result => {
    res.json(result.rows);    
  });
  
});

module.exports = router;