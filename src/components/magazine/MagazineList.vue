<script setup lang="ts">
import { useRouter } from "vue-router";
import { toRefs } from 'vue';
import NewspaperModule from "./NewspaperModule.vue";
import { magazineData } from "@/stores/getMagazineData"

const { mList } = toRefs(magazineData())
const router = useRouter()

const goDetail = ((id: string, year: string, issue: number) => {
    router.push(`/details/${id}/${year}/${issue}`)
})

const getCateCode = (code: string, i: number) => {
    router.push(`/classification/${code}/${i}`)
}

</script>

<template>
    <div v-for="(res, index) in mList" :key="res.cateCode">
        <div class="title">
            <div class="name"> {{ res.cateName }}</div>
            <div class="more" @click="getCateCode(res.cateCode, index)">更多</div>
        </div>
        <van-grid :border="false" :column-num="3">
            <van-grid-item v-for="item in res.journalList" :key="item.magazineGuid"
                @click="goDetail(item.magazineGuid, item.year, item.issue)">
                <NewspaperModule :data="item" :num="1" />
            </van-grid-item>
        </van-grid>
    </div>
</template>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 20rem 10rem 0;
    font-size: 20rem;

    .name {
        font-weight: 900;
    }

    .more {
        font-size: 16rem;
        color: #B8B8B8;
    }
}
</style>