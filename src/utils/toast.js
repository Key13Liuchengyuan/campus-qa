/* ============================================================
   问舟 · Toast / 弹窗 / 剪贴板（A 成员 · 基础架构）
   来源：原 index.html MODULE 2 · 渲染引擎（showToast / showModal / hideModal / copyText）
   说明：
     1. 骨架 index.html 中不预置 #toast / #modalMask 节点，
        本模块按需自动创建（ensureToast / ensureModal），页面结构保持纯净；
     2. 若后续其他成员在 HTML 中预置了同名节点，则复用已有节点；
     3. initModalEvents() 可重复调用，内部有防重绑定保护。
   ============================================================ */
import { refreshIcons } from './icons.js';

const $ = (sel) => document.querySelector(sel);

let _toastTimer = null;
let _modalOnConfirm = null;
let _eventsBound = false;

/* ---------- 惰性创建 Toast 节点 ---------- */
function ensureToast() {
  let t = $('#toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.id = 'toast';
    document.body.appendChild(t);
  }
  return t;
}

/* ---------- 惰性创建 Modal 节点（含完整内部结构） ---------- */
function ensureModal() {
  let mask = $('#modalMask');
  if (!mask) {
    mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.id = 'modalMask';
    mask.innerHTML = `
      <div class="modal glass" role="dialog" aria-modal="true">
        <div class="modal-icon" id="modalIcon"></div>
        <h3 class="modal-title" id="modalTitle">提示</h3>
        <div class="modal-body" id="modalBody"></div>
        <div class="modal-actions">
          <button class="btn-primary" id="modalConfirm" type="button">知道了</button>
        </div>
      </div>`;
    document.body.appendChild(mask);
  }
  return mask;
}

/* ---------- 事件绑定（防重） ---------- */
export function initModalEvents() {
  if (_eventsBound) return;
  const mask = ensureModal();
  mask.addEventListener('click', (e) => { if (e.target === e.currentTarget) hideModal(); });
  $('#modalConfirm').addEventListener('click', () => {
    const cb = _modalOnConfirm;
    hideModal();
    if (typeof cb === 'function') cb();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideModal(); });
  _eventsBound = true;
}

/* ============================================================
   showToast · 轻提示（图标参数为 Lucide 图标名）
   ============================================================ */
export function showToast(msg, iconName = 'check') {
  ensureToast();
  const t = $('#toast');
  t.innerHTML = `<span class="toast-icon"><i data-lucide="${iconName}"></i></span><span>${msg}</span>`;
  t.classList.add('show');
  refreshIcons();
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ============================================================
   showModal / hideModal · 通用弹窗
   ============================================================ */
export function showModal({ iconName = 'message-circle', title = '提示', body = '', confirmText = '知道了', onConfirm = null }) {
  ensureModal();
  initModalEvents();                       // 确保事件已绑定
  $('#modalIcon').innerHTML = `<i data-lucide="${iconName}"></i>`;
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = body;
  $('#modalConfirm').textContent = confirmText;
  _modalOnConfirm = onConfirm;
  $('#modalMask').classList.add('show');
  refreshIcons();                          // 弹窗内动态图标渲染
}

export function hideModal() {
  const mask = $('#modalMask');
  if (mask) mask.classList.remove('show');
  _modalOnConfirm = null;
}

/* ============================================================
   copyText · 复制文本（Clipboard API + execCommand 兜底）
   ============================================================ */
/* @__PURE__ */ function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  ta.remove();
  return ok;
}

export function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => legacyCopy(text));
  }
  return Promise.resolve(legacyCopy(text));
}

export default { showToast, showModal, hideModal, copyText, initModalEvents };
