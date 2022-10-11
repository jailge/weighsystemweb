<template>
    <div class="scroll" ref="scrollWrapper" :style="{ height: scrollHeight + 'px' }">
        <div :class="{ 'list-item-wrapper': isShowScroll }"
            :style="{ animationDuration: carouselSpeed * InnerHeight + 's' }">
            <div ref="scrollInner">
                <slot></slot>
            </div>
            <div v-html="copyHtml">
            </div>
        </div>
    </div>

</template>

<script lang="js">

export default {
    name: 'scroll',
    props: {
        scrollHeight: {
            type: Number,
        },
        carouselSpeed: {
            type: Number,
            default: 0.02,
        },
    },
    data() {
        return {
            InnerHeight: 0,
            copyHtml: '11111',
            isShowScroll: false
        }
    },
    mounted() {
        this.InnerHeight = this.getStyleHeight(this.$refs.scrollInner) // 获取滚动里的元素高度
        // 判断是否能滚动，如果里层元素大于外层元素才滚动，否则不滚动
        this.isShowScroll = this.isNeedScroll(Number(this.scrollHeight), this.InnerHeight)
        // 如果可以滚动，复制slot的内容
        this.copyHtml = this.isShowScroll ? this.$refs.scrollInner.innerHTML : ''
    },
    methods: {
        getStyleHeight(el) {
            return el.offsetHeight
        },
        isNeedScroll(height, children) {
            const containerHeight = height
            const childrenHeight = children
            return childrenHeight > containerHeight
        },
    },
}
</script>

<style scoped>
.scroll {
    overflow: hidden;
}

.list-item-wrapper {
    -webkit-animation: move 10s linear infinite;
    animation: move 10s linear infinite;
}

.list-item-wrapper:hover {
    animation-play-state: paused;
}

@-webkit-keyframes move {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
    }

    100% {
        -webkit-transform: translate3d(0, -50%, 0);
    }
}

@keyframes move {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-50%);
    }
}
</style>