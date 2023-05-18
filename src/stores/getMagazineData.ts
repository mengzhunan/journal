import { ref } from 'vue'
import type { detail } from "@/utils/magazine"
import type { recommendDetail, recommendOperation } from "@/utils/parameter"
import { defineStore } from 'pinia'
import { API } from '@/apis';

export const magazineData = defineStore('getMagazineData', () => {
    
    const skeletonState = ref(true)
    const nav = ref<Array<detail>>([]);
    const mList = ref<Array<detail>>([])
    const hot = ref
        <{ name: string, sub: string, operation: Array<recommendOperation> }>
        ({ name: '', sub: '', operation: [] });
    async function getData() {
        let { data } = await API.getJournal()
        nav.value = data.data.JournalCateList
        // 杂志列表
        mList.value = data.data.CateJournalList

        skeletonState.value = false

        // 当月热搜
        data.data.RecommendedList.forEach((element: recommendDetail) => {
            hot.value = {
                name: element.menuName,
                sub: element.menuSubName,
                operation: element.operationContent
            }
        })
    }
    getData()

    return { skeletonState, nav, mList, hot }
})
