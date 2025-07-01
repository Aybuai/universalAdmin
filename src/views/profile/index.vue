<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card"></project-card>
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
import { ref } from 'vue'

const activeName = ref('feature')
</script>
<style scoped lang="scss">
.project-card {
  margin-right: 20px;
}
</style>
