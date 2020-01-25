const express = require('express');
const usersDb= require('./userDb');
const router = express.Router();

router.use(express.json());

router.post('/',  validateUser, (req, res) => {
  // do your magic!
    usersDb.insert(req.body)
    .then( name => {
      res.status(201);
      res.json(name);
    })
    .catch(()=>{
      res.status(500);
      res.json({"message": "could not post the given name to databases"})
    })
  
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

router.get('/:id', validateUserId, (req, res) => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
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


router.delete('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;


  usersDb.update(id, req.body)
  .then( updated => {
    res.status(201);
    res.json(updated);
  })
  .catch(()=>{
    res.status(500);
    res.json({"message": "Could not update the record"})
  })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  usersDb.getById(id)
  .then(user => {
    if(user){
      req.user = user;
      req.id = id;
      console.log(user, "from middleware");
      next();
    }
  })
  .catch(err => {
    console.log(err);
    res.status(400).json({"message": "Invalid user Id"});
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({"message": "missing users data"})
  } else if(!req.body.name){
    res.status(400).json({"message": "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
