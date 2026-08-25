/* ============================================================
   问舟 · 数据持久化（A 成员 · 基础架构）
   来源：原 index.html MODULE 1 · 数据持久化 + MODULE 4 错误处理（内联）
   说明：
     Storage —— localStorage 封装（不可用时自动降级为内存 Map）
     IDB      —— IndexedDB 封装（用户上传资料，objectStore: materials）
     KEYS     —— 全部本地存储键名
   ============================================================ */
import { showToast } from './toast.js';

/* ---------- 私有错误处理（原 AppErrorHandler 内联） ---------- */
function handleFileError(err, context = '文件处理') {
  console.error(`[AppErrorHandler][File] ${context}:`, err);
  try { showToast(context + '失败，请重试', 'alert-triangle'); } catch (e) { /* 忽略 */ }
}
function handleStorageError(err) {
  console.error('[AppErrorHandler][Storage]', err);
  try { showToast('本地存储空间不足，已切换为内存存储（刷新后数据不保留）', 'alert-triangle'); } catch (e) { /* 忽略 */ }
}

/* ============================================================
   Storage · localStorage 封装（降级内存存储）
   ============================================================ */
export const Storage = (() => {
  let memory = new Map();
  let usingMemory = false;
  function canUseLS() {
    try {
      localStorage.setItem('wenzhou__probe', '1');
      localStorage.removeItem('wenzhou__probe');
      return true;
    } catch (e) { return false; }
  }
  const lsOK = canUseLS();
  return {
    isMemory: () => usingMemory,
    get(key) {
      if (lsOK) {
        try {
          const raw = localStorage.getItem(key);
          return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
      }
      return memory.has(key) ? memory.get(key) : null;
    },
    set(key, value) {
      if (lsOK) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (e) {
          handleStorageError(e);
          usingMemory = true;
        }
      }
      memory.set(key, value);
      return false;
    },
    remove(key) {
      if (lsOK) { try { localStorage.removeItem(key); } catch (e) { /* 忽略 */ } }
      memory.delete(key);
    },
  };
})();

/* ============================================================
   KEYS · 本地存储键名
   ============================================================ */
export const KEYS = {
  blogPosts: 'wenzhou_blog_posts',
  blogLikes: 'wenzhou_blog_likes',
  timetable: 'wenzhou_timetable',
  ttBg: 'wenzhou_tt_bg',
  /* 改造四/五：天气缓存 + 专注历史 */
  weather: 'wenzhou_weather',
  focusHistory: 'wenzhou_focus_history',
};

/* ============================================================
   IDB · IndexedDB 封装（用户上传资料）
   ============================================================ */
export const IDB = (() => {
  let db = null;
  function open() {
    return new Promise((resolve, reject) => {
      if (db) return resolve(db);
      const req = indexedDB.open('wenzhou', 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains('materials')) {
          req.result.createObjectStore('materials', { keyPath: 'id' });
        }
      };
      req.onsuccess = () => { db = req.result; resolve(db); };
      req.onerror = () => reject(req.error);
    });
  }
  function tx(store, mode) {
    return open().then(d => d.transaction(store, mode).objectStore(store));
  }
  return {
    async all() {
      try {
        const s = await tx('materials', 'readonly');
        return await new Promise((res, rej) => { const r = s.getAll(); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
      } catch (e) { handleFileError(e, '读取上传资料'); return []; }
    },
    async add(item) {
      try {
        const s = await tx('materials', 'readwrite');
        return await new Promise((res, rej) => { const r = s.add(item); r.onsuccess = () => res(item); r.onerror = () => rej(r.error); });
      } catch (e) { handleFileError(e, '保存上传资料'); return null; }
    },
    async put(item) {
      try {
        const s = await tx('materials', 'readwrite');
        return await new Promise((res, rej) => { const r = s.put(item); r.onsuccess = () => res(item); r.onerror = () => rej(r.error); });
      } catch (e) { handleFileError(e, '导入资料'); return null; }
    },
    async remove(id) {
      try {
        const s = await tx('materials', 'readwrite');
        return await new Promise((res, rej) => { const r = s.delete(id); r.onsuccess = () => res(); r.onerror = () => rej(r.error); });
      } catch (e) { handleFileError(e, '删除资料'); }
    },
  };
})();

export default { Storage, IDB, KEYS };
