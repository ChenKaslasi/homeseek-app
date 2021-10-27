const logger = require('../../services/logger.service')
const orderService = require('./order.service')

// TODO: needs error handling! try, catch

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })

    }
}

async function getOrder(req, res) {
    const order = await orderService.getById(req.params.id)
    console.log('order!!!!!!!',order);
    res.send(order)
}


async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete order', err);
        res.status(500).send({ error: 'cannot delete order' })
    }
}

async function updateOrder(req, res) {
    const order = req.body;
    await orderService.update(order)
    res.send(order)
}


async function addOrder(req, res) {
    console.log('INSIDE ORDER B-E');
    var order = req.body;
    // order.byUserId = req.session.user._id;
    order = await orderService.add(order)
    // order.byUser = req.session.user;
    // order.aboutUser = {}
    res.send(order)
}

async function filterOrder(req, res) {
    console.log('req body',req.body);
    const order = await orderService.query(req.body)
    // console.log(order)
    res.send(order)
}
async function filterOrderProfile(req, res) {
    console.log('req body',req.body);
    const order = await orderService.queryProfile(req.body)
    // console.log('ORDER',order)
    res.send(order)
}

module.exports = {
    getOrders,
    getOrder,
    filterOrder,
    deleteOrder,
    addOrder,
    filterOrderProfile,
    updateOrder
}