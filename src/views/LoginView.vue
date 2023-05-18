<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useTabState } from "@/stores/tabState"

const router = useRouter();
const route = useRoute();
const { alterTabState } = useTabState();
alterTabState(false);

const { query } = route
const mobile = ref('');
const password = ref('');
const pattern = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

const validator = (val: string) => /^[^\u4e00-\u9fa5 ]{6,16}$/.test(val);

const onLogin = (value: { pattern: string }) => {
    console.log(value.pattern);

    const TOKEN = Date.now()
    window.localStorage.setItem('token', JSON.stringify(TOKEN))
    window.localStorage.setItem('loginInformation', JSON.stringify(value))
    router.replace(`${query.s}`)
}

</script>

<template>
    <div class="logo">
        <img src="../../public/maga.png" alt="">
    </div>
    <div class="text">手机号登录</div>
    <div class="login">
        <van-form @submit="onLogin" validate-first input-align="center">
            <van-cell-group inset>
                <div class="bor">
                    <van-field v-model="mobile" name="pattern" placeholder="请输入手机号"
                        :rules="[{ pattern, message: '请输入正确的手机号' }]" />
                </div>
                <div class="bor">
                    <van-field v-model="password" name="pwd" type="password" placeholder="请输入密码"
                        :rules="[{ validator, message: '请输入不含中文和空格的6~16位密码' }]" />
                </div>

            </van-cell-group>
            <van-button round block type="primary" color="#fe0000" native-type="submit"> 登录 </van-button>
        </van-form>
    </div>
</template>


<style lang="scss" scoped>
.logo {
    margin: 60rem auto 20rem;
    width: 160rem;
    height: 160rem;

    img {
        border-radius: 20rem;
        width: 100%;
        height: 100%;
        display: block;
    }
}

.text{
    text-align: center;
    font-size: 20rem;
    font-weight: 600;
}

.login {
    margin: 0 10rem;
}

.bor {
    // width: 260rem;
    margin: 12rem 0;
    overflow: hidden;
    border: 1px solid #e2e2e2;
    border-radius: 90rem;
}
</style>