import {connect} from "react-redux";
import {TransferFilter} from "./transferFilter";
import {actions} from "../../../store/mainReducer";

export let TransferFilterContainer=connect(null,{changeTransfers:actions.changeTransfers})(TransferFilter)