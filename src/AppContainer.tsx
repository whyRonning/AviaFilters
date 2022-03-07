import {connect, ConnectedProps} from "react-redux";
import {GlobalState} from "./store/store";
import {App} from "./App";
import {useMemo} from "react";
import {actions, allCompaniesAndBestPricesType} from "./store/mainReducer";

let MSTP = (state: GlobalState) => ({
    flights: state.mainReducer.flights,
    filters: state.mainReducer.filters,
    sort: state.mainReducer.sort,
    countOfTickets:state.mainReducer.countOfTickets,
    allCompaniesAndBestPrices: state.mainReducer.allCompaniesAndBestPrices
})
let AppHOC = (props: propsType) => {
    let filters: typeof props.filters = props.filters;
    let sort = props.sort;
    let flights = props.flights;
    let allCompaniesAndPrices = props.allCompaniesAndBestPrices;
    let filteredData = useMemo(() => {
        return () => {
            let data: typeof flights = JSON.parse(JSON.stringify(flights))
            if (filters.transfers.length === 1) {
                data = data.filter((e) => {
                    return e.firstPart.transfers === filters.transfers[0] && e.secondPart.transfers === filters.transfers[0]
                })
            }
            data = data.filter((e) => {
                return filters.price[0] < Number(e.price) && Number(e.price) < filters.price[1]
            })

            return data
        }
    }, [filters, flights])
    let sortedAndFilteredData = useMemo(() => {
        return filteredData().sort((a, b) => {
            if (sort === "time") {
                return (a.firstPart.duration + a.secondPart.duration) - (b.firstPart.duration + b.secondPart.duration)
            } else if (sort === "ascending") {
                return Number(a.price) - Number(b.price)
            } else {
                return Number(b.price) - Number(a.price)
            }
        })
    }, [filteredData, sort])

let allCompanies = useMemo(() => {
    let bestPriceFun = (e: allCompaniesAndBestPricesType) => {
        let min = 0;
        for (let i = 0; i < sortedAndFilteredData.length - 1; i++) {
            if (sortedAndFilteredData[i].company === e.name) {
                if (min === 0) {
                    min = Number(sortedAndFilteredData[i].price)
                } else {
                    min = Math.min(Number(sortedAndFilteredData[i].price), min)
                }
            }
        }
        return min
    }
    return allCompaniesAndPrices.map((e) => {
        return ({
            name: e.name,
            bestPrice: (sortedAndFilteredData[0]) ? bestPriceFun(e) : 0
        })
    })
}, [sortedAndFilteredData, allCompaniesAndPrices])
return (
    <App countOfTickets={props.countOfTickets} changeCountOfTickets={props.changeCountOfTickets} changeCompanies={props.changeCompanies} allCompanies={allCompanies} sort={props.sort} filters={props.filters}
         sortedAndFilteredData={sortedAndFilteredData}/>
)
}
let AppConnector = connect(MSTP,{changeCompanies:actions.changeCompanies,changeCountOfTickets:actions.changeCountOfTickets});
type propsType = ConnectedProps<typeof AppConnector>;
export let AppContainer = AppConnector(AppHOC);