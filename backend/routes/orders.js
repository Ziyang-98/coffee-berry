var express = require("express");
var router = express.Router();

// the database
var ordersInfo = require("./../data/orders")();
var orders = ordersInfo.orders;
var orderId = ordersInfo.id;

var postingsInfo = require("./../data/postings")();
var postings = postingsInfo.postings;

// {Name : [_id]} pairs
var userMappings = require("./../data/users")();
var userOrders = userMappings.orders;

function getOrderFromId(orderId) {
  // Given name does not exist
  if (!(orderId in orders)) {
    return null;
  }

  return orders[orderId];
}

function getOrdersFromName(name) {
  if (!(name in userOrders)) {
    return null;
  }

  return userOrders[name];
}

function getPostingFromId(postingId) {
  if (!(postingId in postings)) {
    return null;
  }

  return postings[postingId];
}

function createOrder(id, na, post, postingPn, ad, amt, stat, d8) {
  return {
    orderId: id,
    name: na,
    postingId: post,
    productName: postingPn,
    address: ad,
    amount: amt,
    status: stat,
    date: d8,
  };
}

// Find list of orders using name
router.get("/ordersWithName/:name", function (req, res) {
  console.log("Reached here");
  var listOfOrderIndexes = getOrdersFromName(req.params.name);
  var listOfOrders = [];

  listOfOrderIndexes.forEach((index) => listOfOrders.push(orders[index]));
  res.send(listOfOrders);
});

// Find order using id
router.get("/orderWithId/:orderId", function (req, res) {
  var order = getOrderFromId(req.params.orderId);
  if (order == null) {
    res.status(500).send();
  }
  res.send(order);
});

// Adds an order
router.post("/createOrder", function (req, res) {
  const { name, postingId, address, amount, status, date } = req.body;
  const posting = getPostingFromId(postingId);
  if (posting == null) {
    res.status(500).send();
  }

  // Creates a new order
  const newOrder = createOrder(
    orderId,
    name,
    postingId,
    posting.nameOfProduct,
    address,
    amount,
    status,
    date
  );

  orders[orderId] = newOrder;
  //   posting.orders[orderId] = newOrder; // Adds new order to orders for this posting
  posting.pending.push(newOrder);
  posting.units = posting.units - amount;
  if (userOrders.hasOwnProperty(name)) {
    userOrders[name].push(orderId);
  } else {
    userOrders[name] = [orderId];
  }
  orderId++;
  res.status(200).send();
});

// Update an order
router.post("/updateOrder/:orderId", function (req, res) {
  const {
    name,
    postingId,
    productName,
    address,
    amount,
    status,
    date,
  } = req.body;
  const posting = getPostingFromId(postingId);

  if (posting == null) {
    res.status(500).send();
  }

  // Creates a new order
  const newOrder = createOrder(
    orderId,
    name,
    postingId,
    posting.nameOfProduct,
    address,
    amount,
    status,
    date
  );

  orders[orderId] = newOrder;
  if (posting.pending.some((order) => orderId === order.orderId)) {
    posting.pending.filter((order) => orderId === order.orderId);
  } else if (posting.confirmed.some((order) => orderId === order.orderId)) {
    posting.confirmed.filter((order) => orderId === order.orderId);
  } else if (posting.confirmed.some((order) => orderId === order.orderId)) {
    posting.delivered.filter((order) => orderId === order.orderId);
  } else {
    res.status(500).send();
    return;
  }

  switch (status) {
    case "pending":
      posting.pending.push(order);
    case "confirmed":
      posting.confirmed.push(order);
    case "delivered":
      posting.pending.push(order);
  }
  res.status(200).send();
});

// Delete an order
router.post("/deleteOrder/:orderId", function (req, res) {
  const { name, postingId } = req.body;
  const posting = getPostingFromId(postingId);

  if (posting == null) {
    res.status(500).send();
  }

  delete orders[orderId];

  var idString = String(orderId);
  var index = userOrders[name].findIndex((id) => orderId == id);
  if (index != -1) {
    delete userOrders[name][index];
  }

  delete posting.orders[orderId];
  res.status(200).send();
});

module.exports = router;
