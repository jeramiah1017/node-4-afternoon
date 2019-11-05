const swag = require('../models/swag')
module.exports = {
    add: (req, res) => {
        const {id} = req.params
        let {user} = req.session
        // Let's break down the file, method by method. We'll start with add. This method is responsible for making sure the swag isn't already in the cart. If it isn't, add it to the cart and increase the total by the price of the swag. If it is, just return the request session's user object with a status of 200. This method will use the request query to get an id. We can then use this id to see if it is already in the cart and preform the required logic.

        const index = user.cart.findIndex(swag => swag.id == id)

        if (index === -1) {
          const selectedSwag = swag.find(swag => swag.id == id)

          user.cart.push(selectedSwag);
          user.total += selectedSwag.price
        }
        res.status(200).send(user)

    },
    delete: (req, res) => {
        const {id} = req.params
        let {user} = req.session
        const index = user.cart.findIndex(swag => swag.id == id)
        const selectedSwag = swag.find(swag => swag.id == id)
        // finding  the  user we would want to cut out
        // Now let's move on to delete. This method will be responsible for removing swag from the cart. It should try and see if the swag is in the cart. If it is, remove the swag from the cart and subtract the price from the total. If it isn't, don't do anything to the cart. The method should then return a status of 200 with the request session user's object.


         if (index !== -1) {
             user.cart.splice(index, 1)
             user.total -= selectedSwag.price
            //  cutting out the user at index
            // 
         }

         res.status(200).send(user)

    },
    checkout: (req, res) => {
        const {user} = req.session
        user.cart = []
        user.total = 0
        res.status(200).send(user)

    }
}