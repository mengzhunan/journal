<script setup lang="ts">
import { API } from '@/apis'
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { onMounted, ref, } from 'vue';
import type { catalogDataContent, info } from '@/utils/detail'
import type { recommendOperation } from "@/utils/parameter"
import type { ConfigProviderThemeVars } from 'vant';

import NewspaperModule from '@/components/magazine/NewspaperModule.vue';
import { useTabState } from "@/stores/tabState"

// 隐藏底部导航栏
const { alterTabState } = useTabState()
alterTabState(false)

// 去除vant van-collapse-item 自带样式
const themeVars: ConfigProviderThemeVars = {
    collapseItemContentPadding: '0'
};

const router = useRouter()
const props = defineProps<{
    id: string,
    year: string,
    issue: string
}>()

// 关注状态
const attentionState = ref(true);

// 杂志简介
let skeletonState = ref(true); //骨架屏
let contentDetail = ref<recommendOperation>();
let former = ref<Array<info>>([])

function demo(id: string, year: string, issue: string) {
    let obj = {
        id: id,
        year: year,
        issue: issue
    }

    let arr: Array<{ id: string, year: string, issue: string }> = []
    arr.push(obj)
    let history = window.localStorage.getItem('storage') ? JSON.parse(window.localStorage.getItem('storage')!) : []
    history = [...arr, ...history.filter((h: { id: string, year: string, issue: string }) => h.id !== arr[0].id || h.year !== arr[0].year || h.issue !== arr[0].issue)]
    window.localStorage.setItem('storage', JSON.stringify(history))
}

onMounted(async () => {
    let { data } = await API.getMagazineDetail(props.id, props.year, props.issue)
    contentDetail.value = data.data.JournalInfo
    former.value = data.data.PastPeriodJournal
    skeletonState.value = false
    demo(props.id, props.year, props.issue)

    // 判断是否已关注
    let state = window.localStorage.getItem('interestList') ? JSON.parse(window.localStorage.getItem('interestList')!) : []
    if (state.length > 0) {
        state.forEach((h: { id: string, state: boolean }) => {
            if (h.id == contentDetail.value!.magazineGuid) {
                attentionState.value = h.state
            }
        })
    }
})

// 目录
const res = ref(1)
let page = res.value;

let catalog = ref<Array<catalogDataContent>>([]);
onMounted(async () => {
    let { data } = await API.getMagazineCatalog(props.id, page, props.year, props.issue)
    catalog.value = data.data
})
// 触底加载
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
    page = page + 1;
    API.getMagazineCatalog(props.id, page, props.year, props.issue).then((res) => {
        let { data } = res.data
        catalog.value = [...catalog.value, ...data]
        loading.value = false
        if (catalog.value.length >= 21) {
            finished.value = true
        }
    })
}

// 过往杂志展开标识
const activeName = ref('0');
const goDetail = ((id: string, year: string, issue: number) => {
    router.replace(`/details/${id}/${year}/${issue}`)
})

// 路由更新
onBeforeRouteUpdate((to) => {
    function getRouter(params: string | string[]) {
        return Array.isArray(params) ? params[0] : params
    }
    page = 1
    finished.value = false
    skeletonState.value = true;
    // console.log(to.params.id, to.params.year, to.params.issue);

    demo(getRouter(to.params.id), getRouter(to.params.year), getRouter(to.params.issue))

    API.getMagazineDetail(getRouter(to.params.id), getRouter(to.params.year), getRouter(to.params.issue)).then((res) => {
        let { data } = res
        contentDetail.value = data.data.JournalInfo
        skeletonState.value = false;
    })

    API.getMagazineCatalog(getRouter(to.params.id), page, getRouter(to.params.year), getRouter(to.params.issue)).then((res) => {
        let { data } = res
        catalog.value = data.data
    })
})

//阅读页面
const reading = (id: string) => {
    router.push(`/articleDetail/${id}`)
}

// 关注
const attention = () => {
    const isLogin = window.localStorage.getItem('token');
    if (!isLogin) {
        router.replace({ path: "/login", query: { s: `/details/${props.id}/${props.year}/${props.issue}` } })
    } else {
        attentionState.value = false
        let print = {
            id: contentDetail.value!.magazineGuid,
            title: contentDetail.value!.name,
            img: contentDetail.value!.posterz,
            year: contentDetail.value!.year,
            issue: contentDetail.value!.issue,
            state: false
        }

        let arr: Array<{
            id: string
            title: string
            img: string
            year: string
            issue: number
        }> = [];
        arr.push(print)
        let interest = window.localStorage.getItem('interestList') ? JSON.parse(window.localStorage.getItem('interestList')!) : []
        interest = [...arr, ...interest.filter((h: { id: string }) => h.id! !== arr[0].id)]
        window.localStorage.setItem('interestList', JSON.stringify(interest))
    }
}

const cancel = () => {
    attentionState.value = true;
    let interest = JSON.parse(window.localStorage.getItem('interestList')!)

    interest.forEach((h: { id: string, state: boolean }, index: number) => {
        if (h.id == contentDetail.value!.magazineGuid) {
            interest.splice(index, 1);
        }
    })
    window.localStorage.setItem('interestList', JSON.stringify(interest))
}

