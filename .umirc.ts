import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'CMS',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '实体管理',
      path: '/entity',
      component: './Entity',
    },
    // {
    //   name: '实体编辑',
    //   path: '/entity/edit',
    //   component: './EntityEdit',
    // }
  ],
  npmClient: 'pnpm',
  proxy:{
    '/api':{
      target:'http://localhost:7001',
      pathRewrite:{
        "^/api":""
      },
      changeOrigin: true
    }
  }
});

