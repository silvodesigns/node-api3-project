const express = require('express');
const usersDb= require('./userDb');
const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  // do your magic!
  const {name} = req.body;
  if(!name){
    res.status(400).json({errorMessage: "Please provide a name to insert"})
  } else {
    usersDb.insert(req.body)
    .then( name => {
      res.status(201);
      res.json(name);
    })
    .catch(()=>{
      res.status(500);
      res.json({"message": "could not post the given name to databases"})
    })
  }
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  usersDb.get()
  .then(users => {
    res.status(200);
    res.json(users);
  })
  .catch(()=>{
    res.status(404);
    res.json({"message": "The users could not be retrieved"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  usersDb.getById(req.params.id)
  .then(user => {
    res.status(200);
    res.json(user);
  })
  .catch(()=> {
    res.status(404);
    res.json({"messsege": "we could not find the specified user"});
  })
  
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params;
  usersDb.getUserPosts(id)
  .then( usersposts => {
    res.status(200);
    res.json(usersposts);
  })
  .catch(()=>{
    res.status(404);
    res.json({"message": "we could not find posts for this user"});
  })
});


router.delete('/:id', (req, res) => {
  // do your magic!
  usersDb.remove(req.params.id)
  .then(user => {
    res.status(200);
    res.json({"message": "user with the specified id was removed successfully"});
  })
  .catch(()=> {
    res.status(500);
    res.json({"errorMessage": "The user with the specified id could not be removed"});
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
