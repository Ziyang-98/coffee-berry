var postingsInfo = {
    id: 2, 
    postings: { 
        1: { 
            name: "alice", 
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