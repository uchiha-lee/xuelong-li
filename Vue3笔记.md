

# 1. ES6异步

## 1.1 ES6模块化

### 1.1.1 前端模块化分类

- 在ES6模块化提出以前，已经提出了**AMD，CMD，Commonjs**等模块化规范
- 但是这些规范存在**差异性**和**局限性**
- **AMD，CMD**适用于**浏览器**的JavaScript模块化
- **Commonjs**适用于**服务器**的JavaScript模块化

### 1.1.2 什么是ES6模块化

- ES6模块化是**服务器和浏览器通用**的模块化开发规范。
- 中文定义：
  - 每个js文件都是一个独立的模块
  - 导入其他模块成员使用**import**关键字
  - 向外共享模块成员使用**export**关键字

### 1.1.3 在Node中使用ES6模块化

#### 1.1.3.1 配置

- 确保安装了v14.15.1或更高版本的
- **package.json**的根节点中添加“type": "module"节点
- 默认导出(每个模块只有一个)：**export default{}**
- 默认导入(接收名称合理即可，最好为组件名)：**import xxx from 'xxx.js/xxx.vue'**
- 按需导出(可多次)：**export**
- 按需导入(接收名必须与导出名一致)：**import { xxx } from 'xxx.js/xxx.vue'**
- 直接导入(执行代码不接收成员)：**import 'xxx.js/xxx.vue'**

## 1.2 promise

### 1.2.1 回调地狱

- 多层回调函数相互嵌套
- 代码耦合性强，难以维护
- 代码可读性太差

### 1.2.2 promise

- 是一个构造函数
  - 可实现**const p = new Promise()**
  - new的Promise对象代表一个异步操作
- Promise.prototype 上包含**.then()**方法
  - 每次new Promise()得到的实例对象
  - 可以通过原型链访问到
- .then()用来指定成功或失败的回调函数
  - p.then(result => {}, error => {})
  - 成功函数必选，失败函数可选

## 1.3 async/await

### 1.3.1 定义

- 简化Promise异步操作
- ES8加入
- Promise只能通过链式.then()来处理异步

### 1.3.2 使用方法

- 在方法内使用了**await**，方法必须被**async**修饰
- 第一个await之前的代码同步执行，之后的代码异步执行

## 1.4 EventLoop事件循环

### 1.4.1 同步任务和异步任务

- 同步任务：
  - 非耗时任务，在主线程上的任务
  - 前一个执行完，后一个才执行
- 异步任务：
  - 耗时任务，由js委托给宿主环境执行
  - 异步任务完成后，通知js主线程执行回调函数

### 1.4.2 事件循环

- js主线程从“任务队列”里读取异步任务的回调函数，放到执行栈执行，这个过程

## 1.5 宏任务和微任务

### 1.5.1 执行顺序

- 执行宏任务后，继续执行其内的微任务
- 所有其内的微任务执行完毕后，执行下一个宏任务
- 先执行同步任务，再依次执行每个宏任务的微任务，再依次执行其他异步任务

# 2 Vue

- 用于构建用户界面的前端框架
- 特性：
  - 数据驱动视图：页面数据变化时，页面自动重新渲染，是单向数据绑定
  - 双向数据绑定：填写表单时，不操作dom的前提下把用户填写的内容同步到数据源中
- MVVM：Vue把每个HTML分为三部分：
  - Model：当前页面渲染时所依赖的数据源
  - View：当前页面所渲染的DOM结构
  - ViewModel：vue的实例，是MVVM的核心
  - 工作原理：
    - 数据源变化时，被VM监听到，VM根据最新的数据源更新DOM结构
    - 表单元素值变化时，被VM监听到，VM会把变化后的值同步到数据源中
- 版本：
  - 2.xx：主流版本
  - 3.xx：未来趋势
  - 1.xx：几乎被淘汰

## 2.1 基础

### 2.1.1 创建应用

- 通过使用**createApp**创建
- 传入 createApp 的对象实际上是一个组件，每个应用都需要一个“根组件”，其他组件将作为其子组件。

```
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

- 如果你使用的是单文件组件，我们可以直接从另一个文件中导入根组件

```
import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
import App from './App.vue'

const app = createApp(App)
```

- 渲染应用实例(挂载应用)：调用了 **.mount()** 方法。该方法接收一个“容器”参数： DOM 元素或CSS 选择器

```
app.mount('#app')
```

- 应用配置：**.config**对象，允许我们进行应用级别的选项(如异常处理)
- createApp允许多个 Vue 应用共存于同一个页面上，且每个应用都拥有自己的用于配置和全局资源的作用域

### 2.1.2 模板语法

- 文本插值：**双大括号{{}}**语法
- 可用js表达式
- 模板中的表达式仅能访问有限的全局对象列表(Math,Date等)，没有显式包含在列表中的全局对象将不能在模板内表达式中访问(可通过 app.config.globalProperties显式地添加)

```html
<!-- msg变化，span的值也变化 -->
<span>Message: {{ msg }}</span>
```

- 插入的值为纯文本，若想插入 HTML，你需要使用 `v-html` 指令(innerHTML)(数据绑定将会被忽略)

```html
<span v-html="rawHtml"></span>
```

- 不可在属性上使用，在属性上绑定值用**v-bind**(简写**：**)

```html
<div v-bind:id="dynamicId"></div>
<div :id="dynamicId"></div>
```

### 2.1.3 指令

- 期望值为一个js表达式
- 目的：在其表达式值变化时响应式地对 DOM 应用更新
- 参数：在指令名后通过一个冒号隔开做标识(可使用js表达式做动态参数，期望值为字符串)
- 修饰符：以点开头的后缀，为指令指定要执行的方式，方法
- 动态参数：
  - 需要包含在**[]**中
  - 动态参数作为js表达式，计算值作为最终参数
  - 类型为字符串或者null
  - 使用 DOM 内嵌模板 (直接写在 HTML 里的模板) 时，避免在名称中使用大写字母(会自动转换为小写)


#### 2.1.3.1 v-bind

- 将组件的性质绑定到元素的属性上：**v-bind:属性="性质"**
- 动态绑定多个值：
  - 绑定js的对象，该对象具有多个属性
  - 方法：**不带参数**：**v-bind="性质"**

### 2.1.4 响应式基础

- 数据变化使页面也随之变化
- 使用 `reactive()` 函数创建一个响应式对象或数组

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

- 返回的是原始对象的代理Proxy，更改原始对象不会触发更新
- **仅对对象类型生效，对原始类型无效**
- 将响应式对象的 property 赋值或解构至本地变量时，或是将该 property 传入一个函数时，会失去响应性

```js
const state = reactive({ count: 0 })

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count)
```

- 在组件模板中使用响应式状态：在 `setup()` 函数中定义并返回
- 使用单文件组件（SFC）时，我们可以使用 `<script setup>` ，在js标签中定义而不用导出

```js
import { reactive } from 'vue'

export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子
  setup() {
    const state = reactive({ count: 0 })

    // 暴露 state 到模板
    return {
      state
    }
  }
}
```

- DOM更新时机：
  - 更改响应式状态后，DOM 也会自动更新
  - 不同步：更新之后直到下次更新之前，无论进行多少次声明更改，都不会更新
- 深层次响应：更改深层次的对象或数组，也会触发响应式

#### 2.1.4.1 ref

- 响应式变量 ：使用**ref()**来创建任意类型的响应式ref
- 使用ref不会失去响应性

```js
const objectRef = ref({ count: 0 })

// 这是响应式的替换
objectRef.value = { count: 1 }
```

```js
const obj = {
  foo: ref(1),
  bar: ref(2)
}

// 该函数接收一个 ref
// 需要通过 .value 取值
// 但它会保持响应性
callSomeFunction(obj.foo)

// 仍然是响应式的
const { foo, bar } = obj
```

- 当 ref 在模板中作为顶层 property 被访问时，它们会被自动“解包”，所以**不需要**使用 **.value**

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

### 2.1.5 计算属性

- 对于数据需要复杂的逻辑去处理，可用计算属性
- 定义函数来对数据进行处理，并提供返回值赋值给计算属性
- 在**{{}}**直接填写计算属性来进行对数据的处理，获取返回值

```js
//导入computed计算属性模块
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
//定义计算属性，把函数的返回值赋值给计算属性evenNumbers- 
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})
```

- 计算属性和直接用方法的区别：
  - 计算属性只有响应式依赖更新后才会重新计算，不会重复执行getter 函数
  - 函数则会在每次渲染时都重复执行
- 计算函数只应该用来计算
- 计算属性的函数通过同时提供 getter 和 setter 来实现可写

```js
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
//运行 fullName.value = 'John Doe' 时，setter 会被调用而 firstName 和 lastName 会随之更新
```

- reverse()和sort()会更改原数组
- 不能在计算属性的函数中使用**异步和DOM操作**

### 2.1.6 类与样式绑定

- 使用v-bind进行绑定
- js定义表示是否存在的真假值

```js
const isActive = ref(true)
const hasError = ref(false)
```

- 使用**:class**，给其赋值一个对象，每个属性都是一个类名，属性值为js定义的真假值，来控制样式
- **:class**和**class**共存
- 可在**:class**中只赋值变量名，类名在js中定义对象时控制
- **:style**可使用表达式

### 2.1.7 条件渲染

- v-if：只有条件为真时该元素才被渲染
- v-else：配合v-if使用，添加选项区域
- v-else-if：else if
- v-show:在元素不显示时也不会消失，调用的是css的dispaly
- 区别：
  - v-if：真实条件渲染，条件变化组件会销毁重建,并且组件达到条件才渲染
  - 元素无论初始条件如何，始终会被渲染
  - 频繁切换使用show，不常改变用if

### 2.1.8 列表渲染

#### 2.1.8.1 v-for

- 循环渲染，可遍历数组，对象

- 语法：for in形式：**v-for="item in items"**

- item为当前元素，index为当前位置，key，value

- ```html
  <span v-for="n in 10">{{ n }}</span>
  ```

- 上述代码从1开始

- 同时使用v-if和v-for，**v-if**优先级更高

  - 解决方法：嵌套一层`<template>`标签，在其上使用v-for


#### 2.4.8.2 key管理状态

- vue改变数据顺序，dom不会随之改变
- 要使之改变，用key来绑定数据id顺序

#### 2.4.8.3 显示过滤/排序后的结果

- 使用计算属性对数据进行过滤
- 使用v-for查找通过过滤的数据并渲染

### 2.1.9 事件处理

- 语法：**v-on:**(简写**@**)
- 方法：可以接受一个方法名或对某个方法的调用：例如foo，foo.bar，foo['bar']
- 内联：可以直接书写js语句：例如foo()，count++

#### 2.1.9.1 事件修饰符

- **.stop**：单击事件将停止传递，阻止冒泡
- **.prevent**：提交事件将不再重新加载页面，阻止默认事件
- **.self**：只有绑定动作的元素才会触发
- **.capture**：捕获
- **.once**：单次触发
- **.passive**：不拦截默认事件
- 修饰语可以使用链式书写
- 也可以只有修饰符
- 仅当 event.target 是元素本身时才会触发事件处理器

#### 2.1.9.2 按键修饰符

- Vue 为一些常用的按键提供了别名：.enter,.tab,.delete,.esc,.space,.up,.down,.left,.right
- 系统按键修饰符，按下时触发：.ctrl,.alt,.shift,.meta
- .exact：修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符

```html
<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
```

- 鼠标修饰符：.left,.right,.middle

### 2.1.10 表单输入绑定

- 将表单输入框的内容同步给 JavaScript 中相应的变量
- 语法：**v-model="变量"**
- v-model表达式初始值不绑定任何选择项，多选框会渲染成未选择状态，ios系统会导致无法选择第一项(不触发change事件)，解决方法：提供一个空值的禁用选项(设置一个初始选项)
- v-model绑定的值为字符串，将该值绑定到当前活动实例上的动态属性使用**v-bind**

```html
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

- true-value和false-value仅在v-model存在时工作
- 选中时toggle值为dynamicTrueValue
- 修饰符：
  - .lazy：在每次change事件后更新数据(无.lazy：每次input事件后更新)
  - .number：自动转换为数字类型
  - .trim：出去两端空格

### 2.1.11 生命周期

- 每个实例从创建到销毁的过程
- 不同的钩子会在生命周期的不同阶段被调用

### 2.1.12 侦听器

- 监视数据的变化，从而做出针对该变化的操作
- 使用watch函数

### 2.1.13 模板ref

- 用Vue操作Dom元素
- 步骤：
  - 从vue中引入ref
  - 给DOM元素添加ref属性，类似name属性
  - 在函数中调用**this.$ref.属性名.操作**来访问
- 在v-for中使用时，ref的值为数组，元素被挂载后被填充
- 可绑定函数和组件实例

### 2.1.14 组件基础

- 将 Vue 组件定义在一个单独的 `.vue` 文件中，这被叫做**单文件组件**(简称 SFC)
- .vue文件三部分：

  - template：编写html代码
  - style：编写css代码
  - script：编写js代码

- 通过 `<script setup>`，导入的组件都在模板中直接可用

- 使用：
  - 以html标签的形式来使用(标签名为导入的名字)
  - 各个组件之间的内容相互独立
- 传递props：
  - 向共用组件传递不同参数，来渲染出不同的页面(类似于数组渲染)

```html
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

- - 值被传递给 prop 时，它将成为该组件实例上的一个属性。该属性的值可以像其他组件属性一样，在模板和组件的 `this` 上下文中访问
  - 一个组件可以有任意多的 props，默认情况下，任何值都可以传递给任何 prop
  - prop 被注册后，可如下传参来使用组件

```html
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />
```

- - prop对象有id顺序属性时，也可以用v-for渲染

```html
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
 />
```

- - 组合式：

```html
<!-- BlogPost.vue -->
<script>
defineProps(['title'])
</script>

<template>
  <h4>{{ title }}</h4>
