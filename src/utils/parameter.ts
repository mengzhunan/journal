
export interface stories {
    // articleFollowNum: 0
    // articleImgList: []
    // articleType: 1
    author: string,
    columns: string
    comNum: number
    content: string
    contentText: string
    describes: string
    endTime: string
    nullfollowNum: number
    iconImage: ""
    isBuy: number
    isContainImg: number
    isDownload: number
    isFavorite: number
    isJournalFollow: number
    isPraise: number
    issn: string
    issue: 2
    // journalFollowNum: 274
    // journalReadNum: 349
    keywords: string
    // lastArticle: null
    magazineGuid: string
    magazineName: string
    magazinePoster: string
    nameicon: string
    // nextArticle: null
    poster: string
    posterz: string
    // praiseNum: 0
    price: number
    title: string
    titleId: string
    versionH5Url: string
    wordsize: number
    year: number
}

export interface bannerDetail {
    bannerPoster: string
    bannerTitle: string
    // bcolumn:0
    createTime: string,
    endTime: string,
    homeBackPoster: string,
    id: number,
    isShare: number,
    platformType: number,
    position: number,
    remark: string,
    resInfo: string
    resInfoOne: string
    resInfoTwo: string
    resType: number,
    searchBackPoster: string,
    startTime: string,
    state: number,
    torder: number,
    uniqueCode: string
    updateTime: string,
}

export interface columnDetail {
    columnName: string,
    uniqueCode: string,
}

export interface cateDetail {
    cateCode: string
    cateName: string
    catePoster: string
    describes: string
    homePoster: string
    journalList: []
}

export interface operationDetail {
    firstContentCode: string
    imageUrl: string
    isMore: number
    menuName: string
    menuSubName: string
    operationContent: Array<recommendOperation>
    type: number
    uniqueCode: string
}

export interface recommendOperation {
    cateCode: string
    cateName: string
    codeName: string
    cycle: number
    // followNum:number
    // iconImage:string
    // isBuy:number
    // isFavorite:number
    // isJournalFollow:number
    // isYearBuy:number
    issue: number
    // journalCatalog:[]
    journalFollowNum: number
    magazineGuid: string
    name: string
    nameicon: string
    note: string
    orageEpubUrl: string
    pageCount: number
    poster: string
    posterl: string
    posterm: string
    posterz: string
    price: number
    printingPrice: number
    publishStatus: number
    readNum: number
    // resdUser:[]
    textEpubUrl: string
    versionH5Url: string
    year: string
    yearPrice: number
}

export interface demand {
    firstContentCode: string
    imageUrl: string
    isMore: number
    menuName: string
    menuSubName: string
    operationContent: Array<recommendOperation>
    type: number
    uniqueCode: string
}

export interface recommendDetail {
    firstContentCode: string
    imageUrl: string
    isMore: number
    menuName: string
    menuSubName: string
    operationContent: Array<recommendOperation & wordEntry & demand>
    type: number
    uniqueCode: string
}

export interface wordEntry {
    articleFollowNum: number
    articleImgList: []
    articleType: number
    author: string
    columns: string
    comNum: number
    content: string
    contentText: string
    describes: string
    endTime: string
    // followNum: number
    // iconImage: string
    // isBuy: number
    // isContainImg: string
    // isDownload: string
    // isFavorite: string
    // isJournalFollow: string
    // isPraise: string
    // issn: string
    issue: number
    journalFollowNum: number
    journalReadNum: number
    keywords: string
    lastArticle: string
    magazineGuid: string
    magazineName: string
    magazinePoster: string
    nameicon: string
    nextArticle: string
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

interface describe {
    ArticleList: Array<stories>
    BannerList: Array<bannerDetail>;
    InfoColumnList: Array<columnDetail>;
    JournalCateList: Array<cateDetail>;
    OperationList: Array<operationDetail>;
    RecommendedList: Array<recommendDetail>;
}

export interface NewIssueList {
    RecommendedList: Array<recommendDetail>;
}

export interface dataDetail {
    code: number,
    data: describe,
    message: string,
}

export interface NewIssue {
    code: number,
    data: NewIssueList,
    message: string,
}

export interface RecommendLike {
    data: Array<recommendOperation>
}

export interface SearchDate {
    data: {
        records: Array<recommendOperation>
    }
}