</script>
<template>
    <div class="skeleton" v-if="skeletonState">
        <van-skeleton>
            <template #template>
                <div :style="{ display: 'flex', width: '100%' }">
                    <van-skeleton-image />
                    <div :style="{ flex: 1, marginLeft: '16px' }">
                        <van-skeleton title :row="3" />
                    </div>
                </div>
            </template>
        </van-skeleton>
        <van-skeleton title :row="3" />
        <div :style="{ margin: '6rem 10rem' }" v-for="i in 5" :key="i">
            <van-skeleton-paragraph row-width="50%" />
            <van-skeleton-paragraph />
            <van-skeleton-paragraph />
        </div>
    </div>

    <div class="detail-content" v-else>
        <van-sticky>
            <div class="nav-bar">
                <van-icon class="icon" @click="$router.go(-1)" color="#000" name="arrow-left" size="24rem" />
                <div class="name">{{ contentDetail?.name }}</div>
                <div class="button" @click="attention" v-show="attentionState"> + 关注 </div>
                <div class="button cancel" @click="cancel" v-show="!attentionState"> 已关注 </div>
            </div>
        </van-sticky>
        <div class="gradual">
            <div class="top">
                <div class="cover">
                    <van-image class="auto-img" width="100rem" height="130rem" lazy-load :src="contentDetail?.posterz" />
                </div>
                <div class="right">
                    <div class="title">{{ contentDetail?.name }}</div>
                    <div class="time">{{ contentDetail?.year }}年{{ contentDetail?.issue }}期</div>
                    <div class="read">{{ contentDetail?.readNum }}人阅读</div>
                </div>
            </div>
        </div>
        <van-text-ellipsis class="introduction" rows="3" :content="contentDetail?.note" expand-text="展开"
            collapse-text="收起" />
        <van-tabs swipeable shrink line-width="0" line-height="0">
            <van-tab title="目录" class="title">
                <div class="catalogue">
                    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <van-cell class="chunk" v-for="c in catalog" :key="c.magazineGuid" @click="reading(c.titleId)">
                            <div class="c-con">
                                <div>
                                    <div class="name van-ellipsis">{{ c.columns }} | {{ c.title }}</div>
                                    <div class="desc van-multi-ellipsis--l2">{{ c.describes }} </div>
                                </div>
                                <van-image class="img" width="76rem" height="76rem" lazy-load :src="c.posterz"
                                    v-if="c.posterz" />
                            </div>
                        </van-cell>
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="过往杂志">
                <van-collapse v-model="activeName" accordion>
                    <van-config-provider :theme-vars="themeVars">
                        <van-collapse-item :title="raw.year" v-for="(raw, index) in former" :key="index" :name="index">
                            <van-grid :border="false" :column-num="3">
                                <van-grid-item v-for="item in raw.list" :key="item.magazineGuid"
                                    @click="goDetail(item.magazineGuid, item.year, item.issue)">
                                    <NewspaperModule :data="item" :num="1" />
                                </van-grid-item>
                            </van-grid>
                        </van-collapse-item>
                    </van-config-provider>
                </van-collapse>

            </van-tab>
        </van-tabs>
    </div>
</template>


<style lang="scss" scoped>
.detail-content {

    .nav-bar {
        // margin-bottom: 10rem;
        padding: 10rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #989898;

        .name {
            font-size: 16rem;
            font-weight: 900;
            color: #000;
        }

        .button {
            padding: 4rem 10rem;
            border-radius: 16rem;
            background-color: #f00;
            color: #fff;

            &.cancel {
                color: #000;
                background-color: #e6e6e6;
            }
        }
    }

    .gradual {
        padding: 10rem;
        background-image: linear-gradient(#989898, #fff);
    }

}


.top {
    display: flex;
    align-items: flex-end;

    .cover {
        margin-right: 10rem;

        .auto-img {
            border-radius: 4rem;
            overflow: hidden;
        }
    }

    .right {
        .title {
            font-size: 26rem;
            font-weight: 900;
            color: #000;
            margin: 6rem 0;
        }

        .time {
            font-size: 14rem;
            color: #999;
            padding: 0 0 8rem;
        }

        .read {
            width: 80rem;
            text-align: center;
            font-size: 12rem;
            color: #fff;
            padding: 2rem 0rem;
            background-color: #42476C;
            border-radius: 4rem;
        }
    }
}

.introduction {
    font-size: 14rem;
    color: #000;
    margin: 16rem 10rem 10rem;
}

.catalogue {
    margin: 0 10rem;

    .chunk {
        padding: 8rem;
        margin-bottom: 10rem;
        border-radius: 4rem;
        box-shadow: rgb(179, 179, 179, 0.4) 1px 1px 6px;

        .c-con {
            display: flex;
            justify-content: space-between;
        }

        .name {
            width: 254rem;
            margin-bottom: 4rem;
            text-align: left;
            font-size: 17rem;
            font-weight: 700;
            color: #000;
        }

        .img {
            flex-shrink: 0;
            border-radius: 4rem;
            margin-left: 8rem;
            overflow: hidden;
        }

        .desc {
            text-align: left;
            font-size: 13rem;
            color: #333;
        }
    }
}
</style>