/* ============================================================
   问舟 · 全局配置与状态（A 成员 · 基础架构）
   来源：原 index.html MODULE 0 · 全局配置与状态
   修改品牌色、站点信息、功能开关只需改这里
   ============================================================ */

export const APP_CONFIG = {
  platformName: '问舟',
  currentSchool: '武昌首义学院',
  isOpenSource: true,
  apiBaseUrl: '',
  version: 'v0.4',
  features: {
    agent: true,
    schoolSwitch: false,
    blog: true,
    blogPublish: true,
    timer: true,
    carousel: true,          // 预留：精选答疑转盘（v0.7 已移除，备将来恢复）
    timetable: true,
    voice: true,
    ripple: true,           // 流体拖尾特效（按住拖动产生流动光带）
    upload: true,           // 资料库用户上传 + 导出/导入分享
    ttImportCenter: true,   // 课表多来源导入中心
    ttClassQuery: true,     // 班级课表查询
    ttCustomBg: true,       // 课表自定义背景
    /* 改造八：新增功能开关 */
    homeWeather: true,      // 首页天气模块（Open-Meteo）
    homeFocus: true,        // 首页沉浸专注模块
    homeParticles: true,    // 首页粒子特效（预留，暂未实现）
    homeCarousel: true,      // 预留：精选答疑转盘（v0.7 已移除，备将来恢复）
  }
};

export const SCHOOL_LIST = [
  { id: 'wuhan', name: '武昌首义学院', active: true },
  // 未来添加：{ id: 'hust', name: '华中科技大学', active: false },
];
