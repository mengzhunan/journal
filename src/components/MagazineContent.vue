<script setup lang="ts">
import { ref, onMounted } from "vue";
import { API } from '@/apis';
import type { recommendDetail } from "@/utils/parameter"
import HeadlineChunk from "./HeadlineChunk.vue";
import NewspaperList from "./NewspaperList.vue"
import ActiveDemand from "./ActiveDemand.vue";
import WordEntry from "./WordEntry.vue";
import { useTabState } from "@/stores/tabState"

const { alterSkeletonState } = useTabState()
alterSkeletonState(true)

let newIssueContent = ref<Array<recommendDetail>>([]);
onMounted(async () => {
    let { data } = await API.getNewIssue();
    alterSkeletonState(false)
    newIssueContent.value = data.data.RecommendedList
})

</script>

<template>
    <main class="module">
        <HeadlineChunk :num="1" :title="newIssueContent[0]?.menuName!" :sub="newIssueContent[0]?.menuSubName!" />
        <NewspaperList :list="newIssueContent[0]!?.operationContent!" />
    </main>
    <main class="module">
        <HeadlineChunk :num="4" :title="newIssueContent[1]?.menuName" :sub="newIssueContent[1]?.menuSubName" />
        <WordEntry :list="newIssueContent[1]?.operationContent" />
    </main>
    <main class="module">
        <HeadlineChunk :num="1" :title="newIssueContent[2]?.menuName" :sub="newIssueContent[2]?.menuSubName" />
        <NewspaperList :list="newIssueContent[2]?.operationContent" />
    </main>
    <main class="module">
        <HeadlineChunk :num="4" :title="newIssueContent[3]?.menuName" :sub="newIssueContent[3]?.menuSubName" />
        <ActiveDemand :list="newIssueContent[3]?.operationContent" />
    </main>
</template>


<style lang="scss" scoped>
.module {
    margin-bottom: 15rem;
}
</style>