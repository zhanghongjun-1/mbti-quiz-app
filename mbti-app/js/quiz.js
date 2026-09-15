/**
 * MBTI 测评 - 答题与计分逻辑
 *
 * 核心流程：欢迎页 → 答题页 → 结果页
 * 计分方式：每个维度 7 题，A 选项 = 第一个字母（E/S/T/J），B 选项 = 第二个字母（I/N/F/P）
 * 根据各维度 A/B 比例确定最终类型
 */

// ===== 状态管理 =====
let currentQuestion = 0;       // 当前题目索引 (0-27)
let answers = new Array(28).fill(null);  // 用户答案，null = 未答，'A' 或 'B'

// 维度映射：A 选项对应的第一字母，B 选项对应的第二字母
const DIMENSION_MAP = {
  "E/I": { A: "E", B: "I" },
  "S/N": { A: "S", B: "N" },
  "T/F": { A: "T", B: "F" },
  "J/P": { A: "J", B: "P" }
};

// 维度中文名
const DIMENSION_LABELS = {
  "E/I": "E/I 外向/内向",
  "S/N": "S/N 实感/直觉",
  "T/F": "T/F 思考/情感",
  "J/P": "J/P 判断/感知"
};

// ===== 页面切换 =====
function showSection(id) {
  // 隐藏欢迎页
  document.getElementById("welcome-section").classList.add("hidden");
  // 隐藏所有 section
  document.querySelectorAll("#quiz-section, #result-section").forEach(s => s.classList.remove("active"));
  // 显示目标 section
  if (id === "welcome-section") {
    document.getElementById("welcome-section").classList.remove("hidden");
  } else {
    document.getElementById(id).classList.add("active");
  }
}

// ===== 开始测评 =====
function startQuiz() {
  currentQuestion = 0;
  answers = new Array(28).fill(null);
  showSection("quiz-section");
  renderQuestion();
}

// ===== 渲染题目 =====
function renderQuestion() {
  const q = QUESTIONS[currentQuestion];

  // 进度条
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  document.getElementById("progress-fill").style.width = progress + "%";

  // 题号与维度
  document.getElementById("question-index").textContent =
    "第 " + (currentQuestion + 1) + " / " + QUESTIONS.length + " 题";
  document.getElementById("dimension-label").textContent =
    DIMENSION_LABELS[q.dimension] || q.dimension;

  // 题干
  document.getElementById("question-text").textContent = q.text;

  // 选项
  document.getElementById("option-a-text").textContent = q.options.A;
  document.getElementById("option-b-text").textContent = q.options.B;

  // 恢复已选状态
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach(btn => btn.classList.remove("selected"));

  if (answers[currentQuestion] === "A") {
    optionBtns[0].classList.add("selected");
  } else if (answers[currentQuestion] === "B") {
    optionBtns[1].classList.add("selected");
  }

  // 按钮状态
  document.getElementById("prev-btn").disabled = currentQuestion === 0;
  document.getElementById("next-btn").disabled = answers[currentQuestion] === null;

  // 最后一题改为"查看结果"
  if (currentQuestion === QUESTIONS.length - 1) {
    document.getElementById("next-btn").textContent = "查看结果";
  } else {
    document.getElementById("next-btn").textContent = "下一题";
  }
}

// ===== 选择选项 =====
function selectOption(option) {
  answers[currentQuestion] = option;

  // 更新选中样式
  const optionBtns = document.querySelectorAll(".option-btn");
  optionBtns.forEach(btn => btn.classList.remove("selected"));
  if (option === "A") {
    optionBtns[0].classList.add("selected");
  } else {
    optionBtns[1].classList.add("selected");
  }

  // 启用下一题按钮
  document.getElementById("next-btn").disabled = false;
}

// ===== 上一题 =====
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

// ===== 下一题 / 查看结果 =====
function nextQuestion() {
  if (answers[currentQuestion] === null) return;

  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    // 最后一题，计算结果
    showResult();
  }
}

