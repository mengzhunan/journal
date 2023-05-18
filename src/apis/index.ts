import qs from "qs";
import http from "./http";
import type { dataDetail, NewIssue, RecommendLike, SearchDate } from "../utils/parameter";
import type { magazine } from "@/utils/magazine"
import type { magazineDetail, Catalog, articleData } from "@/utils/detail"

const customConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const appCode: string = "3a2b07bf-afbe-11eb-a970-00163e04ca99";

let code = (code: string): string => { return qs.stringify({ "appCode": code }) }
let soma = (id: string, page: number, year: string, issue: string): string => {
    return qs.stringify({
        "magazineGuid": id,
        "page": page,
        "pageSize": 10,
        "year": year,
        "issue": issue,
        "appCode": "3a2b07bf-afbe-11eb-a970-00163e04ca99"
    })
}

let detail = (id: string, year: string, issue: string): string => {
    return qs.stringify({
        "magazineGuid": id,
        "year": year,
        "issue": issue,
        appCode
    })
}

let searchFrom = (key: string) => {
    return qs.stringify({
        "page": "1",
        "pageSize": "20",
        "key": key,
        appCode
    })
}

let journal = (id: string) => {
    return qs.stringify({
        "page": "1",
        "pageSize": "30",
        "cateCode": id,
        appCode
    })
}

let article = (id: string) => {
    return qs.stringify({
        'titleId': id,
        appCode
    })
}

export const API = {
    getDataNew: () => {
        return http.post<dataDetail>('home/topDataNew');
    },

    getNewIssue: () => {
        return http.post<NewIssue>('home/topDataNew', code("3a2b07bf-afbe-11eb-a970-00163e04ca99"), customConfig)
    },

    getJournal: () => {
        return http.post<magazine>('journalHome/topDataNew', code("3a2b07bf-afbe-11eb-a970-00163e04ca99"), customConfig)
    },
    // 获取报刊列表
    getMagazineCatalog: (id: string, page: number, year: string, issue: string) => {
        return http.post<Catalog>(`journal/catalog`, soma(id, page, year, issue), customConfig)
    },
    // 获取报刊详情
    getMagazineDetail: (id: string, year: string, issue: string) => {
        return http.post<magazineDetail>(`journal/detail`, detail(id, year, issue), customConfig)
    },
    // 获取搜索页面 猜你喜欢
    getRecommendLike: () => {
        return http.post<RecommendLike>("search/getRecommendJournal")
    },
    // 搜索杂志
    getSearchRes: (key: string) => {
        return http.post<SearchDate>('search/searchJournal', searchFrom(key), customConfig)
    },
    // 杂志分类列表
    getJournalList: (codeId: string) => {
        return http.post<RecommendLike>('journal/list', journal(codeId), customConfig)
    },
    //文章详情
    getArticleData: (id: string) => {
        return http.post<articleData>('article/detail', article(id), customConfig)
    }
}