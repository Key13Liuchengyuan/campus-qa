/* ============================================================
   问舟 · 首页（C 成员 · 首页模块）
   说明：本模块负责首页的完整渲染与交互。
   依赖：
     - src/config/index.js（APP_CONFIG, SCHOOL_LIST）
     - src/data/index.js（DATA, 含 wechatList）
     - src/utils/storage.js（Storage, KEYS）
     - src/utils/toast.js（showToast, showModal）
     - src/utils/icons.js（refreshIcons）
     - src/services/weather.js（由 B 成员提供）
   ============================================================ */
import { APP_CONFIG, SCHOOL_LIST } from '../../config/index.js';
import { DATA } from '../../data/index.js';
import { Storage, KEYS } from '../../utils/storage.js';
import { showToast, showModal } from '../../utils/toast.js';
import { refreshIcons } from '../../utils/icons.js';
// 天气服务（待 B 成员实现）
// import { initWeather } from '../../services/weather.js';

/**
 * 首页组件入口
 * 由 main.js 调用，渲染首页内容并绑定交互。
 */
export function renderHome() {
  const app = document.getElementById('app');
  if (!app) return;

  // 构建首页完整 DOM
  app.innerHTML = `
    <div class="page">
      <!-- 环境光晕（由 global.css 提供样式） -->
      <div class="ambient ambient-cool"></div>
      <div class="ambient ambient-warm"></div>
      <!-- 微噪点纹理层 -->
      <div class="noise-overlay"></div>

      <!-- ================= 顶部导航栏 ================= -->
      <header class="navbar glass reveal" id="navbar" style="--d:0ms">
        <div class="brand">
          <div class="brand-logo"><i data-lucide="sailboat"></i></div>
          <div class="brand-name">${APP_CONFIG.platformName}</div>
          <div class="school-switch" id="schoolSwitch">
            <button class="school-btn" id="schoolBtn" type="button">
              <span class="school-dot"></span>
              <span id="schoolLabel">${APP_CONFIG.currentSchool} · 当前站点</span>
              <span class="school-caret"></span>
            </button>
            <div class="school-menu glass" id="schoolMenu"></div>
          </div>
        </div>
        <div class="nav-actions">
          <button class="btn-wechat" id="wechatBtn" type="button">
            <i data-lucide="message-circle"></i><span>学长微信</span>
          </button>
          <div class="timer" id="timerBtn" role="button" aria-label="专注计时器" title="点击开始 / 暂停专注计时">
            <svg class="timer-svg" viewBox="0 0 56 56">
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#4D6BFF"/>
                  <stop offset="100%" stop-color="#FFB980"/>
                </linearGradient>
              </defs>
              <circle class="ring-track" cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3.5"/>
              <circle id="ringProgress" class="ring-progress" cx="28" cy="28" r="24" fill="none"
                      stroke="url(#ringGrad)" stroke-width="3.5" stroke-linecap="round"
                      stroke-dasharray="150.8" stroke-dashoffset="0"/>
            </svg>
            <span class="timer-text" id="timerText">25:00</span>
          </div>
        </div>
      </header>

      <!-- ================= 功能 Tabs ================= -->
      <nav class="tabs reveal" style="--d:100ms" aria-label="功能导航">
        <div class="tabs-bar glass">
          <button class="tab-btn active" data-tab="home" type="button"><i data-lucide="home"></i><span>首页</span></button>
          <button class="tab-btn" data-tab="qa" type="button"><i data-lucide="message-circle-question"></i><span>答疑</span></button>
          <button class="tab-btn" data-tab="materials" type="button"><i data-lucide="library"></i><span>资源库</span></button>
          <button class="tab-btn" data-tab="workshop" type="button"><i data-lucide="sparkles"></i><span>AI 工坊</span></button>
          <button class="tab-btn" data-tab="timetable" type="button"><i data-lucide="calendar-days"></i><span>课表</span></button>
        </div>
      </nav>

      <!-- ================= 首页面板 ================= -->
      <section class="panel active" id="panel-home">
        <div class="home-hero reveal" style="--d:80ms">
          <div class="home-logo"><i data-lucide="sailboat"></i></div>
          <h1 class="home-title">问舟<span class="grad"> · 让学习有问必答</span></h1>
          <p class="home-sub" id="homeSub">${APP_CONFIG.currentSchool}学习答疑社区 · 答疑 / 资源 / AI 工坊 / 课表 一站式</p>
        </div>

        <!-- 四大功能卡片 -->
        <div class="home-cards" id="homeCards">
          <button class="home-card glass tilt-card reveal" data-tab="qa" style="--d:150ms">
            <div class="hc-icon"><i data-lucide="message-circle-question"></i></div>
            <div class="hc-name">智能答疑</div>
            <div class="hc-desc">问学长学姐，校园问题秒回；支持语音输入与精选问答</div>
            <div class="hc-go">进入<i data-lucide="chevron-right"></i></div>
          </button>
          <button class="home-card glass tilt-card reveal" data-tab="materials" style="--d:200ms">
            <div class="hc-icon"><i data-lucide="library"></i></div>
            <div class="hc-name">资源库</div>
            <div class="hc-desc">学习资料共享社区：上传、下载、导出分享，还有学长博客</div>
            <div class="hc-go">进入<i data-lucide="chevron-right"></i></div>
          </button>
          <button class="home-card glass tilt-card reveal" data-tab="workshop" style="--d:250ms">
            <div class="hc-icon"><i data-lucide="sparkles"></i></div>
            <div class="hc-name">AI 工坊</div>
            <div class="hc-desc">PPT / 视频制作 Agent，本地体验版待配置 API Key</div>
            <div class="hc-go">进入<i data-lucide="chevron-right"></i></div>
          </button>
          <button class="home-card glass tilt-card reveal" data-tab="timetable" style="--d:300ms">
            <div class="hc-icon"><i data-lucide="calendar-days"></i></div>
            <div class="hc-name">课表</div>
            <div class="hc-desc">多来源导入课表：教务系统粘贴 / PDF / Excel / 链接</div>
            <div class="hc-go">进入<i data-lucide="chevron-right"></i></div>
          </button>
        </div>
      </section>

      <!-- ================= 其他功能面板（占位，后续由对应成员填充） ================= -->
      <section class="panel" id="panel-qa"><div class="panel-head"><button class="btn-back" data-back="home"><i data-lucide="arrow-left"></i>返回首页</button></div><p style="padding:20px;text-align:center;color:var(--text-aux)">答疑模块开发中...</p></section>
      <section class="panel" id="panel-materials"><div class="panel-head"><button class="btn-back" data-back="home"><i data-lucide="arrow-left"></i>返回首页</button></div><p style="padding:20px;text-align:center;color:var(--text-aux)">资源库模块开发中...</p></section>
      <section class="panel" id="panel-workshop"><div class="panel-head"><button class="btn-back" data-back="home"><i data-lucide="arrow-left"></i>返回首页</button></div><p style="padding:20px;text-align:center;color:var(--text-aux)">AI工坊模块开发中...</p></section>
      <section class="panel" id="panel-timetable"><div class="panel-head"><button class="btn-back" data-back="home"><i data-lucide="arrow-left"></i>返回首页</button></div><p style="padding:20px;text-align:center;color:var(--text-aux)">课表模块开发中...</p></section>

      <!-- ================= 底部悬浮状态栏（时间 / 天气 / 专注） ================= -->
      <div class="home-status reveal" style="--d:350ms">
        <div class="status-card" id="statusClock">
          <div class="st-icon"><i data-lucide="clock"></i></div>
          <div class="st-body">
            <div class="st-time" id="liveTime">--:--:--</div>
            <div class="st-sub" id="liveDate">加载中…</div>
          </div>
        </div>
        <div class="status-card" id="statusWeather">
          <div class="st-icon" id="weatherIcon"><i data-lucide="cloud"></i></div>
          <div class="st-body">
            <div class="st-time weather-loading" id="weatherInfo">天气加载中…</div>
            <div class="st-sub">武汉 · 武昌首义学院</div>
          </div>
        </div>
        <div class="status-card" id="statusFocus">
          <div class="st-icon"><i data-lucide="brain"></i></div>
          <div class="st-body">
            <div class="st-time" id="focusState">空闲 · 25 分钟专注</div>
            <div class="st-sub-row">
              <button class="focus-btn" id="focusBtn" type="button"><i data-lucide="play"></i><span>开始专注</span></button>
              <button class="focus-hist" id="focusHistBtn" type="button"><i data-lucide="history"></i><span id="focusHist">暂无记录</span></button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 页脚 ================= -->
      <footer class="footer">${APP_CONFIG.platformName} · 开源公益版 ${APP_CONFIG.version} · 当前服务站点：${APP_CONFIG.currentSchool}</footer>
    </div>
  `;

  // 渲染完成后刷新 Lucide 图标
  refreshIcons();

  // 初始化各模块交互
  initHomeInteractions();
}