</template>
```

```js
const props = defineProps(['title'])
```

### 2.1.15 组合式API

- 组合式 API 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件
- 三个方面 ：
  - 响应式API
  - 生命周期钩子
  - 依赖注入

## 2.2 vue-cli

### 2.2.1 定义

- Vue.js开发的标准工具，简化基于webpack创建工程化Vue项目的过程

### 2.2.2 创建项目

```js
vue create 项目名
```

### 2.2.3 项目结构

- assets：静态资源文件(图片，样式表等)
- components：文件夹，封装的复用的组件
- main.js：入口文件
- App.vue：项目根组件

### 2.2.4 运行流程

- 通过main.js把App.vue渲染到index.html的指定区域中
- App.vue用于编写模板结构
- index.html需要预留el区域
- main.js把App.vue渲染到index.html区域中

## 2.3 组件

### 2.3.1 父子关系

- 组件封装后互相独立，无关系
- 组件使用时，根据**嵌套关系**形成父子关系

### 2.3.2 使用方法

- 导入组件

- 使用components节点注册组件(此方法注册的组件为私有组件)
- 以标签形式使用组件
- 全局注册组件：**Vue.conponents('xxx',xxx)**
  - 参数1：注册名称
  - 参数2：组件名
- 组件中的data必须是函数，在return中定义数据
- this表示当前实例对象

### 2.3.3 props

- 组件自定义属性，提高组件复用率
- 只读，修改props的值会报错
- 可以把props值传到data里，通过对data进行操作来修改值

- 使用`<script setup>`时，props使用`defineProps(数据)`来定义

- 接收数据：
  - 第一种方式（只接收）：```props:['name'] ```
  - 第二种方式（限制类型）：```props:{name:String}```
  - 第三种方式（限制类型、限制必要性、指定默认值）：

```js
props:{
	name:{
	type:String, //类型
	required:true, //必要性
	default:'老王' //默认值
	}
}
```

### 2.3.4 样式冲突

- 在.vue中的样式会全局生效，会造成样式冲突
- 给**style**标签加上**scoped**属性，规定该样式只在组件内部生效期

### 2.3.5 组件生命周期

- 生命周期：组件从创建到运行到销毁的整个阶段，是时间段
- 生命周期函数：伴随组件的生命周期，自动按次序进行
- 组件创建阶段：
  - **beforeCreate->created->beforeMount->Mounted**
  - **beforeCreate**：组件的props/data/methods未被创建，不可用
  - Init options API：创建props/data/methods
  - **created**：组件的props/data/methods已创建，模板结构未生成，**ajax通常在此阶段**
  - Has pre-compiled template：基于数据和模板在内存中生成html结构
  - **beforeMount**：**将要**把内存中的html结构渲染到浏览器中，尚未生成DOM结构
  - Initial render create & insert DOM nodes：将内存中的html结构渲染到浏览器中
  - **mounted**：渲染成功，浏览器生成DOM结构
- 组件运行阶段：
  - **beforeUpdate->updated**
  - **beforeUpdate**：**将要**根据数据变化重新渲染主键模板结构
  - re-render and patch：重新渲染模板结构
  - **updated**：重新渲染完成
- 组件销毁阶段：
  - **beforeDestory->destroyed**

### 2.3.6 组件数据共享

#### 2.3.6.1 父向子传值

- **利用自定义属性**
- 在父组件中定义数据
- 在子组件中的props添加自定义属性对应接收父组件数据
- 父组件声明子组件 标签，并用v-bind标签绑定子组件自定义属性值为对应数据
- 子组件中使用模板语法调用数据
- 在子组件中修改grops自定义属性的值，父组件中的数据不会更改

#### 2.3.6.2 子向父传值-事件

- **利用自定义事件**
- 子组件在数据中的方法中定义自定义事件，使用**this.$emit(事件名，参数)**
- 父组件中使用子组件，并且监听事件**@事件名=“函数名”**
- 父组件方法中定义处理函数
- 自定义事件：可以使用**defineEmits()**来声明

#### 2.3.6.3 兄弟传值

- 利用中间组件
- 定义**eventBus.js**来中转数据：
  - 引入vue：**import Vue from 'vue'**
  - 导出vue实例对象：**export default new Vue()**
- 数据发送组件A引入eventBus组件，给eventBus定义自定义事件：**bus.$emit(事件名，数据)**
- 数据接收组件B引入eventBus组件，处理自定义事件：**bus.$on(事件名，处理函数)**

### 2.3.7 动态组件

- 动态的切换组件的显示与隐藏

```html
<!-- currentTab 改变时组件也改变 -->
<component :is="tabs[currentTab]"></component>
```

### 2.3.8 透传

- 当一个组件以单个元素作为根渲染时，使用该组件时的属性会传递给该单个元素(类似继承)
- class透传：父组件的class传递给元素后，会与子元素的class合并
- 监听器透传：子元素符合触发条件，父组件和子元素所有符合条件的触发器都会触发
- 深层透传：子组件中渲染了其他单元素组件，会把属性继续透传给该元素

#### 2.3.8.1 禁用

- 组件选项(export default)中设置**inheritAttrs: false**
- 使用了`<script setup>`时，需要用一个新的`<script>`来设置
- 透传过来的属性可以使用`$Attrs`访问，`$attrs`包含除props和emits之外的所有属性
  - 属性保留大小写，使用`$attrs[属性名]`访问
  - 事件通过类似`$attrs.onclick`的**.on**形式访问
- 应用：不想将透传的属性给根组件，而是其中的某个组件
  - 设置禁用：**inheritAttrs: false**
  - 使用的组件绑定属性：**v-bind="$attrs"**
- 多个根节点使用`$Attrs`绑定
- `<script setup>`下js中可以使用`useAttrs()`api来访问透传的属性(`<script setup>`下)
- 非`<script setup>`下attrs会作为上下文对象的属性暴露

### 2.3.9 插槽

- 原理：函数原理，在子组件中接收父组件传递过来的内容，使用函数来处理这些内容(渲染等)

#### 2.3.9.1 结构

- **在子组件中定义插槽插口**：在子组件中使用`<slot></slot>`标签
- 在父组件中使用子组件，在标签内容部分添加插入内容

#### 2.3.9.2 作用域

- 插槽内容可以访问到父组件的数据作用域，无法访问到子组件的数据

#### 2.3.9.3 默认内容

- 父组件未传入插入内容时，子组件自己设置的默认内容
- 语法：在`<slot></slot>`内容部分放入默认内容

#### 2.3.9.4 具名插槽

- 在子组件中有多个插槽，用具名插槽来区分不同的插槽
- 用法：
  - 子组件中的`<slot></slot>`具有**name**属性，给**该属性设置不同的属性值**来区分不同插槽
  - 父组件插入插槽内容时，在插入内容的父容器`<template></template>`上使用**v-slot(简写#):name值**来指定插入哪个插槽

#### 2.3.9.5 动态插槽名

- 与指令的动态参数一样，要包裹在**[]**中

#### 2.3.9.6 作用域插槽

- 子组件的数据需要传给父组件：
  - 使用**v-bind(:)**把属性和值传给父组件

- 具名插槽：直接在slot标签上书写属性和属性值，父组件使用**v-slot(简写#):name值=xxx**接收
- 无渲染组件：插入内容只写逻辑，渲染的DOM内容都在子组件中

### 2.3.10 依赖注入

- props逐级透传过于麻烦且可能影响到中间组件
- 使用依赖注入解决
- 依赖注入：
  - 父组件对于所有后代组件来说都是依赖提供者
  - 无论层级多深，任何后代组件都可以注入父组件传入的依赖

#### 2.3.10.1 供给Provide

- 给子组件供给数据需要使用provide函数
- 步骤：
  - 导入provide
  - 调用provide()方法
    - 参数1：注入名(字符串或者，Symbol)
    - 参数2：注入值
- `<script setup>`中可直接调用provide
- `<script>`中需要在setup()函数中调用
- 使用symbol作为注入名来防止冲突

#### 2.3.10.2 注入inject

- 注入数据需要使用inject()函数
- 步骤：
  - 导入inject
  - 调用inject()函数，并赋值给常量来使用
    - 参数1：注入名
    - 参数2：默认注入名
- `<script setup>`中可直接调用provide
- `<script>`中需要在setup()函数中调用，并将常量作为返回值

#### 配合响应式

- 依赖注入可以在子组件内修改数据，原理是子组件中同时注入一个可以修改数据的来自于父组件的函数
- 不希望子组件修改数据，用readondy()函数包裹注入值

### 2.3.11 异步组件

- 将应用拆分成更小的模块，仅在使用时加载
- 使用**defineAsyncComponent()**函数

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

- 配合ES模块导入

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

- AsyncComp作为组件调用

#### 2.3.11.1加载与错误

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

- 提供加载组件，它将在内部组件加载时先行显示。在加载组件显示之前有一个默认的 200ms 延迟
  - 防止在网络状况较好时，加载太快，导致组件替换可看起来像闪烁。
- 提供报错组件，当加载器函数返回的 Promise 被 reject 时，它将被显示出来。你还可以指定一个超时时间，在请求耗时过长时显示报错组件。

## 2.4 可复用性

### 2.4.1 组合式函数

- 利用 Vue 组合式 API 来封装和复用**有状态逻辑**的函数
- 简言之，就是一个用来处理逻辑的js组件，把原本处理逻辑的函数从组件中移出到一个单独的文件中，再调用
- 约定使用驼峰命名。以**use**开头
- 可接收 ref 参数，在watchEffect()中使用unref()追踪或者watch()监听
- 返回ref
- 指令的值可以为js表达式
- 会主动应用到根节点上，类似透传

### 2.4.2 自定义指令

- 主要是为了重用**涉及普通元素的底层 DOM 访问**的逻辑
- js中以驼峰命名法定义，html中以-调用

#### 2.4.2.1 指令钩子

- 指定指令在何时调用

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

#### 2.4.2.2 参数

- el：绑定的元素
- binding：
- 一个对象，包含以下 property。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

#### 2.4.2.3 简写

- 对于自定义指令来说，需要在 `mounted` 和 `updated` 上实现相同的行为、又并不关心其他钩子的情况很常见
- 这种情况可以简写：省略钩子，直接写函数主体语句

### 2.4.3 插件

- 能为 Vue 添加全局功能的工具代码
- 安装插件：app.use(插件,{可选选项})
- 定义插件：

```js
install(app, options) {
    // 配置此应用
  }
```

- 注册：

  - 通过 [`app.component()`](https://staging-cn.vuejs.org/api/application.html#app-component) 和 [`app.directive()`](https://staging-cn.vuejs.org/api/application.html#app-directive) 注册一到多个全局组件或自定义指令。
  - 通过 [`app.provide()`](https://staging-cn.vuejs.org/api/application.html#app-provide) 使一个资源[可被注入](https://staging-cn.vuejs.org/guide/components/provide-inject.html)进整个应用。

  - 向 [`app.config.globalProperties`](https://staging-cn.vuejs.org/api/application.html#app-config-globalproperties) 中添加一些全局实例属性或方法

## 2.5 内置组件

- 内置组件，无需注册直接调用

### 2.5.1 transition 过渡

- 在一个元素或组件进入和离开 DOM 时应用动画
- 触发条件：
  - v-if
  - v-show
  - 由特殊元素 `<component>` 切换的动态组件
- 当`<Transition>` 组件中的元素被插入或移除时，发生的事情：
  - 检测目标元素是否应用了 CSS 过渡或动画，在适当时机使用或删除
  - 检测是否有作为监听器的JS钩子，在适当时机被调用
  - 都无：DOM 的插入、删除操作将在浏览器的下一个动画帧上执行


#### 2.5.1.1 过渡组成

- 六个过渡class：

- `v-enter-from`：

  - 进入动画的起始状态
  - 元素插入之前添加，在元素插入完成后的下一帧移除

- `v-leave-from`：

  - 离开动画的起始状态

- `v-enter-active`：

  - 进入动画的生效状态。应用于整个进入动画阶段。

  - 在元素被插入之前添加，在过渡或动画完成之后移除。
  - 这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型

- `v-leave-active`：

  - 离开动画的生效状态

- `v-enter-to`：

  - 进入动画的结束状态
  - 在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除

- `v-leave-to`：

  - 离开动画的结束状态

- **过渡命名**：
  - 给过渡标签添加name属性
  - 上述class从**v-**变成**名字-**
  
- 在过渡class中可以使用CSS3的动画

- 使用自定义class(第三方动画CSS库)

  - 给过渡标签添加对应的属性
  - 把自定义class作为上述属性的属性值

- 同时使用过渡和动画：显式地传入 `type` ，告诉 Vue 需要关心哪种类型，传入的值是 `animation` 或 `transition`

```html
<Transition type="animation">...</Transition>
```

- 深层class过渡：应用后代选择器来实现
- 向 `<Transition>` 组件传入 `duration`，显式指定过渡的持续时间 (以毫秒为单位)，实现在嵌套的过渡中，期望的行为应该是等待所有内部元素的过渡完成

```html
<Transition :duration="550">...</Transition>
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

- 尽量使用不会使DOM布局变动的属性进行动画和过渡，效果更高

#### 2.5.1.2 可重用过渡

- 定义组件，声明过渡，提供插槽插口
- 调用过渡组件，插入内容

#### 2.5.1.3 出现时过渡

- 某个节点初次渲染时应用过渡效果
- 给过渡标签添加appear属性，无属性值

#### 2.5.1.4 过渡模式

- 想要先执行离开/进入动画，然后在其完成**之后**再执行元素的进入/离开动画
- 实现：给过渡标签添加属性mode

```html
先出后入
<Transition mode="out-in">
  ...
</Transition>
先入后出
<Transition mode="in-out">
  ...
</Transition>
```

### 2.5.2 transitionGroup过渡组

- 用于呈现一个列表中的元素或组件的插入、移除和顺序改变的动画效果
- 过渡模式不可用
- 其中的元素**总是必须**有一个独一无二的 `key`
- CSS 过渡 class 会被应用在其中的每一个元素上，**而不是**这个组的容器上

### 2.5.3 KeepAlive 缓存实例

- 在动态切换多个组件时视情况缓存组件实例
- 在组件切出在切回后，其内数据都会被重置
- 解决：使用keepAlive标签包裹
- `<KeepAlive>` 会默认缓存内部的任何组件实例
  - 使用`include` 和 `exclude`来指定包含和排除哪些组件
  - 组件声明name属性值来选择是否缓存实例

```html
!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>

```

- 最大缓存数：绑定max属性来控制，超出最大缓存数后，优先清除**未被访问时间最长**的缓存

```html
<KeepAlive :max="10">
  <component :is="activeComponent" />
</KeepAlive>
```

- 被缓存标签包裹的元素从DOM上移除时处于不活跃状态，而非卸载状态

### 2.5.4 Teleport传送门

