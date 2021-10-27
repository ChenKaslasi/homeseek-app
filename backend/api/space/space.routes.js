const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {addSpace, getSpace, getSpaces,filterSpace,updateSpace ,deleteSpace} = require('./space.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getSpaces)
router.get('/:id', getSpace)
router.post('/',  addSpace)  //add space
// router.post('/',  requireAuth, addSpace)  //add space
router.put('/:id', updateSpace)

// router.post('/filter',  requireAuth, filterSpace) //filter space
router.post('/filter',  filterSpace) //filter space
router.delete('/:id',  requireAuth, deleteSpace)

module.exports = router