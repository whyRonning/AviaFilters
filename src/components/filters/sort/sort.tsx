import { Radio } from "antd"
import styled from "styled-components";

type propsType={
    changeSort:(sort:"time"|"descending"|"ascending")=>void
    sort:"time"|"descending"|"ascending"
}
let SortBlock=styled(Radio.Group)`
  display:grid;
  margin-left: 1.5vw;
  grid-template-columns: 1fr;
`
export let Sort=(props:propsType)=>{
    return (
        <>
            <SortBlock onChange={(e)=>{props.changeSort(e.target.value)}} value={props.sort}>
                <Radio value={"ascending"}>По возрастанию</Radio>
                <Radio value={"descending"}>По убыванию</Radio>
                <Radio value={"time"}>По времени пути</Radio>
            </SortBlock>
        </>
    )

}