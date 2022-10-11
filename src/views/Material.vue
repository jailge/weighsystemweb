<template>
    <div>
        <!-- 主页 -->
        <div class="container">
             <el-button @click="o" type="success" round>导出</el-button>
            <el-table id="ou" :data="tableData" border class="table" ref="multipleTable" max-height="500" v-loadmore="loadMore"
                header-cell-class-name="table-header" stripe>
                <el-table-column prop="MaterialType" label="供应类型" align="center"></el-table-column>
                <el-table-column prop="MaterialCode" label="物料编码" width="150" align="center"></el-table-column>
                <el-table-column prop="MaterialName" label="物料名称" align="center"></el-table-column>
                <el-table-column prop="Specifications" label="规格型号 " width="140" align="center"></el-table-column>
                <el-table-column prop="Supplier" label="供应商" align="center"></el-table-column>
                <el-table-column prop="Craft" label="工艺" width="150" align="center"></el-table-column>
                <el-table-column prop="Texture" label="材质" width="100" align="center"></el-table-column>
                <el-table-column prop="Process" label="工序" width="50" align="center"></el-table-column>
                <el-table-column prop="PurchaseStatus" label="采购状态" width="150" align="center"></el-table-column>
                <el-table-column prop="ReceivingWarehouse" label="收料仓库" width="100" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-search" @click="handleEdit(scope.$index, scope.row)">查看
                        </el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="WeighStage" label="称重状态" width="100" align="center"></el-table-column>

        <el-table-column prop="CalPerson" label="结算人" width="100" align="center" :formatter="recordLogData">
        </el-table-column>
        <el-table-column prop="CalWeight" label="结算重量" width="80" align="center" :formatter="recordLogData">
        </el-table-column>
        <el-table-column prop="CalTime" label="执行日期" width="100" align="center" :formatter="recordLogData">
        </el-table-column> -->
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background layout="total, prev, pager, next, sizes" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :page-sizes="[5, 10, 20, 50]" :total="pageTotal"
                    @size-change="handleSizeChange" @current-change="handlePageChange"></el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script  setup>
// import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { ref, reactive, pushScopeId, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData, weightapi } from "../api/index.js"; // 引入api
import FileSaver from 'file-saver'
import * as XLSX from "xlsx";
// export default {
// name: 'text',
// setup() {

const query = reactive({
    address: "",
    name: "",
    pageIndex: 1,
    pageSize: 5,
});
let material_arr = reactive([]);
const tableData = ref([]);
const pageTotal = ref(0);
const recordLogData = (row, column) => {
    return lastone(row.RecordLog)[column.property];
}
const lastone = arr => {
    return arr.length ? arr[arr.length - 1] : null
}
//excel 导出
const o = () => {
    let tables = document.getElementById("ou");
    let table_book = XLSX.utils.table_to_book(tables);
    var table_write = XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    try {
        FileSaver.saveAs(
            new Blob([table_write], { type: "application/octet-stream" }),
            "sheetjs.xlsx"
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
    }
    return table_write;
}
const getData = async () => {
    try {
        const res = await weightapi.record_page({
            page_num: query.pageIndex,
            page_size: query.pageSize,
        });
        console.log(res.res);
        material_arr = res.res.data;
        pageTotal.value = res.res.total;
        arraySpanMethod_param.material_len = material_arr.length;
        let flow_arr = []
        //遍历物料
        material_arr.forEach(element => {
            flow_arr.push(...element)
        })
        tableData.value = flow_arr;
        // console.log(flow_arr)
    } catch (e) {
        console.log(e)
    }
}
getData();
// [0: (4) [{…}, {…}, {…}, {…}]
// 1: (3) [{…}, {…}, {…}, {…}]
// 2: (5) [{…}, {…}, {…}, {…}]
// 3: (4) [{…}, {…}, {…}, {…}]
// 4: (4) [{…}, {…}, {…}, {…}]
// 5: (2) [{…}, {…}]
// 6: [{…}]]
//单元格计算参数
const arraySpanMethod_param = {
    i: 0,
    newrowindex: 0,
    material_len: 0,
}

//单元格计算
const arraySpanMethod = ({ rowIndex, columnIndex }) => {
    let count = material_arr[arraySpanMethod_param.i].length
    if (columnIndex === 13) { arraySpanMethod_param.newrowindex++ }
    if (columnIndex < 10) {
        if (Math.floor(arraySpanMethod_param.newrowindex / count) === 0) {
            if (arraySpanMethod_param.newrowindex % count === 0) {
                return [count, 1]
            } else if (arraySpanMethod_param.newrowindex < count) {
                return [0, 0]
            }
        } else {
            // i = 0 ; rowindex = 4 ; count = 4 ; newindex = 4
            arraySpanMethod_param.newrowindex -= count
            arraySpanMethod_param.i = (arraySpanMethod_param.i + 1) % arraySpanMethod_param.material_len
            count = material_arr[arraySpanMethod_param.i].length
            return [count, 1]
        }
    }
}


// 查询操作
const handleSearch = () => {
    query.pageIndex = 1;
    getData();
};
// 分页导航
const handlePageChange = (val) => {
    query.pageIndex = val;
    arraySpanMethod_param.i = 0
    arraySpanMethod_param.newrowindex = 0
    getData();
};
// 分页大小改变
const handleSizeChange = (val) => {
    query.pageSize = val;
    arraySpanMethod_param.i = 0
    arraySpanMethod_param.newrowindex = 0
    getData();
};

// 触底加载
const loadMore = () => {
    //   if (this.searchData.currentPage < this.pages) {//当前页数小于总页数就请求 
    //     this.searchData.currentPage++;//当前页数自增
    //     this.getData()
    //   }
    console.log(111);
    }



</script>
<style lang="scss" scoped>
</style>