- 将一个组件的一部分模板“传送”到该组件的 DOM 层次结构之外的 DOM 节点中

```html
<button @click="open = true">Open Modal</button>
//to后面的值为该部分DOM要传送到的节点位置
//传送到body节点下
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

- 只改变DOM结构，不改变组件间的逻辑结构
- 禁用传送门
- 多个传送门可以指定同一个传送位置

```html
<Teleport :disabled="isMobile">
  ...
</Teleport>
```

### 2.5.5 Suspense

- 在组件树中编排异步依赖
- 等待的异步依赖：
  - 带有异步 `setup()` 钩子的组件
  - 异步组件
- 初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。
- 如果在这个过程中遇到任何异步依赖，则会进入**挂起**状态。
- 在挂起状态期间，展示的是后备内容。当
- 所有遇到的异步依赖都完成后，`<Suspense>` 会进入**完成**状态，并将展示出默认插槽的内容。
- 初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态
- 进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态
- 组件树中新的更深层次的异步依赖**不会**造成 `<Suspense>` 回退到挂起状态
- 事件：`<Suspense>` 组件会触发三个事件：`pending`、`resolve` 和 `fallback`
  - `pending` 事件进入挂起状态时触发
  - `resolve` 事件在 `default` 插槽完成获取新内容时触发
  - `fallback` 事件在 `fallback` 插槽的内容显示时触发
- 错误处理：使用钩子在父组件中处理错误

## 2.6 升级规模

### 2.6.1 单文件组件

- 组件基础内容
- 优点(为何使用)：
  - 强耦合
  - 隔离CSS
  - 使用组合式API更简单等
- 如何工作：
  - 交由`@vue/compiler-sfc`编译，编译后为标准的ES，模块
  - `<style>` 标签一般会\
    - 在开发时注入成原生的 `<style> `标签以支持热更新
    - 而生产环境下它们会被抽取、合并成单独的 CSS 文件

### 2.6.2 工具链

#### 2.6.2.1 Vite脚手架

- 轻量级的、速度极快的构建工具
- 对 Vue SFC 提供第一优先级支持
- 使用Vite工件Vue项目

```js
$ npm init vue@latest
```

#### 2.6.2.2 Vue CLI脚手架

- 官方提供的
- 基于 Webpack 
- 处于维护模式

#### 2.6.2.3 浏览器内模板编译注意事项 

- 无构建步骤方式使用 Vue ，为了执行动态模板编译，Vue 需要将模板编译器运行在浏览器中
- 前缀为 `vue.runtime.*` 的构建版本是**只包含运行时的版本**：不包含编译器，当使用这个版本时，所有的模板都必须由构建步骤预先编译。
- 名称中不包含 `.runtime` 的版本则是**完全版**：即包含了编译器，并支持在浏览器中直接编译模板。然而，体积也会因此增长大约 14kb。

#### 2.6.2.4 IDE和浏览器插件

- VS Code + Volar插件/WebStorm插件
- 浏览器插件：浏览一个 Vue 应用的组件树，查看各个组件的状态，追踪状态管理的事件，还有测评性能表现

#### 2.6.2.5 TypeScript

- Volar为 `<script lang="ts">` 块提供类型检查，还包括对模板内表达式和组件之间 props 的验证。
- 使用 `vue-tsc`可以在命令行中执行相同的类型检查，通常用来生成单文件组件的 `d.ts` 文件

#### 2.6.2.6 代码规范 

- 基于 Vite 构建
  - `npm install -D eslint eslint-plugin-vue`，然后遵照 `eslint-plugin-vue` 的指引进行配置。
  - 启用 ESLint IDE 插件，比如 [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，然后你就可以在开发时获得规范检查器的反馈。这同时也避免了启动开发服务器时不必要的规范检查。
  - 将 ESLint 格式检查作为一个生产构建的步骤，保证你可以在最终打包时获得完整的规范检查反馈。
  - (可选) 启用类似 [lint-staged](https://github.com/okonet/lint-staged) 一类的工具在 git commit 提交时自动执行规范检查。

#### 2.6.2.7 底层库

- **@vue/compiler-sfc**：处理 Vue SFC 的底层的功能，并只适用于需要支持 Vue SFC 相关工具链的开发者
- **@vitejs/plugin-vue**：为 Vite 提供 Vue SFC 支持的官方插件
- **vue-loader**：为 webpack 提供 Vue SFC 支持的官方 loader

### 2.6.3 路由

### 2.6.4 状态管理

- pinia：自动状态管理工具

#### 2.6.4.1 组件组成

- **状态**：驱动整个应用的数据源；
- **视图**：对**状态**的一种声明式映射；
- **动作**：状态根据用户在**视图**中的输入而作出相应变更的可能方式。

```html
<script setup>
import { ref } from 'vue'

// 状态
const count = ref(0)

// 动作
function increment() {
  count.value++
}
</script>

<!-- 视图 -->
<template>{{ count }}</template>
```

- **多个组件共享一个共同的状态**：抽取出组件间的共享状态，放在一个全局单例中来管理

#### 2.6.4.2 用响应性 API 做简单状态管理 

- 创建一个状态共享组件，导入响应式，声明状态及处理函数
- 共享状态的组件导入共享组件，使用共享状态

### 2.6.5 测试

#### 2.6.5.1 测试类型

- **单元测试**：
  - 白盒测试：逻辑测试笔
  - 检查给定函数、类或组合式函数的输入是否产生预期的输出或副作用
  - 捕获函数的业务逻辑和逻辑正确性的问题
- **组件测试**：
  - 黑盒测试：功能测试
  - 检查你的组件是否正常挂载和渲染、是否可以与之互动，以及表现是否符合预期
  - 捕捉组件中的 prop、事件、提供的插槽、样式、CSS class 名、生命周期钩子，和其他相关的问题
- **端到端测试**：
  - 检查跨越多个页面的功能，并对生产构建的 Vue 应用进行实际的网络请求
  - 捕捉到路由、状态管理库、顶级组件（常见为 App 或 Layout）、公共资源或任何请求处理方面的问题
  - 了解你的应用在多个不同浏览器上运行的情况
  - 现代的端到端测试框架通过增加**并行化等功能**来帮助解决整个套件需要很长时间的问题

#### 2.6.5.2 测试环境

- 单元测试框架：Vitest，Peeky，Jest
- 组件测试框架：Vitest，Cypress
- 端到端测试框架：Cypress，Playwright，Nightwatch v2

#### 2.6.5.3 测试库

- `@testing-library/vue`(推荐)：Vue专注于测试组件而不依赖其他实现细节
- `@vue/test-utils`：Vue底层组件测试库

#### 2.6.5.4 使用指南

- 添加Vitest

```js
> npm install -D vitest happy-dom @testing-library/vue
```

- 更新Vite配置，添加测试

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // 启用类似 jest 的全局测试 API
    global: true,
    // 使用 happy-dom 模拟 DOM
    // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
    environment: 'happy-dom'
  }
})
```

- 使用 TypeScript：将 `vitest/globals` 添加到 `tsconfig.json` 的 `types` 字段当中

```js
// tsconfig.json

{
 "compileroptions": {
    "types": ["vitest/globals"]
  }
}
```

- 创建名字以 `*.test.js` 结尾的文件
- 把所有的测试文件放在项目根目录下的 `test` 目录中，或者放在源文件旁边的 `test` 目录中
- Vitest 会使用命名规则自动搜索它们

```js
// MyComponent.test.js
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // 断言输出
  getByText('...')
})
```

- 在 `package.json` 之中添加测试命令，然后运行

```js
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```js
> npm test
```



### 2.6.6 服务器渲染

#### 2.6.6.1 什么是SSR

- 把组件在**服务端**渲染成 HTML 字符串，直接返回给浏览器，最后再将静态的 HTML“激活” (hydrate) 为完全交互式的客户端应用
- SSR优点：
  - **更快的内容到达时间**：用户将会更快地看到完整渲染的页面
  - **统一的心智模型**：使用相同的语言以及相同的声明式、面向组件的心智模型来开发整个应用
  - **更好的 SEO**：搜索引擎爬虫可以直接看到完全渲染的页面。
- 使用SSR要考虑的：
  - 开发限制：某些代码和库只能在特定条件下使用
  - 构建配置和部署相关的要求更多：需要一个能让 Node.js 服务器运行的环境
  - 更高的服务器负载

#### 2.6.6.2 SSG

- **静态站点生成 (SSG)**：预渲染：如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来就重新渲染页面
- 预渲染的页面生成后作为静态 HTML 文件被服务器托管
- SSG 仅可以用于消费静态数据的页面，数据在构建期间是已知的，并且在多次部署期间不会改变。每当数据变化时，都需要重新部署
- 输出的是静态 HTML 和资源文件

#### 2.6.6.3 渲染应用

- 创建一个新的文件夹，`cd` 进入
- 执行 `npm init -y`
- 在 `package.json` 中添加 `"type"："module"` 使 Node.js 以 ES modules mode 运行
- 执行 `npm install vue`
- 创建一个 `example.js` 文件

```js
// 此文件运行在 Node.js 服务器上
import { createSSRApp } from 'vue'
// Vue 的服务端渲染 API 位于 `vue/server-renderer` 路径下
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
    //应用内容
  	data: () => ({ count: 1 }),
  	template: `<button @click="count++">{{ count }}</button>`
})

//renderToString()函数接收一个 Vue 应用实例作为参数，返回一个 Promise
//当 Promise resolve 时得到应用渲染的 HTML
renderToString(app).then((html) => {
  console.log(html)
})
```

- 运行`node example.js`
- 移动到服务器处理函数中

```js
//引入express
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

//创建服务器
const server = express()

//使用处理函数
server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

- 执行 `node server.js`，访问 `http://localhost:3000`

## 2.7 最佳实践

### 2.7.1 生产部署

- 通过 `create-vue` 搭建的项目（基于 Vite）或者 Vue CLI（基于 webpack）都会为生产环境发布作预配置
- 使用自定义的构建，应：
  - `vue` 被解析为 `vue.runtime.esm-bundler.js`
  - 编译时功能标记被正确配置
  - `process.env.NODE_ENV` 会在构建时被替换为 `"production"`

### 2.7.2 性能

- **页面加载性能**：应用展示出内容与首次访问时变为可交互的速度
- **更新性能**：应用响应用户输入更新的速度

#### 2.7.2.1 页面加载优化

- 包体积与 Tree-shaking 优化：
  - 尽可能地采用构建步骤
  - 在引入新的依赖项时要小心包体积膨胀！
  - 如果以渐进式集成的模式使用 Vue，并选择避免使用构建步骤，请考虑使用 `petite-vue`(只有 **6kb**) 来代替
- 代码拆分：构建工具将应用程序包拆分为多个较小的块，然后可以按需或并行加载
- 纯粹的客户端渲染存在内容到达时间缓慢的问题。这可以通过采用服务端渲染 (SSR) 或者静态站点生成 (SSG) 来进行优化

#### 2.7.2.2 更新优化

- props 稳定性 ：尽量保持传给子组件的 props 稳定

```html
actived
<ListItem
  v-for="item in list"
  :id="item.id"
  :active-id="activeId" />
```

- v-once：
  - 用来渲染依赖运行时数据但无需再更新的内容。它的整个子树都会在未来的更新中被跳过
  - 重新渲染时该部分会被视为静态内容，不会再渲染
- v-memo：
  - 用来有条件地跳过某些大型子树或者 `v-for` 列表的更新
  - 缓存该模板

#### 2.7.2.3 总体优化