/**
 * 首页交互初始化
 */
function initHomeInteractions() {
  // 1. 学长微信弹窗
  document.getElementById('wechatBtn')?.addEventListener('click', showWechatModal);

  // 2. 功能卡片点击 → 切换 Tab
  document.querySelectorAll('.home-card[data-tab]').forEach(card => {
    card.addEventListener('click', () => {
      const tab = card.dataset.tab;
      // 调用由 main.js 暴露的全局切换函数
      if (typeof window.switchTab === 'function') {
        window.switchTab(tab);
      } else {
        console.warn('window.switchTab 未定义，请确保 main.js 已暴露该函数');
      }
    });
  });

  // 3. 面板返回按钮
  document.querySelectorAll('.btn-back[data-back="home"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof window.switchTab === 'function') {
        window.switchTab('home');
      }
    });
  });

  // 4. 站点下拉菜单
  const schoolBtn = document.getElementById('schoolBtn');
  const schoolSwitch = document.getElementById('schoolSwitch');
  if (schoolBtn && schoolSwitch) {
    schoolBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      schoolSwitch.classList.toggle('open');
    });
    document.addEventListener('click', () => schoolSwitch.classList.remove('open'));
  }

  // 5. 专注计时器（需要与 timer.js 联动，此处仅绑定点击事件由 timer 模块处理）
  // 实际计时逻辑放在 A 成员提供的 timer 中，此处在 DOM 就绪后由 main.js 或其他模块绑定
  // 但为了演示，我们先绑定一个简单示例：点击后触发自定义事件，由外层监听
  const timerBtn = document.getElementById('timerBtn');
  const focusBtn = document.getElementById('focusBtn');
  if (timerBtn) {
    timerBtn.addEventListener('click', () => {
      // 触发自定义事件，让 timer 模块处理
      document.dispatchEvent(new CustomEvent('toggle-timer'));
    });
  }
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('toggle-timer'));
    });
  }

  // 6. 时间更新
  updateClock();
  setInterval(updateClock, 1000);

  // 7. 天气加载（待 B 成员实现后启用）
  // if (typeof initWeather === 'function') initWeather();
  // 暂时用模拟数据
  loadMockWeather();

  // 8. 专注历史按钮
  document.getElementById('focusHistBtn')?.addEventListener('click', openFocusHistory);
}

