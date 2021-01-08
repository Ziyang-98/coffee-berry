var express = require('express');
var router = express.Router();

// define the Express app
const app = express();

// the database
const postings = [];

/* GET all postings. */
router.get('/', function(req, res) {
    res.send(postings);
});

// Find an order
router.get('/:postingId', function(req, res) {
    var found;
    postings.forEach(posting => {
        if (posting.postingId == req.params.postingId) {
            found = posting; 
        }
    });
    if (found == null) {
        res.status(500).send();
    }
    res.send(found);
});

// Adds an posting to postings
router.post('/posting', function(req, res) {
    const {postingId, units, pricePerUnit, massPerUnit, tags, description, displayPhotos, orders} = req.body;
    const newPosting = {
        postingId, 
        units, 
        pricePerUnit, 
        massPerUnit, 
        tags, 
        description, 
        displayPhotos, 
        orders
    };
    postings.push(newPosting);
    res.status(200).send();
});

// Update a posting
router.post('/update/:postingId', function(req, res) {
    const {postingId, units, pricePerUnit, massPerUnit, tags, description, displayPhotos, orders} = req.body;
    const newPosting = {
        postingId, 
        units, 
        pricePerUnit, 
        massPerUnit, 
        tags, 
        description, 
        displayPhotos, 
        orders
    };
    var index;
    index = postings.findIndex(posting => posting.postingId == postingId);
    if (index == -1) {
        res.status(500).send();
    }
    postings[index] = newPosting;
    res.status(200).send();
});

// Delete a posting
router.post('/delete/:postingId', function(req, res) {
    var index;
    index = postings.findIndex(posting => posting.postingId == postingId);
    if (index == -1) {
        res.status(500).send();
    }
    orders.splice(index, 1);
    res.status(200).send();
});

module.exports = router;