-  大型虚拟列表：
  - 渲染大型列表处理的DOM节点太多
  - **虚拟化列表**：
    - 只展示用户屏幕大小所能展示出的列表，不渲染完整列表
    - 直接使用现有库：：
      - [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
      - [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
- 减少大型不可变结构的响应性开销 
  - 使用[`shallowRef()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowref) 和 [`shallowReactive()`](https://staging-cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 来选择退出深度响应。
  - 浅层式 API 创建的状态只在其顶层是响应式的，并原封不动地显示所有下面层级的对象
  - 浅层 ref 的内部值将会原样存储和暴露，并且不会被深层递归地转为响应式。只有对 `.value` 的访问是响应式的。
- 避免不必要的组件抽象：
  - 逻辑抽象创建太多组件实例将会导致性能损失

### 2.7.3 无障碍访问

- 创建可供任何人使用的网站：
  - 身患某种障碍
  - 通过慢速的网络连接访问
  - 使用老旧或损坏的硬件
  - 还是仅处于某种不方便的环境

#### 2.7.3.1 跳过链接

- 在每个页面的顶部添加一个直接指向主内容区域的链接，从而跳过多个网页上重复的内容
- 放在 `App.vue` 的顶部，这样它就会是所有页面上的第一个可聚焦元素

```html
<ul class="skip-links">
  <li>
    <a href="#main" ref="skipLink">Skip to main content</a>
  </li>
</ul>
```

#### 2.7.3.2 内容结构

- 设计可以支持易于访问的实现
- 考虑颜色对比度、字体选择、文本大小和语言
- 考虑应用程序中的内容是如何组织的

## 2.8 响应式

### 2.8.1 响应性

- 术语：
  - **作用**：也叫**副作用**，本质上是函数，函数内部处理状态(变量)，产生了**更改程序状态**的作用
  - **依赖**：用来执行作用的值，引起状态变化的值，被执行的作用称为该依赖的**订阅者**
- **响应性**：使用函数，在**依赖变化时调用作用**
- 响应函数的任务：
  - 依赖被读取时进行追踪
  - 将副作用设置为依赖的订阅者
  - 监测依赖的变化，通知订阅者执行

# 3 路由

- 下载：npm install vue-router@4

## 3.1 基础

### 3.1.1 html使用方法

- 在html中使用自定义组件 `router-link` 来创建链接，而不是`a`标签，使用`to`属性来指定链接

```html
<router-link to="/about">Go to About</router-link>
```

- `router-view` 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局

```html
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>
```

### 3.1.2 js使用方法

- 导入路由组件

```js
const Home = { template: '<div>Home</div>' }
```

- 定义路由配置：每个路由为一个对象，两个属性
  - path：路由表示，接收到该标识后引用对应组件
  - component：要引用的组件

```js
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
```

- 创建路由实例：
  - 调用VueRouter.createRouter()方法
  - 方法参数：一个对象，对象属性：
    - history：模式，常用：history: VueRouter.createWebHashHistory()
    - 路由配置：routes
- 创建应用挂载路由：
  - 创建应用：const app = Vue.createApp({})
  - 使用路由：app.use(router)
  - 挂载应用：app.mount('#app')

```js
const router = VueRouter.createRouter({
  //内部提供了 history 模式的实现。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

const app = Vue.createApp({})
app.use(router)
app.mount('#app')
```

- 在组建中使用`this.$router`来访问路由实例，使用`this.$route` 的形式访问当前路由
- 在 `setup` 函数中访问路由，请调用 `useRouter` 或 `useRoute` 函数

```js
const router = useRouter()
const route = useRoute()
```

### 3.1.3 动态路由匹配

- 对于不同的路径，返回相同的路由(例：有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同)
- 语法：路径参数 用冒号 `:` 表示

```js
const routes = [
  // 动态字段以冒号开始
  { path: '/users/:id', component: User },
]

///users/johnny 和 /users/jolyne 这样的 URL 都会映射到同一个路由User上
```

- 当一个路由被匹配时，它的 *params* 的值将在每个组件中以 `this.$route.params` 的形式暴露出来

![](Vue3.assets/路由动态路径.png)

- 除了 `$route.params` 之外，`$route` 对象还公开了其他有用的信息，如 `$route.query`（如果 URL 中存在参数）、`$route.hash` 等

#### 3.1.3.1 响应参数变化

- 从 `/users/johnny` 导航到 `/users/jolyne` 时，**相同的组件实例将被重复使用，组件的生命周期钩子不会被调用**
- 对同一个组件中参数的变化做出响应，可以简单地使用 watch监听 `$route` 对象上的任意属性

```js
const User = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 对路由变化做出响应...
      }
    )
  },
}
```

- 或者使用导航守卫

#### 3.1.3.2 捕获所有路由

- 使用自定义的 路径参数正则表达式
- 语法：路径参数括号(正则表达式)

```js
{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
```

### 3.1.2 路由的匹配语法

#### 3.1.2.1 参数中自定义正则

- 使用以下的正则 `([^/]+)` (至少有一个字符不是斜杠 `/` )来从 URL 中提取参数
- 两个路由 `/:orderId` 和 `/:productName`，两者会匹配完全相同的 URL，所以我们需要一种方法(正则)来区分它们

```js
const routes = [
  // /:orderId -> 仅匹配数字
  { path: '/:orderId(\\d+)' },
  // /:productName -> 匹配其他任何内容
  { path: '/:productName' },
]
```

#### 3.1.2.2 可重复参数

- 用 `*`（0 个或多个）和 `+`（1 个或多个）将参数标记为可重复

```js
const routes = [
  // /:chapters ->  匹配 /one, /one/two, /one/two/three, 等
  { path: '/:chapters+' },
  // /:chapters -> 匹配 /, /one, /one/two, /one/two/three, 等
  { path: '/:chapters*' },
]
```

- 也可以通过在**右括号后**添加它们与自定义正则结合使用

```js
const routes = [
  // 仅匹配数字
  // 匹配 /1, /1/2, 等
  { path: '/:chapters(\\d+)+' },
  // 匹配 /, /1, /1/2, 等
  { path: '/:chapters(\\d+)*' },
]
```

#### 3.1.2.3 尾部/限定

- 默认情况下，路由不区分大小写，且能匹配带有尾部斜线的路由
- `/users` 将匹配 `/users`、`/users/`、甚至 `/Users/`

- 通过使用strict和sensitive来控制：
  - **sensitive** 大小写敏感 (default: false)
  - **strict** 末尾斜杠是否精确匹配 (default: false)
  - **end** 全局匹配 (default: true)
  - **start** 从开始位置展开匹配 (default: true)
  - **delimiter** 指定其他分隔符 (default: '/')
  - **endsWith** 指定标准的结束字符
  - **whitelist** 指定分隔符列表 (default: undefined, any character)

```js
{ path: '/users/:id', sensitive: true },
```

#### 3.1.2.4 可选参数

- 对于动态参数，可使用标识符来规定是否可选
- 语法：(后两种为可重复参数)
  - `?`：允许出现0或1次
  - `*`：允许出现0到n次
  - `+`：允许出现1到n次

```js
 { path: '/users/:userId?' },
```

### 3.1.3 嵌套路由

- 场景：
  - 一些应用程序的 UI 由多层嵌套的组件组成
  - URL 的片段通常对应于特定的嵌套组件结构

- 使用：在路由中配置 `children`

  - ```html
    <div id="app">
      <router-view></router-view>
    </div>
    ```

  - ```js
    const User = {
      template: `
        <div class="user">
          <h2>User {{ $route.params.id }}</h2>
          <router-view></router-view>
        </div>
      `,
    }
    ```

  - 将指定的组件渲染到user内部的router-view标签中(使用children)：

  - ```js
    const routes = [
      {
        path: '/user/:id',
        component: User,
        children: [
          {
            // 当 /user/:id/profile 匹配成功
            // UserProfile 将被渲染到 User 的 <router-view> 内部
            path: 'profile',
            component: UserProfile,
          },
          {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 将被渲染到 User 的 <router-view> 内部
            path: 'posts',
            component: UserPosts,
          },
        ],
      },
    ]
    ```

  - **以 `/` 开头的嵌套路径将被视为根路径。这允许利用组件嵌套，而不必使用嵌套的 URL**

  - 原理：`children` 配置只是另一个路由数组，就像 `routes` 本身一样

  - 默认路由：

    - 当路由匹配不到时，所呈现出来的默认的组件

    - 语法：提供给path一个空路径

    - ```js
      const routes = [
        {
          path: '/user/:id',
          component: User,
          children: [
            // 当 /user/:id 匹配成功
            // UserHome 将被渲染到 User 的 <router-view> 内部
            { path: '', component: UserHome },
      
            // ...其他子路由
          ],
        },
      ]
      ```

- 嵌套的命名路由：

  - 只给子路由命名：导航到 `/user/:id` 时始终显示嵌套路由

  - ```js
    const routes = [
      {
        path: '/user/:id',
        component: User,
        // 请注意，只有子路由具有名称
        children: [{ path: '', name: 'user', component: UserHome }],
      },
    ]
    ```

  - 父子路由都命名：导航到命名路由而不导航到嵌套路由

  - ```js
    const routes = [
      {
        path: '/user/:id',
        name: 'user-parent'
        component: User,
        children: [{ path: '', name: 'user', component: UserHome }],
      },
    ]
    ```

  - **重新加载页面将始终显示嵌套的子路由**

### 3.1.4 编程式导航

- 定义导航链接：

  - 使用 `<router-link>` 创建 a 标签
  - 借助 router 的实例方法

- **在 Vue 实例中，可以通过 `$router` 访问路由实例**

- 导航到不同位置：

  - 使用 `router.push` 方法

  - 这个方法会向 history 栈添加一个新的记录

  - 当用户点击浏览器后退按钮时，会回到之前的 URL

  - 当点击 `<router-link>` 时，内部会调用这个方法，所以点击 `<router-link :to="...">` 相当于调用 `router.push(...)`

  - `<router-link :to="...">`属于声明式，`router.push(...)`属于编程式

  - `router.push` 方法参数：

    - 一个字符串路径

    - ```js
      router.push('/users/eduardo')
      ```

    - 一个路径对象

    - ```js
      router.push({ path: '/users/eduardo' })
      ```

    - 一个命名路由(提供path会忽略params)

    - ```js
      router.push({ name: 'user', params: { username: 'eduardo' } })
      ```

    - 一个带查询参数的路径对象

    - ```js
      //结果是 /register?plan=private
      router.push({ path: '/register', query: { plan: 'private' } })
      ```

    - 一个带 hash的路径对象

    - ```js
      //结果是 /about#team
      router.push({ path: '/about', hash: '#team' })
      ```

  - 属性 `to` 与 `router.push` 接受的对象种类相同，规则完全相同

- 替换当前位置

  - 在导航时不会向 history 添加新记录——取代了当前的条目

  - 使用`router.replace()`方法

  - `<router-link :to="..." replace>`是声明式，`router.replace(...)`是编程式

  - 可直接在 `router.push` 的 `routeLocation` 中增加一个属性 `replace: true`

  - ```js
    router.push({ path: '/home', replace: true })
    // 相当于
    router.replace({ path: '/home' })
    ```

- 横跨历史

  - 在历史堆栈中前进或后退多少步

  - 使用`router.go()`方法

  - 使用整数作为参数

  - ```js
    // 向前移动一条记录，与 router.forward() 相同
    router.go(1)
    
    // 返回一条记录，与 router.back() 相同
    router.go(-1)
    
    // 前进 3 条记录
    router.go(3)
    
    // 如果没有那么多记录，静默失败
    router.go(-100)
    router.go(100)
    ```

### 3.1.5 命名路由

- 给路由一个name属性，实现不通过指定path来访问路由
- 优点：
  - 没有硬编码的 URL
  - `params` 的自动编码/解码。
  - 防止你在 url 中出现打字错误。
  - 绕过路径排序（如显示一个）

- 语法：

  - 定义：

  - ```js
    const routes = [
      {
        path: '/user/:username',
        name: 'user',
        component: User,
      },
    ]
    ```

  - 使用：

  - ```html
    <router-link :to="{ name: 'user', params: { username: 'erina' }}">
      User
    </router-link>
    ```

  - 路由将导航到路径 `/user/erina`

### 3.1.6 命名视图

- 应用场景：同级显示多个视图，而不是嵌套显示

- 语法：在`<router-view>`内设置name属性，未设置默认为default

- component属性变为`components`，内部匹配多个组件

- ```html
  <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
  <router-view class="view main-content"></router-view>
  <router-view class="view right-sidebar" name="RightSidebar"></router-view>
  ```

- ```js
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        components: {
          default: Home,
          // LeftSidebar: LeftSidebar 的缩写
          LeftSidebar,
          // 它们与 `<router-view>` 上的 `name` 属性匹配
          RightSidebar,
        },
      },
    ],
  })
  ```

- 嵌套命名视图

  - 多个路由同级嵌套在其他路由内

  - 语法：在children内部使用`components`：

  - ```html
    <!-- UserSettings.vue -->
    <div>
      <h1>User Settings</h1>
      <NavBar />
      <router-view />
      <router-view name="helper" />
    </div>
    ```

  - ```js
    {
      path: '/settings',
      // 也可以在顶级路由就配置命名视图
      component: UserSettings,
      children: [{
        path: 'emails',
        component: UserEmailsSubscriptions
      }, {
        path: 'profile',
        components: {
          default: UserProfile,
          helper: UserProfilePreview
        }
      }]
    }
    ```

### 3.1.7 重定向和别名

- 重定向

  - 通过 `routes` 配置来完成

  - ```js
    const routes = [{ path: '/home', redirect: '/' }]
    ```

  - 重定向的目标也可以是命名路由

  - ```js
    const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
    ```

  - 重定向的目标也可以是方法，动态返回

  - ```js
    const routes = [
      {
        // /search/screens -> /search?q=screens
        path: '/search/:searchText',
        redirect: to => {
          // 方法接收目标路由作为参数
          // return 重定向的字符串路径/路径对象
          return { path: '/search', query: { q: to.params.searchText } }
        },
      },
      {
        path: '/search',
        // ...
      },
    ]
    ```

  - 

- 相对重定向

  - 重定向到相对位置(同一路径下)

  - ```js
    const routes = [
      {
        // 将总是把/users/123/posts重定向到/users/123/profile。
        path: '/users/:id/posts',
        redirect: to => {
          // 该函数接收目标路由作为参数
          // 相对位置不以`/`开头
          // 或 { path: 'profile'}
          return 'profile'
        },
      },
    ]
    ```

- 别名：

  - 给路径path定义别名，当访问的路径是别名的时候，URL为别名，但是匹配的路由为path

  - 重定向是URL不变，匹配路由改变；别名是URL改变，匹配路由不变

  - 语法：`alias: '别名path'`

  - ```js
    const routes = [{ path: '/', component: Homepage, alias: '/home' }]
    ```

  - 使用别名以 `/` 开头，以使嵌套路径中的路径成为绝对路径(与父路径同级)

  - 可以用一个数组提供多个别名

  - ```js
    const routes = [
      {
        path: '/users/:id',
        component: UsersByIdLayout,
        children: [
          // 为这 3 个 URL 呈现 UserDetails
          // - /users/24
          // - /users/24/profile
          // - /24
          { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
        ],
      },
    ]
    ```

### 3.1.8 路由组件传参

- 问题：在组件中使用 `$route` 会与路由紧密耦合，限制了组件的灵活性，因为它只能用于特定的 URL

- 解决：通过 `props` 配置

- 原代码：

- ```js
  const User = {
    template: '<div>User {{ $route.params.id }}</div>'
  }
  const routes = [{ path: '/user/:id', component: User }]
  ```

- 使用props：

- ```js
  const User = {
    // 请确保添加一个与路由参数完全相同的 prop 名
    props: ['id'],
    template: '<div>User {{ id }}</div>'
  }
  const routes = [{ path: '/user/:id', component: User, props: true }]
  ```

- 布尔模式：

  -  `props` 设置为 `true` 时，`route.params` 将被设置为组件的 props

- 命名视图：

  - 必须为每个命名视图定义 `props` 配置：

  - ```js
    const routes = [
      {
        path: '/user/:id',
        components: { default: User, sidebar: Sidebar },
        props: { default: true, sidebar: false }
      }
    ]
    ```

- 对象模式：

  -  `props` 是一个对象时，它将原样设置为组件 props

  -  props 是静态的时候很有用

  - ```js
    const routes = [
      {
        path: '/promotion/from-newsletter',
        component: Promotion,
        props: { newsletterPopup: false }
      }
    ]
    ```

- 函数模式：

  - 可以创建一个返回 props 的函数

  - 这允许将参数转换为其他类型，将静态值与基于路由的值相结合等等

  - ```js
    const routes = [
      {
        path: '/search',
        component: SearchUser,
        props: route => ({ query: route.query.q })
      }
    ]
    ```

  - URL `/search?q=vue` 将传递 `{query: 'vue'}` 作为 props 传给 `SearchUser` 组件

### 3.1.9 历史记录模式

- `history` 配置允许我们在不同的历史模式中进行选择
- Hash模式：
  - 用 `createWebHashHistory()` 创建
  - 在内部传递的实际 URL 之前使用了一个哈希字符（`#`）
  - 这部分 URL 从未被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理
  - **在 SEO 中确实有不好的影响**
- HTML5模式：
  - 推荐使用
  - 用 `createWebHistory()` 创建
  - 使用这种历史模式，URL 看起来很 "正常"，例如 `https://example.com/user/id`
  - 问题：如果没有适当的服务器配置，用户在浏览器中直接访问 `https://example.com/user/id`，会得到一个 404 错误
  - 解决：在服务器上添加一个简单的回退路由：如果 URL 不匹配任何静态资源，它提供与你的应用程序中的 `index.html` 相同的页面

## 3.2 进阶

### 3.2.1 导航守卫

- 导航：路由正在发生跳转

- 通过跳转或取消的方式守卫导航

- 守卫方法参数：

  - **`to`**: 即将要进入的目标

  - **`from`**: 当前导航正要离开的路由

  - **`next`**: 可选参数，在任何给定的导航守卫中都被**严格调用一次**

    - 不声明next，默认允许用户访问每一个路由
    - 声明next，必须调用next()函数，否则不允许用户访问任何路由

  - ```js
    router.beforeEach((to, from, next) => {
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else next()
    })
    ```

- 守卫方法返回值：

  - `false`: 取消当前的导航
  - 一个路由地址: 通过一个路由地址跳转到一个不同的地址

- **全局前置守卫**

  - 在跳转前，所有路由配置的组件都会触发，验证是否符合跳转条件

  - 使用 `router.beforeEach` 注册全局前置守卫

  - ```js
    router.beforeEach(async (to, from) => {
       if (
         // 检查用户是否已登录
         !isAuthenticated &&
         // ❗️ 避免无限重定向
         to.name !== 'Login'
       ) {
         // 将用户重定向到登录页面
         return { name: 'Login' }
       }
     })
    ```

  - ```js
    router.beforeEach(async (to, from) => {
      // canUserAccess() 返回 `true` 或 `false`
      const canAccess = await canUserAccess(to)
      if (!canAccess) return '/login'
    })
    ```

  - 当一个导航触发时，全局前置守卫按照创建顺序调用

- **全局解析守卫**

  - 所有路由配置的组件都会触发

  - 在跳转前，**在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用**
  - 使用 `router.beforeResolve` 注册一个全局解析守卫
  - 获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置

- **全局后置守卫**

  - 所有路由配置的组件都会触发
  - 分析、更改页面标题、声明页面等辅助功能以及许多其他事情
  - 不会接受 `next` 函数，也不会改变导航本身

- **路由独享守卫**

  - 在路由配置上定义 `beforeEnter` 守卫

  - ```js
    const routes = [
      {
        path: '/users/:id',
        component: UserDetails,
        beforeEnter: (to, from) => {
          // reject the navigation
          return false
        },
      },
    ]
    ```

  - **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发

  - 从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`都不会触发

  - 可以将函数数组传递给 `beforeEnter`，实现重用守卫

  - ```js
    function removeQueryParams(to) {
      if (Object.keys(to.query).length)
        return { path: to.path, query: {}, hash: to.hash }
    }
    
    function removeHash(to) {
      if (to.hash) return { path: to.path, query: to.query, hash: '' }
    }
    
    const routes = [
      {
        path: '/users/:id',
        component: UserDetails,
        beforeEnter: [removeQueryParams, removeHash],
      },
      {
        path: '/about',
        component: UserDetails,
        beforeEnter: [removeQueryParams],
      },
    ]
    ```

- **组件内守卫**

  - 在路由组件内直接定义路由导航守卫(传递给路由配置的)

  - `beforeRouteEnter`：

    - 前置守卫
    - **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建
    - 以通过传一个回调给 `next` 来访问组件实例
    - **支持给 `next` 传递回调的唯一守卫**

  - `beforeRouteUpdate`：更新守卫

  - `beforeRouteLeave`：

    - 离开守卫
    - **离开守卫** 通常用来预防用户在还未保存修改前突然离开。该导航可以通过返回 `false` 来取消

  - ```js
    onst UserDetails = {
      template: `...`,
      beforeRouteEnter(to, from) {
        // 在渲染该组件的对应路由被验证前调用
        // 不能获取组件实例 `this` ！
        // 因为当守卫执行时，组件实例还没被创建！
      },
      beforeRouteUpdate(to, from) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
        // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
      },
      beforeRouteLeave(to, from) {
        // 在导航离开渲染该组件的对应路由时调用
        // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
      },
    }
    ```

  - 在组合API内使用：
    - 通过 `onBeforeRouteUpdate` 和 `onBeforeRouteLeave` 分别添加 update 和 leave 守卫

- 导航解析流程

  - 导航被触发。
  - 在失活的组件里调用 `beforeRouteLeave` 守卫。
  - 调用全局的 `beforeEach` 守卫。
  - 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
  - 在路由配置里调用 `beforeEnter`。
  - 解析异步路由组件。
  - 在被激活的组件里调用 `beforeRouteEnter`。
  - 调用全局的 `beforeResolve` 守卫(2.5+)。
  - 导航被确认。
  - 调用全局的 `afterEach` 钩子。
  - 触发 DOM 更新。
  - 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 3.2.2 路由元信息

- 使用场景：将任意信息附加到路由上，如过渡名称、谁可以访问路由

- 通过接收属性对象的`meta`属性来实现

- 在路由地址和导航守卫上都被访问到

-  **路由记录**：`routes` 配置中的每个路由对象

  - 路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配**多个**路由记录
  - 一个路由匹配到的所有路由记录会暴露为 `$route` 对象(还有在导航守卫中的路由对象)的`$route.matched` 数组

- 配置 `meta` 字段

- ```js
  const routes = [
    {
      path: '/posts',
      component: PostsLayout,
      children: [
        {
          path: 'new',
          component: PostsNew,
          // 只有经过身份验证的用户才能创建帖子
          meta: { requiresAuth: true }
        },
        {
          path: ':id',
          component: PostsDetail
          // 任何人都可以阅读文章
          meta: { requiresAuth: false }
        }
      ]
    }
  ]
  ```

- 访问`meta`字段

  - 遍历`$route.matched`数组来检查路由记录中的 `meta` 字段

  - Vue Router 还提供了一个 `$route.meta` 方法，它是一个非递归合并**所有 `meta`** 字段的（从父字段到子字段）的方法

  - ```js
    router.beforeEach((to, from) => {
      // 而不是去检查每条路由记录
      // to.matched.some(record => record.meta.requiresAuth)
      if (to.meta.requiresAuth && !auth.isLoggedIn()) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        return {
          path: '/login',
          // 保存我们所在的位置，以便以后再来
          query: { redirect: to.fullPath },
        }
      }
    })
    ```

- TS

  - 通过扩展 `RouteMeta` 接口来输入 meta 字段

  - ```js
    // typings.d.ts or router.ts
    import 'vue-router'
    
    declare module 'vue-router' {
      interface RouteMeta {
        // 是可选的
        isAdmin?: boolean
        // 每个路由都必须声明
        requiresAuth: boolean
      }
    }
    ```

### 3.2.3 数据获取

- 应用场景：进入某个路由后，需要从服务器获取数据
- 例如，在渲染用户信息时，你需要从服务器获取用户的数据
- 两种方式：
  - 导航完成前获取数：
    - 导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航
  - 导航完成后获取数据：
    - 先完成导航，然后在接下来的组件生命周期钩子中获取数据
    - 在数据获取期间显示“加载中”之类的指示
- 导航完成后获取数据：
  - 马上导航和渲染组件，然后在组件的 created 钩子中获取数据
  - 可以在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态
- 导航完成前获取数据：
  - 在导航转入新的路由前获取数据
  - 可以在接下来的组件的 `beforeRouteEnter` 守卫中获取数据，当数据获取成功后只调用 `next` 方法

### 3.2.4 组合式API

- 在set up中访问路由和当前路由

  - 使用 `useRouter` 函数

  - ```js
    import { useRouter, useRoute } from 'vue-router'
    
    export default {
      setup() {
        const router = useRouter()
        const route = useRoute()
    
        function pushWithQuery(query) {
          router.push({
            name: 'search',
            query: {
              ...route.query,
            },
          })
        }
      },
    }
    ```

  - `route` 对象是一个响应式对象，所以它的任何属性都可以被监听，但应该**避免监听整个 `route`** 对象。

  - ```js
    import { useRoute } from 'vue-router'
    import { ref, watch } from 'vue'
    
    export default {
      setup() {
        const route = useRoute()
        const userData = ref()
    
        // 当参数更改时获取用户信息
        watch(
          () => route.params.id,
          async newId => {
            userData.value = await fetchUser(newId)
          }
        )
      },
    }
    ```

  - 在模板中仍然可以访问 `$router` 和 `$route`，不需要在 `setup` 中返回 `router` 或 `route`

- 导航守卫

  - 组合式 API 守卫也可以用在任何由 `<router-view>` 渲染的组件中，它们不必像组件内守卫那样直接用在路由组件上

  - ```js
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
    import { ref } from 'vue'
    
    export default {
      setup() {
        // 与 beforeRouteLeave 相同，无法访问 `this`
        onBeforeRouteLeave((to, from) => {
          const answer = window.confirm(
            'Do you really want to leave? you have unsaved changes!'
          )
          // 取消导航并停留在同一页面上
          if (!answer) return false
        })
    
        const userData = ref()
    
        // 与 beforeRouteUpdate 相同，无法访问 `this`
        onBeforeRouteUpdate(async (to, from) => {
          //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
          if (to.params.id !== from.params.id) {
            userData.value = await fetchUser(to.params.id)
          }
        })
      },
    }
    ```

- useLink

  - 

### 3.2.5 过渡动效

- 应用场景：在路径组件上使用转场，并对导航进行动画处理

- 方法：使用`v-slot`和`transition`

- ```html
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  
  ```

- 单个路由的过渡

  - 将**`元信息`**和动态的 `name` 结合在一起，放在`<transition>` 上

  - ```html
    <router-view v-slot="{ Component, route }">
      <!-- 使用任何自定义过渡和回退到 `fade` -->
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    ```

  - ```js
    const routes = [
      {
        path: '/custom-transition',
        component: PanelLeft,
        meta: { transition: 'slide-left' },
      },
      {
        path: '/other-transition',
        component: PanelRight,
        meta: { transition: 'slide-right' },
      },
    ]
    ```

- 路由动态过渡

  - 根据目标路由和当前路由之间的关系，动态地确定使用的过渡

  - 可以添加一个 导航等待结果，根据路径的深度动态添加信息到 `meta` 字段

  - ```html
    <!-- 使用动态过渡名称 -->
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition">
        <component :is="Component" />
      </transition>
    </router-view>
    ```

  - ```js
    router.afterEach((to, from) => {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    })
    ```

- 强制在复用的视图之间进行过渡 

  - 问题：Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡

  - 解决：添加一个 `key` 属性来强制过渡

  - 这也允许在相同路由上使用不同的参数触发过渡

  - ```html
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    ```

### 3.2.6 滚动行为

- 应用场景：使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样

- **只在支持 history.pushState 的浏览器中可用**：

  - IE:10+ Firefox:4+ Chrome:5+ Safari:5+ Opera:11.5+ Android:4.3+ 

- 语法：创建一个 Router 实例时，提供一个 `scrollBehavior` 方法

  - `scrollBehavior` 函数接收 `to`和` from` 路由对象
  - 第三个参数 `savedPosition`，只有当这是一个 `popstate` 导航时才可用（由浏览器的后退/前进按钮触发）

- ```js
  onst router = createRouter({
    history: createWebHashHistory(),
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
    }
  })
  ```

- ```js
  //始终滚到顶部
  const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      // 始终滚动到顶部
      return { top: 0 }
    },
  })
  ```

- 也可以通过 `el` 传递一个 CSS 选择器或一个 DOM 元素

  - 此时`top` 和 `left` 将被视为该元素的相对偏移量

  - ```js
    const router = createRouter({
      scrollBehavior(to, from, savedPosition) {
        // 始终在元素 #main 上方滚动 10px
        return {
          // 也可以这么写
          // el: document.getElementById('main'),
          el: '#main',
          top: -10,
        }
      },
    })
    ```

- 返回一个 falsy 的值，或者是一个空对象，那么不会发生滚动

- 返回 `savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样

