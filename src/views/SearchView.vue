<script setup lang="ts">
import { useTabState } from "@/stores/tabState"
import type { recommendOperation } from "@/utils/parameter";
import { useRouter } from "vue-router";
import { API } from "@/apis";
import { ref, onMounted } from "vue";

// 底部导航显示/隐藏状态
const { alterTabState } = useTabState()
alterTabState(false)

// 猜你喜欢
const router = useRouter()
const recommendLike = ref<Array<recommendOperation>>([])
onMounted(async () => {
    let { data } = await API.getRecommendLike()
    recommendLike.value = data.data
})
const goDetail = ((id: string, year: string, issue: number) => {
    router.push(`/details/${id}/${year}/${issue}`)
})

// 搜索
const state = ref(true);
const skeletonState = ref(true);
const value = ref('');
const searchState = ref(true);
const searchResult = ref<Array<recommendOperation>>([])
const history = ref(window.localStorage.getItem("historyList") ? JSON.parse(window.localStorage.historyList) : JSON.parse("[]"));
const onSearch = (val: string) => {
    if (val == '') {
        return;
    }
    state.value = false
    let array = window.localStorage.getItem("historyList") ? JSON.parse(window.localStorage.historyList) : JSON.parse("[]")
    array = [val, ...array.filter((h: string) => h !== val)];
    history.value = array
    window.localStorage.setItem('historyList', JSON.stringify(array))
    API.getSearchRes(val).then((res) => {
        let { data } = res.data
        searchResult.value = data.records
        skeletonState.value = false
        if (!searchResult.value.length) {
            searchState.value = false
        }
    })
}
const acquire = () => {
    value.value = ''
    state.value = true
    skeletonState.value = true
}

// 历史记录搜索
const redo = ((event: string) => {
    value.value = event
    onSearch(event)
})
// 清除历史记录
const del = (() => {
    window.localStorage.removeItem('historyList')
    history.value = [];
})

</script>

<template>
    <van-sticky>
        <div class="top">
            <div @click="$router.go(-1)"><van-icon name="arrow-left" size="20rem" /></div>
            <van-search class="search" v-model="value" shape="round" placeholder="请输入搜索关键词"
                @search="onSearch" @focus="acquire" />
        </div>
    </van-sticky>
    <div v-show="state">
        <div class="title" v-if="history.length">
            <div>历史搜索</div>
            <div class="del" @click="del">清除记录</div>
        </div>
        <div class="history">
            <div class="history-content" v-for="res in history" :key="res" @click="redo(res)">{{ res }}</div>
        </div>

        <div class="title">猜您喜欢</div>
        <div class="like">
            <div class="chunk" v-for="r in recommendLike.slice(0, 6)" :key="r.magazineGuid"
                @click="goDetail(r.magazineGuid, r.year, r.issue)">
                <div class="cover"><van-image radius="3rem" width="52rem" height="70rem" lazy-load :src="r.posterz" /></div>
                <div class="right">
                    <div class="name">{{ r.name }}</div>
                    <div class="time">{{ r.year }}年{{ r.issue }}期</div>
                </div>
            </div>
        </div>
    </div>
    <div v-show="!state">
        <div class="skeleton" v-if="skeletonState">
            <van-skeleton v-for="res in 3" :key="res">
                <template #template>
                    <div :style="{ display: 'flex', width: '100%' }">
                        <van-skeleton-image />
                        <div :style="{ flex: 1, marginLeft: '16px' }">
                            <van-skeleton title :row="3" />
                        </div>
                    </div>
                </template>
            </van-skeleton>
        </div>
        <div v-else>
            <div class="chunk" v-for="r in searchResult" :key="r.magazineGuid"
                @click="goDetail(r.magazineGuid, r.year, r.issue)" v-if="searchState">
                <div class="cover"><van-image radius="3rem" width="52rem" height="70rem" lazy-load :src="r.posterz" /></div>
                <div class="right">
                    <div class="name">{{ r.name }}</div>
                    <div class="time">{{ r.year }}年{{ r.issue }}期</div>
                </div>
            </div>
            <van-empty image="search" description="暂无此搜索结果，换个别的试试吧!" v-if="!searchState" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.top {
    padding-left: 10rem;
    display: flex;
    align-items: center;
    background-color: #fff;

    .search {
        flex: 1;
    }
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10rem;
    font-size: 20rem;
    font-weight: 900;
    color: #000;

    .del {
        color: #999;
        font-size: 14rem;
        font-weight: normal;
    }
}

.history {
    margin: 0 10rem;
    display: flex;
    flex-wrap: wrap;

    .history-content {
        margin: 0 10rem 10rem 0;
        flex-shrink: 1;
        padding: 4rem 10rem;
        background-color: #dcdcdc;
        border-radius: 16rem;
    }
}

.like {
    margin: 4rem 10rem 10rem;
}

.chunk {
    margin: 8rem 0;
    padding: 6rem;
    display: flex;
    border-radius: 10rem;
    background-color: #F7F7F7;

    .cover {
        margin-right: 8rem;
    }

    .name {
        font-size: 15rem;
        color: #000;
        font-weight: 600;
        margin: 8rem 0;
    }

    .time {
        font-size: 13rem;
        color: #999;
    }
}
</style>