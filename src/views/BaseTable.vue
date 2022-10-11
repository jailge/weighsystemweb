<template>
    <div>
        <!-- 主页 -->
        <div class="container">
            <!--  <el-button @click="o" type="success" round>导出</el-button> -->
            <el-table id="ou" :data="tableData" border class="table" ref="multipleTable"
                header-cell-class-name="table-header" stripe :span-method="arraySpanMethod">
                <!-- <el-table-column prop="MaterialType" label="供应类型" width="80" align="center"></el-table-column> -->
                <el-table-column prop="MaterialCode" label="物料编码" width="150" align="center"></el-table-column>
                <el-table-column prop="MaterialName" label="物料名称" width="80" align="center"></el-table-column>
                <el-table-column prop="Specifications" label="规格型号 " width="140" align="center"></el-table-column>
                <el-table-column prop="Craft" label="工艺" width="150" align="center"></el-table-column>
                <el-table-column prop="Texture" label="材质" width="100" align="center"></el-table-column>
                <el-table-column prop="Process" label="工序" width="50" align="center"></el-table-column>
                <!-- <el-table-column prop="PurchaseStatus" label="采购状态" width="150" align="center"></el-table-column> -->
                <!-- <el-table-column prop="ReceivingWarehouse" label="收料仓库" width="100" align="center"></el-table-column> -->
                <!-- <el-table-column prop="WeighStage" label="称重状态" width="100" align="center"></el-table-column> -->
                <el-table-column prop="Supplier" label="供应商" width="80" align="center"></el-table-column>
                <el-table-column prop="CalPerson" label="结算人" width="100" align="center" :formatter="recordLogData">
                </el-table-column>
                <el-table-column prop="CalWeight" label="结算重量" width="80" align="center" :formatter="recordLogData">
                </el-table-column>
                <el-table-column prop="CalTime" label="执行日期" width="100" align="center" :formatter="recordLogData">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next, sizes" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :page-sizes="[5, 10, 20, 50]" :total="pageTotal"
                    @size-change="handleSizeChange" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
// import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { ref, reactive, pushScopeId } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData, weightapi } from "../api/index.js"; // 引入api
import FileSaver from 'file-saver'
import * as XLSX from "xlsx";
// export default {
// name: 'text',
// setup() {
const lastone = arr => {
    return arr.length ? arr[arr.length - 1] : null
}
const query = reactive({
    address: "",
    name: "",
    pageIndex: 1,
    pageSize: 10,
});
let material_arr: Array<Array<any>> = reactive([]);
const tableData = ref([]);
const pageTotal = ref(0);
const recordLogData = (row, column) => {
    return lastone(row.RecordLog)[column.property];
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
// 获取表格数据
// const getData = async () => {
//   fetchData(query).then((res: { list: any[]; pageTotal: number; }) => {
//     // tableData.value = res.list;
//     // pageTotal.value = res.pageTotal || 50;
//   });
//   try {
//     const res = await weightapi.getallrecord()
//     //遍历物料
//     res.res.forEach(element => {
//       let data = {}
//       //数组key
//       let dataarray = []
//       for (let key in element) {
//         if (Array.isArray(element[key])) {
//           dataarray.push(key)
//         } else {
//           data[key] = element[key]
//         }
//       }
//       //数组值
//       dataarray.forEach(el => {
//         // "CalculationNode": [
//         //     {
//         //         "CalPerson": "技术员A",
//         //         "CalWeight": 540,
//         //         "CalTime": "2022-01-01",
//         //         "CalType": "首次理算"
//         //     },
//         //     {
//         //         "CalPerson": "技术员A",
//         //         "CalWeight": 530,
//         //         "CalTime": "2022-03-01",
//         //         "CalType": "理算变更"
//         //     }
//         // ],
//         element[el].forEach(e => {
//           let newdata = { ...data }
//           for (let k in e) {
//             // console.log(k);
//             // console.log(element[el]);
//             // console.log('e:',e);
//             newdata[k] = e[k]
//           }
//           tableData.value.push(newdata)
//         })
//       })
//     });
//     // pageTotal.value = res.res.length || 50;
//     res.res.CalculationNode.forEach(element => {
//       tableData.value
//     });
//     tableData.value = res.res;
//     pageTotal.value = res.res.length || 50;
//     console.log(res);
//   } catch (e) {
//     console.log(e)
//   }
// };
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
const arraySpanMethod = ({ row,column,rowIndex, columnIndex }) => {
    // console.log(row);
    // if (columnIndex <6 ) {
       
    // }

    let count = material_arr[arraySpanMethod_param.i].length
    if (columnIndex === 9) { arraySpanMethod_param.newrowindex++ }
    if (columnIndex < 6) {
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
const handlePageChange = (val: number) => {
    query.pageIndex = val;
    arraySpanMethod_param.i = 0
    arraySpanMethod_param.newrowindex = 0
    getData();
};
// 分页大小改变
const handleSizeChange = (val: number) => {
    query.pageSize = val;
    arraySpanMethod_param.i = 0
    arraySpanMethod_param.newrowindex = 0
    getData();
};

// 删除操作
const handleDelete = (index: number) => {
    // 二次确认删除
    ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
    })
        .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
        })
        .catch(() => { });
};
// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
    name: "",
    address: "",
});
let idx = -1;
const handleEdit = (index: number, row: { [x: string]: any; }) => {
    idx = index;
    Object.keys(form).forEach((item) => {
        form[item] = row[item];
    });
    editVisible.value = true;
};
const saveEdit = () => {
    editVisible.value = false;
    ElMessage.success(`修改第 ${idx + 1} 行成功`);
    Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
    });
};

    // return {
    //   query,
    //   tableData,
    //   pageTotal,
    //   editVisible,
    //   form,
    //   handleSearch,
    //   handlePageChange,
    //   handleDelete,
    //   handleEdit,
    //   saveEdit,
    // };
  // },
// }

</script>
<style lang="scss" scoped>
</style>