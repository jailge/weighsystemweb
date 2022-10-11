<template>
    <div>
        <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>图片上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
        <div class="container">
            <!-- <span>tips:双击文本编辑</span> -->
            <div style="display: flex; flex-wrap: wrap;">
                <!-- <el-card class="box-card" v-for="card, i in carddata.res"> -->
                <!-- 工艺 -->
                <el-space wrap style="display: block;" v-permission="'/weight/craft GET'">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>工艺</span>
                                <i class="el-icon-lx-add" @click="handleAdd($event, 'craft')" style="font-size: 35px;"
                                    v-permission="'/weight/craft POST'"></i>
                            </div>
                            <span style="font-size:5px ; color:#bbb; margin-top: 10px; display:block">tips:双击文本编辑</span>
                        </template>
                        <div>
                            <div v-for="item in carddata.craft" :key="item.Id" class="text item"
                                style="position: relative; margin-bottom: 12px;">
                                <span @dblclick="doubleclick($event, item.Id, 'craft')">{{ item.Name }}</span>
                                <el-popconfirm title="确定要删除吗？" @confirm="remove(item.Id, 'craft')">
                                    <template #reference>
                                        <i class="el-icon-lx-delete" style="position: absolute; right: 0;"
                                            v-permission="'/weight/craft DELETE'"></i>
                                    </template>
                                </el-popconfirm>
                                <hr class="hr" style="margin-top: 10px;" />
                            </div>
                        </div>
                    </el-card>
                </el-space>
                <!-- 材质 -->
                <el-space wrap style="display: block;" v-permission="'/weight/texture GET'">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>材质</span>
                                <i class="el-icon-lx-add" @click="handleAdd($event, 'texture')" style="font-size: 35px;"
                                    v-permission="'/weight/texture POST'"></i>
                            </div>
                            <span style="font-size:5px ; color:#bbb; margin-top: 10px; display:block">tips:双击文本编辑</span>
                        </template>
                        <div>
                            <div v-for="item in carddata.texture" :key="item.Id" class="text item"
                                style="position: relative; margin-bottom: 12px;">
                                <span @dblclick="doubleclick($event, item.Id, 'texture')">{{ item.Name }}</span>
                                <el-popconfirm title="确定要删除吗？" @confirm="remove(item.Id, 'texture')">
                                    <template #reference>
                                        <i class="el-icon-lx-delete" style="position: absolute; right: 0;"
                                            v-permission="'/weight/texture DELETE'"></i>
                                    </template>
                                </el-popconfirm>
                                <hr class="hr" style="margin-top: 10px;" />
                            </div>
                        </div>
                    </el-card>
                </el-space>
                <!-- 工序 -->
                <el-space wrap style="display: block;" v-permission="'/weight/process GET'">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>工序</span>
                                <i class="el-icon-lx-add" @click="handleAdd($event, 'process')" style="font-size: 35px;"
                                    v-permission="'/weight/process POST'"></i>
                            </div>
                            <span style="font-size:5px ; color:#bbb; margin-top: 10px; display:block">tips:双击文本编辑</span>
                        </template>
                        <div>
                            <div v-for="item in carddata.process" :key="item.Id" class="text item"
                                style="position: relative; margin-bottom: 12px;">
                                <span @dblclick="doubleclick($event, item.Id, 'process')">{{ item.Name }}</span>
                                <el-popconfirm title="确定要删除吗？" @confirm="remove(item.Id, 'process')">
                                    <template #reference>
                                        <i class="el-icon-lx-delete" style="position: absolute; right: 0;"
                                            v-permission="'/weight/process DELETE'"></i>
                                    </template>
                                </el-popconfirm>
                                <hr class="hr" style="margin-top: 10px;" />
                            </div>
                        </div>
                    </el-card>
                </el-space>
                <!-- 采购状态 -->
                <el-space wrap style="display: block;" v-permission="'/weight/purchase_status GET'">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>采购状态</span>
                                <i class="el-icon-lx-add" @click="handleAdd($event, 'purchase_status')"
                                    style="font-size: 35px;" v-permission="'/weight/purchase_status POST'"></i>
                            </div>
                            <span style="font-size:5px ; color:#bbb; margin-top: 10px; display:block">tips:双击文本编辑</span>
                        </template>
                        <div>
                            <div v-for="item in carddata.purchase_status" :key="item.Id" class="text item"
                                style="position: relative; margin-bottom: 12px;">
                                <span @dblclick="doubleclick($event, item.Id, 'purchase_status')">{{ item.Name }}</span>
                                <el-popconfirm title="确定要删除吗？" @confirm="remove(item.Id, 'purchase_status')">
                                    <template #reference>
                                        <i class="el-icon-lx-delete" style="position: absolute; right: 0;"
                                            v-permission="'/weight/purchase_status DELETE'"></i>
                                    </template>
                                </el-popconfirm>
                                <hr class="hr" style="margin-top: 10px;" />
                            </div>
                        </div>
                    </el-card>
                </el-space>
            </div>
            <el-dialog title="新增" v-model="addVisible" width="30%">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="70px">
                    <el-form-item :label="form.name" prop="value">
                        <el-input v-model="form.value"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <span class="dialog-footer">
                            <el-button @click="addVisible = false">取 消</el-button>
                            <el-button type="primary" @click="saveAdd">确 定</el-button>
                        </span>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { baseapi } from "../api/index.js"
