import { StaticImageData } from "next/image";

export interface IChairperson{
    id: number,
    name: string,
    title: string,
    img: StaticImageData,
    facebook: string,
    twitter: string,
    linkedin: string
}