- ```js
  const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { top: 0 }
      }
    },
  })
  ```

- 滚动到锚点

- ```js
  const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }
    }
  })
  ```

- 延迟滚动

  - 应用场景：在页面中滚动之前稍作等待

  - 等待过渡结束后再滚动

  - ```js
    const router = createRouter({
      scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ left: 0, top: 0 })
          }, 500)
        })
      },
    })
    ```

  - 

### 3.2.7 路由懒加载



















# 4 Vuex和pinia状态管理

## 4.1 Vuex

- 专为 Vue.js 应用程序开发的**状态管理模式 + 库**
- 采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

### 4.1.1 状态管理

- 见**2.6.4状态管理**
- 使用vuex的情况：
  - 需要构建一个中大型单页应用，考虑如何更好地在组件外部管理状态

### 4.1.2 创建store

- 使用createStore()函数创建
- createStore()需要传入一个对象参数{}
- 对象参数主要包括**状态state**和**改变mutations**两个**对象**参数
- 状态state参数内定义状态
- 改变mutations参数内定义使状态改变的方法

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({ /* 根组件 */ })

// 将 store 实例作为插件安装
app.use(store)

```

- 使用创建好的store
  - 在 Vue 组件中访问 `this.$store` property，需要为 Vue 实例提供创建好的 store
  - Vuex 提供了一个从根组件向所有子组件，以 `store` 选项的方式“注入”该 store 的机制
  - 通过 `store.state` 来获取状态对象
  - 通过 `store.commit` 方法触发状态变更
  - 通过 `this.$store` 访问store实例

```js
//注册store
new Vue({
  el: '#app',
  store
})

//触发变更
store.commit('increment')
//获取状态
console.log(store.state.count) // -> 1
//在组件方法中进行触发变更和获取状态
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

### 4.1.3 状态state

#### 4.1.3.1 单一状态树

- 将所有需要管理的信息放到一个store里管理
- 每个应用将仅仅包含一个 store 实例
- 优点：
  - 能够直接地定位任一特定的状态片段
  - 在调试的过程中也能轻易地取得整个当前应用状态的快照

#### 4.1.3.2 在Vue组件中获得Vuex状态

