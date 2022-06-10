import { combineReducers } from "redux";
import products from '../components/products/productSlice'

const rootReducer = combineReducers({
    products
});

export default rootReducer;