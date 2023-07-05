import { createStore } from 'redux';

function productSearchReducer(state = {
    searchString: '',
}, action) {
    state.searchString = action.value;
    return state;
}
const store = createStore(productSearchReducer);
export default store;