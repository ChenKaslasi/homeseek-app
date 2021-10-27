const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addOrder, getOrders, getOrder,filterOrder, deleteOrder,filterOrderProfile, updateOrder} = require('./order.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrder)
// router.post('/',  requireAuth, addOrder)
router.post('/', addOrder)
router.post('/filter', filterOrder)
router.post('/filter/profile', filterOrderProfile)
router.delete('/:id',  requireAuth, deleteOrder)
// router.put('/:id',  requireAuth, updateOrder)
router.put('/:id',  updateOrder)

module.exports = router