/* ============================================================
   时间模块
   ============================================================ */
const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'];
const pad2 = (n) => String(n).padStart(2, '0');

function updateClock() {
  const d = new Date();
  const timeEl = document.getElementById('liveTime');
  const dateEl = document.getElementById('liveDate');
  if (timeEl) {
    timeEl.textContent = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
  }
  if (dateEl) {
    dateEl.textContent = `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 星期${WEEK_CN[d.getDay()]}`;
  }
}

/* ============================================================
   天气模块（模拟数据，待 B 成员实现真实 API）
   ============================================================ */
function loadMockWeather() {
  const infoEl = document.getElementById('weatherInfo');
  const iconEl = document.getElementById('weatherIcon');
  if (infoEl) {
    infoEl.textContent = '26° · 晴';
    infoEl.classList.remove('weather-loading');
  }
  if (iconEl) {
    iconEl.innerHTML = '<i data-lucide="sun"></i>';
    refreshIcons();
  }
}

/* ============================================================
   专注历史弹窗
   ============================================================ */
function openFocusHistory() {
  const hist = Storage.get(KEYS.focusHistory) || [];
  const body = hist.length
    ? `<div class="focus-list">${hist.slice().reverse().slice(0, 10).map(h => {
        const d = new Date(h.at);
        return `<div class="fl-item">
          <span>${d.getMonth()+1}月${d.getDate()}日 ${pad2(d.getHours())}:${pad2(d.getMinutes())}</span>
          <span class="fl-time">${h.minutes} 分钟</span>
        </div>`;
      }).join('')}</div>`
    : '<p>还没有专注记录，开始你的第一轮 25 分钟吧</p>';
  showModal({
    iconName: 'history',
    title: '专注历史',
    body,
    confirmText: '知道了',
  });
}

/* ============================================================
   学长微信弹窗（遍历 DATA.wechatList 展示多张二维码卡片）
   ============================================================ */
function showWechatModal() {
  const list = DATA.wechatList;
  if (!list || !list.length) {
    showToast('暂无学长微信数据', 'info');
    return;
  }

  const cardsHtml = list.map(item => `
    <div style="
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,235,215,0.12);
      border-radius: 16px;
      padding: 16px;
      text-align: center;
      min-width: 130px;
      flex: 1;
    ">
      <img src="${item.qr}" alt="${item.name}的二维码" style="width:120px;height:120px;object-fit:contain;border-radius:12px;background:#fff;display:block;margin:0 auto 10px;">
      <div style="font-weight:600;color:var(--text-primary);font-size:14px;">${item.name}</div>
      ${item.region ? `<div style="font-size:11px;color:var(--text-aux);margin-top:2px;">${item.region}</div>` : ''}
      <div style="margin-top:8px;font-size:11px;color:var(--text-aux);">扫码添加</div>
    </div>
  `).join('');

  showModal({
    iconName: 'message-circle',
    title: '联系学长',
    body: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:8px 0 4px;">
        ${cardsHtml}
      </div>
      <p style="font-size:11.5px;color:var(--text-aux);margin-top:12px;">扫码添加学长微信，咨询校园问题</p>
    `,
    confirmText: '关闭',
  });
}