// ===== 计分并展示结果 =====
function showResult() {
  // 统计各维度得分
  const scores = {
    "E/I": { first: 0, second: 0 },
    "S/N": { first: 0, second: 0 },
    "T/F": { first: 0, second: 0 },
    "J/P": { first: 0, second: 0 }
  };

  QUESTIONS.forEach((q, i) => {
    const dim = q.dimension;
    if (answers[i] === "A") {
      scores[dim].first++;
    } else if (answers[i] === "B") {
      scores[dim].second++;
    }
  });

  // 确定类型代码
  let typeCode = "";
  const dimPercentages = {};

  for (const dim of ["E/I", "S/N", "T/F", "J/P"]) {
    const total = scores[dim].first + scores[dim].second;
    if (total === 0) continue;

    const firstPct = Math.round((scores[dim].first / total) * 100);
    const secondPct = 100 - firstPct;

    if (scores[dim].first >= scores[dim].second) {
      typeCode += DIMENSION_MAP[dim].A;
    } else {
      typeCode += DIMENSION_MAP[dim].B;
    }

    dimPercentages[dim] = {
      first: { letter: DIMENSION_MAP[dim].A, pct: firstPct },
      second: { letter: DIMENSION_MAP[dim].B, pct: secondPct }
    };
  }

  // 获取类型数据
  const typeData = MBTI_TYPES[typeCode];
  if (!typeData) {
    alert("无法识别类型：" + typeCode + "，请检查答题是否完整。");
    return;
  }

  // 渲染结果
  document.getElementById("result-code").textContent = typeData.code;
  document.getElementById("result-name").textContent = typeData.name;
  document.getElementById("result-nickname").textContent = typeData.nickname;
  document.getElementById("result-group").textContent = typeData.group;
  document.getElementById("result-description").textContent = typeData.description;

  // 优势列表
  const strengthsUl = document.getElementById("result-strengths");
  strengthsUl.innerHTML = "";
  typeData.strengths.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    strengthsUl.appendChild(li);
  });

  // 劣势列表
  const weaknessesUl = document.getElementById("result-weaknesses");
  weaknessesUl.innerHTML = "";
  typeData.weaknesses.forEach(w => {
    const li = document.createElement("li");
    li.className = "weakness";
    li.textContent = w;
    weaknessesUl.appendChild(li);
  });

  // 代表人物
  const celebritiesDiv = document.getElementById("result-celebrities");
  celebritiesDiv.innerHTML = "";
  typeData.celebrities.forEach(c => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = c;
    celebritiesDiv.appendChild(tag);
  });

  // 职业建议
  const careersDiv = document.getElementById("result-careers");
  careersDiv.innerHTML = "";
  typeData.careers.forEach(c => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = c;
    careersDiv.appendChild(tag);
  });

  // 维度百分比条
  renderDimensionBars(dimPercentages);

  // 保存到全局变量供导出使用
  window.mbtiResult = {
    typeCode: typeData.code,
    typeName: typeData.name,
    nickname: typeData.nickname,
    group: typeData.group,
    description: typeData.description,
    strengths: typeData.strengths,
    weaknesses: typeData.weaknesses,
    celebrities: typeData.celebrities,
    careers: typeData.careers,
    dimensions: dimPercentages,
    answers: answers.slice(),
    timestamp: new Date().toISOString()
  };

  // 切换到结果页
  showSection("result-section");
  window.scrollTo(0, 0);
}

// ===== 渲染维度百分比条 =====
function renderDimensionBars(dimPercentages) {
  const container = document.getElementById("dim-bars-container");
  container.innerHTML = "";

  for (const dim of ["E/I", "S/N", "T/F", "J/P"]) {
    const data = dimPercentages[dim];
    if (!data) continue;

    const barDiv = document.createElement("div");
    barDiv.className = "dim-bar";
    barDiv.innerHTML = `
      <div class="dim-bar-labels">
        <span class="left">${data.first.letter} ${data.first.pct}%</span>
        <span class="right">${data.second.letter} ${data.second.pct}%</span>
      </div>
      <div class="dim-bar-track">
        <div class="dim-bar-fill" style="width: ${data.first.pct}%"></div>
      </div>
    `;
    container.appendChild(barDiv);
  }
}

// ===== 重新测评 =====
function restartQuiz() {
  currentQuestion = 0;
  answers = new Array(28).fill(null);
  showSection("welcome-section");
  window.scrollTo(0, 0);
}
