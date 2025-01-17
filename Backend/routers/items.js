const express = require("express");
const router = express.Router();
const items = require("../services/Items");

router.get("/", async function(req, res, next) {
    try {
        res.json(await items.getItems());
    }
    catch (err) {
        next(err);
    }
})

router.get("/:id", async function(req, res, next) {
    try {
        res.json(await items.getItemByID(req.params.id));
    }
    catch (err) {
        next(err);
    }
})

router.post("/", async function (req, res, next) {
    console.log("Post Item", req.body);
    try {
        res.json(await items.createItem(req.body))
    }
    catch (err) {
        next(err);
    }
})

router.put("/:id", async function (req, res, next) {
    try {
        res.json(await items.updateItem(req.params.id, req.body))
    }
    catch (err) {
        next(err);
    }
})

router.delete("/:id", async function (req, res, next) {
    try {
        res.json(await items.deleteItem(req.params.id))
    }
    catch (err) {
        next(err);
    }
})

router.patch("/:id", async function (req, res, next) {
    try {
        res.json(await items.patchItem(req.params.id, req.body))
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;
