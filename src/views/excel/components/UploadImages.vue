<template>
  <div style="width:200px">
    <el-upload
      :accept="
        acceptType
          ? 'application/vnd.ms-excel,application/msword, application/vnd.ms-powerpoint, application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : 'image/jpg, image/jpeg, image/png,image/gif'
      "
      :auto-upload="true"
      :before-upload="beforeUpload"
      :file-list="uploadImageList"
      :http-request="uploadImage"
      :limit="limit"
      :list-type="listType"
      :on-exceed="handleExceed"
      :on-preview="showPreview ? handlePictureCardPreview : () => {}"
      :on-remove="handleRemove"
      :show-file-list="showFileList"
      :before-remove="beforeRemove"
      :multiple="multiple"
      action
      class="upload"
    >
      <slot></slot>
      <i v-if="!src" :class="iconClass"></i>
      <img v-if="src" :src="formaturl(src)" alt="上传文件" class="avatar" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img :src="dialogImageUrl" alt width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep, isEmpty } from 'lodash'
import qiniu from '@/api/qiniu'
import { compressImage } from '@/utils/imgupload'

export default {
  name: 'UploadImage',
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    src: {
      type: String,
      default: ''
    },
    acceptType: {
      type: Number,
      default: 0
      // 0 图片  1 附件
    },
    imageList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: undefined
    },
    size: {
      type: Number,
      default: 20
    },
    tips: {
      type: Object,
      default: () => ({ limit: null, size: null })
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    limitSize: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 默认上传的图标类名
    iconClass: {
      type: String,
      default: 'el-icon-plus'
    }
  },
  data() {
    return {
      dialogImageUrl: null,
      dialogVisible: false,
      uploadImageList: [],
      deleteImgUrl: []
    }
  },
  watch: {
    imageList: {
      handler(list) {
        this.uploadImageList = list
      },
      deep: true
    }
  },
  created() {
    this.uploadImageList = cloneDeep(this.imageList)
  },

  methods: {
    formaturl(url) {
      return process.env.VUE_APP_BASE_API + url.slice(3)
    },
    handlePictureCardPreview({ url }) {
      this.dialogVisible = true
      this.dialogImageUrl = this.src
    },
    async handleRemove(opt, fileList) {
      this.$emit('uploadImage', [this.item.prop, ''])
    },
    beforeUpload(file) {
      console.log(file)
      if (this.acceptType) {
        // 附件
        if (
          ![
            'application/vnd.ms-excel',
            'application/msword',
            'application/vnd.ms-powerpoint',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ].includes(file.type)
        ) {
          this.$message.error(`请上传规定格式的文档!`)
          return false
        }
      } else {
        // 图片
        if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
          this.$message.error(`请上传图片!`)
          return false
        }
      }
      const isLt20M = file.size / 1024 / 1024 < this.size
      if (!isLt20M) {
        const str = this.tips?.size || `上传${this.limitSize === false ? '文件' : '图片'}大小不能超过${this.size}MB!`
        this.$message.error(str)
        this.uploadImageList = [...this.uploadImageList]
      }
      return isLt20M
    },
    beforeRemove(file) {
      if (!file.url || file.status === 'ready') {
        return false
      }
      return true
    },
    deleteImageUrls() {
      if (!isEmpty(this.deleteImageUrl)) {
        qiniu.QINIU_IMG(this.deleteImgUrl)
      }
    },
    async uploadImage({ file }) {
      console.log(file)
      const url = await qiniu.uploadPicToQiniu(file)
      console.log('url', url)
      this.$emit('uploadImage', [this.item.prop, url])
    },
    handleExceed() {
      const str = this.tips?.limit || `只能上传${this.limit}张图片`
      this.$message.warning(str)
    }
  },

  computed: {
    values() {
      return [this.value]
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 100%;
  height: 100%;
}
.el-upload {
  width: 100px;
  height: 100px;
}

.upload > div {
  overflow: hidden;
}
</style>
