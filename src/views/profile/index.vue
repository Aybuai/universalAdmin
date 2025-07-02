<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card
          class="project-card"
          :features="featureData"
        ></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('profile.feature')" name="feature">
              <feature />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/ProfileFeature.vue'
import Chapter from './components/ProfileChapter.vue'
import Author from './components/ProfileAuthor.vue'
import { feature as getFeature } from '@/api/user'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

const activeName = ref('feature')

// 获取功能接口
const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await getFeature()
}
getFeatureData()

// 展示中英文数据
watchSwitchLang(getFeatureData)
</script>
<style scoped lang="scss">
.project-card {
  margin-right: 20px;
}
</style>
