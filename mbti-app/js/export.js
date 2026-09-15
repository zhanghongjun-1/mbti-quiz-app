/**
 * MBTI 测评 - 结果导出功能
 *
 * 支持三种导出格式：
 * 1. JSON  - 完整结构化数据，可供汇总分析页导入
 * 2. 文本  - 人类可读的纯文本报告
 * 3. 图片  - 将结果页截图导出为 PNG
 */

// ===== 导出 JSON =====
function exportJSON() {
  if (!window.mbtiResult) return;

  const data = {
    ...window.mbtiResult,
    appVersion: "1.0.0",
    exportTime: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });
  downloadBlob(blob, `MBTI_${data.typeCode}_${formatDate()}.json`);
}

// ===== 导出文本 =====
function exportText() {
  if (!window.mbtiResult) return;
  const r = window.mbtiResult;

  let text = "";
  text += "════════════════════════════════\n";
  text += "      MBTI 性格测评报告\n";
  text += "════════════════════════════════\n\n";
  text += `类型代码：${r.typeCode}\n`;
  text += `类型名称：${r.name}\n`;
  text += `英文昵称：${r.nickname}\n`;
  text += `所属类别：${r.group}\n`;
  text += `测评时间：${r.timestamp}\n\n`;

  text += "──── 维度倾向 ────\n";
  for (const dim of ["E/I", "S/N", "T/F", "J/P"]) {
    const d = r.dimensions[dim];
    if (d) {
      text += `  ${d.first.letter}: ${d.first.pct}%  |  ${d.second.letter}: ${d.second.pct}%\n`;
    }
  }
  text += "\n";

  text += "──── 性格概述 ────\n";
  text += r.description + "\n\n";

  text += "──── 优势 ────\n";
  r.strengths.forEach((s, i) => {
    text += `  ${i + 1}. ${s}\n`;
  });
  text += "\n";

  text += "──── 劣势 ────\n";
  r.weaknesses.forEach((w, i) => {
    text += `  ${i + 1}. ${w}\n`;
  });
  text += "\n";

  text += "──── 代表人物 ────\n";
  text += r.celebrities.join("、") + "\n\n";

  text += "──── 职业建议 ────\n";
  text += r.careers.join("、") + "\n\n";

  text += "════════════════════════════════\n";
  text += "  本报告由 MBTI 性格测评程序生成\n";
  text += "════════════════════════════════\n";

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadBlob(blob, `MBTI_${r.typeCode}_${formatDate()}.txt`);
}

// ===== 导出图片（使用 Canvas 绘制） =====
function exportImage() {
  if (!window.mbtiResult) return;
  const r = window.mbtiResult;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 1000;

  // 背景
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let y = 60;

  // 标题
  ctx.fillStyle = "#6366f1";
  ctx.font = "bold 42px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(r.typeCode, canvas.width / 2, y);
  y += 36;

  // 类型名称
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 22px sans-serif";
  ctx.fillText(r.typeName, canvas.width / 2, y);
  y += 28;

  // 昵称
  ctx.fillStyle = "#64748b";
  ctx.font = "15px sans-serif";
  ctx.fillText(r.nickname + "  |  " + r.group, canvas.width / 2, y);
  y += 40;

  // 分割线
  drawDivider(ctx, canvas.width, y);
  y += 30;

  // 维度百分比
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("维度倾向", 60, y);
  y += 28;

  for (const dim of ["E/I", "S/N", "T/F", "J/P"]) {
    const d = r.dimensions[dim];
    if (!d) continue;

    // 左侧字母+百分比
    ctx.fillStyle = "#6366f1";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`${d.first.letter} ${d.first.pct}%`, 60, y);

    // 右侧字母+百分比
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "right";
    ctx.fillText(`${d.second.letter} ${d.second.pct}%`, canvas.width - 60, y);

    // 进度条
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(60, y + 6, canvas.width - 120, 10);
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(60, y + 6, (canvas.width - 120) * (d.first.pct / 100), 10);

    y += 36;
  }

  y += 10;
  drawDivider(ctx, canvas.width, y);
  y += 30;

  // 性格概述
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("性格概述", 60, y);
  y += 26;

  ctx.fillStyle = "#64748b";
  ctx.font = "15px sans-serif";
  y = drawWrappedText(ctx, r.description, 60, y, canvas.width - 120, 24);
  y += 20;

  // 优势
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("优势", 60, y);
  y += 26;
  ctx.fillStyle = "#64748b";
  ctx.font = "15px sans-serif";
  r.strengths.forEach((s, i) => {
    y = drawWrappedText(ctx, `${i + 1}. ${s}`, 60, y, canvas.width - 120, 22);
    y += 6;
  });
  y += 10;

  // 劣势
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("劣势", 60, y);
  y += 26;
  ctx.fillStyle = "#64748b";
  ctx.font = "15px sans-serif";
  r.weaknesses.forEach((w, i) => {
    y = drawWrappedText(ctx, `${i + 1}. ${w}`, 60, y, canvas.width - 120, 22);
    y += 6;
  });
  y += 10;

  // 职业建议
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("职业建议", 60, y);
  y += 26;
  ctx.fillStyle = "#64748b";
  ctx.font = "15px sans-serif";
  y = drawWrappedText(ctx, r.careers.join("、"), 60, y, canvas.width - 120, 22);

  // 底部水印
  y = canvas.height - 50;
  ctx.fillStyle = "#94a3b8";
  ctx.font = "13px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("本报告由 MBTI 性格测评程序生成", canvas.width / 2, y);

  // 下载
  canvas.toBlob(function(blob) {
    downloadBlob(blob, `MBTI_${r.typeCode}_${formatDate()}.png`);
  }, "image/png");
}

// ===== 辅助函数 =====
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${y}${m}${d}_${h}${min}`;
}

function drawDivider(ctx, canvasWidth, y) {
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(60, y);
  ctx.lineTo(canvasWidth - 60, y);
  ctx.stroke();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = text.split("");
  let line = "";
  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = chars[i];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, y);
  }
  return y + lineHeight;
}
