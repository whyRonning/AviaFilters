import {data as flightData} from  "./flights"
import {actionsType} from "./store";
export type flightsData={
    id:string
    company:string
    price:string
    firstPart:partOfTicket
    secondPart:partOfTicket
}
export type partOfTicket={
    transfers:number
    company:string
    departureCity:string
    departureAirport:string
    departureInitial:string
    departureDate:string
    arrivalCity:string
    arrivalAirport:string
    arrivalInitial:string
    arrivalDate:string
    duration:number

}
export type allCompaniesAndBestPricesType={
    name:string
    bestPrice:number
}
let data={
    allCompaniesAndBestPrices:Array.from(new Set(flightData.result.flights.map((e)=>{
        return e.flight.carrier.caption
    })),(e)=>{return {name:e,bestPrice:0}}) as Array<allCompaniesAndBestPricesType>
   ,
    flights: flightData.result.flights.map((e,i)=>{
            return {
                id:String(i),
                company:e.flight.carrier.caption,
                price:e.flight.price.total.amount,
                firstPart:{
                    transfers:e.flight.legs[0]?.segments.length-1,
                    company:e.flight.legs[0].segments[0].airline.caption,
                    departureCity:e.flight.legs[0].segments[0].departureCity?.caption,
                    departureAirport:e.flight.legs[0].segments[0].departureAirport.caption,
                    departureInitial:e.flight.legs[0].segments[0].departureAirport.uid,
                    departureDate:e.flight.legs[0].segments[0].departureDate,
                    arrivalCity:e.flight.legs[0].segments[e.flight.legs[0]?.segments.length-1].arrivalCity?.caption,
                    arrivalAirport:e.flight.legs[0].segments[e.flight.legs[0]?.segments.length-1].arrivalAirport.caption,
                    arrivalInitial:e.flight.legs[0].segments[e.flight.legs[0]?.segments.length-1].arrivalAirport.uid,
                    arrivalDate:e.flight.legs[0].segments[e.flight.legs[0]?.segments.length-1].arrivalDate,
                    duration:e.flight.legs[0].duration
                },
                secondPart:{
                    transfers:e.flight.legs[1].segments.length-1,
                    company:e.flight.legs[1].segments[0].airline.caption,
                    departureCity:e.flight.legs[1].segments[0].departureCity?.caption,
                    departureAirport:e.flight.legs[1].segments[0].departureAirport.caption,
                    departureInitial:e.flight.legs[1].segments[0].departureAirport.uid,
                    departureDate:e.flight.legs[1].segments[0].departureDate,
                    arrivalCity:e.flight.legs[1].segments[e.flight.legs[1].segments.length-1].arrivalCity?.caption,
                    arrivalAirport:e.flight.legs[1].segments[e.flight.legs[1]?.segments.length-1].arrivalAirport.caption,
                    arrivalInitial:e.flight.legs[1].segments[e.flight.legs[1]?.segments.length-1].arrivalAirport.uid,
                    arrivalDate:e.flight.legs[1].segments[e.flight.legs[1]?.segments.length-1].arrivalDate,
                    duration:e.flight.legs[1].duration
                }
            }
        }) as Array<flightsData>,
    sort:"ascending" as "time"|"descending"|"ascending",
    filters:{
        transfers:[] as Array<number>,
        price:[0,1000000] as Array<number>,
        companies:[] as Array<string>
    },
    countOfTickets:2
};
type localActionsType=actionsType<typeof actions>
export let mainReducer=(state=data,action:localActionsType)=>{
    switch (action.type){
        case "changeFilter":{
            return state
        }
        case "changeSort":{
            return {...state,sort: action.sort}
        }
        case "changeTransfers":{
            let copyState:typeof state=JSON.parse(JSON.stringify(state))
            copyState.filters.transfers=action.transfers
            if(action.transfers.length>state.filters.transfers.length){
                copyState.filters.companies=[]
            }
            return {...copyState}
        }
        case "changeCompanies":{
            let copyState:typeof state=JSON.parse(JSON.stringify(state))
            if(copyState.filters.companies.includes(action.companies)){
                copyState.filters.companies.splice(copyState.filters.companies.findIndex((e)=>{return e===action.companies}),1)
            }
            else {
                copyState.filters.companies.push(action.companies)
            }

            return {...copyState}
        }
        case "changeCountOfTickets":{
            return {...state,countOfTickets:state.countOfTickets+2}
        }
        case "changePrice":{
            let copyState:typeof state=JSON.parse(JSON.stringify(state))
            copyState.filters.price[action.price==="low"?0:1]=action.value
            return {...copyState}
        }
        default:{
            return state
        }
    }
}
export let actions={
    changeFilter:(filter:any)=>({
        type:"changeFilter",
        filter
    }as const),
    changeTransfers:(transfers:Array<number>)=>({
        type:"changeTransfers",
        transfers
    }as const),
    changePrice:(price:"low"|"high",value:number)=>({
        type:"changePrice",
        price,
        value
    }as const),
    changeSort:(sort: "time"|"descending"|"ascending")=>({
        type:"changeSort",
        sort
    }as const),
    changeCompanies:(companies:string)=>({
        type:'changeCompanies',
        companies
    }as const),
    changeCountOfTickets:( )=>({
        type:"changeCountOfTickets"
    }as const )
}
