
import type { recommendOperation, recommendDetail } from './parameter'

export interface detail {
    cateCode: string
    cateName: string
    catePoster: string
    describes: string
    homePoster: string
    journalList: Array<recommendOperation>
}

interface mData {
    CateJournalList: Array<detail>
    JournalCateList: Array<detail>
    RecommendedList: Array<recommendDetail>
}

export interface magazine {
    data: mData
}