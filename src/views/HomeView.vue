<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import { API } from '@/apis';
import { useRouter } from 'vue-router';
import type { bannerDetail } from '@/utils/parameter'
import banner from "@/components/BannerPage.vue"
import magazine from "@/components/MagazineContent.vue"
import { useTabState } from "@/stores/tabState"

// 底部导航显示/隐藏状态
const { skeletonState } = toRefs(useTabState())
const { alterTabState } = useTabState()
alterTabState(true)

const router = useRouter()
const search = (() => {
  router.push("/search")
})

// 轮播图
let bannerList = ref<Array<bannerDetail>>([]);
onMounted(async () => {
  let { data } = await API.getDataNew();
  bannerList.value = data.data.BannerList
})

</script>

<template>
  <div v-show="skeletonState">
    <van-skeleton>
      <template #template>
        <van-skeleton-image :style="{ width: '100%' ,margin: '10rem'}" />
        <van-skeleton title :row="2" />
      </template>
    </van-skeleton>
    <van-skeleton title :row="3" />
    <div :style="{ margin: '6rem 10rem' }" v-for="i in 1" :key="i">
      <div class="sk-content">
        <div v-for="r in 3" :key="r">
          <van-skeleton-image />
          <van-skeleton-paragraph row-width="30%" />
        </div>
      </div>
      <van-skeleton title :row="3" />
      <div class="sk-content">
        <div v-for="r in 3" :key="r">
          <van-skeleton-image />
          <van-skeleton-paragraph row-width="30%" />
        </div>
      </div>
    </div>
  </div>

  <div v-show="!skeletonState">
    <header>
      <van-sticky>
        <div class="search-box" @click="search">
          <div class="search"><van-icon name="search" />搜索</div>
        </div>
      </van-sticky>
      <banner :banner="bannerList" />
    </header>
    <section class="content">
      <magazine />
    </section>
  </div>
</template>

<style scoped>
.sk-content {
  display: flex;
  justify-content: space-around;
}

.search-box {
  background-color: #fff;
  padding: 10rem;
}

.search {
  background-color: #f2f2f2;
  color: #999;
  text-align: center;
  font-size: 14rem;
  line-height: 26rem;
  height: 26rem;
  border-radius: 20rem;
}

.content {
  margin: 20rem 10rem;
}
</style>