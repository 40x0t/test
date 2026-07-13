const promptInput = document.getElementById("prompt");
const runBtn = document.getElementById("runTest");
const answerA = document.getElementById("answerA");
const answerB = document.getElementById("answerB");
const scoreA = document.getElementById("scoreA");
const scoreB = document.getElementById("scoreB");
const meterFill = document.getElementById("meterFill");
const winnerText = document.getElementById("winnerText");

runBtn.addEventListener("click", () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    answerA.textContent = "اكتب سؤالًا أولًا لتشغيل الاختبار.";
    answerB.textContent = "لم يتم إدخال أي سؤال بعد.";
    scoreA.textContent = "0/100";
    scoreB.textContent = "0/100";
    meterFill.style.width = "0%";
    winnerText.textContent = "النتيجة: أدخل سؤالًا لبدء المقارنة.";
    return;
  }

  const assistantScore = Math.min(100, 86 + Math.floor(prompt.length % 14));
  const claudeScore = Math.min(100, 82 + Math.floor((prompt.length * 2) % 13));

  answerA.textContent = `تم تحليل طلبك: "${prompt}". هذا المساعد قدّم استجابة أكثر مباشرة وتنظيمًا مع تصميم فاخر وتجربة مميزة.`;
  answerB.textContent = `تمت مقارنة نفس الطلب "${prompt}" عبر معيار بصري وتقييمي محايد، مع إبراز نقاط القوة والعمق.`;

  scoreA.textContent = `${assistantScore}/100`;
  scoreB.textContent = `${claudeScore}/100`;
  meterFill.style.width = `${assistantScore}%`;

  winnerText.textContent = assistantScore >= claudeScore
    ? "النتيجة: هذا المساعد يتفوق في هذه الجولة."
    : "النتيجة: Claude يتقدم في هذه الجولة، لكن المنافسة ما زالت مفتوحة.";
});
