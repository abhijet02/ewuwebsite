export interface IEvent{
    id: number,
    title: string,
    subTitle: string,
    viewAll: string,
    notice: INotice[]
}

export interface INotice{
    id: number,
    date: number,
    month: string,
    time: string,
    title: string,
    location: string
}

export interface ILatest{
    id: number,
    tag: number,
    name: string,
    date: string
}

export interface IItem{
    id: number,
    name: string,
    data: ILatest[],
}

export interface ILatestNotice{
    id: number,
    title: string,
    viewAll: string,
    items: IItem[]
}