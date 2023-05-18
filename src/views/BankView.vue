<script setup lang="ts">
import { useTabState } from "@/stores/tabState"
import { useRouter } from 'vue-router';

const router = useRouter();
const { alterTabState } = useTabState();
alterTabState(true);
const account: { pattern: string, pwd: string } = window.localStorage.getItem('loginInformation') ? JSON.parse(window.localStorage.getItem('loginInformation')!) : '请登录'

const exit = () => {
    window.localStorage.removeItem('token')
    router.replace('/')
}

</script>

<template>
    <div class="top-bg">
        <div class="top">
            <div class="heard">
                <img src="../../public/hear.png" alt="">
            </div>
            <div class="account">{{ account.pattern }}</div>
        </div>
        <div class="box">
            <div>名刊会会员</div>
            <div>查看会员特权</div>
        </div>
    </div>
    <div class="title">账号服务</div>
    <div class="account">
        <van-cell title="购买记录" icon="shopping-cart-o">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title="充值记录" icon="cash-o">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title="我的兑换码" icon="exchange">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title="我的充值" icon="cash-o">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>
    </div>
    <div class="title">工具服务</div>
    <div class="tool">
        <van-cell title="设置" icon="setting-o">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>
        <van-cell title="关于我们" icon="warning-o">
            <template #right-icon>
                <van-icon name="arrow" />
            </template>
        </van-cell>

    </div>
    <div class="btn" @click="exit">
        <van-button block round color="linear-gradient(-40deg, #ff6034, #ee0a24)">
            退出登录
        </van-button>
    </div>
</template>

<style lang="scss" scoped>
.top-bg {
    position: relative;
    background-color: #C65D3D;
    height: 160rem;
    padding: 20rem 10rem;
    clip-path: ellipse(65% 61% at 50% 36%);
}

.box {
    padding: 10rem;
    position: absolute;
    bottom: 0;
    left: 14%;
    width: 250rem;
    height: 38rem;
    border-radius: 10rem;
    background-color: #313234;
    display: flex;
    justify-content: space-between;

    >div {
        height: 20rem;
        line-height: 20rem;
    }

    >:first-child {
        color: #DABB7F
    }

    >:last-child {
        padding: 0 4rem;
        border-radius: 4rem;
        background-color: #DABB7F;
    }
}

.top {
    display: flex;
    align-items: center;

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
        color: #fff;
        font-size: 20rem;

    }
}

.title {
    font-size: 12rem;
    color: #999;
    margin: 10rem 10rem 0;
}

.btn {
    margin: 30rem 10rem;
}
</style>