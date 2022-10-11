const vueClearIndex = {}
    /*
     * element 表格实现滚动加载
     */
    // function throttle(fn, delay = 2000) {
    //     let timer = null
    //     return function() {
    //         if (timer) return
    //         timer = setTimeout(() => {
    //             fn.apply(this, arguments)
    //             timer = null
    //         })
    //     }
    // }
vueClearIndex.install = Vue => {
    Vue.directive('loadmore', {
        beforeMount(el, binding) {
            const selectWrap = el.querySelector('.el-table__body-wrapper')
            let scrollLeft = 1
            let timer = null
            selectWrap.addEventListener('scroll', function(e) {
                if (timer) return
                timer = setTimeout(() => {
                    let sign = 0
                        // console.log(this);
                    const scrollDistance = this.scrollHeight - Math.ceil(this.scrollTop) - this.clientHeight
                        // console.log(scrollDistance);
                        // console.log(scrollLeft === this.scrollLeft);
                    if (scrollDistance <= sign && scrollLeft === this.scrollLeft) {
                        binding.value()
                    }
                    scrollLeft = this.scrollLeft
                    timer = null
                }, 200)
            })
        }
    })
}

export default vueClearIndex