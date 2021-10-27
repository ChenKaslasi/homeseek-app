const logger = require('../../services/logger.service')
const spaceService = require('./space.service')

// TODO: needs error handling! try, catch

async function getSpaces(req, res) {
    try {
        const spaces = await spaceService.query(req.query)
        res.send(spaces)
    } catch (err) {
        logger.error('Cannot get spaces', err);
        res.status(500).send({ error: 'cannot get spaces' })

    }
}

async function updateSpace(req, res) {
    console.log('in update func');
    const space = req.body;
    console.log('req.body SPACEs!--',space);
    await spaceService.update(space)
    res.send(space)
}

async function getSpace(req, res) {
    const space = await spaceService.getById(req.params.id)
    res.send(space)
}

async function filterSpace(req, res) {
    const spaces = await spaceService.query(req.body)
    res.send(spaces)
}

async function deleteSpace(req, res) {
    try {
        await spaceService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete space', err);
        res.status(500).send({ error: 'cannot delete space' })
    }
}



async function addSpace(req, res) {
    var space = req.body;
    space = await spaceService.add(space)
    console.log('in space controller',space)
    // space.bySpace = req.session.space;
    // TODO - need to find aboutSpace
    // space.aboutSpace = {}
    res.send(space)
}

module.exports = {
    getSpaces,
    getSpace,
    filterSpace,
    deleteSpace,
    addSpace,
    updateSpace
}