// Tab 切换逻辑
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    const target = this.getAttribute('data-target');
    document.getElementById('spoiler-tool').classList.toggle('hidden', target !== 'spoiler-tool');
    document.getElementById('meme-tool').classList.toggle('hidden', target !== 'meme-tool');
  };
});

document.getElementById('copy-btn').onclick = function() {
  const prompt = generatePrompt();
  if (!prompt) return;

  navigator.clipboard.writeText(prompt).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.innerText = "✅ 指令已复制";
    setTimeout(() => btn.innerText = "复制防剧透 Prompt", 2000);
  });
};

document.getElementById('jump-btn').onclick = function() {
  const prompt = generatePrompt();
  if (!prompt) return;

  // 复制内容
  navigator.clipboard.writeText(prompt);
  // 跳转到 Gemini 网页版
  window.open('https://gemini.google.com/app', '_blank');
};

function generatePrompt() {
  const activeTab = document.querySelector('.tab.active').getAttribute('data-target');

  if (activeTab === 'spoiler-tool') {
    // 防剧透逻辑
    const show = document.getElementById('showName').value || "当前剧集";
    const ep = document.getElementById('episode').value || "当前进度";
    const question = document.getElementById('userQuestion').value;
    if (!question) { alert("请输入问题"); return null; }

    return `你现在是一个专业的防剧透剧迷助手。
用户进度：看完了《${show}》的 ${ep}。
回答原则：严禁提及该进度之后的情节。
我的问题是：${question}`;

  } else {
    // 老年人表情包逻辑
    const text = document.getElementById('memeText').value || "祝你平安";
    const opts = Array.from(document.querySelectorAll('.meme-opt:checked')).map(el => el.value);
    
    return `你现在是一个精通2000年代中国社交网络审美的视觉设计师。
请生成一张典型的“中老年祝福表情包”，视觉特征必须严守以下标准：

1. **构图与素材**：不要写意的绘画，要使用【高清晰度的写实摄影素材】进行【生硬的拼贴】。画面应具有明显的素材堆砌感，素材之间不需要光影统一。
2. **核心文字**：文字内容为“${text}”。必须使用【早年 Windows Word 艺术字风格】：厚重的3D立体效果、金光闪闪的斜面棱角、彩虹色渐变填充、极粗的红色或黑色描边。
3. **视觉元素**：${opts.length > 0 ? "重点加入" + opts.join('、') : "背景使用壮丽的山水或荷花摄影图"}。
4. **色彩与特效**：极高的色彩饱和度。加入大量的【闪烁金光】、【七彩极光】或【动态粒子】特效。
5. **画质感受**：具有2000年代数码产品的质感，像是一张充满诚意的电子贺卡，氛围要极其正能量、喜庆且庄重。

直接输出这张具有年代感的拼贴风格图像。`;
  }
}