import {partOfTicket} from "../../store/mainReducer";
import styled from "styled-components";
import { ClockCircleOutlined } from "@ant-design/icons";

type propsType = {
    partOfTicket: partOfTicket
    className?:string
}
let InitialColor = styled.p`
  color: #3c7de6;
  display: inline;
  margin: 0 .2vw 0 .2vw;
  font-size: 2.5vmin;
`
let Flight = styled.div`
  display: inline;
`
let TransBlock=styled.h2`
  width: 90%;
  text-align: center;
  color:orange;
  border-bottom: 1px solid #000;
  line-height: 0.1em;

  span{
    background:#fff;
    padding:2vw 2vw;
  }
`
let PartOfTicketBlock = styled.div`
  margin: 2vw .1vw 0 2vw;
`
let  AirportsAndCountriesNames = styled.p`
  display: inline;
  font-size: 2.5vmin;
  margin: 0 .2vw 0 .2vw;
`
let TimeBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 2vw;
  margin-top:2vh;
`
let Time=styled.div`
  padding-top: .7vh;
  margin-bottom: 3vh;
`
let DateAndTime=styled.span`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  p{
    color:#3c7de6;
    padding-top:1.2vh;
  }
`
let LastText=styled.p`
margin-top: 3vh;
`
export let PartOfTicket = (props: propsType) => {
    let days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
    let months = ["янв.", "фев.", "мар.", "апр.", "мая.", "июня", "июля", "авг.", "сен.", "окт.", "ноя.", "дек."]
    let departureDate = new Date(props.partOfTicket.departureDate)
    let arrivalDate = new Date(props.partOfTicket.arrivalDate)
    return (
        <PartOfTicketBlock className={props.className}>
            <Flight>
                <AirportsAndCountriesNames>
                    {props.partOfTicket.departureCity + " "},
                    {" " + props.partOfTicket.departureAirport}
                </AirportsAndCountriesNames>
                <InitialColor>({props.partOfTicket.departureInitial}) → </InitialColor>
                <AirportsAndCountriesNames>
                    {props.partOfTicket.arrivalCity + " "},
                    {" " + props.partOfTicket.arrivalAirport}
                </AirportsAndCountriesNames>
                <InitialColor> ({props.partOfTicket.arrivalInitial}) </InitialColor>
            </Flight>
            <TimeBlock>
                <DateAndTime>
                <h2>{String(departureDate.getHours()<10?0:"")+departureDate.getHours() + ":" + String(departureDate.getMinutes()<10?0:"")+departureDate.getMinutes()}</h2>
                <p>{departureDate.getDate()} {months[departureDate.getMonth()]} {days[departureDate.getDay()]}</p>
                </DateAndTime>
                <Time>
                    <h3><ClockCircleOutlined /> {Math.floor(props.partOfTicket.duration / 60)}ч {props.partOfTicket.duration % 60}мин</h3>
                </Time>
                 <DateAndTime>
                    <p>{arrivalDate.getDate()} {months[arrivalDate.getMonth()]} {days[arrivalDate.getDay()]}</p>
                     <h2>{String(arrivalDate.getHours()<10?0:"")+arrivalDate.getHours() + ":" + String(arrivalDate.getMinutes()<10?0:"")+arrivalDate.getMinutes()}</h2>

                 </DateAndTime>
            </TimeBlock>
            {props.partOfTicket.transfers === 1 ? <TransBlock>
                <span>1 пересадка</span>
            </TransBlock> : <hr/>}
            <LastText>Рейс выполняет: {props.partOfTicket.company}</LastText>
        </PartOfTicketBlock>
    )
}