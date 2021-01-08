var express = require('express');
var router = express.Router();

// the database
var ordersInfo = require('./../data/orders')();
var orders = ordersInfo.orders;
var orderId = ordersInfo.id;

var postings = require('./../data/postings')();

function getOrder(name, orderId) {
    var found;
    
    // Given name does not exist
    if (!(name in orders)) {
        return null;
    }

    orders[name].forEach(order => {
        if (order.id == req.params.orderId) {
            found = order; 
        }
    });
    
    // order id does not exist
    if (found == null) {
        return null;
    }

    return found;
}

function getPosting(postingId) {
    var found;
    postings.forEach(posting => {
        if (posting.postingId == postingId) {
            found = posting; 
        }
    });

    return found;
}

function getOrderAndPosting(name, orderId, postingId) {
    return {order: getOrder(name, orderId), posting: getPosting(postingId)};
} 

function getOrderFromPosting(orderId, posting) {
    var index;
    index = posting.orders.findIndex(order => order.orderId == orderId);
    if (index == -1) {
        return null;
    }

    return posting.orders[index];
}

function createOrder(oId, pId, ad, amt, stat) {
    return {
        orderId: oId,
        postingId, pId,
        address: ad,
        amount: amt,
        status: stat
    };
}

/* GET all orders. */
router.get('/', function(req, res) {
    res.send(orders);
});

// Find an order
router.get('/:name/:orderId', function(req, res) {
    var found = getOrder(req.params.name, req.params.orderId);

    if (found == null) {
        res.status(500).send();
    }
    res.send(found);
});

// Adds an order to orders
router.post('/order', function(req, res) {
    const {name, postingId, address, amount, status} = req.body;
    
    const posting = getPosting(postingId);
    
    if (posting == null) {
        res.status(500).send();
    }

    // Creates a new order
    const newOrder = createOrder(orderId, postingId, address, amount, status);

    // If entry does not yet exist
    if (!(name in orders)) {
        orders[name] = [newOrder];
    } else {
        orders[name] = orders[name].push(newOrder); // Adds new order to list of current orders
    }

    posting.orders.push(newOrder); // Adds new order to orders for this posting
    orderId++;
    res.status(200).send();
});

// Update an order
router.post('/update/:orderId', function(req, res) {
    const {name, postingId, address, amount, status} = req.body;
    const orderAndPosting = getOrderAndPosting(name, req.params.orderId, postingId);
    
    if (orderAndPosting.order == null || orderAndPosting.posting == null) {
        res.status(500).send();
    }

    // Creates a new order
    const newOrder = createOrder(req.params.orderId, postingId, address, amount, status);
    
    orderAndPosting.order = newOrder; // Replaces original order with new order
    var order = getOrderFromPosting(req.params.orderId, orderAndPosting.posting);
    
    if (order == null) {
        res.status(500).send();
    } 
    
    order = newOrder; // Replaces original order with new order
    res.status(200).send();
});

// Delete an order
router.post('/delete/:orderId', function(req, res) {
    const {name, postingId} = req.body;
    const posting = getposting(postingId);

    if (posting == null) {
        res.status(500).send();
    }

    var index;
    index = orders[name].findIndex(order => order.orderId == orderId);
    if (index == -1) {
        res.status(500).send();
    }

    orders[name].splice(index, 1);

    index = posting.orders.findIndex(order => order.orderId == orderId);
    posting.orders.splice(index, 1);
 
    res.status(200).send();
});

module.exports = router;
