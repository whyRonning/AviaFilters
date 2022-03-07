import {PartOfTicket} from "./partOfTicket";
import {partOfTicket} from "../../store/mainReducer";
import styled from "styled-components";
type propsType={
    price:string
    company:string
    firstPart:partOfTicket
    secondPart:partOfTicket
}
let HeadOfTicket=styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5vh 5vh;
  padding: 0 2vw 0 2vw;
  background-color: #3c7de6;
  color:white;
  grid-template-areas:  "CompanyName PricecompanyName" "CompanyName HeadOfTicketText";
  max-height: 8vh;
  margin-bottom: 2vh;
`
let CompanyName=styled.p`
  grid-area: CompanyName;
  align-self: center  ;
`
let Price=styled.p`
  font-size: 4vmin;
  text-align: right;
  grid-area: PricecompanyName;
`
let HeadOfTicketText=styled.p`
  text-align: right;
  grid-area: HeadOfTicketText;
`
let StyledPartOfTicket=styled(PartOfTicket)`
      padding-bottom: 2vh;
      border-bottom: solid blue 2px;
`
let Button=styled.button`
  transition:.5s ease;
  :hover{
    background-color: white;
    color:orange;
    border: solid orange 1px;
  }
  width: 100%;
  color: white;
  background-color:orange;
  height: 5vh;
  border-radius: 5px;
  margin-bottom: 5vh;
`
export let Ticket=(props:propsType)=>{
    return(
        <section>
            <HeadOfTicket>
                <CompanyName>{props.company}</CompanyName>
                <Price>{props.price+"p"}</Price>
                <HeadOfTicketText>Стоимость для одного взрослого пасажира</HeadOfTicketText>
            </HeadOfTicket>
            <StyledPartOfTicket partOfTicket={props.firstPart}/>
            <PartOfTicket partOfTicket={props.secondPart}/>
            <Button >Выбрать</Button>
            </section>
    )
}