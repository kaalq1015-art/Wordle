import React, { useState, useEffect, useCallback } from 'react';
import { Share2, BarChart2, X, HelpCircle } from 'lucide-react';

// القاموس المدمج (خماسية فقط)
const RAW_INPUT = [
  "طاولة", "مكتبة", "تفاحة", "خزانة", "نافذة", "شاشات", "أبواب", "أقلام", "أوراق", "دفاتر", "مسطرة", "مفتاح", "سيارة", "طيارة", "دراجة", "حافلة", "شاحنة", "باخرة", "سفينة", "محطات", "مدينة", "قريات", "حديقة", "غابات", "صحراء", "هضبات", "أنهار", "أمواج", "كواكب", "قمرات", "أشعات", "أتربة", "أحجار", "أشجار", "أزهار", "وردات", "نخلات", "أعناب", "موزات", "جزرات", "بصلات", "ليمون", "خوخات", "توتات", "رمانة", "بطيخة", "قمصان", "فستان", "معاطف", "قبعات", "أحذية", "جوارب", "شنطات", "ساعات", "الورد", "صابون", "منديل", "منشفة", "وسادة", "ألحفة", "سجادة", "مرايا", "لوحات", "ذهبية", "فضيات", "خواتم", "قلادة", "أساور", "أطباء", "مهندس", "أستاذ", "تلميذ", "علماء", "أدباء", "فقهاء", "أمراء", "خبراء", "أوطان", "كيميا", "رسمات", "سباحة", "رماية", "تجارة", "أموال", "معادن", "ألماظ", "ياقوت", "مرجان", "أصداف", "بركان", "زلزال", "إعصار", "إيمان", "إسلام", "صلوات", "صدقات", "مساجد", "عبادة", "إخلاص", "أمانة",
  "قادمة", "ذاهبة", "عالمة", "جاهلة", "كاتبة", "قارئة", "ناجحة", "فاشلة", "صابرة", "شاكرة", "حامدة", "راكعة", "ساجدة", "صائمة", "قائمة", "نائمة", "جالسة", "واقفة", "سارحة", "غارقة", "طافية", "عالية", "دانية", "غالية", "بالية", "تالية", "ماشية", "باقية", "فانية", "راضية", "قاضية", "ماضية", "آتية", "بادية", "خافية", "صافية", "كافية", "وافية", "رانية", "شادية", "هادية", "نادية", "فادية", "باهرة", "زاهرة", "طاهرة", "ناضرة", "قاهرة", "ناصرة", "شاغرة", "فاخرة", "ساخرة", "ماكرة", "ذاكرة", "حائرة", "ثائرة", "سائرة", "جائرة", "غائرة", "طائرة", "حارسة", "فارسة", "دارسة", "غارسة", "لابسة", "يابسة", "عابسة", "عابرة", "جابرة", "كابرة", "غامرة", "ثامرة", "ناعمة", "غانمة", "سالمة", "حالمة", "ظالمة", "حازمة", "عازمة", "جازمة", "قاصمة", "عاصمة", "خاتمة", "كاتمة", "كاظمة", "ناظمة", "فاهمة", "داهمة", "ساهمة", "نادمة", "خادمة", "صادمة", "رادمة", "واهمة", "ناهمة", "شاتمة", "هازمة", "لازمة", "وازنة", "ضامنة",
  "مكتوب", "مكسور", "منقول", "مقبول", "مرفوض", "محمول", "مرسوم", "مسؤول", "مجهول", "معلوم", "مطلوب", "مظلوم", "منظور", "مسرور", "مشكور", "مغفور", "منشور", "محظور", "مبتور", "مسحور", "تدريب", "تعليم", "تطوير", "تصميم", "تصوير", "تنظيم", "تنسيق", "توزيع", "توقيع", "توفير", "تركيب", "ترتيب", "ترحيب", "ترشيح", "تعريف", "تحقيق", "تحويل", "تعديل", "تقديم", "تقرير", "أحلام", "أخبار", "أسرار", "أنوار", "ألوان", "ألحان", "أرقام", "أصحاب", "أصوات", "أضواء", "أطفال", "أعمال", "أفلام",
  "انتقل", "انتصر", "انتشر", "اشتهر", "استمع", "ابتعد", "اقترب", "اعتذر", "اعترف", "اعتقد", "اختبر", "اخترع", "اختلف", "اكتشف", "اكتمل", "التزم", "التحق", "انفجر", "انطلق", "انكسر", "أقبلت", "أدخلت", "أخرجت", "أرسلت", "أعلمت", "أكرمت", "أمهلت", "أهملت", "أوجعت", "أوقفت", "أوصلت", "أنزلت", "أبصرت", "أضاعت", "أقامت", "أفادت", "أجابت", "أعادت", "أرادت", "أنارت", "يشارك", "يتابع", "يساهم", "يحاول", "يساعد", "يشجع", "يؤيد", "يحاور", "يسافر", "يراقب", "ينافس", "يهاجم", "يدافع", "يشاهد", "تتحدث", "تتصرف", "تتعلم", "تتذكر", "تتمنى", "تتوقع", "تتردد", "تتغير", "تتحسن", "تتقدم", "يستلم", "يستند", "يستعد", "يستمع", "يستبق", "يستتر", "يستحم", "يستوي", "يسترق", "يستفز", "يتحدث", "يتعلم", "يتألم", "يتمتع", "يتجمع", "يتفرع", "يتوسع", "يتسلق", "يتألق", "يتتدرب", "يترتب", "يتطلب", "مقاتل", "مشاهد", "مساعد", "متابع", "مدافع", "مهاجم", "منافس", "مراقب", "مسافر", "مجاهد", "مبادر", "مباشر", "مغامر", "محاور", "محارب", "مساهم", "مشابه", "مطابق", "معالج", "مكاتب", "ملاعب", "مطاعم", "مصانع", "مزارع", "مناهج", "مباهج", "مسارح", "مسابح", "مقاعد", "مخابز", "متاجر", "مراكز", "مواقع", "مواجع", "مدامع", "مخازن", "معابد", "مجالس", "قواعد", "فوائد", "فرائد", "جرائد", "قصائد", "فرائض", "عوائد", "زوائد", "شوارد", "نوافذ", "حوافز", "قوافل", "حوافل", "عوالم", "عواصم", "قواسم", "لوازم", "هواجس", "فوارق", "طبيعة", "وسيمة", "كريمة", "رحيمة", "حكيمة", "عليمة", "عظيمة", "قديمة", "حديثة", "سريعة", "بطيئة", "خفيفة", "ثقيلة", "جميلة", "قبيحة", "طويلة", "قصيرة", "بعيدة", "قريبة", "نظيفة", "رقيقة", "عميقة", "غريقة", "حريقة", "طريقة", "حديقة", "شقيقة", "رفيقة", "عشيقة", "صديقة", "عتيقة", "رشيقة", "دقيقة", "حقيقة", "وثيقة", "خليفة", "ظريفة", "لطيفة", "شريفة", "عفيفة", "مخيفة", "أليفة", "منيرة", "مثيرة", "قديرة", "بصيرة", "شهيرة", "حقيرة", "رهينة", "مذيعة", "معلقة", "موظفة", "مدربة", "ممرضة", "مصورة", "مؤلفة", "مخرجة", "منتجة", "ممثلة", "مغنية", "عازفة", "راقصة", "خبازة", "جزارة", "طباخة", "حلاقة", "خياطة", "غسالة", "كواية", "سواقة", "دلالة", "عمالة", "بطالة", "جهالة", "سفالة", "نذالة", "أصالة", "بسالة", "عدالة", "حمالة", "زمالة", "كفالة", "وكالة", "إقالة", "إمالة", "إطالة", "إزالة", "إعالة", "إدانة", "إهانة", "إعانة", "إبانة", "إباحة", "إشاعة", "إضاعة", "إراقة", "إفاقة", "أثواب", "أحواض", "أدوات", "أذواق", "أرباح", "أرزاق", "أزمان", "أسراب", "أسعار", "أسلاك", "أشواط", "أصهار", "أصناف", "أصول", "أضلاع", "أطراف", "أطنان", "أعصاب", "أعضاء", "أعواد", "أغصان", "أفراد", "أفران", "أفعال", "أفواه", "أقدار", "أقسام", "أقطار", "أكياس", "ألعاب", "ألقاب", "ألياف", "أمثال", "أمراض", "أمصار", "أنسجة", "أنصار", "أنعام", "أنفاس", "أهداف", "أهوال", "أوتار", "أوقات", "أوعية", "أوهام", "أنياب", "أيتام", "أيامى", "أبناء", "مراعي", "ملاهي", "مقاهي", "نوادي", "صحارى", "فلوات", "هضبات", "بحيرة", "جزيرة", "منارة", "مغارة", "قمامة", "كرامة", "شهامة", "ضخامة", "وسامة", "جسامة", "فخامة", "كمامة", "عمامة", "غمامة", "ملامة", "قيامة", "إقامة", "وسادة", "قلادة", "عيادة", "إبادة", "إفادة", "إرادة", "إجادة", "هبابة", "دبابة", "سبابة", "عبابة", "بوابة", "جذابة", "خلابة", "نسابة", "مرابة", "ضرابة", "غرابة", "قرابة", "صلابة", "رطابة", "خطابة", "ذؤابة", "حرارة", "شرارة", "قرارة", "زمردة", "لؤلؤة", "فيروز", "نسرين", "ريحان", "صنوبر", "زيتون", "جوافة", "كرزات", "عنبات", "خوخات", "ميدان", "عنوان", "ديوان", "فرسان", "غزلان", "جدران", "كتمان", "حرمان", "نسيان", "هذيان", "شيبان", "إنسان", "مناهل", "مواكب", "مباهج", "مفاتح", "عاقلة", "فاضلة", "كاملة", "شاملة", "عادلة", "قادرة", "نادرة", "ماهرة", "غافرة", "ظافرة", "أقمار", "أمتار", "أبصار", "أعمار", "أخطار", "أوزار", "أشرار", "أحرار", "بصيرة", "عشيرة", "كبيرة", "صغيرة", "أبدية", "غالبة", "فجاءة", "ملابس", "ستائر", "وسائد", "قلائد", "قصائد", "فرائد", "شوارد", "زوائد", "عوائد", "موائد", "وسائط", "خرائط", "حوائط", "شرائط", "سبائك", "أرائك", "أوائل", "أصايل", "ثقافة", "حضارة", "مهارة", "ريادة", "سيادة", "سعادة", "شحادة", "شهادة", "قيادة", "تاريخ", "فلسفة", "برمجة", "تطبيق", "تحديث", "تنبيه", "تفاعل", "تخزين", "تحميل", "تشفير", "إتقان", "تصدير", "توريد", "تجهيز", "تقدير", "تمثيل", "تأكيد", "عجائب", "غرائب", "فضائل", "لطائف", "مصائب", "ضرائب", "عقائب", "رقائق", "دقائق", "حقائق", "مرفوع", "مدعوم", "مشدود", "مسدود", "مهروس", "منفوش", "مدهوش", "مكبوت", "مرصود", "مقدود", "مديرة", "وزيرة", "شهيرة", "أميرة", "فقيرة", "نصيرة", "بصيرة", "منيرة", "سفيرة", "جزيرة", "أولياء", "أتقياء", "أصفياء", "أوفياء", "أدعية", "أنبياء", "أوصياء", "أحياء", "أشياء", "أعباء", "بصارة", "دعامة", "زرافة", "حصادة", "كمامة", "مدرعة", "قنبلة", "غواصة", "مذياع", "تلفاز", "تفسير", "تخدير", "تأطير", "تلوين", "تأمين", "توطين", "تسكين", "تلقين", "تمديد", "تحديد", "ألباب", "أرباب", "أنساب", "أعتاب", "أطياب", "أحباب", "أغراب", "أذناب", "أحفاد", "أجداد", "عقلاء", "كرماء", "بخلاء", "جهلاء", "سفهاء", "رحماء", "زعماء", "حكماء", "عظماء", "قدماء", "مضخة", "مقبرة", "مغسلة", "مدفئة", "مروحة", "منقلة", "مسبار", "منظار", "محرار", "مزمار", "مسمار", "مسبحة", "معصرة", "أوجاع", "أوضاع", "أتباع", "أشياع", "أنواع", "أرباع", "إيقاع", "إسماع", "إتحاف", "إضعاف", "إتلاف", "أطياف", "أصياف", "أكتاف", "ألطاف", "أحلاف", "أخلاف", "أوصاف", "أكناف", "أعناق", "أحداق", "أعماق", "أرزاق", "أعذاق", "أرياف", "حيوان", "عدوان", "أعوان", "إخوان", "رهوان", "صفوان", "علوان", "نشوان", "بهوان", "غضبان", "يقابل", "يقاتل", "يغازل", "يناضل", "يواصل", "يعادل", "يجامل", "يعالج", "يحاذر", "يباغت", "تغادر", "تحاول", "تراسل", "تجادل", "تقاوم", "تداوم", "تذاكر", "تراكم", "تباكر", "ساعات", "قارات", "برقوق", "فلفلة", "قناعة", "شجاعة", "مناعة", "وضاعة", "وداعة", "صناعة", "زراعة", "براعة", "دينية", "وطنية", "علمية", "أدبية", "خلفية", "بحرية", "أطباق", "أبراق", "أشداق", "أنماط", "أرهاط", "أفساط", "أوساط", "أمشاط", "أنباط", "أبساط", "أحواط", "أخطاط", "أخلاط", "أقساط", "أغلاط", "أبواغ", "أصباغ", "الذهب", "الفضة", "الشمس", "القمر", "النجم", "الجبل", "البحر", "النهر", "السهل", "الغيم", "المطر", "الثلج", "البرد", "الرعد", "البرق", "الريح", "الفجر", "الصبح", "الظهر", "العصر", "الوقت", "العمر", "اليوم", "الليل", "الضوء", "النور", "العين", "الأنف", "الأذن", "الوجه", "الرأس", "البطن", "القدم", "الساق", "القلب", "العقل", "الروح", "النفس", "الجلد", "العظم", "اللحم", "العصب", "اللبن", "الماء", "الملح", "الزيت", "التمر", "الخبز", "العسل", "الشجر", "الثمر", "الحجر", "الرمل", "الطين", "الورد", "الزهر", "العطر", "المسك", "العود", "الباب", "الدار", "السور", "القفل", "الحبل", "العلم", "الفهم", "الصدق", "العدل", "الحمد", "الشكر", "الصبر", "النصر", "الفتح", "الرزق", "الفضل", "الكرم", "الجود", "المجد", "الفوز", "الربح", "السعد", "البشر", "الفرح", "المرح", "اللعب", "النوم", "ضحك", "الحزن", "الخوف", "الشوق", "القرب", "البعد", "الوصل", "العهد", "الوعد", "القصد", "الرأي", "الفكر", "الخبر", "نرجسة", "نسرين", "خميلة", "كافور", "عنبر", "بخور", "جوافة", "مانجو", "نخيلة", "شتيلة", "سحابة", "صاعقة", "عاصفة", "مروحة", "مدفئة", "مبخرة", "طنجرة", "مقلاة", "فنجان", "إبريق", "مطحنة", "مغرفة", "عصارة", "مصفاة", "نشافة", "مبراة", "ريشات", "دويات", "أغنية", "رواية", "تمثال", "نيزك", "منطاد", "بلور", "رخام", "بنزين", "دستور", "قانون", "نموذج", "أسلوب", "صدارة", "جدارة", "خسارة", "مرارة", "شطارة", "إنارة", "عمارة", "وزارة", "سفارة", "إدارة", "إشارة", "بشارة", "نضارة", "شرارة", "قرارة", "فرارة", "جرارة", "برارة", "غنيمة", "هزيمة", "وليمة", "شتيمة", "يتيمة", "عديمة", "جسيمة", "نميمة", "ذميمة", "حطيمة", "أسيرة", "ضريرة", "سريرة", "حريرة", "مريرة", "قريرة", "شريرة", "وتيرة", "مدريد", "فيينا", "باريس", "برلين", "القدس", "لبنان", "اليمن", "جيزان", "نجران", "تاروت", "زجاجة", "فخارة", "قارات", "خلايا",
  "طيبة", "لطيفة", "عذبة", "هادئة", "واضحة", "بهيجة", "رشيقة", "ناعمة", "صافية", "دافئة", "بسيطة", "شامخة", "كريمة", "صادقة", "وفية", "رزينة", "عطرة", "بهية", "نابعة", "غالية", "فخمة", "حذرة", "رقيقة", "سخية", "مهمة", "حكيمة", "مطلقة", "ساحرة", "نبيلة", "مقدسة", "سعيدة", "غنية", "منيرة", "مشرقة", "فاضلة", "عاقلة", "واعية", "راقية", "سامية", "نقية", "زكية", "عفيفة", "شريفة", "وقورة", "هيوبة", "مهيبة", "جليلة", "عظيمة", "سمحة", "رحبة", "ودودة", "حنونة", "شفوقة", "رؤوفة", "غفورة", "ستارة", "حصيفة", "مدبرة", "محسنة", "منصفة", "متبعة", "قوامة", "حافظة", "ناصحة", "مرشدة", "موجهة", "كافية", "واقية", "عاصمة", "مانعة", "جاعلة", "رافعة", "خافضة", "قاضية", "حاكمة", "عادلة", "ناهية", "آمرة", "زاجرة", "وازعة", "رادعة", "صارمة", "لينة", "يانعة", "نامية", "واعدة", "باسطة", "قابضة", "نافعة"
];

