var express = require("express");
var router = express.Router();

// the database
var ordersInfo = require("./../data/orders")();
var orders = ordersInfo.orders;
var orderId = ordersInfo.id;

var postingsInfo = require("./../data/postings")();
var postings = postingsInfo.postings;
var postingId = postingsInfo.id;

// {Name : [_id]} pairs
var userMappings = require("./../data/users")();
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
    return [];
  }

  return userPostings[name];
}

function getPostingFromId(postingId) {
  if (!(postingId in postings)) {
    return null;
  }

  return postings[postingId];
}

function createPosting(id, na, ppu, u, t, nop, desc, dp, p, c, d) {
  return {
    postingId: id,
    username: na,
    pricePerUnit: ppu,
    units: u,
    tags: t,
    nameOfProduct: nop,
    description: desc,
    image: dp,
    pending: p,
    confirmed: c,
    delivered: d,
  };
}

// Find all postings
router.get("/allPostings", function (req, res) {
  res.send(postings);
});

// Find list of postings using name
router.get("/postingsWithName/:name", function (req, res) {
  var listOfPostingIndexes = getPostingsFromName(req.params.name);
  var listOfPostings = [];
  listOfPostingIndexes.forEach((index) => {
    listOfPostings.push(getPostingFromId(index));
  });
  console.log(listOfPostings);
  res.send(listOfPostings);
});

// Find posting using id
router.get("/postingWithId/:postingId", function (req, res) {
  var posting = getPostingFromId(req.params.postingId);
  if (posting == null) {
    res.status(500).send();
  }
  res.send(posting);
});

// Adds a posting
router.post("/createPosting", function (req, res) {
  const {
    name,
    pricePerUnit,
    units,
    tags,
    nameOfProduct,
    description,
    image,
  } = req.body;

  // Creates a new posting
  const newPosting = createPosting(
    postingId,
    name,
    pricePerUnit,
    units,
    tags,
    nameOfProduct,
    description,
    image,
    [],
    [],
    []
  );
  console.log(newPosting);
  postings[postingId] = newPosting;
  if (userPostings.hasOwnProperty(name)) {
    userPostings[name].push(postingId);
  } else {
    console.log("no user");
    userPostings[name] = [postingId];
  }
  console.log(userPostings);
  postingId++;
  res.status(200).send();
});

// Update a posting
router.post("/updatePosting/:postingId", function (req, res) {
  const {
    name,
    pricePerUnit,
    units,
    tags,
    nameOfProduct,
    description,
    image,
    pending,
    confirmed,
    delivered,
  } = req.body;
  const posting = getPostingFromId(postingId);

  if (posting == null) {
    res.status(500).send();
  }

  // Creates a new posting
  const newPosting = createPosting(
    postingId,
    name,
    pricePerUnit,
    units,
    tags,
    nameOfProduct,
    description,
    image,
    pending,
    confirmed,
    delivered
  );

  postings[postingId] = newPosting;
  res.status(200).send();
});

// Delete a posting
router.post("/deletePosting/:postingId", function (req, res) {
  const { postingId } = req.body;
  const posting = getPostingFromId(postingId);
  console.log(postingId, "reach delete posting");
  if (posting == null) {
    res.status(500).send();
  }
  // Delete all other orders with this posting first
  var deliveredIndexes = Object.values(posting.delivered);
  deliveredIndexes = deliveredIndexes.map((order) => order.orderId);
  deliveredIndexes.forEach((orderId) => {
    delete orders[orderId];
  });
  console.log("deleted order from orders");
  for (const [name, indexes] of Object.entries(userOrders)) {
    var index = indexes.findIndex((id) => deliveredIndexes.includes(id));
    if (index != -1) {
      delete indexes[index];
    }
  }
  console.log("deleted order from userOrders");

  for (const [name, indexes] of Object.entries(userPostings)) {
    var index = indexes.findIndex((id) => id == postingId);
    if (index != -1) {
      delete indexes[index];
    }
  }

  delete postings[String(postingId)];
  console.log(postings, "[postings]");
  console.log(userPostings, "[userPostings]");
  console.log(orders, "[orders]");
  console.log(userOrders, "[userOrders]");

  res.status(200).send();
});

module.exports = router;
