import spaceService from '../services/space.service.js'

export const spaceStore = {
    strict: true,
    state: {
        spaces: [],
        filterBy: null,
        sortBy: ''
    },
    getters: {
        spacesForDisplay(state) {
            if (!state.filterBy) return state.spaces;
            var { cancel, entirePlace, privateRoom, minPrice, maxPrice } = state.filterBy;
            cancel = (cancel) ? 'flexible' : '';
            const type = (entirePlace && privateRoom) ? '' : (entirePlace && !privateRoom) ? 'Entire place' : (!entirePlace && privateRoom) ? 'Private room' : '';
            if (!maxPrice) maxPrice = Infinity
            return state.spaces.filter(
                (space) =>
                    space.price >= minPrice &&
                    space.price <= maxPrice &&
                    space.roomType.includes(type) &&
                    space.cancellationPolicy.includes(cancel)
            )
        },
    },
    mutations: {
        setFilter(state, { filter }) {
            state.filterBy = filter
        },
        setSpaces(state, { spaces }) {
            state.spaces = spaces;
        },
        setCurrSpace(state, { space }) {
            state.currSpace = space;
        },
        addSpace(state, { space }) {
            state.spaces.push(space)
        },
        removeSpace(state, { spaceId }) {
            state.spaces = state.spaces.filter(space => space._id !== spaceId)
        },
        updateSpace(state, space) {
            const idx = state.spaces.findIndex(currSpace => currSpace._id === space._id)
            state.spaces.splice(idx, 1, space)
        }
    },
    actions: {
        async addSpace(context, { space }) {
            try {

                space = await spaceService.add(space)
                context.commit({ type: 'addSpace', space })
                return space;
            } catch (err) {
                console.error('Cannot add space store', space);
                throw err;
            }
        },

        async removeSpace(context, { spaceId }) {
            await spaceService.remove(spaceId);
            context.commit({ type: 'removeSpace', spaceId })
        },
        async filterSpaces(context, { filterBy }) {
            const spaces = await spaceService.filter(filterBy);
            context.commit({ type: 'setSpaces', spaces })
        },
        async updateSpace({ commit }, { updatedSpace }) {
            await spaceService.update(updatedSpace)
            commit({
                type: 'updateSpace',
                updatedSpace
            })
        },
    },
}