- 在计算属性中返回状态(导致组件依赖全局状态单例)

```js
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

- 通过依赖注入：
  - 在根组件注册store，会自动注入给所有子组件
  - 子组件使用`Vue.use(Vuex)`来调用
  - 子组件通过`this.$store` 访问状态

```js
//根组件注册store
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
//子组件调用
Vue.use(Vuex)
const Counter = {
  template: `<div>{{ count }}</div>`,
    //子组件访问
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

#### 4.1.3.3 mapState函数

- 语法糖：

  - 组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余
  - 使用mapState函数生成计算属性，减少代码

- 语法：

  - 引入mapState
  - 计算属性为mapState()函数：**computed: mapState()**
  - 传入状态对象(三种方法)：
    - count: 'count'：映射 this.count 为 store.state.count的值
    - name: (state) => state.name：映射 this.name 为 store.state.name的值
    - count: function (state) {return this.count + state.count}： 用普通函数this指向vue实例(箭头函数中this不指向vue实例)

  ```js
  import { mapState } from 'vuex'
  
  export default {
    computed: mapState({
  
      // 传字符串参数 'count' 等同于 `state => state.count`
      count: 'count',
        
      // 箭头函数可使代码更简练
      count: state => state.count,
  
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      count (state) {
        return this.count + state.count
      }
    })
  }
  ```

  - 传入数组：映射的计算属性的名称与 state 的子节点名称相同

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

#### 4.1.3.4 对象展开运算符

- 使用展开运算符把mapState函数的返回值展开为各个对象
- 通过这个操作把组件自己的计算属性状态和mapState函数传递的计算属性状态合并为一个返回值对象
- 从而实现局部计算属性和mapState共存

- 语法：...mapState({})

```js
computed: {
  localComputed () { /* 局部计算属性 */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
	count,
  })
}
```

#### 4.1.3.5 组件保存局部状态

- 有些状态严格属于单个组件，最好还是作为组件的局部状态，不放入Vuex

### 4.1.4 Getters

- 从store中派生一些状态，类似对状态过滤
- 问题：多个组件需要用到此属性，无论是复制这个函数，或者抽取到一个共享函数然后在多处导入，都十分麻烦
- 解决：在 store 中定义“getter”(相当于计算属性)
- getters可接收其他getters作为参数
- 语法：
  - getters: { getters名 : 参数 => 返回函数 }
  - 参数包括state和可选参数getters
  - 返回函数以花括号包裹：getters: { getters名 : 参数 => 返回函数{} }
  - 返回函数可以带有参数：getters: { getters名 : 参数 => 返回函数 (参数) => {} }

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 4.1.4.1 通过属性访问

- Getter 会暴露为 `store.getters` 对象，可以以属性的形式访问

```js
store.getters.doneTodos
```

- getter 在通过属性访问时是**作为 Vue 的响应式系统的一部分缓存其中**的

#### 4.1.4.2 通过方法访问

- 通过让 getter 返回一个函数，实现给 getter 传参

#### 4.1.4.3 mapGetters函数

- 将store中的计算属性getters映射到组件的局部计算属性中
- 可通过展开运算符混入局部计算属性

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

### 4.1.5 Mutations

- 更改 Vuex 的 store 中的状态的唯一方法
- 类似于事件：
  - 每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**
  - 回调函数进行状态更改，且会接受 state 作为第一个参数

```js
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

- 不可直接调用回调函数，必须通过调用 **store.commit** 方法：

```js
store.commit('increment')
```

- 提交载荷
  - 载荷：额外传入的参数
  - 大多时候载荷是一个对象

```js
store.commit('increment', {
  amount: 10
})
```

- 提交方式(对象风格)

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

- Mutation 需遵守 Vue 的响应规则
  - 最好提前在 store 中初始化好所有所需属性
  - 需要在对象上添加新属性时，应该
    - 使用 `Vue.set(obj, 'newProp', 123)`
    - 以新对象替换老对象
- 使用常量代替Mutations事件类型
  - 可以使 linter 之类的工具发挥作用
  - 把常量放在单独的文件中可以让代码合作者对整个 app 包含的 mutation 一目了然

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = createStore({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

- Mutations必须是同步函数
- 在组件中提交Mutations
  - 使用 `this.$store.commit('xxx')` 提交 mutation
  - 使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' 
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### 4.1.6 Action

- 类似于mutations
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意**异步**操作
- 语法：action: { 函数名(接收对象) {函数主体} }

- Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
- 可以调用 `context.commit` 提交一个 mutation
- 可以通过 `context.state` 和 `context.getters` 来获取 state 和 getters

```js
const store = new Vuex.Store({
  //定义state
    state: {
    count: 0
  },
  //定义mutations
  mutations: {
    increment (state) {
      state.count++
    }
  },
  //定义actions
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

- 通过参数解构简化代码

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

- 分发Action：

  - 类似mutations的提交，通过分发调用Action

  - 通过 `store.dispatch` 方法触发

  - Actions 支持同样的载荷方式和对象方式进行分发

```js
store.dispatch('increment')
```

- 在组件中分发Action
  - 使用 `this.$store.dispatch('xxx')` 分发 action，
  - 使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用
  - 语法同mutations

- 组合多个Action处理复杂异步

  - `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise

  - 并且 `store.dispatch` 仍旧返回 Promise

  - ```js
    actions: {
      actionA ({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('someMutation')
            resolve()
          }, 1000)
        })
      }
    }
    ```

  - 在分发时可以通过then()继续分发

  - ```js
    store.dispatch('actionA').then(() => {
      // ...
    })
    ```

  - 在另一个Action中可以

  - ```js
    actions: {
      // ...
      actionB ({ dispatch, commit }) {
        return dispatch('actionA').then(() => {
          commit('someOtherMutation')
        })
      }
    }
    ```

  - 利用async/await

  - ```js
    // 假设 getData() 和 getOtherData() 返回的是 Promise
    
    actions: {
      async actionA ({ commit }) {
        commit('gotData', await getData())
      },
      async actionB ({ dispatch, commit }) {
        await dispatch('actionA') // 等待 actionA 完成
        commit('gotOtherData', await getOtherData())
      }
    }
    ```

### 4.1.7 Mouules

- 问题：
  - 使用单一状态树，应用的所有状态会集中到一个比较大的对象
  - 当应用变得非常复杂时，store 对象就有可能变得相当臃肿
- 解决：
  - Vuex 允许我们将 store 分割成**模块（module）**
  - 每个模块拥有自己的 state、mutation、action、getter、嵌套子模块

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

- 局部状态：
  - 对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**
  - 对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`
  - 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

#### 4.1.7.1 命名空间：

- 默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的
- 这样使得多个模块能够对同一 mutation 或 action 作出响应
- 可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块
- 它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名

```js
const store = createStore({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

- 访问全局内容
  - `rootState` 和 `rootGetters` 
  - 会作为第三和第四参数传入 getter
  - 会通过 `context` 对象的属性传入 action
- 在全局命名空间内分发 action 或提交 mutation，
  - 将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

- 注册全局Action
  - 在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

- 绑定函数

  - 直接写出路径

  - ```js
    computed: {
      ...mapState({
        a: state => state.some.nested.module.a,
        b: state => state.some.nested.module.b
      })
    },
    methods: {
      ...mapActions([
        'some/nested/module/foo', // -> this['some/nested/module/foo']()
        'some/nested/module/bar' // -> this['some/nested/module/bar']()
      ])
    }
    ```

  - 通过传参

  - ```js
    computed: {
      ...mapState('some/nested/module', {
        a: state => state.a,
        b: state => state.b
      })
    },
    methods: {
      ...mapActions('some/nested/module', [
        'foo', // -> this.foo()
        'bar' // -> this.bar()
      ])
    }
    ```

  - 通过`createNamespacedHelpers` 创建基于某个命名空间辅助函数

  - ```js
    import { createNamespacedHelpers } from 'vuex'
    
    const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
    
    export default {
      computed: {
        // 在 `some/nested/module` 中查找
        ...mapState({
          a: state => state.a,
          b: state => state.b
        })
      },
      methods: {
        // 在 `some/nested/module` 中查找
        ...mapActions([
          'foo',
          'bar'
        ])
      }
    }
    ```

#### 4.1.7.2 模块动态注册

- 使用 `store.registerModule` 方法注册模块
- 通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态
- 通过 `store.hasModule(moduleName)` 方法检查该模块是否已经被注册到 store
- 使用 `store.unregisterModule(moduleName)` 来动态卸载模块(不能卸载静态模块创建 store 时声明的模块)

```js
import Vuex from 'vuex'

const store = createStore({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

- 保留state：
  - 注册一个新 module 时，有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state
  - 通过 `preserveState` 选项将其归档：
  - `store.registerModule('a', module, { preserveState: true })`
  - 设置 `preserveState: true` 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会

#### 4.1.7.3 模块重用

- 使用一个函数来声明模块状态

### 4.1.8 项目结构

- 应用层级的状态应该集中到单个 store 对象中。
- 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
- 异步逻辑都应该封装到 **action** 里面。

### 4.1.9 组合式API

- 调用 `useStore` 函数，来在 `setup` 钩子函数中访问 store

```js
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
  }
}
```

- 访问 state 和 getter，
  - 需要创建 `computed` 引用以保留响应性
  - 与选项式 API 中创建计算属性等效

```js
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // 在 computed 函数中访问 state
      count: computed(() => store.state.count),

      // 在 computed 函数中访问 getter
      double: computed(() => store.getters.double)
    }
  }
}
```

- 访问 mutation 和 action 
  - 在 `setup` 钩子函数中调用 `commit` 和 `dispatch` 函数

```js
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // 使用 mutation
      increment: () => store.commit('increment'),

      // 使用 action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    }
  }
}
```

### 4.1.10 插件

- store 接受 `plugins` 选项，这个选项暴露出每次 mutation 的钩子

```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```

- 使用

```js
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

- 插件中**不允许直接修改状态**——类似于组件，只能通过提交 mutation 来触发变化
- 对状态对象进行深拷贝，获得状态的“快照”，比较改变的前后状态

```js
const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)

    // 比较 prevState 和 nextState...

    // 保存状态，用于下一次 mutation
    prevState = nextState
  })
}
```

- **生成状态快照的插件应该只在开发阶段使用**，使用 webpack 或 Browserify，让构建工具帮我们处理

```js
const store = new Vuex.Store({
  // ...
  plugins: process.env.NODE_ENV !== 'production'
    ? [myPluginWithSnapshot]
    : []
})
```

- 内置Logger插件
  - 日志插件，用于一般的调试
  - 可以直接通过 `<script>` 标签引入，它会提供全局方法 `createVuexLogger`

```js
import createLogger from 'vuex/dist/logger'

const store = new Vuex.Store({
  plugins: [createLogger()]
})
```

```js
const logger = createLogger({
  collapsed: false, // 自动展开记录的 mutation
  filter (mutation, stateBefore, stateAfter) {
    // 若 mutation 需要被记录，就让它返回 true 即可
    // 顺便，`mutation` 是个 { type, payload } 对象
    return mutation.type !== "aBlocklistedMutation"
  },
  actionFilter (action, state) {
    // 和 `filter` 一样，但是是针对 action 的
    // `action` 的格式是 `{ type, payload }`
    return action.type !== "aBlocklistedAction"
  },
  transformer (state) {
    // 在开始记录之前转换状态
    // 例如，只返回指定的子树
    return state.subTree
  },
  mutationTransformer (mutation) {
    // mutation 按照 { type, payload } 格式记录
    // 我们可以按任意方式格式化
    return mutation.type
  },
  actionTransformer (action) {
    // 和 `mutationTransformer` 一样，但是是针对 action 的
    return action.type
  },
  logActions: true, // 记录 action 日志
  logMutations: true, // 记录 mutation 日志
  logger: console, // 自定义 console 实现，默认为 `console`
})
```

### 4.1.11 严格模式

- 开启严格模式，仅需在创建 store 的时候传入 `strict: true`
- 无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
- **不要在发布环境下启用严格模式**

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```

- 让构建工具处理

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

### 4.1.12 表单处理

- 问题：v-model修改状态不是通过 mutation 函数，严格模式下会抛出错误
- 双向绑定计算属性：
  - 使用带有 setter 的双向绑定计算属性

```html
<input v-model="message">
```

```js
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```



## 4.2 Pinia

- 和Vuex的区别：
  - 无mutations
  - 完美支持TS
  - 无需注入
  - 默认Store都是动态的
  - 无modules嵌套结构，可导入其他Store隐式嵌套
  - 默认都有命名空间

### 4.2.1 初始化

- 创建pinia（根存储）并将其传递给应用程序

```js
import { createPinia } from 'pinia'

app.use(createPinia())
```

### 4.2.2 Store

- Store就是**托管全局状态**的一个实体
- 包含**三个概念**：
  - state
  - getters
  - actions

- 定义Store

  - 使用 `defineStore()` 定义的，并且它需要一个**唯一**名称，作为第一个参数传递

  - ```js
    import { defineStore } from 'pinia'
    
    // useStore 可以是 useUser、useCart 之类的任何东西
    // 第一个参数是应用程序中 store 的唯一 id
    export const useStore = defineStore('main', {
      // other options...
    })
    ```

- 使用Store

  - 在 `setup()` 中调用 `useStore()` 之前不会创建 store

```js
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // 您可以返回整个 store 实例以在模板中使用它
      store,
    }
  },
}
```

- 可以根据需要定义任意数量的 store
- 应该在不同的文件中定义每个 store
- store 被实例化后，可直接在 store 上访问 `state`、`getters` 和 `actions` 中定义的任何属性
- `store` 是一个用`reactive` 包裹的对象，不需要在getter 之后写`.value`，**不能对其进行解构**
- 从 Store 中提取属性同时保持其响应式，需要使用`storeToRefs()` ，它将为任何响应式属性创建 refs

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` 和 `doubleCount` 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name, doubleCount } = storeToRefs(store)

    return {
      name,
      doubleCount
    }
  },
})
```

### 4.2.3 State

- stats是返回初始状态的函数

- 访问state：

  - 通过 `store` 实例访问状态来直接读取和写入状态

  - ```js
    const store = useStore()
    
    store.counter++
    ```

- 重置状态：

  - 调用 store 上的 `$reset()` 方法将状态重置到其初始值

  - ```js
    const store = useStore()
    
    store.$reset()
    ```

