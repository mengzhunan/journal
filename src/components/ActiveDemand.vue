<script setup lang="ts">
import type { demand } from "@/utils/parameter"
import { useRouter } from "vue-router";

const props = defineProps<{
    list: Array<demand>
}>()

const router = useRouter()
const goDetail = ((id: string, year: string, issue: number) => {
    router.push(`/details/${id}/${year}/${issue}`)
})

</script>

<template>
    <div class="dem-content">
        <div class="content-wap">

            <div class="ranking" v-for="(item, index) in props.list" :key="index">
                <div class="title">{{ item.menuName }}</div>
                <div class="chunk" v-for="(res, index) in item.operationContent" :key="res.magazineGuid"
                    @click="goDetail(res.magazineGuid, res.year, res.issue)">
                    <div class="cover"><van-image class="auto-img" width="45rem" height="64rem" lazy-load
                            :src="res.posterz" />
                    </div>
                    <div class="num" :class="{ active: ((index + 1) % 2 != 0) }">{{ index + 1 }}</div>
                    <div class="txt">
                        <div class="t-title van-ellipsis">{{ res.name }}</div>
                        <div class="sub van-ellipsis">{{ res.year }}年{{ res.issue }}期</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@mixin reuse {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.dem-content {
    width: 100%;
    overflow: auto;

    .content-wap {
        height: 270rem;
        display: flex;

        .ranking {
            background-color: #f7f7f7;
            border-radius: 10rem;
            padding: 10rem;
            margin-right: 8rem;
            @include reuse;
        }

        .title {
            font-size: 17rem;
            font-weight: 600;
        }
    }
}

.chunk {
    display: flex;
    align-items: center;
}

.num {
    font-size: 16rem;
    margin: 10rem;
    color: #999;

    &.active {
        color: #F39F17;
    }
}

.cover {
    flex-shrink: 1;

    .auto-img {
        border-radius: 2rem;
        overflow: hidden;
    }
}

.txt {
    flex: 1;
    height: 58rem;
    width: 220rem;
    @include reuse;

    .t-title {
        font-size: 15rem;
        font-weight: 900;
    }

    .sub {
        font-size: 12rem;
        color: #777;
    }
}
</style>