import type { recommendOperation } from "./parameter"

export interface info {
    list: Array<recommendOperation>
    year: string
}

export interface catalogDataContent {
    articleFollowNum: number
    articleImgList: string
    articleType: number
    author: string
    columns: string
    comNum: number
    content: string
    contentText: string
    describes: string
    endTime: string
    followNum: number
    iconImage: string
    isBuy: string
    isContainImg: string
    isDownload: string
    isFavorite: string
    isJournalFollow: string
    isPraise: string
    issn: string
    issue: number
    journalFollowNum: string
    journalReadNum: string
    keywords: string
    lastArticle: string
    magazineGuid: string
    magazineName: string
    magazinePoster: string
    nameicon: string
    nextArticle: string
    poster: string
    posterz: string
    praiseNum: string
    price: string
    title: string
    titleId: string
    versionH5Url: string
    wordsize: number
    year: number
}

interface detailData {
    JournalInfo: recommendOperation,
    PastPeriodJournal: Array<info>
}

export interface article {
    articleFollowNum: string
    articleImgList: []
    articleType: string
    author: string
    columns: string
    comNum: number
    content: string
    contentText: string
    describes: string
    // endTime: string
    // followNum: number
    // iconImage: string
    // isBuy: number
    // // isContainImg: string
    // isDownload: string
    // isFavorite: string
    // isJournalFollow: string
    // isPraise: string
    // issn: string
    // issue: number
    journalFollowNum: number
    journalReadNum: number
    keywords: string
    lastArticle: string
    magazineGuid: string
    magazineName: string
    magazinePoster: string
    nameicon: string
    // nextArticle: {
    //     articleFollowNum: number,
    //     articleImgList: [],
    //     articleType: 0,
    //     author: string,
    //     columns: string,
    // }
    poster: string
    posterz: string
    praiseNum: number
    price: number
    title: string
    titleId: string
    versionH5Url: string
    wordsize: number
    year: number
}


// 详情
export interface magazineDetail {
    data: detailData
}
// 目录
export interface Catalog {
    data: Array<catalogDataContent>
}

// 文章
export interface articleData {
    data: article
}