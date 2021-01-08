var express = require('express');
var router = express.Router();

// define the Express app
const app = express();

// the database
const orders = [];

/* GET all orders. */
router.get('/', function(req, res) {
    res.send(orders);
});

// Find an order
router.get('/:orderId', function(req, res) {
    var found;
    orders.forEach(order => {
        if (order.id == req.params.orderId) {
            found = order; 
        }
    });
    if (found == null) {
        res.status(500).send();
    }
    res.send(found);
});

// Adds an order to orders
router.post('/order', function(req, res) {
    const {orderId, postingId, address, amount, status} = req.body;
    const newOrder = {
        orderId,
        postingId,
        address,
        amount,
        status
    }
    orders.push(newOrder);
    res.status(200).send();
});

// Update an order
router.post('/update/:orderId', function(req, res) {
    const {orderId, postingId, address, amount, status} = req.body;
    const newOrder = {
        orderId,
        postingId,
        address,
        amount,
        status
    }
    var index;
    index = orders.findIndex(order => order.orderId == orderId);
    if (index == -1) {
        res.status(500).send();
    }
    orders[index] = newOrder;
    res.status(200).send();
});

// Delete an order
router.post('/delete/:orderId', function(req, res) {
    var index;
    index = orders.findIndex(order => order.orderId == req.params.orderId);
    if (index == -1) {
        res.status(500).send();
    }
    orders.splice(index, 1);
    res.status(200).send();
});

module.exports = router;
