<script setup lang="ts">
const props = defineProps<{
    title: string,
    sub: string,
    num: number
}>()

</script>

<template>
    <div class="title">
        <div class="left">
            <div class="name van-ellipsis">{{ props.title }}</div>
            <div class="sub">{{ props.sub }}</div>
        </div>
        <van-icon size="20rem" name="arrow" v-if="!(props.num % 2 == 0)" />
    </div>
</template>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rem;

    .left {
        .name {
            font-size: 20rem;
            font-weight: 600;
            color: #000;
        }

        .sub {
            font-size: 12rem;
            color: var(--nav-gay);
        }
    }
}
</style>