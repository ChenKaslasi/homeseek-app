import orderService from '../services/order.service.js'
var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);
export const orderStore = {
    strict: true,
    state: {
        loggedinUser: localLoggedinUser,
        orders: [],
    },
    getters: {
        ordersForDisplay(state) {
            return state.orders;
        },
    },
    mutations: {
        setOrders(state, { orders }) {
            state.orders = orders
        },
        // filterOrderProfile(state, { orders }) {
        //     console.log(orders[0].userId);
        //     console.log(localLoggedinUser._id);
        //     state.orders = orders.filter(order => order.userId === localLoggedinUser._id);

        // },
        setCurrorder(state, { order }) {
            state.currOrder = order;
        },
        addOrder(state, { order }) {
            state.orders.unshift(order)
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter(order => order._id !== orderId)
        },
        updateOrder(state, order) {
            const idx = state.orders.findIndex(currOrder => currOrder._id === order._id)
            state.orders.splice(idx, 1, order)
        }
    },
    actions: {
        async addOrder(context, { order }) {
            order = await orderService.add(order)
            context.commit({ type: 'addOrder', order })
            return order;
        },

        async removeOrder(context, { orderId }) {
            await orderService.remove(orderId);
            context.commit({ type: 'removeOrder', orderId })
        },

        async filterOrders(context, { filterId }) {
            let orders = await orderService.filter(filterId);
            context.commit({ type: 'setOrders', orders })
        },
        async filterProfile(context, { filterId }) {
            let orders = await orderService.filterProfile(filterId);
            context.commit({ type: 'setOrders', orders })
        },
        async updateOrder({ commit }, { updatedOrder }) {
            await orderService.update(updatedOrder)
            commit({
                type: 'updateOrder',
                updatedOrder
            })
        },
    },
}