import { ElMessage } from "element-plus";
import { ElLoading } from 'element-plus'
import createStore from "../store/index";
// import defaultSrc from "../assets/img/img.jpg";
// const imgSrc = ref("");
// const cropImg = ref(defaultSrc);
// const dialogVisible = ref(false);
// const cropper = ref(null);
const loadingInstance = ElLoading.service({ fullscreen: false })
const carddata = reactive({})
const addVisible = ref(false);
let form = reactive({
    name: "",
    value: '',
    url: ''
});
const rules = {
    value: [
        { required: true, message: "输入不能为空", trigger: "blur" },
    ],
};
const formRef = ref(null);
const handleAdd = (e, queryurl) => {
    form.name = e.currentTarget.previousElementSibling.innerHTML
    form.queryurl = queryurl
    form.value = ''
    addVisible.value = true;
};
const saveAdd = () => {
    formRef.value.validate(async (valid) => {
        if (valid) {
            console.log(form);
            let query = {
                name: form.value
            }
            const res = await baseapi.weight_parameter(form.queryurl, 'post', query)
            console.log(res);
            if (res.code) {
                getbase()
                ElMessage.success("新增成功！");
                addVisible.value = false;
            } else {
                ElMessage.error(res.res)
            }
        } else {
            return false;
        }
    });
};
const getbase = async () => {
    let craft = baseapi.weight_parameter('craft', 'get')
    let texture = baseapi.weight_parameter('texture', 'get')
    let process = baseapi.weight_parameter('process', 'get')
    let purchase_status = baseapi.weight_parameter('purchase_status', 'get')
    carddata.craft = (await craft).data
    carddata.texture = (await texture).data
    carddata.process = (await process).data
    carddata.purchase_status = (await purchase_status).data
    loadingInstance.close()
}
getbase()
// getbase()
// 双击文本编辑
const doubleclick = (e, id, type) => {
    // console.log(createStore.state.main.permission.indexOf(`/weight/${type} PUT`))
    if (createStore.state.main.permission.indexOf(`/weight/${type} PUT`) < 0) {
        ElMessage.error('没有权限')
        return
    }
    // console.log(e.target);
    let chird = e.target.children
    let element = e.target;
    let attrObj = element.getAttribute("data-obj")
    let oldHtml = element.innerText;
    // 创建一个新的 input 输入框
    let newInput = document.createElement('input');
    // 为新的 input添加属性
    newInput.type = "text";
    newInput.value = oldHtml;
    // 清空当前元素的文本内容
    element.innerHTML = '';
    // 把新的 input 框 追加到当前元素节点中
    element.appendChild(newInput);
    // 设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newInput.setSelectionRange(0, oldHtml.length)
    // 为新 input 框获取焦点
    newInput.focus();
    // 为新的 input 添加失去焦点事件
    newInput.onblur = async function () {
        // 判断失去焦点时，input 框的值是否与原值相同，相同则表示没有修改，返回原值；不同则表示有改动，返回新值
        // element.innerText = this.value == oldHtml ? oldHtml : this.value;
        if (this.value == oldHtml || this.value == '') {
            element.innerText = oldHtml
            console.log(navigator.userAgent);
        } else {
            element.innerText = this.value
            console.log(this.value);
            let query = {
                name: this.value,
                client_id: navigator.userAgent
            }
            const res = await baseapi.weight_parameter(`${type}/${id}`, 'put', query)
            if (res.code == 200) {
                ElMessage.success("修改成功！");
            } else {
                ElMessage.error(res.res)
            }
        }
    }
}
const remove = async (id, type) => {
    console.log(id);
    const res = await baseapi.weight_parameter(`${type}/${id}`, 'delete')
    if (res.code) {
        ElMessage.success("删除成功！");
        getbase()
    } else {
        ElMessage.error(res.res)
    }
}
const add = (e, i) => {
    // console.log(e);
    // let element = document.getElementById(i)
    // console.log(element);
    // let newInput = document.createElement('input');
    // newInput.type = "text";
    // element.appendChild(newInput);

}
const setImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image/")) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        dialogVisible.value = true;
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
    };
    reader.readAsDataURL(file);
};

const cropImage = () => {
    cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};

const cancelCrop = () => {
    dialogVisible.value = false;
    cropImg.value = defaultSrc;
};
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    line-height: 50%;
    min-width: 250px;
}

.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.pre-img {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}

.crop-demo {
    display: flex;
    align-items: flex-end;
}

.crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}

.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>