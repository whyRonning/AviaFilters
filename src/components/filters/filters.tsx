import {CompaniesFilter} from "./companiesFilter/companiesFilter";
import {allCompaniesAndBestPricesType, flightsData} from "../../store/mainReducer";
import {TransferFilterContainer} from "./transferFilter/transferFilterContainer";
import {PriceFilterContainer} from "./priceFilter/priceFilterContainer";
import {SortContainer} from "./sort/sortContainer";
import styled from "styled-components";

type propsType = {
    sort: "time" | "descending" | "ascending"
    sortedAndFilteredData: Array<flightsData>
    filters: {
        transfers: Array<number>
        price: Array<number>
        companies: Array<string>
    }
    allCompanies: Array<allCompaniesAndBestPricesType>
    changeCompanies: (companies: string) => void
}
let FilterBlock = styled.aside`
  margin: 2vw 0 0 2vw;
`
export let Filters = (props: propsType) => {
    let companiesBlock = props.allCompanies.map((e) => {
        return <CompaniesFilter companiesFilter={props.filters.companies} changeCompanies={props.changeCompanies}
                                sortedAndFilteredData={props.sortedAndFilteredData} key={e.name} company={e.name}
                                price={e.bestPrice}/>
    })
    return (
        <FilterBlock>
            <section>
                <h5>Сортировать</h5>
                <SortContainer sort={props.sort}/>
            </section>
            <section>
                <h5>Фильровать</h5>
                <TransferFilterContainer transfers={props.filters.transfers}/>
            </section>
            <section>
                <h5>Цена</h5>
                <PriceFilterContainer price={props.filters.price}/>
            </section>
            <section>
                <h5>Авиакомпании</h5>
                {companiesBlock}
            </section>
        </FilterBlock>
    )
}