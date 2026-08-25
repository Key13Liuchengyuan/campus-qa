// src/features/qa/index.js
import { DATA } from '../../data/index.js';

export function renderQA() {
  const panel = document.getElementById('panel-qa');
  if (!panel) return;

  panel.innerHTML = `
    <div class="panel-head">
      <button class="btn-back" data-back="home"><i data-lucide="arrow-left"></i>返回首页</button>
    </div>
    <div class="chat-layout">
      <div class="chat-card glass reveal" style="--d:100ms">
        <div class="chat-scroll" id="chatScroll"></div>
      </div>
      <div class="chat-ruler glass reveal" id="chatRuler" style="--d:100ms" title="消息刻度：滚动显示，悬停刻度快速定位"></div>
    </div>
    <form class="chat-form glass reveal" style="--d:150ms" id="chatForm">
      <button class="btn-mic" id="micBtn" type="button" title="语音输入"><i data-lucide="mic"></i></button>
      <input class="chat-input" id="chatInput" type="text"
             placeholder="输入你的问题，学长学姐在线解答…（如：高数怎么复习）" autocomplete="off">
      <button class="btn-send" id="sendBtn" type="submit" disabled><i data-lucide="send"></i><span>发送</span></button>
    </form>
  `;

  initChat();
}

function initChat() {
  const scroll = document.getElementById('chatScroll');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const form = document.getElementById('chatForm');
  if (!scroll || !input || !sendBtn || !form) return;

  appendMessage(scroll, 'ai', `你好！我是「问舟」小助手，来自武昌首义学院的学长答疑团队。关于学习、考试、选课的任何问题，都可以直接问我～`);

  const examples = ['高数期末怎么复习？', '四级一次过的经验？', '选课有什么技巧吗？'];
  examples.forEach(q => appendMessage(scroll, 'user', q));
  setTimeout(() => {
    examples.forEach((q, i) => {
      setTimeout(() => {
        const answer = matchAnswer(q);
        appendMessage(scroll, 'ai', answer);
      }, i * 600 + 300);
    });
  }, 500);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    appendMessage(scroll, 'user', text);
    input.value = '';
    sendBtn.disabled = true;
    const typing = createTypingIndicator();
    scroll.appendChild(typing);
    scroll.scrollTop = scroll.scrollHeight;
    setTimeout(() => {
      typing.remove();
      const answer = matchAnswer(text);
      appendMessage(scroll, 'ai', answer);
      sendBtn.disabled = false;
    }, 600 + Math.random() * 700);
  });

  input.addEventListener('input', () => {
    sendBtn.disabled = input.value.trim() === '';
  });

  buildRuler(scroll);
  initVoice();
}

function appendMessage(scroll, who, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg msg-${who}`;
  if (who === 'ai') {
    msgDiv.innerHTML = `<div class="avatar">舟</div><div class="bubble">${text}</div>`;
  } else {
    msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
  }
  scroll.appendChild(msgDiv);
  scroll.scrollTop = scroll.scrollHeight;
  buildRuler(scroll);
}

function createTypingIndicator() {
  const wrap = document.createElement('div');
  wrap.className = 'msg msg-ai';
  wrap.innerHTML = `<div class="avatar">舟</div><div class="bubble typing"><i></i><i></i><i></i></div>`;
  return wrap;
}

function matchAnswer(input) {
  const text = input.toLowerCase();
  for (const item of DATA.qa) {
    if (item.keywords && item.keywords.some(k => text.includes(k))) {
      return item.a;
    }
  }
  return DATA.fallback || '这个问题我暂时还没收录，建议去资源库找找～';
}

function buildRuler(scroll) {
  const ruler = document.getElementById('chatRuler');
  if (!ruler) return;
  const msgs = scroll.querySelectorAll('.msg');
  if (msgs.length <= 1) { ruler.hidden = true; return; }
  ruler.hidden = false;
  ruler.innerHTML = '';
  msgs.forEach((m, i) => {
    const tick = document.createElement('div');
    tick.className = 'ruler-tick' + (i === msgs.length - 1 ? ' active' : '');
    tick.style.top = (i / (msgs.length - 1)) * 100 + '%';
    tick.title = '第 ' + (i + 1) + ' 条消息';
    tick.addEventListener('click', () => {
      scroll.scrollTo({ top: Math.max(0, m.offsetTop - 24), behavior: 'smooth' });
    });
    tick.addEventListener('mouseenter', () => {
      scroll.scrollTo({ top: Math.max(0, m.offsetTop - 24), behavior: 'smooth' });
    });
    ruler.appendChild(tick);
  });
}

function initVoice() {
  const micBtn = document.getElementById('micBtn');
  if (!micBtn) return;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { micBtn.style.display = 'none'; return; }
  let recognition = null, listening = false, timeoutId = null;
  micBtn.addEventListener('click', () => {
    if (listening) { recognition?.stop(); return; }
    try {
      recognition = new SR();
      recognition.lang = 'zh-CN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => {
        listening = true;
        micBtn.classList.add('listening');
        const input = document.getElementById('chatInput');
        if (input) input.placeholder = '正在聆听...';
        timeoutId = setTimeout(() => recognition?.stop(), 5000);
      };
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        const input = document.getElementById('chatInput');
        if (input) { input.value = transcript; input.dispatchEvent(new Event('input')); }
      };
      recognition.onerror = () => { recognition?.stop(); };
      recognition.onend = () => {
        listening = false;
        micBtn.classList.remove('listening');
        const input = document.getElementById('chatInput');
        if (input) input.placeholder = '输入你的问题，学长学姐在线解答…（如：高数怎么复习）';
        clearTimeout(timeoutId);
      };
      recognition.start();
    } catch (err) { console.error('语音启动失败:', err); }
  });
}
