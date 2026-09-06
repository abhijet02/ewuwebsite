import { StaticImageData } from "next/image";


export interface IDepatmentCard{
    id: number,
    img: StaticImageData,
    title: string,
    text: string
}