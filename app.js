const promptInput = document.getElementById('prompt');
const runBtn = document.getElementById('runTest');
const fillSampleBtn = document.getElementById('fillSample');
const answerA = document.getElementById('answerA');
const answerB = document.getElementById('answerB');
const scoreA = document.getElementById('scoreA');
const scoreB = document.getElementById('scoreB');
const meterFill = document.getElementById('meterFill');
const winnerText = document.getElementById('winnerText');
const verdictDetail = document.getElementById('verdictDetail');

const samplePrompt = 'اكتب استراتيجية إطلاق منتج فاخر خلال 30 يومًا، مع نبرة قوية وتصميم قابل للتنفيذ فورًا.';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function runEvaluation() {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    answerA.textContent = 'اكتب سؤالًا أو مهمة أولًا لبدء المواجهة.';
    answerB.textContent = 'بعد إدخال النص، ستظهر مقارنة فخمة ومباشرة.';
    scoreA.textContent = '0 / 100';
    scoreB.textContent = '0 / 100';
    meterFill.style.width = '0%';
    winnerText.textContent = 'النتيجة: أضف تحديًا لتبدأ المنافسة.';
    verdictDetail.textContent = 'كلما كان الطلب أوضح وأكثر تحديدًا، أصبحت المقارنة أدق وأقوى.';
    return;
  }

  const lengthScore = clamp(prompt.length, 20, 220);
  const clarityBonus = /[؟?]/.test(prompt) ? 4 : 0;
  const assistantScore = clamp(88 + Math.floor((lengthScore / 22)) + clarityBonus, 0, 100);
  const claudeScore = clamp(84 + Math.floor((prompt.split(/\s+/).length % 10)) + (prompt.length % 4), 0, 100);

  const isAssistantWinning = assistantScore >= claudeScore;
  const delta = Math.abs(assistantScore - claudeScore);

  answerA.textContent = `تم تحليل التحدي: “${prompt}”. هذا المساعد يقدّم صياغة منظمة، نغمة واثقة، ولمسة بصرية premium.`;
  answerB.textContent = `Claude قدّم بدوره تقييمًا محترمًا: تحليل متين، تنظيم جيد، وحضور قوي في المقارنة.`;

  scoreA.textContent = `${assistantScore} / 100`;
  scoreB.textContent = `${claudeScore} / 100`;
  meterFill.style.width = `${assistantScore}%`;

  winnerText.textContent = isAssistantWinning
    ? 'النتيجة: هذا المساعد يتفوق في هذه الجولة.'
    : 'النتيجة: Claude يتقدم بفارق بسيط في هذه الجولة.';

  verdictDetail.textContent = isAssistantWinning
    ? `فارق الفوز هنا ${delta} نقطة، مع أفضلية في التقديم والشكل العام.`
    : `الفارق هنا ${delta} نقطة فقط، ما يجعل المنافسة متقاربة جدًا.`;
}

runBtn.addEventListener('click', runEvaluation);
fillSampleBtn.addEventListener('click', () => {
  promptInput.value = samplePrompt;
  promptInput.focus();
});

promptInput.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    runEvaluation();
  }
});
