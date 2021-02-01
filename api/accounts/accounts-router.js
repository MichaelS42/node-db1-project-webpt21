const express = require("express");

const Accounts = require("./accounts-model.js");

const router = express.Router();

//CRUD Endpoints for Router

//Read
router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.get();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, async (req, res, next) => {
  try {
    const accountId = await Accounts.getbyID();
    res.status(200).json(req.account);
  } catch (err) {
    next(err);
  }
});

//Create
router.post('/', checkPayload, async (req, res, next) => {
    const body = req.body;
    try {
      const data = await Accounts.create(body);
      res.json(data)
    } catch (err) {
      next(err)
    }
  })
  

//Update
router.put("/:id", checkId, checkPayload, async (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const data = await Accounts.update(id, changes);
    res.json({ count: data });
  } catch (err) {
    next(err);
  }
});

//Delete
router.delete('/:id', checkId, async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = await Accounts.remove(id)
      res.json({ count: data });
    } catch (err) {
      next(err)
    }
  })


  
  //middleware

router.use((err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    res.status(err.statusCode).json({ message: err.message, stack: err.stack })
  })

  
async function checkId(req, res, next) {
    const { id } = req.params;
    try {
      const account = await Accounts.getById(id);
      if (account) {
        req.post = account;
        next();
      } else {
        const err = new Error('invalid id');
        err.statusCode = 404;
        next(err);
      }
    } catch (err) {
      err.statusCode = 500;
      err.message = 'error retrieving a account';
      next(err);
    }
  
  }

  function checkPayload(req, res, next) {
    const body = req.body;
    if (!body.title || !body.contents) {
      const err = new Error('body must include "title" and "contents"');
      err.statusCode = 400;
      next(err);
    } else {
      next();
    }
  
  }
  
  module.exports = router