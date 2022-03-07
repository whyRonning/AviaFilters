import {InputNumber} from "antd";
import styled from "styled-components";

type propsType={
    price:Array<number>
    changePrice:(price:"low"|"high",value:number)=>void

}
let PriceLabel=styled.label`
  margin: 0 .5vw 0 .5vw;
`


export let PriceFilter=(props:propsType)=>{
    return (
        <>
            <PriceLabel>От </PriceLabel>
            <InputNumber onChange={(e)=>{props.changePrice("low",e)}} min={0} value={props.price[0]} max={props.price[1]}/>
            <PriceLabel> До </PriceLabel>
            <InputNumber onChange={(e)=>{props.changePrice("high",e)}} min={props.price[0]} value={props.price[1]}/>
        </>
    )
}