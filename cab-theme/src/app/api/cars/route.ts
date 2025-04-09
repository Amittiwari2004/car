

import { NextResponse, type NextRequest } from "next/server";
import cars from "../../../../public/mock-data.json";

export async function GET(){
    console.log(cars);
    
    return NextResponse.json({
        message:"Hello from cars route",
        cars:cars
    })
}