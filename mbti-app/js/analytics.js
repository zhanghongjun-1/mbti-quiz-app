/**
 * MBTI 汇总分析 - 多人数据导入与统计
 *
 * 功能：
 * 1. 支持点击和拖拽导入多个 JSON 结果文件
 * 2. 统计总人数、类型分布、维度分布
 * 3. 按人数降序展示
 */

let importedRecords = [];

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", function() {
  const uploadArea = document.getElementById("upload-area");
  const fileInput = document.getElementById("file-input");

  // 点击上传
  uploadArea.addEventListener("click", function() {
    fileInput.click();
  });

  fileInput.addEventListener("change", function(e) {
    handleFiles(e.target.files);
  });

  // 拖拽上传
  uploadArea.addEventListener("dragover", function(e) {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", function(e) {
    uploadArea.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", function(e) {
    e.preventDefault();
    uploadArea.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });
});

// ===== 处理文件 =====
function handleFiles(files) {
  let loaded = 0;
  let failed = 0;
  const total = files.length;

  if (total === 0) return;

  Array.from(files).forEach(function(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.typeCode && data.dimensions) {
          importedRecords.push(data);
          loaded++;
        } else {
          failed++;
        }
      } catch (err) {
        failed++;
      }

      // 所有文件处理完毕后渲染
      if (loaded + failed === total) {
        if (loaded > 0) {
          renderAnalytics();
        }
        if (failed > 0) {
          alert("成功导入 " + loaded + " 个文件，" + failed + " 个文件格式无效。");
        }
      }
    };
    reader.readAsText(file);
  });
}

// ===== 渲染分析结果 =====
function renderAnalytics() {
  document.getElementById("analytics-result").style.display = "block";

  // --- 统计概览 ---
  const typeCount = {};
  const dimCount = {
    "E/I": { E: 0, I: 0 },
    "S/N": { S: 0, N: 0 },
    "T/F": { T: 0, F: 0 },
    "J/P": { J: 0, P: 0 }
  };

  importedRecords.forEach(function(r) {
    typeCount[r.typeCode] = (typeCount[r.typeCode] || 0) + 1;

    for (const dim of ["E/I", "S/N", "T/F", "J/P"]) {
      if (r.dimensions && r.dimensions[dim]) {
        const d = r.dimensions[dim];
        const firstLetter = d.first.letter;
        const secondLetter = d.second.letter;
        // 用百分比加权：first 占 first.pct%，second 占 second.pct%
        // 但对于"人数"统计，我们按主导倾向计算
        if (d.first.pct >= d.second.pct) {
          dimCount[dim][firstLetter]++;
        } else {
          dimCount[dim][secondLetter]++;
        }
      }
    }
  });

  const total = importedRecords.length;

  // 概览卡片
  const statGrid = document.getElementById("stat-grid");
  statGrid.innerHTML = "";

  const statItems = [
    { num: total, label: "总人数" },
    { num: Object.keys(typeCount).length, label: "类型数" },
    { num: getMostCommon(typeCount).code, label: "最常见类型" },
    { num: getMostCommon(typeCount).count, label: "该类型人数" }
  ];

  statItems.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `
      <div class="stat-num">${item.num}</div>
      <div class="stat-label">${item.label}</div>
    `;
    statGrid.appendChild(card);
  });

  // --- 类型分布表 ---
  const distTbody = document.getElementById("dist-tbody");
  distTbody.innerHTML = "";

  const sortedTypes = Object.entries(typeCount).sort(function(a, b) {
    return b[1] - a[1];
  });

  sortedTypes.forEach(function(entry) {
    const code = entry[0];
    const count = entry[1];
    const pct = ((count / total) * 100).toFixed(1);
    const typeData = MBTI_TYPES[code];
    const name = typeData ? typeData.name : "未知";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="type-code">${code}</td>
      <td>${name}</td>
      <td>${count}</td>
      <td>${pct}%</td>
      <td class="bar-cell">
        <div class="mini-bar">
          <div class="mini-fill" style="width: ${pct}%"></div>
        </div>
      </td>
    `;
    distTbody.appendChild(tr);
  });

  // --- 维度分布表 ---
  const dimTbody = document.getElementById("dim-tbody");
  dimTbody.innerHTML = "";

  const dimLabels = {
    "E/I": "外向/内向",
    "S/N": "实感/直觉",
    "T/F": "思考/情感",
    "J/P": "判断/感知"
  };

  for (const dim of ["E/I", "S/N", "T/F", "J/P"]) {
    const letters = Object.keys(dimCount[dim]);
    letters.forEach(function(letter) {
      const count = dimCount[dim][letter];
      const pct = ((count / total) * 100).toFixed(1);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${dimLabels[dim]}</td>
        <td class="type-code">${letter}</td>
        <td>${count}</td>
        <td>${pct}%</td>
        <td class="bar-cell">
          <div class="mini-bar">
            <div class="mini-fill" style="width: ${pct}%"></div>
          </div>
        </td>
      `;
      dimTbody.appendChild(tr);
    });
  }
}

// ===== 辅助：获取最常见类型 =====
function getMostCommon(typeCount) {
  let maxCode = "-";
  let maxCount = 0;
  for (const code in typeCount) {
    if (typeCount[code] > maxCount) {
      maxCount = typeCount[code];
      maxCode = code;
    }
  }
  return { code: maxCode, count: maxCount };
}

// ===== 清空数据 =====
function clearData() {
  importedRecords = [];
  document.getElementById("analytics-result").style.display = "none";
  document.getElementById("file-input").value = "";
}
