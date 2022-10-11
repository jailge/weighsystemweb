<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 首称
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-form ref="formRef" :rules="rules" :inline="true" :model="query" label-width="70px">
                    <el-form-item prop="material_code">
                        <el-input v-model="query.material_code" placeholder="物料代码" class="mr10"></el-input>
                    </el-form-item>
                    <el-form-item prop="supplier">
                        <el-input v-model="query.supplier" placeholder="供应商名称" class="mr10"></el-input>
                    </el-form-item>
                    <el-form-item prop="craft">
                        <el-select v-model="query.craft" placeholder="工艺" class="handle-select mr10" clearable>
                            <el-option v-for="item in carddata.craft" :key="item.Name" :label="item.Name"
                                :value="item.Name" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="process">
                        <el-select v-model="query.process" placeholder="工序" class="handle-select mr10" clearable>
                            <el-option v-for="item in carddata.process" :key="item.Name" :label="item.Name"
                                :value="item.Name" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="texture">
                        <el-select v-model="query.texture" placeholder="材质" class="handle-select mr10" clearable>
                            <el-option v-for="item in carddata.texture" :key="item.Name" :label="item.Name"
                                :value="item.Name" />
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="purchase_status">
                        <el-select v-model="query.purchase_status" placeholder="采购状态" class="handle-select mr10"
                            clearable>
                            <el-option v-for="item in carddata.purchase_status" :key="item.Name" :label="item.Name"
                                :value="item.Name" />
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item prop="receiving_warehouse">
                        <el-input v-model="query.receiving_warehouse" placeholder="收料仓库" style="width: 150px;"></el-input>
                    </el-form-item> -->
                    <el-form-item prop="111">
                        <el-select v-model="query.validate" placeholder="是否有效" class="handle-select mr10" clearable>
                            <el-option key="Name" label="是" value='true' />
                            <el-option key="Name" label="否" value='false' />
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <span class="dialog-footer">
                            <!-- <el-button @click="addVisible = false">取 消</el-button> -->
                            <el-button type="primary" @click="search">查 询</el-button>
                        </span>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                height='500' v-loadmore="loadMore">
                <el-table-column fixed type="index" align="center" :index="1">
                    <template #header>
                        <el-popover placement="bottom" :width="600" :visible="visible">
                            <!-- 配置列面板 -->
                            <transition name="fade">
                                <div>
                                    <div>选择显示字段</div>
                                    <div>
                                        <el-checkbox v-model="showColumn.MaterialCode" disabled>物料编码</el-checkbox>
                                        <el-checkbox v-model="showColumn.MaterialName">物料名称</el-checkbox>
                                        <el-checkbox v-model="showColumn.MaterialType">供应类型</el-checkbox>
                                        <el-checkbox v-model="showColumn.Craft">工艺</el-checkbox>
                                        <el-checkbox v-model="showColumn.Process">工序</el-checkbox>
                                        <el-checkbox v-model="showColumn.PurchaseStatus">采购状态</el-checkbox>
                                        <el-checkbox v-model="showColumn.ReceivingWarehouse">收料仓库</el-checkbox>
                                        <el-checkbox v-model="showColumn.Specifications">规格型号</el-checkbox>
                                        <el-checkbox v-model="showColumn.Supplier">供应商</el-checkbox>
                                        <el-checkbox v-model="showColumn.Texture">材质</el-checkbox>
                                        <el-checkbox v-model="showColumn.WeighStage">称重状态</el-checkbox>
                                        <el-checkbox v-model="showColumn.WeighNum">实称重量</el-checkbox>
                                        <el-checkbox v-model="showColumn.WeighTime">称重日期</el-checkbox>
                                        <!-- <el-checkbox v-model="showColumn.Validate">是否有效</el-checkbox> -->
                                    </div>
                                </div>
                            </transition>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                                <el-button size="mini" type="primary" plain @click="visible = false">确定</el-button>
                            </div>
                            <template #reference>
                                <i class="el-icon-setting" style="font-size: 22px; cursor: pointer"
                                    @click="visible = true"></i>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="MaterialCode" label="物料编码" width="100" align="center"
                    v-if="showColumn.MaterialCode"></el-table-column>
                <el-table-column prop="MaterialName" label="物料名称" width="100" v-if="showColumn.MaterialName">
                </el-table-column>
                <el-table-column prop="MaterialType" label="供应类型" v-if="showColumn.MaterialType"></el-table-column>
                <el-table-column prop="Craft" label="工艺" v-if="showColumn.Craft"></el-table-column>
                <el-table-column prop="Process" label="工序" v-if="showColumn.Process"></el-table-column>
                <el-table-column prop="PurchaseStatus" label="采购状态" v-if="showColumn.PurchaseStatus"></el-table-column>
                <el-table-column prop="ReceivingWarehouse" label="收料仓库" width="150"
                    v-if="showColumn.ReceivingWarehouse"></el-table-column>
                <el-table-column prop="Specifications" label="规格型号" width="210" v-if="showColumn.Specifications">
                </el-table-column>
                <el-table-column prop="Supplier" label="供应商" width="210" v-if="showColumn.Supplier"></el-table-column>
                <el-table-column prop="Texture" label="材质" v-if="showColumn.Texture"></el-table-column>
                <el-table-column prop="WeighStage" label="称重状态" v-if="showColumn.WeighStage"></el-table-column>
                <!-- <el-table-column prop="CalPerson" label="结算人" width="100" align="center" :formatter="recordLogData">
                </el-table-column> -->
                <el-table-column prop="WeighNum" label="实称重量" width="80" align="center" v-if="showColumn.WeighNum">
                </el-table-column>
                <el-table-column prop="WeighTime" label="称重日期" width="100" align="center" v-if="showColumn.WeighTime">
                </el-table-column>
                <el-table-column label="是否有效" align="center" v-if="showColumn.Validate">
                    <template #default="scope">
                        <el-tag :type="scope.row.Validate === 'true' ? 'success' : 'danger'">{{ scope.row.Validate === 'true' ? '有效' : '失效' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="CalWeight" label="实称重量" width="80" align="center" :formatter="recordLogData">
                </el-table-column>
                <el-table-column prop="CalTime" label="执行日期" width="100" align="center" :formatter="recordLogData">
                </el-table-column> -->
            </el-table>
            <!-- <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog> -->
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData, baseapi, weightapi } from "../api/index";
const query = reactive({
});
const tableData = ref([]);
// 表格显示隐藏
let visible = ref(false);
const showColumn = reactive({
    MaterialCode: true,
    MaterialName: true,
    MaterialType: true,
    Craft: true,
    Process: true,
    PurchaseStatus: true,
    ReceivingWarehouse: true,
    Specifications: true,
    Supplier: true,
    Texture: true,
    WeighStage: true,
    WeighNum: true,
    WeighTime: true,
    Validate: true,
});
// console.log(111);
const pageTotal = ref(0);
const formRef = ref(null);
let editVisible = ref(false);
const rules = {
    material_code: [
        { required: true, message: "输入不能为空", trigger: "blur" },
    ],
    // craft: [
    //     { required: true, message: "输入不能为空", trigger: "blur" },
    // ],
    // texture: [
    //     { required: true, message: "输入不能为空", trigger: "blur" },
    // ],
    // process: [
    //     { required: true, message: "输入不能为空", trigger: "blur" },
    // ],
    // purchase_status: [
    //     { required: true, message: "输入不能为空", trigger: "blur" },
    // ],
};
// 获取表格数据
const lazyLoadquery = reactive({})
// lazyLoadquery.page_size = 40
// lazyLoadquery.page_num = 1
// const getData = async () => {
//     let res = await weightapi.weigh_record_page(lazyLoadquery);
//     console.log(res);
// };
// getData();
const carddata = reactive({})
const getbase = async () => {
    let craft = baseapi.weight_parameter('craft', 'get')
    let texture = baseapi.weight_parameter('texture', 'get')
    let process = baseapi.weight_parameter('process', 'get')
    let purchase_status = baseapi.weight_parameter('purchase_status', 'get')
    carddata.craft = (await craft).data
    carddata.texture = (await texture).data
    carddata.process = (await process).data
    carddata.purchase_status = (await purchase_status).data
}
getbase()
query.page_size = 5
query.page_num = 1
let tt = 1
const research = async () => {
    // console.log(form);
    // let query = {
    //     name: form.value
    // }
    const res = await weightapi.search_data_weigh(query)
    let material_arr = res.data.data
    lazyLoadquery.total = res.data.total
    lazyLoadquery.material_arr = material_arr
    console.log(material_arr);
    // console.log(lazyLoadquery);
    let flow_arr = []
    tablevalue()
    //遍历物料
    // material_arr.forEach(element => {
    //     flow_arr.push(...element)
    // })
    // console.log(flow_arr);
    // tableData.value = material_arr;
    // if (res.status) {
    //     getbase()
    //     ElMessage.success("新增成功！");
    //     addVisible.value = false;
    // } else {
    //     ElMessage.error(res.res)
    // }
}

const search = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            if (query.validate === '') {
                delete query.validate
            }
            query.page_size = 10
            query.page_num = 1
            tableData.value = []
            research()
        } else {
            return false;
        }
    });
};
const lastone = arr => {
    return arr.length ? arr[arr.length - 1] : null
}


// 触底加载
const loadMore = () => {
    //   if (this.searchData.currentPage < this.pages) {//当前页数小于总页数就请求 
    //     this.searchData.currentPage++;//当前页数自增
    //     this.getData()
    //   }
    // tableData.value = lazyLoadquery.material_arr;
    console.log(111);
    if (lazyLoadquery.total == 0) {
        ElMessage.warning("没有更多了");
        return;
    } else {
        query.page_num++
        research()
    }
}
const tablevalue = () => {
    if (lazyLoadquery.material_arr !== null) {
        tableData.value = tableData.value.concat(lazyLoadquery.material_arr);
    }
    console.log(tableData.value);
}




</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
