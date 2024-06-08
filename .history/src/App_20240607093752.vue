<template>
  <el-config-provider :size="size" :locale="zhCn">
    <div class="app-container">
      <!-- 开启水印 z-index > el-affix(z-index = 100) 即可  :locale="'zh-cn'" -->
      <el-watermark
          v-if="watermarkEnabled"
          :z-index="101"
          :font="{ color: fontColor }"
          :content="defaultSettings.title"
      >
        <router-view/>
      </el-watermark>
      <!-- 关闭水印 -->
      <router-view v-else/>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'


onMounted(() => {})
</script>

<style scoped lang="scss">

.app-container {
  height: 100%;
}
</style>
