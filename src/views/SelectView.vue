<template>
  <div>
    <a-form
      :item="form_item"
      :field="form_field"
      :button="form_button"
      :before-submit="submitForm"
    >
    <template v-slot:classroom2>
      <a-select :config="select_classroom">
        <template v-slot:select="slot">
          <div style="font-size:30px;">{{slot.data.class_name}}</div>
        </template>
      </a-select>
    </template>

    </a-form>
  </div>
</template>

<script>
// @ is an alias to /src
//父组件 :checkbox="false"
export default {
  name: "FormView",
  components: {
    "a-form": () => import("@/components/form/index.vue"),
    "a-select": () => import("@/components/control/select/index.vue"),
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value && value !== "10") {
        callback(new Error("请输入10"));
      } else {
        // if (this.ruleForm.checkPass !== '') {w
        //   this.$refs.ruleForm.validateField('checkPass');
        // }
        callback();
      }
    };
    return {
      //表单项
      form_item: [
        {
          type: "input",
          value_type: "phone",
          prop: "phone",
          label: "手机号",
          required: true,
          message: "请输入手机号",
          //表单校验规则
          // rules: [
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          //   //自定义校验规则
          //   { validator: validateName, trigger: 'blur' }
          // ]
        },
        {
          type: "select",
          prop: "class_room",
          label: "教室",
          required: true,
          multiple:true,
          props: {
            label:'name',value:'id'
          },
          options: [
            { name: "vue.js", id: "1" },
            { name: "React.js", id: "2" },
            { name: "angle.js", id: "3" },
          ],

          //表单校验规则
          // rules: [
          //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          //   //自定义校验规则
          //   { validator: validateName, trigger: 'blur' }
          // ]
        },
         {
          type: "select",
          prop: "class_room1",
          label: "异步教室",
          required: true,
          props: {
            label:'name',value:'id'
           },
          init_request: true,//配置初始化数据请求 即一加载就请求数据
          fetch_search: true,//是否开启远程搜索
          keyword: '1111',
          multiple:true,
          // /api/classname/
          url:'/api/classname/',
          method:'get'

        },
        //自定义模板
        {
          type: "slot",
          slot_name:"class_room2",
          prop: "class_room2",
          label: "教室2",
          required: true,
        },
        // {
        //   type: 'select',
        //   prop:'sex',
        //   label: '性别'
        // }
      ],
      //表单字段
      form_field: {
        phone: "13734708686",
        sex: "",
      },
      form_button: [
        //确定按钮  取消按钮 和其他按钮
        {
          label: "确定",
          key: "submit",
          type: "primary",
        },
        {
          label: "重置",
          key: "cancel",
          type: "danger",
          callback: () => this.cancel(),
        },
        {
          label: "下一步",
          key: "next",
          type: "primary",
          callback: () => this.next(),
        },
      ],
      select_classroom:{
          props: {
            label:'class_name',value:'id'
           },
          init_request: true,//配置初始化数据请求 即一加载就请求数据
          fetch_search: true,//是否开启远程搜索
          keyword: '1111',
          multiple:true,
          // /api/classname/
          url:'/api/classname/',
          method: 'get',

      }
      //表单校验规则
      // form_rules: {
      //   name: [
      //     {required: true,message:'必填'}
      //   ]
      // }
    };
  },
  watch: {},
  mounted() {},
  methods: {
    submitForm() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject();
        }, 2000);
      });
    },
    //取消
    cancel() {
      console.log("cancel");
    },
    //下一步
    next() {
      console.log("next");
    },
  },
};
</script>
