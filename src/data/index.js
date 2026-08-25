import { QA_DATA } from './qa.js';   // 导入生成的问答数据

export const DATA = {
  qa: QA_DATA,           // 使用导入的 50+ 条数据，不再是空数组

  policies: [
    { title: '《学生管理规定》', desc: '学校学生管理总纲领，学生权利、义务、日常管理总要求。', link: ' ' },
    { title: '《学生违纪处分实施办法》', desc: '五类纪律处分：警告、严重警告、记过、留校察看、开除学籍。违纪行为界定、处分标准，事关档案，新生务必了解。', link: 'http://www.wsyu.edu.cn/xxgkw/2018/0629/c945a35990/pagem.htm' },
    { title: '《学生申诉处理办法》', desc: '如果对学校处分结果有异议，可按照本文件流程提出申诉，维护自身权益。', link: 'http://www.wsyu.edu.cn/xxgkw/2018/1119/c940a36083/pagem.htm' },
    { title: '《学籍管理实施细则》', desc: '入学注册、请假旷课、课程重修、转专业、毕业条件全部在这里。关乎能不能顺利毕业，重点阅读。', link: 'http://www.wsyu.edu.cn/xxgkw/2018/0801/c937a95831/pagem.htm' },
    { title: '《学生公寓管理规定》', desc: '宿舍管理、违规电器、查寝制度。宿舍违规电器会直接通报处分，千万注意。', link: 'https://bwc.wsyu.edu.cn/2021/0922/c3291a74946/pagem.htm' },
  ],

  carousel: [
    { tag: '精选答疑', q: '高数期末怎么复习？', a: '学长三步法：过重点题型 → 刷往年真题 → 考前限时模拟，配套《高数期末复习宝典》在资源库可下载。', ask: '高数期末怎么复习？' },
    { tag: '精选答疑', q: '四级一次过的经验', a: '听力精听 + 阅读词汇 + 作文万能模板，真题是最好的素材，《四级真题精讲》已在资源库上架。', ask: '四级一次过的经验？' },
    { tag: '精选答疑', q: '选课有什么技巧？', a: '先保必修学分，公选课看「考核方式 + 给分」，热门课开放当天 8:00 准时守在选课系统里。', ask: '选课有什么技巧吗？' },
    { tag: '精选答疑', q: '考研还是就业？', a: '先问目标岗位是否硬性要求硕士学历：科研 / 考公选调选考研，实践岗位实习经历更值钱。', ask: '考研还是就业，怎么选？' },
  ],

  fallback: '这个问题学长暂时还没收录进知识库呢～ 建议先到「资源库」翻翻资料，或者点击右上角「学长微信」加学长人工问一下，看到就会回你。',

  materials: [
    { icon: 'graduation-cap', title: '高数期末复习宝典', desc: '高等数学（上）考点梳理 + 经典题型解析，考前必刷', tag: 'PDF', size: '2.4 MB' },
    { icon: 'book-open', title: '大学英语四级真题精讲', desc: '近5年真题 + 听力原文与精读笔记', tag: 'PDF', size: '8.1 MB' },
    { icon: 'presentation', title: 'PPT 模板合集', desc: '30+套校园答辩/汇报场景模板，开箱即用', tag: 'ZIP', size: '12.6 MB' },
    { icon: 'code', title: 'Python 入门学习笔记', desc: '零基础语法手册 + 课后练习参考答案', tag: 'PDF', size: '3.2 MB' },
    { icon: 'clipboard-list', title: '考研全程规划指南', desc: '时间线、择校思路、公共课资料清单一页看懂', tag: 'PDF', size: '1.8 MB' },
    { icon: 'file-text', title: '简历模板与面试清单', desc: '应届生简历模板 + 高频面试问题整理', tag: 'DOCX', size: '860 KB' },
  ],

  blogs: [
    { id: 'b1', date: '2025-01-06', cat: '学习干货', likes: 32, title: '大二学长说：高数期末90+的完整复习路径', summary: '从「划重点→刷真题→错题复盘」三步讲透期末高数怎么准备。' },
    { id: 'b2', date: '2024-12-20', cat: '英语备考', likes: 18, title: '四六级听力救急指南：最后两周怎么练最有效', summary: '精听+跟读的正确打开方式，以及考场上的「听到什么选什么」技巧。' },
    { id: 'b3', date: '2024-12-02', cat: '工具效率', likes: 12, title: '我整理了一份可复用的PPT自查清单', summary: '每次汇报前花5分钟过一遍：字体统一、层级清晰、留白充足、动画克制。' },
    { id: 'b4', date: '2024-11-15', cat: '成长随笔', likes: 7, title: '从绩点2.8到3.6：我踩过的三个坑', summary: '选课只看兴趣、考前才突击、从不问老师——这三个习惯让我第一年掉了不少分。' },
  ],

  timetable: [
    { day: 0, period: 0, name: '高等数学', room: '教一 201' },
    { day: 0, period: 1, name: '大学英语', room: '教三 305' },
    { day: 1, period: 2, name: '大学物理', room: '实验楼 401' },
    { day: 1, period: 3, name: '形势与政策', room: '教二 110' },
    { day: 2, period: 0, name: '程序设计基础', room: '机房 A' },
    { day: 3, period: 1, name: '线性代数', room: '教一 205' },
    { day: 3, period: 4, name: '体育', room: '操场' },
    { day: 4, period: 2, name: '大学英语', room: '教三 307' },
  ],

  classTimetables: [
    { id: 'js2301', cls: '计算机科学与技术 2301', grade: '2023 级', tt: [
      { day: 0, period: 0, name: '数据结构', room: '教一 302' },
      { day: 0, period: 2, name: '大学英语', room: '教三 208' },
      { day: 1, period: 1, name: '操作系统', room: '实验楼 501' },
      { day: 2, period: 0, name: '高等数学', room: '教一 201' },
      { day: 3, period: 3, name: '体育', room: '操场' },
      { day: 4, period: 1, name: '计算机网络', room: '实验楼 403' },
    ]},
    { id: 'rj2402', cls: '软件工程 2402', grade: '2024 级', tt: [
      { day: 0, period: 1, name: '程序设计基础', room: '机房 B' },
      { day: 1, period: 0, name: '线性代数', room: '教一 205' },
      { day: 2, period: 2, name: '大学物理', room: '实验楼 401' },
      { day: 3, period: 0, name: '离散数学', room: '教二 108' },
      { day: 4, period: 3, name: '体育', room: '操场' },
    ]},
    { id: 'kj2302', cls: '会计学 2302', grade: '2023 级', tt: [
      { day: 0, period: 2, name: '中级财务会计', room: '教三 210' },
      { day: 1, period: 0, name: '高等数学', room: '教一 203' },
      { day: 2, period: 1, name: '管理学原理', room: '教二 305' },
      { day: 3, period: 2, name: '大学英语', room: '教三 208' },
      { day: 4, period: 0, name: '经济学基础', room: '教二 112' },
    ]},
    { id: 'dz2401', cls: '电子信息工程 2401', grade: '2024 级', tt: [
      { day: 0, period: 3, name: '电路分析', room: '实验楼 302' },
      { day: 1, period: 2, name: '高等数学', room: '教一 207' },
      { day: 2, period: 0, name: 'C 语言程序设计', room: '机房 A' },
      { day: 3, period: 1, name: '大学物理', room: '实验楼 401' },
      { day: 4, period: 2, name: '大学英语', room: '教三 305' },
    ]},
    { id: 'yy2303', cls: '英语 2303', grade: '2023 级', tt: [
      { day: 0, period: 0, name: '综合英语', room: '教三 402' },
      { day: 1, period: 3, name: '英语听力', room: '语音室 2' },
      { day: 2, period: 1, name: '英语写作', room: '教三 405' },
      { day: 3, period: 0, name: '第二外语', room: '教三 408' },
      { day: 4, period: 4, name: '体育', room: '操场' },
    ]},
    { id: 'gs2301', cls: '工商管理 2301', grade: '2023 级', tt: [
      { day: 0, period: 1, name: '管理学原理', room: '教二 301' },
      { day: 1, period: 2, name: '高等数学', room: '教一 209' },
      { day: 2, period: 3, name: '市场营销', room: '教二 306' },
      { day: 3, period: 0, name: '大学英语', room: '教三 208' },
      { day: 4, period: 1, name: '经济学基础', room: '教二 112' },
    ]},
  ],

  wechatList: [
    { name: '安行。', region: '美国边远小岛', qr: '/assets/qrcodes/1b2970e2bc194ee4957857b8d71702a1.jpg', id: '' },
    { name: 'Utopian.', region: '（未知地区）', qr: '/assets/qrcodes/3b46884a297647a5a3ab73b5ab132a77.jpg', id: '' },
    { name: 'Key13', region: '湖北武汉', qr: '/assets/qrcodes/0633cd3fee85a04b8c628bb5addaa357.jpg', id: '' },
  ],

  agents: [
    { icon: 'presentation', name: 'PPT制作Agent', desc: '输入主题，自动生成结构化大纲与精美设计稿。' },
    { icon: 'clapperboard', name: '视频制作Agent', desc: '脚本拆分、镜头脚本与字幕生成一站式完成。' },
  ],
};