- 状态映射：

  - 使用set up()：直接返回

  - ```js
    import { useCounterStore } from '../stores/counterStore'
    
    export default {
      setup() {
        const counterStore = useCounterStore()
    	//直接返回状态
        return { counterStore }
      },
      computed: {
          //调用
        tripleCounter() {
          return counterStore.counter * 3
        },
      },
    }
    ```

  - 不使用set up()：computed内使用mapState辅助，映射为只读属性

  - mapState参数：

    - 参数1：使用的store

    - 参数2：映射对象：
      - 键：映射命名

      - 值：对应store中的getter名

  - ```js
    import { mapState } from 'pinia'
    import { useCounterStore } from '../stores/counterStore'
    
    export default {
      computed: {
        // 允许访问组件内部的 this.counter
        // 与从 store.counter 读取相同
        ...mapState(useCounterStore, {
          myOwnName: 'counter',
          // 您还可以编写一个访问 store 的函数
          double: store => store.counter * 2,
          // 它可以正常读取“this”，但无法正常写入...
          magicValue(store) {
            return store.someGetter + this.counter + this.double
          },
        }),
      },
    }
    ```

  - 可修改状态：使用 `mapWritableState()` 代替`mapState()`

  - ```js
    import { mapWritableState } from 'pinia'
    import { useCounterStore } from '../stores/counterStore'
    
    export default {
      computed: {
        // 允许访问组件内的 this.counter 并允许设置它
        // this.counter++
        // 与从 store.counter 读取相同
        ...mapWritableState(useCounterStore, ['counter'])
        // 与上面相同，但将其注册为 this.myOwnName
        ...mapWritableState(useCounterStore, {
          myOwnName: 'counter',
        }),
      },
    }
    ```

- 改变状态：

  - 直接用 `store.counter++` 修改 store

  - 调用 `$patch` 方法(修改多个状态)

    - 问题：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合

  - ```js
    store.$patch({
      counter: store.counter + 1,
      name: 'Abalam',
    })
    ```

  - `$patch` 方法也接受一个函数来批量修改集合内部分对象的情况(可包含逻辑计算语句)

  - ```js
    cartStore.$patch((state) => {
      state.items.push({ name: 'shoes', quantity: 1 })
      state.hasChanged = true
    })
    ```

  - 使用action

- 替换state

  - 通过将其 `$state` 属性设置为新对象来替换 Store 的整个状态

  - ```js
    store.$state = { counter: 666, name: 'Paimon' }
    ```

  - 通过更改 `pinia` 实例的 `state` 来替换应用程序的整个状态(在SSR for hydration期间使用)

  - ```js
    pinia.state.value = {}
    ```

- 订阅状态

  - 通过 store 的 `$subscribe()` 方法查看状态及其变化

  -  与常规的 `watch()` 相比，使用 `$subscribe()` 的优点是 *subscriptions* 只会在 patches 之后触发一次

  - ```js
    cartStore.$subscribe((mutation, state) => {
      // import { MutationType } from 'pinia'
      mutation.type // 'direct' | 'patch object' | 'patch function'
      // 与 cartStore.$id 相同
      mutation.storeId // 'cart'
      // 仅适用于 mutation.type === 'patch object'
      mutation.payload // 补丁对象传递给 to cartStore.$patch()
    
      // 每当它发生变化时，将整个状态持久化到本地存储
      localStorage.setItem('cart', JSON.stringify(state))
    })
    ```

  - 默认情况下，*state subscriptions* 绑定到添加它们的组件（如果 store 位于组件的 `setup()` 中）

  -  当组件被卸载时，它们将被自动删除

  -  要在卸载组件后保留它们，需要把 `{ detached: true }` 作为第二个参数传递给 *detach* 当前组件的 *state subscription*

  - ```js
    export default {
      setup() {
        const someStore = useSomeStore()
    
        // 此订阅将在组件卸载后保留
        someStore.$subscribe(callback, { detached: true })
    
        // ...
      },
    }
    ```

### 4.2.4 Getters

- 完全等同于 Store 状态的计算值
- 用来处理不想改变但是也不想完全展示出来的状态
- 用 `defineStore()` 中的 `getters` 属性定义
- 使用this指向整个store实例
- 具有缓存特性
- 参数：
  - 参数1：状态，作为getters的依赖

- 定义常规函数时
  - 如果通过 `this` 访问到 整个 store 的实例 **需要定义返回类型**
  - **不会影响使用箭头函数定义的 getter，也不会影响不使用 `this` 的 getter**


- 访问getters：

  - 在组件中实例化store，可直接使用store.getter来访问

- getter内访问其他getter：

  - 通过`this`指向其他getter

- 给getter传参：

  - 通过返回一个函数来给getter传参

  - 此时getter不会缓存，只是调用函数

  - ```js
    export const useStore = defineStore('main', {
      getters: {
        getUserById: (state) => {
          return (userId) => state.users.find((user) => user.id === userId)
        },
      },
    })
    ```

  - ```html
    <script>
    export default {
      setup() {
        const store = useStore()
    
        return { getUserById: store.getUserById }
      },
    }
    </script>
    
    <template>
      <p>User 2: {{ getUserById(2) }}</p>
    </template>
    ```

  - 由于不缓存，可在getter内部缓存一些结果

  - ```js
    export const useStore = defineStore('main', {
      getters: {
        getActiveUserById(state) {
            //内部缓存
          const activeUsers = state.users.filter((user) => user.active)
          return (userId) => activeUsers.find((user) => user.id === userId)
        },
      },
    })
    ```

- 访问其他store的getter

  - 导入其他store并实例化，通过实例.getter访问

  - ```js
    import { useOtherStore } from './other-store'
    
    export const useStore = defineStore('main', {
      state: () => ({
        // ...
      }),
      getters: {
        otherGetter(state) {
          const otherStore = useOtherStore()
          return state.localData + otherStore.data
        },
      },
    })
    ```

- 使用set up()

  - 可直接通过实例.getter来访问getter

- 使用选项式API

  - 无set up() ：使用...mapState映射

### 4.2.5 Actions

- 相当于组件的method
- 使用 `defineStore()` 中的 `actions` 属性定义
- 可通过this访问整个store
- 支持异步
- 可以完全自由地设置任何参数并返回任何东西：调用 Action 时，会自动推断
- 内部访问其他action：
  - 导入其他store并实例化，通过实例.action访问
- set up()：
  - 可直接通过实例.action来访问action

- 选项式API

  - 不使用set up()：使用...mapActions映射：

  - ```js
    import { mapActions } from 'pinia'
    import { useCounterStore } from '../stores/counterStore'
    
    export default {
      methods: {
        ...mapActions(useCounterStore, ['increment'])
        
        ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
      },
    }
    ```

- 订阅Actions：

  - 使用 `store.$onAction()` 订阅 action 及其结果

  - 传递给它的回调在 action 之前执行

  - `after` 处理 Promise 并允许您在 action 完成后执行函数

  - `onError` 允许您在处理中抛出错误

  - ```js
    const unsubscribe = someStore.$onAction(
      ({
        name, // action 的名字
        store, // store 实例
        args, // 调用这个 action 的参数
        after, // 在这个 action 执行完毕之后，执行这个函数
        onError, // 在这个 action 抛出异常的时候，执行这个函数
      }) => {
        // 记录开始的时间变量
        const startTime = Date.now()
        // 这将在 `store` 上的操作执行之前触发
        console.log(`Start "${name}" with params [${args.join(', ')}].`)
    
        // 如果 action 成功并且完全运行后，after 将触发。
        // 它将等待任何返回的 promise
        after((result) => {
          console.log(
            `Finished "${name}" after ${
              Date.now() - startTime
            }ms.\nResult: ${result}.`
          )
        })
    
        // 如果 action 抛出或返回 Promise.reject ，onError 将触发
        onError((error) => {
          console.warn(
            `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
          )
        })
      }
    )
    
    // 手动移除订阅
    unsubscribe()
    ```

  - 默认情况下，*action subscriptions* 绑定到添加它们的组件（如果 store 位于组件的 `setup()` 内）

  -  当组件被卸载时，它们将被自动删除

  -  如果要在卸载组件后保留它们，将 `true` 作为第二个参数传递给当前组件的 *detach* *action subscription*

### 4.2.6 插件

- pinia插件是一个**函数**

- 可选择返回要添加到 store 的属性：需要一个可选参数，一个 *context*

- 插件仅适用于**在将`pinia`传递给应用程序后创建的 store **

- 使用插件：使用 `pinia.use()` 将插件添加到 pinia 实例

- ```js
  import { createPinia } from 'pinia'
  
  // 为安装此插件后创建的每个store添加一个名为 `secret` 的属性
  // 这可能在不同的文件中
  function SecretPiniaPlugin() {
    return { secret: 'the cake is a lie' }
  }
  
  const pinia = createPinia()
  // 将插件提供给 pinia
  pinia.use(SecretPiniaPlugin)
  
  // 在另一个文件中
  const store = useStore()
  store.secret // 'the cake is a lie'
  ```

- 扩充store：

  - 在插件中返回对象，为每个 store 添加属性：

  - ```js
    pinia.use(() => ({ hello: 'world' }))
    ```

  - 直接在 `store` 上设置属性

  - ```js
    pinia.use(({ store }) => {
      store.hello = 'world'
    })
    ```

  - 插件的任何属性 *returned* 都会被devtools自动跟踪,为了让`hello`在devtools中可见

  - 如果想调试，应确保将它添加到`store._customProperties`**仅在开发模式** 开发工具

  - ```js
    pinia.use(({ store }) => {
      store.hello = 'world'
      // 确保您的打包器可以处理这个问题。 webpack 和 vite 应该默认这样做
      if (process.env.NODE_ENV === 'development') {
        // 添加您在 store 中设置的任何 keys
        store._customProperties.add('hello')
      }
    })
    ```

  - 每个 store 都使用 `reactive`包装，自动展开任何 Ref (`ref()`, `computed()` ， ...）

  - 所以可以在没有 `.value` 的情况下访问所有计算属性以及它们是响应式

- 添加新状态

  - 在 `store` 上添加，可以使用 `store.myState` 访问

  - 在 `store.$state` 上添加，可以在 devtools 中使用，并且**在 SSR 期间被序列化**

  - 可共享 `ref` 或 `computed` 属性

  - ```js
    const globalSecret = ref('secret')
    pinia.use(({ store }) => {
      // `secret` 在所有 store 之间共享
      store.$state.secret = globalSecret
      store.secret = globalSecret
      // 它会自动展开
      store.secret // 'secret'
    
      const hasError = ref(false)
      store.$state.hasError = hasError
      // 这个必须始终设置
      store.hasError = toRef(store.$state, 'hasError')
    
      // 在这种情况下，最好不要返回 `hasError`，因为它
      // 将显示在 devtools 的 `state` 部分
      // 无论如何，如果我们返回它，devtools 将显示它两次。
    })
    ```

  - 插件中发生的状态更改或添加（包括调用`store.$patch()`）发生在存储处于活动状态之前，**不会触发任何订阅**

- 添加新外部属性

  - 添加外部属性、来自其他库的类实例或仅仅是非响应式的东西时，应该在将对象传递给 pinia 之前使用 `markRaw()` 包装对象

  - ```js
    import { markRaw } from 'vue'
    // 根据您的路由所在的位置进行调整
    import { router } from './router'
    
    pinia.use(({ store }) => {
      store.router = markRaw(router)
    })
    ```

- 调用$subscribe

  - ```js
    pinia.use(({ store }) => {
      store.$subscribe(() => {
        // 在存储变化的时候执行
      })
      store.$onAction(() => {
        // 在 action 的时候执行
      })
    })
    ```

- 添加新选项：

  - 在定义 store 时创建新选项，以便以后从插件中使用它们

### 4.2.7 使用TS

- 引入pinia：

  - ```js
    import { PiniaPluginContext } from 'pinia'
    
    export function myPiniaPlugin(context: PiniaPluginContext) {
      // ...
    }
    ```

- 引入新store属性：

  - 向 store 添加新属性时，应该扩展 `PiniaCustomProperties` 接口

  - ```js
    import 'pinia'
    
    declare module 'pinia' {
      export interface PiniaCustomProperties {
        // 通过使用 setter，我们可以同时允许字符串和引用
        set hello(value: string | Ref<string>)
        get hello(): string
    
        // 你也可以定义更简单的值
        simpleNumber: number
      }
    }
    ```

  - 使用新属性

  - ```js
    pinia.use(({ store }) => {
      store.hello = 'Hola'
      store.hello = ref('Hola')
    
      store.number = Math.random()
      // @ts-expect-error: we haven't typed this correctly
      store.number = ref(Math.random())
    })
    ```

- 引入新状态

  - 添加新的状态属性（`store` 和 `store.$state`）时，您需要将类型添加到 `PiniaCustomStateProperties`

  - 与 `PiniaCustomProperties` 不同，它只接收 `State` 泛型

  - ```js
    import 'pinia'
    
    declare module 'pinia' {
      export interface PiniaCustomStateProperties<S> {
        hello: string
      }
    }
    ```

- 引入新创建选项

  - 为 `defineStore()` 创建新选项时，应该扩展 `DefineStoreOptionsBase`。

  -  与 `PiniaCustomProperties` 不同，它只公开了两个泛型：

    - State 和 Store 类型，允许限制可以定义的内容

  - ```js
    import 'pinia'
    
    declare module 'pinia' {
      export interface DefineStoreOptionsBase<S, Store> {
        // 允许为任何操作定义毫秒数
        debounce?: Partial<Record<keyof StoreActions<Store>, number>>
      }
    }
    ```

  - `StoreGetters` 类型可以从 Store 类型中提取 *getters*。 您还可以通过分别扩展 `DefineStoreOptions` 和 `DefineSetupStoreOptions` 类型来扩展 *setup stores* 或 *option stores* **only** 的选项。

- Nuxt.js：当在 Nuxt 使用 pinia时，必须先创建一个 Nuxt 插件. 访问 `pinia` 实例

- ```js
  // plugins/myPiniaPlugin.js
  import { PiniaPluginContext } from 'pinia'
  import { Plugin } from '@nuxt/types'
  
  function MyPiniaPlugin({ store }: PiniaPluginContext) {
    store.$subscribe((mutation) => {
      // 在存储变化的时候执行
      console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
    })
  
    return { creationTime: new Date() }
  }
  
  const myPlugin: Plugin = ({ pinia }) {
    pinia.use(MyPiniaPlugin);
  }
  export default myPlugin
  ```

### 4.2.8 使用外部储存

- Pinia store 依靠 `pinia` 实例在所有调用中共享同一个 store 实例

-  大多数情况下，只需调用“useStore()”函数即可开箱即用

- 在组件外，`useStore()` 注入`app` 的`pinia` 实例。

- 这意味着如果 `pinia` 实例无法自动注入，必须手动将其提供给 `useStore()` 函数

- 解决：

- 单页面程序：

  - 没有进行任何 SSR（服务器端渲染），则在使用 `app.use(pinia)` 安装 pinia 插件后，任何`useStore()` 调用都将起作用

  - ```js
    import { useUserStore } from '@/stores/user'
    import { createApp } from 'vue'
    import App from './App.vue'
    
    // ❌  失败，因为它是在创建 pinia 之前调用的
    const userStore = useUserStore()
    
    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)
    
    // ✅ 有效，因为 pinia 实例现在处于活动状态
    const userStore = useUserStore()
    ```

  - 确保始终应用此功能的最简单方法是延迟调用 `useStore()`

  - 方法是将它们放在安装 pinia 后始终运行的函数中

  - ```js
    import { createRouter } from 'vue-router'
    const router = createRouter({
      // ...
    })
    
    // ❌ 根据导入的顺序，这将失败
    const store = useStore()
    
    router.beforeEach((to, from, next) => {
      // 我们想在这里使用 store 
      if (store.isLoggedIn) next()
      else next('/login')
    })
    
    router.beforeEach((to) => {
      // ✅ 这将起作用，因为路由器在之后开始导航
       // 路由已安装，pinia 也将安装
      const store = useStore()
    
      if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
    })
    ```

- 服务器渲染

  - 处理服务器端渲染时，必须将 `pinia` 实例传递给 `useStore()`。
  - 这可以防止 pinia 在不同的应用程序实例之间共享全局状态

### 4.2.9 服务器渲染

- Vue和Vite

  - 在 `setup` 函数、`getters` 和 `actions` 的顶部调用 `useStore()` 函数，

  - 使用 Pinia 创建商店可以立即用于 SSR

  - ```js
    export default defineComponent({
      setup() {
        // 这是有效的，因为 pinia 知道里面运行的是什么应用程序
        // `setup()`
        const main = useMainStore()
        return { main }
      },
    })
    ```

  - 在其他地方使用商店，则需要将 `pinia` 实例 传递给 `useStore()` 函数调用

  - ```js
    const pinia = createPinia()
    const app = createApp(App)
    
    app.use(router)
    app.use(pinia)
    
    router.beforeEach((to) => {
      // ✅ 这将确保正确的商店用于
      // 当前运行的应用
      const main = useMainStore(pinia)
    
      if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
    })
    ```

  - Pinia 可将自身作为 `$pinia` 添加到应用程序中，以便在诸如 `serverPrefetch()` 之类的函数中使用它

  - ```js
    export default {
      serverPrefetch() {
        const store = useStore(this.$pinia)
      },
    }
    ```





















# 5 Typescript

- 添加了类型系统的 JavaScript，适用于任何规模的项目
- 可以和 JavaScript 共存

## 5.1 类型

### 5.1.1 基本类型

#### 5.1.1.1 原始数据类型

- 布尔值：**`boolean`是JavaScript中的基本类型，而`Boolean`是JavaScript中的构造函数**
- 数值
- 字符串
- null：**用`void`表示没有任何返回值的函数**
- undefined：**undefined 和 null 是所有类型的子类型。undefined类型的变量，可以赋值给number类型的变量**
-  ES6 中的新类型 Symbol 
-  ES10 中的新类型 BigInt。

#### 5.1.1.2 任意值Any

- 任意值`Any`用来表示允许赋值为任意类型

```js
//不报错
let age:any = 100;

