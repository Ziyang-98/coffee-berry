var express = require('express');
var router = express.Router();

// the database
var ordersInfo = require('./../data/orders')();
var orders = ordersInfo.orders;
var orderId = ordersInfo.id;

var postingsInfo = require('./../data/postings')();
var postings = postingsInfo.postings;
var postingId = postingsInfo.id;

// {Name : [_id]} pairs
var userMappings = require('./../data/users')();
var userOrders = userMappings.orders;
var userPostings = userMappings.postings;

function getPostingFromId(postingId) {
    // Given name does not exist
    if (!(postingId in postings)) {
        return null;
    }

    return postings[postingId];
}

function getPostingsFromName(name) {
    if (!(name in userPostings)) {
        return null;
    } 

    return userPostings[name];
}

function getPostingFromId(postingId) {
    if (!(postingId in postings)) {
        return null;
    }

    return postings[postingId];
}

function createPosting(id, na, ppu, u, t, nop, desc, dp) {
    return {
        postingId: id,
        name: na,
        pricePerUnit, ppu,
        unit: u,
        tags: t,
        nameOfProduct: nop,
        description: desc,
        displayPhotos: dp
    };
}

// Find all postings
router.get('/allPostings', function(req, res) {
    res.send(postings);
});

// Find list of postings using name
router.get('/postingsWithName/:name', function(req, res) {
    var listOfPostingIndexes = getPostingsFromName(req.params.name);
    var listOfPostings = [];
    
    listOfPostingIndexes.forEach(index => listOfPostings.push(postings[index]));
    res.send(listOfPostings);
});

// Find posting using id
router.get('/postingWithId/:postingId', function(req, res) {
    var posting = getPostingFromId(req.params.postingId);
    if (posting == null) {
        res.status(500).send();
    }
    res.send(posting);
});

// Adds a posting
router.post('/createPosting', function(req, res) {
    const {name, pricePerUnit, unit, tags, nameOfProduct, description, displayPhotos} = req.body;

    // Creates a new posting
    const newPosting = createPosting(postingId, name, pricePerUnit, unit, tags, nameOfProduct, description, displayPhotos);

    postings[postingId] = newPosting;
    postingId++;
    res.status(200).send();
});

// Update a posting
router.post('/updatePosting/:postingId', function(req, res) {
    const {name, pricePerUnit, unit, tags, nameOfProduct, description, displayPhotos} = req.body;
    const posting = getPostingFromId(postingId);
    
    if (posting == null) {
        res.status(500).send();
    }

    // Creates a new order
    const newPosting = createPosting(postingId, name, pricePerUnit, unit, tags, nameOfProduct, description, displayPhotos);
    
    postings[postingId] = newPosting;
    res.status(200).send();
});

// Delete an order
router.post('/deletePosting/:postingId', function(req, res) {
    const {postingId} = req.body;
    const posting = getPostingFromId(postingId);

    if (posting == null) {
        res.status(500).send();
    }
    // Delete all other orders with this posting first
    var orderIndexes = Object.keys(posting.orders);
    orderIndexes.forEach(index => delete orders[index]);
    for (const [name, indexes] of Object.entries(userOrders)) {
        var index = indexes.findIndex(id => id == postingId);
        if (index != -1) {
            delete indexes[index];
        }
    }

    delete posting[postingId];
    res.status(200).send();
});

module.exports = router;
