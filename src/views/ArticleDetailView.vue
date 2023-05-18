<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { API } from "@/apis"
import type { article } from "@/utils/detail"
import { useTabState } from "@/stores/tabState"

const props = defineProps<{
    titleId: string
}>()
const { alterTabState } = useTabState()
alterTabState(false)

const content = ref<article>();
const contentText = ref<string>();
onMounted(async () => {
    let { data } = await API.getArticleData(props.titleId)
    content.value = data.data
    if (data.data.contentText) {
        contentText.value = data.data.contentText
    } else {
        contentText.value = data.data.describes
    }
})

const speechState = ref(true);
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance()
const playVoice = () => {
    speechState.value = false;
    msg.text = contentText.value!
    msg.lang = "zh-CN";
    msg.volume = 3;
    msg.rate = 1;
    msg.pitch = 1;
    synth.speak(msg);
}

const handleStop = () => {
    speechState.value = true;
    msg.text = '';
    msg.lang = "zh-CN";
    synth.cancel();
}

onBeforeUnmount(() => {
    handleStop();
})

</script>

<template>
    <div class="top">
        <van-sticky offset-top="10">
            <div class="back similar" @click="$router.go(-1)"><van-icon name="arrow-left" size="20" color="#fff" /></div>
            <div class="play similar" @click="playVoice" v-if="speechState"><van-icon name="play-circle" size="20" /></div>
            <div class="play similar" @click="handleStop" v-else><van-icon name="audio" size="20" /></div>
        </van-sticky>

        <div class="title">{{ content?.title }}</div>
        <div class="author" v-if="content?.author">作者：{{ content?.author }}</div>
    </div>
    <div class="icon">
        <div class="img">
            <van-image width="240rem" height="32rem" lazy-load :src="content?.nameicon" />
        </div>
    </div>
    <div class="content">
        <div class="c-text" v-html="contentText"></div>
    </div>
    <div class="b-nav">

    </div>
</template>

<style lang="scss" scoped>
.top {
    padding-top: 50rem;
    position: relative;
    margin: 10rem;

    .similar {
        width: 40rem;
        height: 40rem;
        color: #fff;
        border-radius: 24rem;
        background-color: rgba(127, 127, 127, .6);
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .back {
        left: 0;
    }

    .play {
        right: 0;
    }

    .title {
        font-size: 22rem;
        font-weight: 700;
        color: #000;
    }

    .author {
        font-size: 12rem;
        color: #666;
    }
}

.icon {
    margin: 0 10rem;
    padding: 4rem 12rem;
    border-radius: 6rem;
    display: flex;
    background-color: #F7F7F7;
    justify-content: space-between;
    align-items: center;

    // .attention {
    //     font-size: 16rem;
    //     line-height: 28rem;
    //     height: 28rem;
    //     padding: 0 10rem;
    //     color: #fff;
    //     border-radius: 20rem;
    //     background-color: #fe0000;
    // }
}

.content {
    font-size: 18rem;
    margin: 0 10rem 50rem 10rem;

    .c-text ::v-deep {
        >p {
            margin: 0;
            padding: 6rem 0;
            text-indent: 36rem;
            line-height: 30rem;
        }

        >figure {
            box-sizing: border-box;
            width: 270rem;

            >img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        >.image {
            width: 270rem;

            >img {
                width: 100%;
                height: 100%;
                display: block;
            }

            figcaption {
                font-size: 12rem;
                color: #52527C;
            }
        }

        >h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin: 0;
        }

    }
}
</style>