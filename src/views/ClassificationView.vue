<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { API } from "@/apis/index"
import { useRouter } from "vue-router";
import type { recommendOperation } from "../utils/parameter";
import type { ConfigProviderThemeVars } from 'vant';
import { magazineData } from "@/stores/getMagazineData"
import { useTabState } from "@/stores/tabState"

// 从pinia里读取数据
const { alterTabState } = useTabState()
alterTabState(false)
const { nav } = toRefs(magazineData())

// 接收路由传递过来的参数
const props = defineProps<{
    code: string,
    index: string
}>()

//修改vant原有样式 
const themeVars: ConfigProviderThemeVars = {
    sidebarPadding: '12rem',
    sidebarSelectedBorderColor: '#ef0000',
    sidebarSelectedTextColor: '#ef0000'
};

const router = useRouter()
// 侧边导航索引
const active = ref<number | string>(0);
// 杂志列表
const journalList = ref<Array<recommendOperation>>([])
onMounted(async () => {
    if (props.index) {
        active.value = props.index
    } else {
        active.value = 0
    }
    let { data } = await API.getJournalList(props.code)
    journalList.value = data.data
})
// 点击切换杂志内容
const onChange = async (id: string) => {
    let { data } = await API.getJournalList(id)
    journalList.value = data.data
}
// 跳转杂志详情页
const goDetail = ((id: string, year: string, issue: number) => {
    router.push(`/details/${id}/${year}/${issue}`)
})

</script>

<template>
    <van-sticky>
        <div class="topHeard">
            <van-icon name="arrow-left" size="20rem" @click="$router.go(-1)" />
            <div class="title">分类列表</div>
        </div>
    </van-sticky>
    <div class="menu">
        <div class="menu-list">
            <van-config-provider :theme-vars="themeVars">
                <van-sidebar v-model="active">
                    <van-sidebar-item v-for="n in nav" :key="n.cateCode" :title="n.cateName.trim()"
                        @click="onChange(n.cateCode)" />
                </van-sidebar>
            </van-config-provider>
        </div>
        <div class="auto">
            <div class="menu-content">
                <div class="journal" v-for="j in journalList" :key="j.magazineGuid"
                    @click="goDetail(j.magazineGuid, j.year, j.issue)">
                    <van-image radius="3rem" width="86rem" height="114rem" lazy-load :src="j.posterz" />
                    <div class="txt van-ellipsis">{{ j.name }}</div>
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.topHeard {
    background-color: #fff;
    padding: 8rem 10rem;
    display: flex;
    align-items: center;

    .title {
        flex: 1;
        text-align: center;
        font-size: 18rem;
        font-weight: 600;
        color: #000;
    }
}

.menu {
    display: flex;
}

.auto {
    height: 100vh;
    overflow: auto;
}

.menu-content {
    margin: 12rem 0;
    flex: 1;
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;

    .journal {
        flex-shrink: 1;
        padding: 0 6px;
        margin-bottom: 20rem;

        .txt {
            width: 86rem;
            font-size: 14rem;
            font-weight: 600;
            color: #000;
            padding: 6rem 0 0 0;
        }
    }

}
</style>