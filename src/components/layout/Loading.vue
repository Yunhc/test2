<template>
    <div class="wl-loading" v-if="loading">
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
        <div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        loading: {
            type: Boolean,
            required: true
        }
    }
}
</script>
<style>
.wl-loading {
    display: inline-block;
    position: absolute;
    width: 206px;
    height: 64px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
	z-index: 1000;
    /* border: 1px solid red; */
}
.wl-loading div {
    display: inline-block;
    position: absolute;
    left: 6px;
    width: 14px;
    background: #42b883;
    animation: wl-loading 0.5s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.wl-loading div:nth-child(1) {
    left: 6px;
    animation-delay: 0;
}
.wl-loading div:nth-child(2) {
    left: 26px;
    animation-delay: 0.05s;
}
.wl-loading div:nth-child(3) {
    left: 46px;
    animation-delay: 0.1s;
}
.wl-loading div:nth-child(4) {
    left: 66px;
    animation-delay: 0.15s;
}
.wl-loading div:nth-child(5) {
    left: 86px;
    animation-delay: 0.2s;
}
.wl-loading div:nth-child(6) {
    left: 106px;
    animation-delay: 0.25s;
}
.wl-loading div:nth-child(7) {
    left: 126px;
    animation-delay: 0.3s;
}
.wl-loading div:nth-child(8) {
    left: 146px;
    animation-delay: 0.35s;
}
.wl-loading div:nth-child(9) {
    left: 166px;
    animation-delay: 0.4s;
}
.wl-loading div:nth-child(10) {
    left: 186px;
    animation-delay: 0.45s;
}
@keyframes wl-loading {
    0% {
        top: 6px;
        height: 51px;
    }
    50%, 100% {
        top: 19px;
        height: 25px;
    }
}
</style>
