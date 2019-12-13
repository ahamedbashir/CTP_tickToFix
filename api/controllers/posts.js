const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../middlewares/authentication');
const { Post } = db;
const uuidv4 = require('uuidv4')
// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /posts
//    POST   /posts
//    GET    /posts/:id
//    PUT    /posts/:id
//    DELETE /posts/:id 

// There are other styles for creating these route handlers, we typically
// explore other patterns to reduce code duplication.
// TODO: Can you spot where we have some duplication below?


router.get('/', (req, res) => {
  Post.findAll({ attributes: ['title', 'content', 'apt', 'userName', 'contactNum', 'severity', 'status', 'createdAt', 'updatedAt', 'id'] })
    .then(posts => res.json(posts));
});


router.post('/', (req, res) => {
  let { title, content, userName, contactNum, apt, severity, status } = req.body;

  Post.create({ title, content, userName, contactNum, apt, severity, status })
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  Post.findByPk(id)
    .then(post => {
      if (!post) {
        return res.sendStatus(404);
      }

      res.json(post);
    });
});

router.get('/ticketNumber/:ticketNum', (req, res) => {
  const { ticketNum } = req.params;
  Post.findOne({ where: { ticketNum: ticketNum } })
    .then(post => {
      if (!post) {
        return res.sendStatus(404);
      }
      res.json(post);
    });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;
  let { title, content, userName, contactNum, apt, severity, status } = req.body;

  Post.findByPk(id)
    .then(post => {
      if (!post) {
        return res.sendStatus(404);
      }

      if (title) {
        post.title = title;
      }
      if (content) {
        post.content = content;
      }
      if (userName) {
        post.userName = userName;
      }
      if (contactNum) {
        post.contactNum = contactNum;
      }
      if (apt) {
        post.apt = apt;
      }
      if (severity) {
        post.severity = severity;
      }
      if (status) {
        post.status = status;
      }

      post.save()
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});


router.delete('/ticket/:ticketNum', (req, res) => {
  const { ticketNum } = req.params;

  if (ticketNum !== null && uuidv4.isUuid(ticketNum)) {
    console.log(ticketNum)
    Post.findOne({ where: { ticketNum: ticketNum } })
      .then(post => {
        if (!post) {
          return res.sendStatus(404);
        }
        post.destroy();
        res.sendStatus(204);
      });
  }

  else {
    return res.status(404).send("Invalid Ticket Number");
  }
});

// router.get('/', (req,res) => {
//   Post.findAll({})
//     .then(posts => res.json(posts));
// });


// router.post('/',
//   passport.isAuthenticated(),
//   (req, res) => {
//     let { content } = req.body;
    
//     Post.create({ content })
//       .then(post => {
//         res.status(201).json(post);
//       })
//       .catch(err => {
//         res.status(400).json(err);
//       });
//   }
// );


// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   Post.findByPk(id)
//     .then(post => {
//       if(!post) {
//         return res.sendStatus(404);
//       }

//       res.json(post);
//     });
// });


// router.put('/:id',
//   passport.isAuthenticated(),
//   (req, res) => {
//     const { id } = req.params;
//     Post.findByPk(id)
//       .then(post => {
//         if(!post) {
//           return res.sendStatus(404);
//         }

//         post.content = req.body.content;
//         post.save()
//           .then(post => {
//             res.json(post);
//           })
//           .catch(err => {
//             res.status(400).json(err);
//           });
//       });
//   }
// );


// router.delete('/:id',
//   passport.isAuthenticated(),
//   (req, res) => {
//     const { id } = req.params;
//     Post.findByPk(id)
//       .then(post => {
//         if(!post) {
//           return res.sendStatus(404);
//         }

//         post.destroy();
//         res.sendStatus(204);
//       });
//   }
// );


module.exports = router;