<script setup lang="ts">
import { useTabState } from "@/stores/tabState"
import type { recommendOperation } from "@/utils/parameter"
import { onMounted, ref } from "vue";
import { API } from '@/apis';
import { useRouter } from 'vue-router';

// 导航栏显示/隐藏
const { alterTabState } = useTabState()
alterTabState(true)

const router = useRouter()

let history = window.localStorage.getItem('storage') ? JSON.parse(window.localStorage.getItem('storage')!) : []
const magazine = ref<Array<recommendOperation>>([])

const account: { pattern: string, pwd: string } = window.localStorage.getItem('loginInformation') ? JSON.parse(window.localStorage.getItem('loginInformation')!) : '请登录'

onMounted(() => {
    history.forEach((ele: { id: string, year: string, issue: string }) => {
        API.getMagazineDetail(ele.id, ele.year, ele.issue).then((res) => {
            let { data } = res;
            magazine.value.push(data.data.JournalInfo)
        })
    });
})

const goDetail = ((id: string, year: string, issue: number) => {
    router.push(`/details/${id}/${year}/${issue}`)
})

// 关注列表
let interest: Array<{ id: string, img: string, issue: number, title: string, year: string }> = window.localStorage.getItem('interestList') ? JSON.parse(window.localStorage.getItem('interestList')!) : []

</script>
<template>
    <div class="top">
        <div class="heard">
            <img src="../../public/hear.png" alt="">
        </div>
        <div class="account">{{ account.pattern }}</div>
    </div>
    <div class="attention">
        <div class="me">我的关注</div>
        <div class="attention-content">
            <van-grid :border="false" :column-num="3" v-if="interest.length">
                <van-grid-item v-for="n in interest" :key="n.id">
                    <van-image radius="3rem" width="108rem" height="150rem" lazy-load :src="n.img"
                        @click="goDetail(n.id, n.year, n.issue)" />
                    <div class="txt van-ellipsis">{{ n.title }}</div>
                    <div class="time">{{ n.year }}年{{ n.issue }}期</div>
                </van-grid-item>
            </van-grid>
            <van-empty v-else image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
                description="列表为空文案~" />
        </div>
    </div>
    <div class="read">
        <div>最近阅读</div>
        <div>您最近的阅读我们帮您汇总了</div>
    </div>
    <van-grid :border="false" :column-num="3" v-if="magazine.length">
        <van-grid-item v-for="n in magazine" :key="n.magazineGuid">
            <van-image radius="3rem" width="108rem" height="150rem" lazy-load :src="n.posterz"
                @click="goDetail(n.magazineGuid, n.year, n.issue)" />
            <div class="txt van-ellipsis">{{ n.name }}</div>
            <div class="time">{{ n.year }}年{{ n.issue }}期</div>
        </van-grid-item>
    </van-grid>
    <van-empty v-else image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
        description="列表为空文案~" />
</template>

<style lang="scss" scoped>
.top {
    display: flex;
    align-items: center;
    margin: 20rem 10rem;

    .heard {
        width: 48rem;
        height: 48rem;
        margin-right: 10rem;

        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    .account {
        font-size: 20rem;

    }
}

.me {
    margin: 0 10rem;
    font-size: 18rem;
    font-weight: 600;
}

.read {
    margin: 0 10rem;

    &>div:first-child {
        font-size: 18rem;
        font-weight: 600;
    }

    &>div:last-child {
        font-size: 14rem;
        color: #999;
    }

}

.txt {
    width: 108rem;
    font-size: 14rem;
    margin-top: 10rem;
    color: #000;
    font-weight: 600;
}

.time {
    padding: 6rem 0 0;
    width: 108rem;
    font-size: 12rem;
    color: #b6b6b6;
    font-weight: 600;
}
</style>