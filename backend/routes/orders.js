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
router.get('/:id', function(req, res) {
    var found;
    orders.forEach(order => {
        if (order.id == req.params.id) {
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
    const {id, address, amount, status} = req.body;
    const newOrder = {
        id,
        address,
        amount,
        status
    }
    orders.push(newOrder);
    res.status(200).send();
});

// Update an order
router.post('/update/:id', function(req, res) {
    const {id, address, amount, status} = req.body;
    const newOrder = {
        id,
        address,
        amount,
        status
    }
    var index;
    index = orders.findIndex(order => order.id == id);
    if (index == -1) {
        res.status(500).send();
    }
    orders[index] = newOrder;
    res.status(200).send();
});

// Delete an order
router.post('/delete/:id', function(req, res) {
    var index;
    index = orders.findIndex(order => order.id == req.params.id);
    if (index == -1) {
        res.status(500).send();
    }
    orders.splice(index, 1);
    res.status(200).send();
});

module.exports = router;
