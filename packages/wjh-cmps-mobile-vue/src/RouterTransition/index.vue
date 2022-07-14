<!--
 * @Description: 路由过渡组件
 * @Author: 吴锦辉
 * @Date: 2022-07-14 10:59:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-14 11:59:55
-->

<template>
  <transition :name="transitionClassName">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    exclude: {
      type: Array,
      default: [],
    },
  },

  data: {
    transitionClassName: '',
  },

  watch: {
    $route(to, from) {
      let isBack;

      if (this.stackedRoutes.includes(to.path)) {
        isBack = true;

        const fIndex = this.stackedRoutes.findIndex(v => v === from.path);
        const tIndex = this.stackedRoutes.findIndex(v => v === to.path);

        if (tIndex < fIndex) {
          this.stackedRoutes = this.stackedRoutes.slice(0, tIndex + 1);
        } else if (fIndex !== -1) {
          this.stackedRoutes = this.stackedRoutes.slice(0, fIndex + 1);
          this.stackedRoutes.push(to.path);
        }
      } else {
        isBack = false;

        this.stackedRoutes.push(to.path);
      }

      const flag = this.exclude.includes(to.path) && this.exclude.includes(from.path);

      if (flag) {
        this.transitionName = '';

        return;
      }

      this.transitionName = isBack ? 'slide-left' : 'slide-right';
    },
  },

  created() {
    this.stackedRoutes = [];
  },
};
</script>

<style lang="scss" scoped>
.slide-left-leave {
  transform: translate(0);
}

.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-left-enter {
  transform: translateX(-100%);
}

.slide-left-enter-to {
  transform: translate(0);
}

.slide-left-enter-active {
  transition: all 0.3s;
}

.slide-left-leave-active {
  transition: all 0.3s;
}

.slide-rigth-leave {
  transform: translate(0);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter {
  transform: translateX(100%);
}

.slide-right-enter-to {
  transform: translate(0);
}

.slide-right-enter-active {
  transition: all 0.3s;
}
</style>
