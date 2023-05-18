<script setup lang="ts">
import { useRouter } from "vue-router";
import type { recommendOperation } from "@/utils/parameter"

const router = useRouter();
const props = defineProps<{
    list: Array<recommendOperation>,
}>()

const skip = (id: string, year: string, issue: number) => {
    router.push({
        path: `/details/${id}/${year}/${issue}`,
    })
}
</script>

<template>
    <div class="m-content">
        <div class="warp">
            <div class="card" @click="skip(item.magazineGuid, item.year, item.issue)" v-for="item in props.list"
                :key="item.magazineGuid">
                <div class="cover"><van-image width="112rem" height="150rem" lazy-load :src="item.posterz" /></div>
                <div class="name van-ellipsis">{{ item.name }}</div>
                <div class="time">{{ item.year }}年{{ item.issue }}期</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.m-content {
    width: 100%;
    overflow: auto;

    .warp {
        display: flex;

        .card {
            flex-shrink: 1;
            margin-right: 12rem;
        }

        .cover {
            overflow: hidden;
            border-radius: 3rem;
        }

        .name {
            font-size: 14rem;
            color: #000;
            font-weight: 600;
        }

        .time {
            font-size: 12rem;
            color: #b6b6b6;
            padding-bottom: 10rem;
            font-weight: 600;
        }
    }
}
</style>