age = 'lxl'
```

- 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
- 变量在声明的时候未指定其类型，那么它会被识别为任意值类型

#### 5.1.1.3 类型书写方式

- 语法：
  - **变量声明关键字 空格 变量名 冒号: 类型 [赋值等号 值]**
  - let age:any = 100;
  - let age:any;

#### 5.1.1.4 类型推论

- TS在**没有明确指定类型**的时候，根据**赋值的数据类型**推测出一个指定类型
- 定义的时候没有赋值，不管之后有没有赋值，都会被推断成`any`类型而完全不被类型检查

#### 5.1.1.5 联合类型

- 表示取值可以为**多种类型中的一种**，可理解为自定义的any
- 语法：
  - **变量声明关键字 空格 变量名 冒号: 类型 分隔符| 类型 [赋值等号 值]**
  - let age:string | number = 100;

### 5.1.2 引用类型

#### 5.1.2.1 对象类型

- 使用接口来指定对象的属性的类型
- 
  - 定义变量时指定变量为该对象类型
  - 定义变量时根据接口书写属性，**顺序和个数必须一致**
- 传递变量给函数时使用对象接口来检查变量类型是否正确

```ts
//使用接口来指定对象的属性的类型
interface Person {
  name: string;
  age: number;
}
//传递变量给函数时使用对象接口来检查变量类型是否正确
function getName(person: Person): void {
  console.log(person.name);
  console.log(person.age);
}
//定义变量时根据接口书写属性，顺序和个数必须一致
const person1 = { name: "lxl1", age: 100 };
const person2 = { name: "lxl2", age: 200 };

getName(person1); // lxl1 100
getName(person2); // lxl2 200
```

- 可选参数：
  - 可以不存在的参数
  - 语法：在冒号:前添加问号?

```ts
//使用接口来指定对象的属性的类型
interface Person {
  name: string;
  age?: number;
}
//传递变量给函数时使用对象接口来检查变量类型是否正确
function getName(person: Person): void {
  console.log(person.name);
  console.log(person.age);
}
//定义变量时根据接口书写属性，顺序和个数必须一致
const person1 = { name: "lxl1", age: 100 };
const person2 = { name: "lxl2"};

getName(person1); // lxl1 100
getName(person2); // lxl2 
```

- 任意类型：
  - 具有任意属性
  - 语法：
    - 中括号[propName 冒号:属性名类型] 冒号: 值的类型
    - `[propName: string]: any;`

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let lxl: Person = {
    name: 'lxl',
    gender: 'male'
};
```

- 只读属性：
  - 只能在**创建的时候**被赋值
  - 语法：在属性名之前天剑readonly关键字
  - 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
let lxl: Person = {
    id: 1,
    name: 'lxl',
    gender: 'male'
};
```

#### 5.1.2.2 数组类型

- 语法：
  - 类型[]：let array: number[] = [1, 1, 2, 3, 5]; 
  - 泛型<>：let array: Array`<number>` = [1, 1, 2, 3, 5];
- 接口语法
  - 定义数组接口
  - 定义变量

```ts
interface NumberArray {
    [index: number]: number;
}
let array: NumberArray = [1, 1, 2, 3, 5];
```

- 类数组
  - 可以当做数组使用的对象
  - 是对象类型而不是数组类型
- any：允许出现任意类型，放弃了类型检测

### 5.1.3 函数类型

- 语法：
  - **[声明变量const 变量名 赋值=] 声明函数function 函数名 括号(参数 冒号: 参数类型) 冒号:返回值类型花括号{函数内容}**
  - [const mySum =] function sum(x: number,y: number): number {return x + y}

- 把函数赋值给变量时，上述mySum的类型为**类型推论**出来的
  - 指定变量类型：const mySum: (x: number, y: number) => number = function sum(x: number,y: number): number {return x + y}
  - 等号后边为函数：function sum(x: number,y: number): number {return x + y}
  - 等号前边为变量：const mySum: (x: number, y: number) => number

- 可以使用接口定义函数

```ts
interface expFunc {
  (x: number, y: number): number;
}

let mySum1: expFunc;
let mySum2: expFunc;
mySum1 = function(x: number, y: number) {
  return x + y;
};
mySum2 = function(x, y) {
  return x + y;
};
```

- 可选参数：在参数类型冒号前添加问号?
- 可选参数后**不可**出现必选参数

```ts
 function sum(x: number,y?: number): number {return x + y}
```

- 参数默认值：在类型后给参数赋值

```ts
 function sum(x: number = 1,y: number): number {return x + y}
```

- 剩余参数：使用...arg

```ts
 function sum(x,...r){console.log(r)}
```

#### 5.1.3.1 泛型函数

- 函数的输出类型和输入类型相关

```ts
unction firstElement<T>(arr: T[]): T {
    return arr[0];
}

const str = firstElement(['str']);
// const str: string
const bool = firstElement([true]);
// const bool: boolean
const num = firstElement([1]);
// const num: number
```

- 约束：
  - 关联两个值，但只能操作值的一些固定字段
  - 语法：使用extends {属性名:类型}
  - 例：保证传入的值有一个number类型的length属性

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
```

#### 5.1.3.2 类型重载

- 同一个函数提供多个函数类型
- 语法：
  - 定义n个重载签名：**函数名(变量名 冒号: 变量类型) 冒号: 返回值类型**
  - 再定义**函数名(变量名 冒号: 变量类型) 冒号: 返回值类型 {函数主体}**

```ts
function loadMessage(value:number):Message; // 重载签名
function loadMessage(value:MessageType):Message[];// 重载签名

function loadMessage(value:string|number):Message[] | Message |undefined{ // 正确
  if (typeof value === 'number') {
		// find 查找数据对应得某一条 返回翻个
		return messageList.find((tyep) => value === tyep.id);
	} else {
		// 返回的是数组
		return messageList.filter((tyep) => tyep.type === value);
	}
}
// 按住ctrl + 鼠标左键会定位到 直接对应类型的函数签名

//此函数返回的 Message 数据类型 所有可通过点来获取值
loadMessage(1).sendMessage;

// 此处返回的是Message[] 数据类型 所有能调用数组的所有方法
const infoMas = loadMessage('video');
infoMas.forEach(i=>{console.log(i)})
```



#### 5.1.3.3 函数类型

- void：无返回值
- object：表示任何不是原始类型的值 
- unknown：`unknown`类型可以表示任何值。有点类似于 any，但是更安全，因为对 unknown 类型的值做任何事情都是不合法的
- never：`never` 类型表示一个值不会再被观察到 

### 5.1.4 类型进阶

#### 5.1.4.1 类型别名

- 类型别名：
  - 给指定类型定义别名，使用别名定义变量等就相当于使用指定类型定义
  - 常用于联合类型，给联合类型定义别名来简化代码

```ts
type ID = number | string;
const id1: ID = 123;
```

#### 1.5.4.2 字面量类型

- 字符串字面量类型：规定字符串只能是指定字符串中的一个

```ts
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById("hello"), "scroll"); // 没问题
handleEvent(document.getElementById("world"), "onmouseout"); // 报错，event 不能为 'onmouseout'
```

#### 1.5.4.3 元组

- 类似于数组，可通过下标访问各个元素
- 各个元素的类型需要指定
- 初始化时要给全部元素赋值，访问元素时可以指定访问某个元素

```ts
let lxl1: [string, number] = ["lxl", 22];

let lxl2: [string, number];
lxl2 = ["a", 1];
lxl2[0] = "yuguang";
lxl2[1] = 25;
console.log(yuguang2); // ['lxl', 25]
```

#### 1.5.4.4 枚举

- 定义一定范围内的值，每个值都与各自对应的下标相等
- 语法：关键字enum 枚举名称 花括号{各个枚举元素}

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
```

#### 5.1.4.5 类型合并(交叉类型)

- 合并已经存在的类型
- 语法：类型&类型

```ts
interface Colorful {
    color: string;
}
interface Circle {
    radius: number;
}

type group = Colorful & Circle;

function draw(circle: group) {
    console.log(`Color was ${circle.color}`); // (property) Circle.radius: number
    console.log(`Radius was ${circle.radius}`); // (property) Circle.radius: number
}
```

- 对于定义冲突，接口会报错，而类型合并会使该属性的类型进行合并，变成never类型

```ts
interface Colorful {
    color: string;
}
interface ColorfulSub extends Colorful {
    color: number;
}
//报错
interface Colorful {
    color: string;
}

type ColorfulSub = Colorful & {
    color: number;
};
//类型合并为never
```

#### 5.1.4.6 类型收窄

- 检查某个属性是否是指定的类型

- TypeScript 的类型检查器会考虑到这些类型保护和赋值语句，将类型推导为更精确类型

- typeof收窄：

  - ```ts
    function getText(str: number | string): string {
        if (typeof str === "number") {
            return `${str} isNumber`;
            // (parameter) str: number
        } else {
            return `${str} isString`;
            // (parameter) str: string
        }
    }
    ```

- 等值收窄：

  - 使用 switch 语句和等值检查比如 == !== == != 去收窄类型

- in操作符收窄：

  - 在 “value” in x 中，“value” 是一个字符串字面量，而 x 是一个联合类型

- instanceof收窄：通过识别 instanceof 正确的类型收窄

  - ```ts
    function instanceofDemo(a: object | number): void {
        if (a instanceof String) {
            console.log(a);
            // (parameter) a: String
        } else {
            console.log(a);
            // (parameter) a: number | object
        }
    }
    ```

- 赋值收窄：

  - 根据赋值语句的右值，正确的收窄左值

  - ```ts
    let x = Math.random() > 0.5 ? "abc" : 123;
    ```

### 5.1.5 类型断言

- 手动指定一个值的类型
- 语法：变量 as 类型
- 断言不会改变变量的类型(类型转换会)

#### 5.1.5.1 父类断言为子类

```ts
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}
```

#### 5.1.5.2 类型断言为any

- 需要访问不属于该类型的变量的属性时，把变量临时断言为any类型来访问

```ts
(window as any).foo = 1; //window无foo属性，通过断言不会报错
```

## 5.2 class

### 5.2.1 定义

- 使用 `class` 定义类
- 使用`constructor`定义构造函。
-  通过 `new` 生成新实例的时候，会自动调用构造函数。

- 使用`extends`关键字实现继承
- 子类中使用`super`关键字来调用父类的构造函数和方法
- 使用 `get `和 `set`封装属性
- 使用`static`定义一个静态属性

### 5.2.2 TS的类

- 属性类型：
  - public：共有，无访问限制
  - private：私有，只能内部访问
  - protected：受保护，只能在内部和子类中访问
  - readonly：只读，必须初始化
