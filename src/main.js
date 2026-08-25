/* ============================================================
   问舟 · 应用入口（A 成员 · 基础架构）
   来源：原 index.html 初始化逻辑（init）拆分
   职责：
     1. 导入全部基础模块（config / data / storage / toast / icons）
     2. 导出 init() 函数，由 index.html 的 <script type="module"> 加载后自动执行
     3. 挂载引导占位页面（B 成员实现 renderHome 后替换 bootstrap）
   ============================================================ */
import { APP_CONFIG, SCHOOL_LIST } from './config/index.js';
import { DATA } from './data/index.js';
import { Storage, IDB, KEYS } from './utils/storage.js';
import { showToast, initModalEvents } from './utils/toast.js';
import { refreshIcons } from './utils/icons.js';

/* -------------------- TODO：以下模块由后续成员实现 -------------------- */
// TODO(B) 首页：     import { renderHome } from './features/home/index.js';
// TODO(C) 答疑：     import { renderQA } from './features/qa/index.js';
// TODO(D) 资源库：   import { renderResources } from './features/resources/index.js';
// TODO(E) AI 工坊：  import { renderWorkshop } from './features/workshop/index.js';
// TODO(F) 课表：     import { renderTimetable } from './features/timetable/index.js';
// TODO(G) 服务层：   import { qaService } from './services/qaService.js'; 等
// TODO(H) 特效引擎： import { initEffects } from './effects/index.js';

/**
 * 应用初始化（页面加载完成后由下方自动调用；也可被其他模块手动调用）
 */
export function init() {
  /* 1. 品牌信息 */
  document.title = `${APP_CONFIG.platformName} · ${APP_CONFIG.currentSchool}学习答疑平台`;

  /* 2. 弹窗 / Toast 事件初始化（utils 自建 DOM，骨架 HTML 无需预置节点） */
  initModalEvents();

  /* 3. Lucide 图标首次渲染 */
  refreshIcons();

  /* 4. 挂载调试句柄 window.__APP__（控制台可直接访问全部基础模块） */
  if (typeof window !== 'undefined') {
    window.__APP__ = { APP_CONFIG, SCHOOL_LIST, DATA, Storage, IDB, KEYS };
  }

  /* 5. 挂载引导占位（B 成员接入 renderHome 后替换为真实首页） */
  bootstrap();

  /* 6. 就绪日志（便于联调确认模块装配成功） */
  console.log(`[wenzhou] ${APP_CONFIG.platformName} ${APP_CONFIG.version} init ok`, window.__APP__);
}

/**
 * 引导占位：在 #app 中渲染基础架构就绪提示。
 * TODO(B)：待 features/home 实现后，此函数替换为 renderHome() 调用。
 */
function bootstrap() {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = `
    <div style="min-height:100vh;display:grid;place-items:center;padding:24px">
      <div style="text-align:center;max-width:340px">
        <div style="width:64px;height:64px;margin:0 auto 14px;border-radius:19px;display:grid;place-items:center;
                    background:linear-gradient(135deg,#4D6BFF,#7a5cff 55%,#FFB980);
                    box-shadow:0 12px 36px rgba(77,107,255,0.4)">
          <i data-lucide="sailboat" style="width:30px;height:30px;color:#fff"></i>
        </div>
        <h1 style="font-size:24px;font-weight:600;color:rgba(255,255,255,0.95);letter-spacing:.5px">${APP_CONFIG.platformName}</h1>
        <p style="margin-top:8px;font-size:13px;color:rgba(255,255,255,0.45)">${APP_CONFIG.currentSchool}学习答疑社区 · 基础架构已就绪</p>
        <p style="margin-top:18px;font-size:11.5px;color:rgba(255,255,255,0.3)">模块化拆分进行中 · ${APP_CONFIG.version}</p>
      </div>
    </div>`;
  refreshIcons();
  showToast(`${APP_CONFIG.platformName} 已启动`, 'sailboat');
}

/* 页面加载完成后自动启动（index.html 以 module 方式引入本文件） */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

export default init;
