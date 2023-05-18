<script setup lang="ts">
import type { wordEntry } from "@/utils/parameter"
import { useRouter } from "vue-router";

const props = defineProps<{
    list: Array<wordEntry>
}>()

const router = useRouter();
const reading = (id: string) => {
    console.log(id);
    router.push(`/articleDetail/${id}`)
}

</script>

<template>
    <div class="m-content">
        <div class="warp">

            <div class="content">
                <div class="chunk" v-for="(res, index) in (props.list)?.slice(0, 3)" :key="res.titleId">
                    <div class="cover"><van-image class="auto-img" width="50rem" height="50rem" lazy-load
                            :src="res.posterz" />
                    </div>
                    <div class="num" :class="{ active: ((index + 1) % 2 != 0) }">{{ index + 1 }}</div>
                    <div class="txt" @click="reading(res.titleId)">
                        <div class="title van-ellipsis">{{ res.title }}</div>
                        <div class="sub van-ellipsis">{{ res.describes }}</div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="chunk" v-for="(res, index) in (props.list)?.slice(3, 6)" :key="res.titleId">
                    <div class="cover"><van-image class="auto-img" width="50rem" height="50rem" lazy-load
                            :src="res.posterz" />
                    </div>
                    <div class="num" :class="{ active: ((index + 1) % 2 != 0) }">{{ index + 4 }}</div>
                    <div class="txt" @click="reading(res.titleId)">
                        <div class="title van-ellipsis">{{ res.title }}</div>
                        <div class="sub van-ellipsis">{{ res.describes }}</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="chunk" v-for="(res, index) in (props.list)?.slice(6, 9)" :key="res.titleId">
                    <div class="cover"><van-image class="auto-img" width="50rem" height="50rem" lazy-load
                            :src="res.posterz" />
                    </div>
                    <div class="num" :class="{ active: ((index + 1) % 2 != 0) }">{{ index + 7 }}</div>
                    <div class="txt" @click="reading(res.titleId)">
                        <div class="title van-ellipsis">{{ res.title }}</div>
                        <div class="sub van-ellipsis">{{ res.describes }}</div>
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

.m-content {
    width: 100%;
    overflow: auto;
}

.warp {
    display: flex;
    height: 220rem;
}

.content {
    width: 320rem;
    margin-right: 10rem;
    padding: 10rem;
    background-color: #f7f7f7;
    border-radius: 8rem;
    @include reuse;

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
            border-radius: 4rem 4rem 4rem 4rem;
            overflow: hidden;
        }
    }

    .txt {
        flex: 1;
        height: 48rem;
        width: 220rem;
        @include reuse;

        .title {
            font-size: 15rem;
            font-weight: 600;
        }

        .sub {
            font-size: 12rem;
            width: 180rem;
        }
    }
}
</style>