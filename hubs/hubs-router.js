const express = require('express');

// const Hubs = require('./hubs-model.js'); // ASK ABOUT THIS...

const Hubs = require('./db.js');

const router = express.Router();

router.use(express.json());

// POST Request #1

router.post('/api/posts', (req, res) => {
  const description = req.body;
  if (!description.title || !description.contents) {
    res.status(400).json({ error: 'Please provide title and contents for the post.' });
  } else {
    db.insert(description)
      .then(desc => {
        res.status(201).json(desc);
      })
      .catch(error => {
        res.json({ error: 'There was an error while saving the post to the database' });
      });
  }
});

// POST Request #2

router.post('/api/posts/:id/comments', (req, res) => {
  const commentDescription = req.body;
  if (!commentDescription.text) {
    res.status(404).json({ error: 'Please provide text for the comment..' });
  } else {
    db.insert(commentDescription)
      .then(desc => {
        res.status(201).json(desc);
      })
      .catch(error => {
        res.json({ error: 'There was an error while saving the post to the database' });
      });
  }
});

// GET Request #1

// router.get('/', (req, res) => {
//   Hubs.find(req.query)
//     .then(hubs => {
//       res.status(200).json(hubs);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//         message: 'Error retrieving the hubs',
//       });
//     });
// });

// router.get("/:id", (req, res) => {
//   Hubs.findById(req.params.id)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: "Hub not found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the hub"
//       });
//     });
// });

// router.delete("/:id", (req, res) => {
//   Hubs.remove(req.params.id)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({ message: "The hub has been nuked" });
//       } else {
//         res.status(404).json({ message: "The hub could not be found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error removing the hub"
//       });
//     });
// });

// router.put("/:id", (req, res) => {
//   const changes = req.body;
//   Hubs.update(req.params.id, changes)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: "The hub could not be found" });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error updating the hub"
//       });
//     });
// });

// // add an endpoint that returns all the messages for a hub
// // GET /api/hubs   /:id/messages
// router.get("/:id/messages", (req, res) => {
//   Hubs.findHubMessages(req.params.id)
//     .then(messages => {
//       res.status(200).json(messages);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ errorMessage: "error getting hubs messages" });
//     });
// });

// // add an endpoint for adding new message to a hub

// router.post("/:id/messages", (req, res) => {
//   Hubs.addMessage(req.body)
//     .then(message => {
//       res.status(201).json(message);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error adding the message"
//       });
//     });
// });

// export default server; // ES6 Modules
module.exports = router; // <<<<<<<<<<<<<<<< export the router
