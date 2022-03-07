import {combineReducers, createStore } from "redux";
import { mainReducer } from "./mainReducer";
let reducer=combineReducers({mainReducer});
export type GlobalState=ReturnType<typeof reducer>
export type actionsType<T extends {[keys:string]:(...args:any)=>any}>=ReturnType<T extends {[key:string]:infer U}?U:never>
export let store=createStore(reducer)