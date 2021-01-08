const basePostings = [
  {
    postingId: 1,
    username: "James",
    nameOfProduct: "Fresh Arabica Coffee Beans",
    units: 100,
    pricePerUnit: 35,
    image: "https://source.unsplash.com/G88j9KT5u4g/1600x900",
    tags: {
      beanType: "arabica",
      roastLevel: "light",
      organic: false,
    },
    description: "Fresh Arabica Coffee Beans from Brazil.",
    pending: [],
    confirmed: [],
    delivered: [],
  },
  {
    postingId: 2,
    username: "Oliver",
    nameOfProduct: "Robusta Beans",
    units: 120,
    pricePerUnit: 20,
    image: "https://source.unsplash.com/PMnJWQ1F_ww/1600x900",
    tags: {
      beanType: "robusta",
      roastLevel: "dark",
      organic: true,
    },
    description: "These beans were freshly harvested in India. 100% Organic",
    pending: [],
    confirmed: [],
    delivered: [],
  },
  {
    postingId: 3,
    username: "James",
    nameOfProduct: "Kopi Nganu",
    units: 50,
    pricePerUnit: 50,
    image: "https://source.unsplash.com/tvVkydhyspU/1600x900",
    tags: {
      beanType: "others",
      roastLevel: "",
      organic: true,
    },
    description: "Fresh from Indonesia. While stocks last.",
    pending: [],
    confirmed: [],
    delivered: [],
  },
];

var postingsInfo = {
  id: 5,
  postings: {
    1: {
      postingId: 1,
      username: "James",
      pricePerUnit: 35,
      units: 100,
      tags: {
        beanType: "arabica",
        roastLevel: "light",
        organic: false,
      },
      nameOfProduct: "Fresh Arabica Coffee Beans",
      description: "Fresh Arabica Coffee Beans from Brazil.",
      image: "https://source.unsplash.com/G88j9KT5u4g/1600x900",
      pending: [],
      confirmed: [],
      delivered: [],
    },
    2: {
      postingId: 2,
      name: "alice",
      pricePerUnit: 20,
      units: 100,
      tags: {
        beanType: "arabica",
        roastLevel: "light",
        organic: true,
      },
      nameOfProduct: "Berry Good Coffee",
      description: "The best coffee available.",
      image: "https://source.unsplash.com/gZe02U8pcf8/1600x900",
      pending: [
        {
          orderId: 1,
          name: "bob",
          postingId: 1,
          productName: "BerryGoodCoffee",
          address: "NUS",
          amount: 2,
          status: "pending",
          date: "12/12/20",
        },
      ],
      confirmed: [],
      delivered: [],
      //   orders: {
      //     1: [
      //       {
      //         name: "bob",
      //         postingId: 1,
      //         address: "NUS",
      //         amount: 2,
      //         status: "pending",
      //         date: "12/12/20",
      //       },
      //     ],
      //   },
    },

    3: {
      postingId: 3,
      username: "Oliver",
      pricePerUnit: 20,
      units: 120,
      tags: {
        beanType: "robusta",
        roastLevel: "dark",
        organic: true,
      },
      nameOfProduct: "Robusta Beans",
      description: "These beans were freshly harvested in India. 100% Organic",
      image: "https://source.unsplash.com/PMnJWQ1F_ww/1600x900",
      pending: [],
      confirmed: [],
      delivered: [],
    },
    4: {
      postingId: 4,
      username: "James",
      units: 50,
      pricePerUnit: 50,
      tags: {
        beanType: "others",
        roastLevel: "",
        organic: true,
      },
      nameOfProduct: "Kopi Nganu",
      description: "Fresh from Indonesia. While stocks last.",
      image: "https://source.unsplash.com/tvVkydhyspU/1600x900",
      pending: [],
      confirmed: [],
      delivered: [],
    },
  },
};

module.exports = function () {
  return postingsInfo;
};