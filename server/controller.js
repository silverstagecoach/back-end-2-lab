const batadase = require('./db.json');
const houseCount = 4;

module.exports = {
    getHouses: (req, res) =>{
        res.status(200).send(batadase);
    },
    deleteHouse: (req, res) => {
        let currentHouse = +req.params.id;
        let index = batadase.findIndex(house => house.id === currentHouse);
        
        batadase.splice(index,1);

        res.status(200).send(batadase);
    },
    createHouse: (req, res) => {
        let {imageURL, price, address} = req.body;

        if (!imageURL || !price || !address){
            res.status(400).send('You forgot to add some information about your listing. Please fill out the form.')
            return;
        } else {
        let newHouse = {
            id: houseCount,
            address,
            price,
            imageURL
        }
        batadase.push(newHouse);
        res.status(200).send(batadase);
        houseCount++;
    }},
    updateHouse: (req, res) => {
        let currentHouse = +req.params.id;
        let index = batadase.findIndex(house => house.id === currentHouse);
            if(req.body.type === 'plus'){
                if(batadase[index].price >= 1000000000){
                    res.status(400).send('We do not sell properties over 1 billion dollars.')
                } else {
                batadase[index].price += 10000;
                res.status(200).send(batadase);
                return;
                }
            } else if (req.body.type === 'minus') {
                if (batadase[index].price <= 10000) {
                    res.status(400).send('We do not sell properties under 10000 dollars.')
                } else {
                    batadase[index].price -= 10000;
                    res.status(200).send(batadase)
                    return;
                }
            }
        res.status(400).send('Listing not found.')
    }
}

