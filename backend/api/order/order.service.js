
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    console.log(filterBy,'fil');
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('order')
    try {
        // var orders = await collection.find(criteria).toArray();
        var orders = await collection.find(criteria)
        orders = await collection.aggregate([
            {
                $lookup:
                {
                    from: 'space',
                    localField: '_id',
                    foreignField: 'spaceId',
                    as: 'space'
                }
            }
        ]).toArray()


        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}

async function getById(orderId) {
    const collection = await dbService.getCollection('order')
    try {
        const order = await collection.findOne({ '_id': ObjectId(orderId) })
        return order
    } catch (err) {
        console.log(`ERROR: while finding order ${orderId}`)
        throw err;
    }
}

async function remove(orderId) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.deleteOne({ "_id": ObjectId(orderId) })
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)
        throw err;
    }
}

async function update(order) {
    const collection = await dbService.getCollection('order')
    order._id = ObjectId(order._id);

    try {
        await collection.replaceOne({ _id: order._id }, { $set: order })
        return order
    } catch (err) {
        console.log(`ERROR: cannot update order ${order._id}`)
        throw err;
    }
}

async function add(order) {

    console.log('BACKEND ADD',order);
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        console.log(`ERROR: cannot insert order`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    if (filterBy) {
        return { "userId" : filterBy.id}
    }
}


function _buildCriteriaFilter(filterBy) {
    console.log('lA',filterBy)
    if (filterBy) {
        return { "userId" : filterBy._id}
    }
}

async function queryProfile(filterBy = {}) {
    console.log(filterBy,'fil');
    const criteria = _buildCriteriaFilter(filterBy)
    const collection = await dbService.getCollection('order')
    try {
        // var orders = await collection.find(criteria)
        var orders = await collection.find(criteria).toArray();
        // orders = await collection.aggregate([
        //     {
        //         $lookup:
        //         {
        //             from: 'space',
        //             localField: '_id',
        //             foreignField: 'spaceId',
        //             as: 'space'
        //         }
        //     }
        // ]).toArray()


        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}



module.exports = {
    query,
    queryProfile,
    getById,
    remove,
    add,
    update
}


