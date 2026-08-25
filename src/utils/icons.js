/* ============================================================
   问舟 · Lucide 图标渲染（A 成员 · 基础架构）
   来源：原 index.html MODULE 2 · 渲染引擎（refreshIcons）
   说明：每次动态插入 DOM 后调用 refreshIcons() 即可渲染 <i data-lucide> 图标；
         lucide 未加载（离线/CDN 失败）时静默跳过，不影响功能。
   ============================================================ */

/**
 * 渲染页面中所有 <i data-lucide="xxx"> 图标
 * （依赖 index.html <head> 中引入的 Lucide UMD，主源 + jsdelivr 备用源）
 */
export function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/** 判断 Lucide 是否已就绪（供其他模块按需降级） */
export function isLucideReady() {
  return !!(window.lucide && typeof window.lucide.createIcons === 'function');
}

export default refreshIcons;
