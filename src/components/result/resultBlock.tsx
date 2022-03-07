import {flightsData} from "../../store/mainReducer";
import {useMemo} from "react";
import {Ticket} from "./ticket";
import styled from "styled-components";

type propsType = {
    filters: Array<string>
    sortedAndFilteredData: Array<flightsData>
    changeCountOfTickets: () => void
    countOfTickets: number
}
let Button=styled.button`
  margin:0 0 2vh 40%;
  width:12vw;
  font-size: 2vmin;
  
`
export let ResultBlock = (props: propsType) => {
    let data = useMemo(() => {
        if (props.filters[0]) {
            return props.sortedAndFilteredData.filter((e) => {
                return props.filters.find((company) => {
                    return company === e.company
                })
            })
        } else {
            return props.sortedAndFilteredData
        }
    }, [props.sortedAndFilteredData, props.filters])
    if (!data[0]) {
        return (
            <p>Нет билетов по запросу</p>
        )
    }
    let tickets = data.slice(0, props.countOfTickets).map((e) => {
        return <Ticket company={e.company} firstPart={e.firstPart} secondPart={e.secondPart} key={e.id}
                       price={e.price}/>
    })

    return (
        <article>
            {tickets}
            {(props.countOfTickets <= data.length) ? <Button onClick={() => {
                props.changeCountOfTickets()
            }}>Показать еще</Button> : false}
        </article>
    )
}