import React from 'react';
import {Filters} from "./components/filters/filters";
import { ResultBlock } from './components/result/resultBlock';
import {allCompaniesAndBestPricesType, flightsData} from "./store/mainReducer";
import styled from "styled-components";
type propsType= {
    countOfTickets:number
    changeCountOfTickets:()=>void
    sortedAndFilteredData: Array<flightsData>
    sort: "time" | "descending" | "ascending"
    filters: {
        transfers: Array<number>
        price: Array<number>
        companies: Array<string>
    }
    allCompanies: Array<allCompaniesAndBestPricesType>
    changeCompanies: (companies: string) => void
}
let Main=styled.main`
    display:grid;
    grid-template-columns: 1fr 2fr;
`
export let App = (props:propsType) => {
    return (
       <Main>
          <Filters changeCompanies={props.changeCompanies} allCompanies={props.allCompanies} sortedAndFilteredData={props.sortedAndFilteredData} sort={props.sort} filters={props.filters} />
           <ResultBlock changeCountOfTickets={props.changeCountOfTickets} countOfTickets={props.countOfTickets} filters={props.filters.companies} sortedAndFilteredData={props.sortedAndFilteredData} />
       </Main>
    )

};
//

