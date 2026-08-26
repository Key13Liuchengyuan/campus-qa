// src/main.js
import { APP_CONFIG, SCHOOL_LIST } from './config/index.js';
import { DATA } from './data/index.js';
import { Storage, IDB, KEYS } from './utils/storage.js';
import { showToast, initModalEvents } from './utils/toast.js';
import { refreshIcons } from './utils/icons.js';
import { initTilt } from './effects/tilt.js';
import { initFluidTail } from './effects/fluid.js';

// 从根目录加载 qa_data.txt 并解析
async function loadQAFromFile() {
  try {
    // 尝试从根目录加载（开发服务器需提供该文件）
    const response = await fetch('/qa_data.txt');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}，文件可能不在根目录或服务器未提供`);
    }
    const text = await response.text();

    const entries = text.split(/\n\s*\n/);
    const qaList = [];
    for (const entry of entries) {
      const lines = entry.split('\n');
      let q = '', k = '', a = '';
      for (const line of lines) {
        if (line.startsWith('Q:')) q = line.replace('Q:', '').trim();
        else if (line.startsWith('K:')) k = line.replace('K:', '').trim();
        else if (line.startsWith('A:')) a = line.replace('A:', '').trim();
      }
      if (q && a) {
        qaList.push({
          keywords: k ? k.split(',').map(s => s.trim()) : [],
          q,
          a
        });
      }
    }
    if (qaList.length === 0) throw new Error('解析结果为空');
    DATA.qa = qaList;
    console.log(`[问舟] ✅ 从 /qa_data.txt 加载 ${qaList.length} 条问答`);
    return qaList;
  } catch (err) {
    console.error('[问舟] ❌ 加载 qa_data.txt 失败:', err);
    // 降级：使用硬编码备用数据
    DATA.qa = [
      { keywords: ['学费', '收费'], q: '学费多少？', a: '本科学费 22800-26800 元/年，专科学费 12800-16800 元/年。' },
      { keywords: ['宿舍', '床位'], q: '宿舍条件？', a: '4-6人间，上床下桌，床铺 0.9m×2.0m。' },
      { keywords: ['图书馆'], q: '图书馆开放时间？', a: '周一至周日 7:00-22:30，节假日另行通知。' },
    ];
    // 显示提示，告知用户文件加载失败
    showToast('⚠️ 未能加载 qa_data.txt，使用备用问答数据', 'alert-triangle');
    return DATA.qa;
  }
}

export async function init() {
  document.title = `${APP_CONFIG.platformName} · ${APP_CONFIG.currentSchool}学习答疑平台`;
  initModalEvents();
  refreshIcons();

  // 加载问答数据
  await loadQAFromFile();

  if (typeof window !== 'undefined') {
    window.__APP__ = { APP_CONFIG, SCHOOL_LIST, DATA, Storage, IDB, KEYS };
  }

  bootstrap();

  // 视觉特效（CDF / H 成员负责）
  initTilt();
  if (APP_CONFIG.features.ripple) initFluidTail();

  console.log(`[wenzhou] ${APP_CONFIG.platformName} ${APP_CONFIG.version} init ok`);
}

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
        <p style="margin-top:8px;font-size:12px;color:rgba(255,255,255,0.3)">已加载 ${DATA.qa.length} 条问答数据</p>
        <p style="margin-top:18px;font-size:11.5px;color:rgba(255,255,255,0.3)">模块化拆分进行中 · ${APP_CONFIG.version}</p>
      </div>
    </div>`;
  refreshIcons();
  showToast(`${APP_CONFIG.platformName} 已启动（${DATA.qa.length} 条问答）`, 'sailboat');
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

export default init;
