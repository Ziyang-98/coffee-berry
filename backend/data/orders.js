var ordersInfo = { 
    id: 2,
    orders: { 
        1: {
                orderId: 1,
                name: "bob", 
                postingId: 1, 
                address: "NUS", 
                amount: 2, 
                status: "pending", 
                date: "12/12/20"
        }
    }
};

module.exports = function() {
    return ordersInfo;
}