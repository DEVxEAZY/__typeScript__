import { create } from "domain";

type NameList = string[]

type CalendarDate = [day: number, month: number, year: number]

const list: NameList = [];

list.push("Will");

const date: CalendarDate = [43,432,53] 

function createDete(...date: CalendarDate){
    const[day, month, year] = date;
}

createDete(30,11,2026)