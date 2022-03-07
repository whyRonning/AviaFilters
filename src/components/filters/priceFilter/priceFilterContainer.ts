import {connect} from "react-redux";
import {PriceFilter} from "./priceFilter";
import {actions} from "../../../store/mainReducer";

export let PriceFilterContainer=connect(null,{changePrice:actions.changePrice})(PriceFilter)