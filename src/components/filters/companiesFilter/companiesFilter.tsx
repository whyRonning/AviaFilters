import {Checkbox} from "antd";
import {flightsData} from "../../../store/mainReducer";
import styled from "styled-components";

type propsType = {
    company: string
    price: number
    companiesFilter: Array<string>
    sortedAndFilteredData: Array<flightsData>
    changeCompanies: (companies: string) => void
}
let CompanyTitle=styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  
`
export let CompaniesFilter = (props: propsType) => {

    return (
        <CompanyTitle>
            <Checkbox checked={(props.sortedAndFilteredData.find((e) => {
                return e.company === props.company
            })) && props.companiesFilter.includes(props.company)} onChange={() => {
                props.changeCompanies(props.company)
            }} value={props.company} disabled={props.price === 0}>{props.company}</Checkbox>
            {props.price !== 0 ? <p>от {props.price} р.</p> : false}
        </CompanyTitle>
    )
}