// تصفية القاموس للكلمات الخماسية فقط
const DICTIONARY = Array.from(new Set(RAW_INPUT.filter(w => w.length === 5)));

const normalize = (word) => {
  if (!word) return "";
  return word
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F]/g, ""); 
};

const App = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(Array(7).fill(""));
  const [activeRow, setActiveRow] = useState(0); // تتبع السطر الحالي بدقة
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [letterStatuses, setLetterStatuses] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [stats, setStats] = useState({ played: 0, wins: 0, streak: 0, maxStreak: 0 });
  const [shakeRow, setShakeRow] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dayIndex = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
    const todayWord = DICTIONARY[dayIndex % DICTIONARY.length];
    setTargetWord(todayWord);

    const savedStats = localStorage.getItem('kalima-v19-stats');
    if (savedStats) setStats(JSON.parse(savedStats));

    const savedState = localStorage.getItem('kalima-v19-state');
    const todayStr = now.toDateString();
    if (localStorage.getItem('kalima-v19-last-played') === todayStr && savedState) {
      const { guesses, status, target, row } = JSON.parse(savedState);
      if (target === todayWord) {
        setGuesses(guesses);
        setGameState(status);
        setActiveRow(row || guesses.findIndex(g => g === ""));
        updateKeyboard(guesses, todayWord);
      }
    }
  }, []);

  const updateKeyboard = (allGuesses, target) => {
    const newStatuses = { ...letterStatuses };
    const nTarget = normalize(target);
    allGuesses.forEach(guess => {
      if (!guess) return;
      const nGuess = normalize(guess);
      for (let i = 0; i < 5; i++) {
        const char = guess[i];
        const nChar = nGuess[i];
        if (nChar === nTarget[i]) newStatuses[char] = 'correct';
        else if (nTarget.includes(nChar) && newStatuses[char] !== 'correct') newStatuses[char] = 'present';
        else if (!newStatuses[char]) newStatuses[char] = 'absent';
      }
    });
    setLetterStatuses(newStatuses);
  };

  const handleKeyPress = useCallback((key) => {
    if (gameState !== "playing" || errorMessage || isAnimating) return;

    if (key === "Enter") {
      if (currentGuess.length !== 5) {
        triggerError("الكلمة ناقصة");
        return;
      }
      
      const nGuess = normalize(currentGuess);
      const exists = DICTIONARY.some(w => normalize(w) === nGuess);

      if (!exists) {
        triggerError("خطأ");
        return;
      }

      submitGuess();

    } else if (key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[\u0600-\u06FF]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameState, targetWord, errorMessage, isAnimating]);

  const submitGuess = () => {
    setIsAnimating(true);
    const newGuesses = [...guesses];
    newGuesses[activeRow] = currentGuess;
    setGuesses(newGuesses);

    // الانتظار حتى اكتمال حركة القلب لكل المربعات
    setTimeout(() => {
      const isWin = normalize(currentGuess) === normalize(targetWord);
      updateKeyboard(newGuesses, targetWord);
      
      if (isWin) {
        finishGame(true, newGuesses, activeRow);
      } else if (activeRow === 6) {
        finishGame(false, newGuesses, activeRow);
      } else {
        const nextRow = activeRow + 1;
        setActiveRow(nextRow);
        saveState(newGuesses, "playing", nextRow);
        setCurrentGuess(""); // مسح الكلمة فقط بعد انتهاء الحركة تماماً
        setIsAnimating(false);
      }
    }, 1800); 
  };

  const triggerError = (msg) => {
    setErrorMessage(msg);
    setShakeRow(activeRow);
    setTimeout(() => { setErrorMessage(""); setShakeRow(-1); }, 1200);
  };

  const saveState = (history, status, row) => {
    localStorage.setItem('kalima-v19-state', JSON.stringify({ guesses: history, status, target: targetWord, row }));
    localStorage.setItem('kalima-v19-last-played', new Date().toDateString());
  };

  const finishGame = (won, history, row) => {
    setGameState(won ? "won" : "lost");
    const newStats = {
      played: stats.played + 1,
      wins: stats.wins + (won ? 1 : 0),
      streak: won ? stats.streak + 1 : 0,
      maxStreak: Math.max(stats.maxStreak, won ? stats.streak + 1 : 0)
    };
    setStats(newStats);
    localStorage.setItem('kalima-v19-stats', JSON.stringify(newStats));
    saveState(history, won ? "won" : "lost", row);
    setCurrentGuess("");
    setIsAnimating(false);
    setTimeout(() => setShowStats(true), 1000);
  };

  const getCellColor = (char, index, fullGuess) => {
    if (!fullGuess) return "border-zinc-800";
    const nTarget = normalize(targetWord);
    const nGuess = normalize(fullGuess);
    const nChar = normalize(char);

    if (nChar === nTarget[index]) return "bg-emerald-600 border-emerald-600 text-white";
    const targetCount = nTarget.split('').filter(c => c === nChar).length;
    const matchesBefore = nGuess.substring(0, index).split('').filter(c => c === nChar).length;
    if (nTarget.includes(nChar) && matchesBefore < targetCount) return "bg-amber-500 border-amber-500 text-white";
    return "bg-zinc-800 border-zinc-800 text-zinc-500";
  };

  const keyboardRows = [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
    ["ش", "س", "ي", "ب", "ل", "ت", "ن", "م", "ك", "ط", "ذ"],
    ["ر", "ز", "و", "ة", "ى", "ا", "ء", "ئ", "ؤ"],
    ["Enter", "Backspace"]
  ];

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Enter") handleKeyPress("Enter");
      else if (e.key === "Backspace") handleKeyPress("Backspace");
      else handleKeyPress(e.key);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 font-sans select-none overflow-hidden" dir="rtl">
      
      {errorMessage && (
        <div className="fixed top-24 bg-white text-black px-6 py-2 rounded-lg font-bold z-[100] animate-bounce shadow-2xl">
          {errorMessage}
        </div>
      )}

      <header className="w-full max-w-md flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
        <button onClick={() => setShowHelp(true)} className="p-2 text-zinc-500 hover:text-white transition-colors"><HelpCircle size={24} /></button>
        <h1 className="text-3xl font-black tracking-tighter uppercase">كَلِمَة</h1>
        <button onClick={() => setShowStats(true)} className="p-2 text-zinc-500 hover:text-white transition-colors"><BarChart2 size={24} /></button>
      </header>

      <main className="flex-grow flex flex-col justify-center gap-1.5 mb-6">
        {guesses.map((g, r) => {
          const isCurrentRow = r === activeRow;
          const isSubmitted = g && r < activeRow || (isCurrentRow && isAnimating);
          const display = isCurrentRow ? currentGuess : g;
          
          return (
            <div key={r} className={`flex gap-1.5 ${shakeRow === r ? 'animate-shake' : ''}`}>
              {Array(5).fill("").map((_, c) => {
                const char = display[c] || "";
                const colorClass = isSubmitted ? getCellColor(char, c, g) : "border-zinc-800";
                
                return (
                  <div key={c} className="w-12 h-12 sm:w-14 sm:h-14 perspective-1000">
                    <div 
                      className={`relative w-full h-full text-center transition-transform duration-700 preserve-3d
                        ${isSubmitted ? 'animate-flip' : ''}`}
                      style={{ animationDelay: `${c * 300}ms` }}
                    >
                      <div className={`absolute inset-0 border-2 flex items-center justify-center text-2xl font-bold backface-hidden rounded-sm
                        ${char && isCurrentRow && !isAnimating ? 'border-zinc-500 scale-105' : 'border-zinc-800'}`}>
                        {char}
                      </div>
                      <div className={`absolute inset-0 flex items-center justify-center text-2xl font-bold backface-hidden rotate-x-180 rounded-sm ${colorClass}`}>
                        {char}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>

      <div className="w-full max-w-lg space-y-2 pb-4">
        {keyboardRows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 px-1">
            {row.map(k => {
              const s = letterStatuses[k];
              let bg = s === 'correct' ? "bg-emerald-600" : s === 'present' ? "bg-amber-500" : s === 'absent' ? "bg-zinc-900 opacity-40" : "bg-zinc-600";
              const isEnter = k === "Enter";
              const isBack = k === "Backspace";
              return (
                <button 
                  key={k} 
                  disabled={isAnimating}
                  onClick={() => handleKeyPress(k)} 
                  className={`${bg} h-11 sm:h-12 rounded-md flex items-center justify-center font-bold text-xs sm:text-base active:scale-95 transition-all
                  ${isEnter || isBack ? 'flex-[2.5] bg-zinc-700 min-w-[90px]' : 'flex-1'} ${isAnimating ? 'opacity-50' : ''}`}
                >
                  {isBack ? "حذف" : isEnter ? "إدخال" : k}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {showStats && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-zinc-900 w-full max-w-sm p-8 rounded-3xl border border-zinc-800 text-center relative shadow-2xl">
            <button onClick={() => setShowStats(false)} className="absolute top-6 left-6 text-zinc-500 hover:text-white"><X size={24}/></button>
            {gameState !== "playing" && (
              <div className="mb-8 animate-in zoom-in duration-300">
                <p className="text-zinc-500 text-xs mb-1 uppercase font-bold tracking-widest">الكلمة الصحيحة</p>
                <h2 className="text-4xl font-black text-emerald-500 tracking-widest">{targetWord}</h2>
              </div>
            )}
            <h3 className="text-xl font-bold mb-6 tracking-wider uppercase">الإحصائيات</h3>
            <div className="grid grid-cols-4 gap-2 mb-10 text-[10px] sm:text-xs text-zinc-400">
              <div><div className="text-2xl text-white font-black">{stats.played}</div>لعب</div>
              <div><div className="text-2xl text-white font-black">{stats.played ? Math.round((stats.wins/stats.played)*100) : 0}</div>فوز%</div>
              <div><div className="text-2xl text-white font-black">{stats.streak}</div>حالي</div>
              <div><div className="text-2xl font-black text-white">{stats.maxStreak}</div>أفضل</div>
            </div>
            <button onClick={() => window.location.reload()} className="w-full bg-emerald-600 py-4 rounded-xl font-black text-lg active:scale-95 shadow-lg transition-transform uppercase">تحدي جديد</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
        @keyframes flip { 0% { transform: rotateX(0); } 100% { transform: rotateX(180deg); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-flip { animation: flip 0.6s forwards ease-in-out; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-x-180 { transform: rotateX(180deg); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;

