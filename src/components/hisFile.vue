<template>
  <div id="hisFile">
  <el-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="产品型号">
            <span>{{ props.row.companyName }}</span>
          </el-form-item>
          <el-form-item label="产品长度（米）">
            <span>{{ props.row.imgHeight }}</span>
          </el-form-item>
          <el-form-item label="产品宽度（米）">
            <span>{{ props.row.imgWidth }}</span>
          </el-form-item>
          <el-form-item label="产品标准图">
            <span><img :src="props.row.imgFile" style="width: 2em; height: 2em"></span>
          </el-form-item>
          <el-form-item label="产品照片">
            <span><img :src="props.row.contrastFile" style="width: 2em; height: 2em"></span>
          </el-form-item>
          <el-form-item label="产品视频">
            <span><img :src="props.row.videoFile" style="width: 2em; height: 2em"></span>
          </el-form-item>
          <el-form-item label="产品模型（.zip）">
            <span><img :src="props.row.zipFile" style="width: 2em; height: 2em"></span>
          </el-form-item>
          <el-form-item label="模型方向">
            <span>{{ props.row.alignment }}</span>
          </el-form-item>
          <el-form-item label="简介">
            <span>{{ props.row.companyText }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="产品型号"
      prop="companyName">
    </el-table-column>
    <el-table-column
      label="产品标准图" prop="imgFile">
      <template slot-scope="props"> <img :src="props.row.imgFile" style="width: 2em; height: 2em" /> </template>
    </el-table-column>
    <el-table-column
      label="简介"
      prop="companyText">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import {reqDeleFile, reqHisFile} from "../api";
    import axios from 'axios'

    export default {
        name: "hisFile",
      data() {
        return {
          tableData: [],
          companyUuid: '123465',
          options: [],
          value: [],
          list: [],
          loading: false,
          states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"]
        }
      },
      // mounted(){
      //     axios({
      //       url:'/ratings',
      //       method:'get',
      //     }).then((res) =>{
      //       console.log(res,'success')
      //       this.tableData = res.data
      //       console.log(this.tableData)
      //     }).catch((err) =>{
      //       console.log(err,'error')
      //     })
      //
      // },
      created(){
        this.getHisData()
      },
      methods: {
          handleEdit(index,row) {
            console.log(index,row);
          },
          handleDelete(index,row) {
            console.log(index,row);
            const result = reqDeleFile(this.tableData[index].companyName)
            if (result.data.status === 0){
              console.log("delete success")
            } else {
              console.log("delete fail")
            }
          },
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.options = this.list.filter(item => {
                  return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              this.options = [];
            }
          },

          async getHisData(){
            const result = await reqHisFile(this.companyUuid)
            console.log(result.data)
            this.tableData = result.data
          }


      }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-select{
    float: right;
    margin-bottom: 3em;
    margin-right: 2em;
  }
  .el-button + .el-button {
    margin-left: 0px;
    margin-top: 0.5em;
  }
  .el-pagination {
    margin-top: 3em;
  }
</style>
