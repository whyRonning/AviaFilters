import {connect} from "react-redux";
import {actions} from "../../../store/mainReducer";
import {Sort} from "./sort";

export let SortContainer=connect(null,{changeSort:actions.changeSort})(Sort)