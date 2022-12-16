const express = require('express');
const router = express.Router();
const { list, detail, image, update, remove } = require('../../controllers/Apis/apiUsersController');

router
    .get('/', list )
    .get('/image/:img', image)
    .get('/:id', detail)
    /* UPDATE USER */
   /*  .put("/", checkToken,update) */
  /* DELETE USER */
  //.delete("/:id?",adminNotDestroy,remove)
    
module.exports = router