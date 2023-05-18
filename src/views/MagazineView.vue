<script setup lang="ts">
import { toRefs } from 'vue';
import HeadlineChunk from "@/components/HeadlineChunk.vue"
import MagazineList from "@/components/magazine/MagazineList.vue"
import { useTabState } from "@/stores/tabState"
import { magazineData } from "@/stores/getMagazineData"
import { useRouter } from 'vue-router';

// 导航栏显示/隐藏
const { alterTabState } = useTabState()
alterTabState(true)

const router = useRouter()

const { skeletonState, nav, hot } = toRefs(magazineData())

const getCateCode = (code: string, i: number) => {
    router.push(`/classification/${code}/${i}`)
}

const search = (() => {
    router.push("/search")
})

</script>

<template>
    <div v-if="skeletonState">
        <van-skeleton title :row="2" />
        <van-skeleton>
            <template #template>
                <div class="skeleton">
                    <div class="s-img" v-for="s in 8" :key="s"><van-skeleton-image class="img" /></div>
                </div>
            </template>
        </van-skeleton>
        <van-skeleton title :row="3" />
        <div :style="{ margin: '6rem 10rem' }" v-for="i in 2" :key="i">
            <div class="sk-content">
                <div v-for="r in 3" :key="r">
                    <van-skeleton-image />
                    <van-skeleton-paragraph row-width="30%" />
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <van-sticky>
            <div class="search-box" @click="search">
                <div class="search"><van-icon name="search" />搜索</div>
            </div>
        </van-sticky>
        <div class="nav">
            <div class="nav-content">
                <div class="item" v-for="(c, index) in nav" :key="c.cateCode" @click="getCateCode(c.cateCode, index)">
                    <van-image width="36rem" height="36rem" lazy-load :src="c.catePoster" />
                    <div class="txt">{{ c.cateName }}</div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="hot">
                <HeadlineChunk :num="4" :title="hot.name" :sub="hot.sub" />
                <NewspaperList :list="hot.operation" />
            </div>
            <MagazineList />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.skeleton {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

    .s-img {
        flex-shrink: 1;
        margin: 10rem;
        width: 50rem;
        height: 50rem;
        border-radius: 24rem;
        overflow: hidden;

        .img {
            width: 100%;
            height: 100%;
            display: inline-block;
        }
    }
}

.sk-content {
    display: flex;
    justify-content: space-around;
}

.search-box {
    background-color: #ef0000;
    padding: 10rem;

    .search {
        background-color: #f2f2f2;
        color: #999;
        text-align: center;
        font-size: 14rem;
        line-height: 26rem;
        height: 26rem;
        border-radius: 20rem;
    }
}

.nav {
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 105rem;
        border-radius: 0 0 30rem 30rem;
        background-color: #ef0000;
    }
}

.nav-content {
    margin: 0rem 20rem;
    background-color: #fff;
    border-radius: 10rem;
    height: 220rem;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;

    .item {
        margin: 0 9rem;
        text-align: center;

        .txt {
            font-size: 12rem;
            margin: 2rem 0;
        }
    }
}

.content {
    margin: 20rem 0 50rem;

    .hot {
        margin: 0 10rem;
    }
}
</style>