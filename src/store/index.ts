import { defineStore } from 'pinia'

//创建仓库
//参数：仓库id，仓库内容
export const useStore = defineStore('main', {
  //状态
  state:() => {
    return {
        // helloworld: 'Hello World',
        nav:0,//当前流程导航位置，点击提交后的页面导航位置
        isvisited:0,//当前导航位置，点击导航跳转后的位置
        navOverStyle:0,
        navs:['问题立项','解决接收','解决问题','解决审核','批准审核','问题结题','横展信息'],//导航栏内容
        // 账号和密码
        uesrname: '',
        password: '',
    }
  },
  //计算属性
  getters: {},
  //事件
  actions: {}
})
