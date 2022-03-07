import {Checkbox} from "antd";
import styled from "styled-components";

type propsType={
    transfers:Array<number>
    changeTransfers:(transfer:Array<number>)=>void
}
let TransferBlock=styled(Checkbox.Group)`
  display: grid;
  grid-template-columns: 1fr;
  margin-left: .5vw;
`
let TransferCheckBox=styled(Checkbox)`
 margin-left: 1vw;

`
export let TransferFilter=(props: propsType)=>{
    return (
        <>
            <TransferBlock value={props.transfers} onChange={(e)=>{props.changeTransfers(e.map((el)=> {
                return Number(el)
            }))}}>
                <TransferCheckBox  value={1}>1 пересадка</TransferCheckBox>
                <TransferCheckBox style={{marginLeft: "1vw"}} value={0}>без пересадок</TransferCheckBox>
            </TransferBlock>
        </>
    )
}