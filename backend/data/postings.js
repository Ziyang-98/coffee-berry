var postingsInfo = {
    id: 2, 
    postings: { 
        1: { 
            name: "alice",
            pricePerUnit: 2,
            unit: 5,
            tags: {
                beanType: "arabica",
                roastLevel: "light",
                organic: true
            },
            nameOfProduct: "BerryGoodCoffee",
            description: "The best coffee available.",
            displayPhotos: null, 
            orders: {
                1: [
                    {
                        name: "bob", 
                        postingId: 1, 
                        address: "NUS", 
                        amount: 2, 
                        status: "pending", 
                        date: "12/12/20"
                    }
                ]
            }
        }
    }
};

module.exports = function() {
    return postingsInfo;
}