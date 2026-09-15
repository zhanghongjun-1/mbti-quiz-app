/**
 * MBTI 交互原型 - 交互逻辑
 *
 * 功能：
 * 1. 四屏切换（欢迎页 / 答题页 / 结果页 / 汇总分析页）
 * 2. 答题模拟（精选6题演示，支持选择/翻页/进度条）
 * 3. Toast 提示（模拟导出、清空等操作反馈）
 */

// ===== 精选演示题目（从28题中抽6题，每维度各1-2题） =====
const PROTO_QUESTIONS = [
  { text: "参加聚会时，你更倾向于：", dim: "E/I 外向/内向", A: "主动和很多人交谈，认识新朋友让你兴奋", B: "和少数几个熟人待在一起，人太多会消耗你的精力" },
  { text: "读一本书时，你更喜欢：", dim: "S/N 实感/直觉", A: "按部就班，从头到尾循序渐进地读", B: "先翻看目录和结论，跳着读感兴趣的部分" },
  { text: "朋友向你倾诉烦恼时，你的第一反应是：", dim: "T/F 思考/情感", A: "帮他分析问题，给出理性建议", B: "先理解他的感受，给予情感上的支持和安慰" },
  { text: "面对一个任务，你更倾向于：", dim: "J/P 判断/感知", A: "制定详细计划，按步骤执行，尽早完成", B: "保持灵活，边做边调整，deadline前冲刺完成" },
  { text: "你更关注什么样的信息？", dim: "S/N 实感/直觉", A: "具体的事实、细节和可验证的数据", B: "事物之间的联系、可能性和未来趋势" },
  { text: "做决定时，你更看重：", dim: "T/F 思考/情感", A: "客观逻辑和利弊分析", B: "这个决定对相关人员的影响和感受" }
];

let protoQIndex = 0;
let protoAnswers = new Array(PROTO_QUESTIONS.length).fill(null);

// ===== 屏幕切换 =====
function switchScreen(name) {
  // 切换屏幕
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screen = document.getElementById("screen-" + name);
  if (screen) screen.classList.add("active");

  // 更新顶栏导航按钮
  document.querySelectorAll(".screen-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.screen === name);
  });

  // 滚动到顶部
  document.getElementById("phone-screen").scrollTop = 0;

  // 进入答题页时初始化第一题
  if (name === "quiz") {
    protoQIndex = 0;
    protoAnswers = new Array(PROTO_QUESTIONS.length).fill(null);
    renderProtoQuestion();
  }
}

// ===== 答题渲染 =====
function renderProtoQuestion() {
  const q = PROTO_QUESTIONS[protoQIndex];
  const total = PROTO_QUESTIONS.length;

  // 进度条
  const progress = ((protoQIndex + 1) / total) * 100;
  document.getElementById("proto-progress").style.width = progress + "%";

  // 题号与维度
  document.getElementById("proto-q-index").textContent =
    "第 " + (protoQIndex + 1) + " / " + total + " 题";
  document.getElementById("proto-q-dim").textContent = q.dim;

  // 题干
  document.getElementById("proto-q-text").textContent = q.text;

  // 选项
  const container = document.getElementById("proto-options");
  container.innerHTML =
    '<button class="option-btn" onclick="selectProtoOption(this, \'A\')">' +
      '<span class="marker">A</span><span>' + q.A + '</span>' +
    '</button>' +
    '<button class="option-btn" onclick="selectProtoOption(this, \'B\')">' +
      '<span class="marker">B</span><span>' + q.B + '</span>' +
    '</button>';

  // 恢复已选状态
  if (protoAnswers[protoQIndex]) {
    const btns = container.querySelectorAll(".option-btn");
    if (protoAnswers[protoQIndex] === "A") btns[0].classList.add("selected");
    else btns[1].classList.add("selected");
  }

  // 按钮状态
  const nextBtn = document.getElementById("proto-next-btn");
  nextBtn.textContent = protoQIndex === total - 1 ? "查看结果" : "下一题";
  nextBtn.disabled = protoAnswers[protoQIndex] === null;
  nextBtn.style.opacity = protoAnswers[protoQIndex] === null ? "0.5" : "1";
}

// ===== 选项选择 =====
function selectProtoOption(btn, option) {
  protoAnswers[protoQIndex] = option;

  // 更新样式
  const container = document.getElementById("proto-options");
  container.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  // 启用下一题
  const nextBtn = document.getElementById("proto-next-btn");
  nextBtn.disabled = false;
  nextBtn.style.opacity = "1";
}

// ===== 上一题 =====
function protoPrev() {
  if (protoQIndex > 0) {
    protoQIndex--;
    renderProtoQuestion();
  }
}

// ===== 下一题 / 查看结果 =====
function protoNext() {
  if (protoAnswers[protoQIndex] === null) return;

  if (protoQIndex < PROTO_QUESTIONS.length - 1) {
    protoQIndex++;
    renderProtoQuestion();
  } else {
    // 跳转结果页
    protoToast("测评完成！正在生成报告...");
    setTimeout(function() {
      switchScreen("result");
    }, 800);
  }
}

// ===== Toast 提示 =====
var protoToastTimer = null;
function protoToast(msg) {
  var toast = document.getElementById("proto-toast");
  toast.textContent = msg;
  toast.classList.add("show");

  if (protoToastTimer) clearTimeout(protoToastTimer);
  protoToastTimer = setTimeout(function() {
    toast.classList.remove("show");
  }, 2200);
}
