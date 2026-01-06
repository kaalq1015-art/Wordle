import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Share2, BarChart2, X, RefreshCw, Play, AlertCircle, Loader2, HelpCircle } from 'lucide-react';

// --- القاموس المحلي الشامل (تم دمج القائمة الجديدة بالكامل) ---
const LOCAL_DICT = [
  // كلمات من القائمة الجديدة
  "طاولة", "مكتبة", "تفاحة", "خزانة", "نافذة", "شاشات", "أبواب", "أقلام", "أوراق", "دفاتر",
  "مسطرة", "مفتاح", "سيارة", "طيارة", "دراجة", "حافلة", "شاحنة", "باخرة", "سفينة", "محطات",
  "مدينة", "قريات", "حديقة", "غابات", "صحراء", "هضبات", "أنهار", "أمواج", "كواكب", "قمرات",
  "أشعات", "أتربة", "أحجار", "أشجار", "أزهار", "وردات", "نخلات", "أعناب", "موزات", "جزرات",
  "بصلات", "ليمون", "خوخات", "توتات", "رمانة", "بطيخة", "قمصان", "فستان", "معاطف", "قبعات",
  "أحذية", "جوارب", "شنطات", "ساعات", "الورد", "صابون", "منديل", "منشفة", "وسادة", "ألحفة",
  "سجادة", "مرايا", "لوحات", "ذهبية", "فضيات", "خواتم", "قلادة", "أساور", "أطباء", "مهندس",
  "أستاذ", "تلميذ", "علماء", "أدباء", "فقهاء", "أمراء", "خبراء", "أوطان", "كيميا", "رسمات",
  "سباحة", "رماية", "تجارة", "أموال", "معادن", "ألماظ", "ياقوت", "مرجان", "أصداف", "بركان",
  "زلزال", "إعصار", "إيمان", "إسلام", "صلوات", "صدقات", "مساجد", "عبادة", "إخلاص", "أمانة",
  "قادمة", "ذاهبة", "عالمة", "جاهلة", "كاتبة", "قارئة", "ناجحة", "فاشلة", "صابرة", "شاكرة",
  "حامدة", "راكعة", "ساجدة", "صائمة", "قائمة", "نائمة", "جالسة", "واقفة", "سارحة", "غارقة",
  "طافية", "عالية", "دانية", "غالية", "بالية", "تالية", "ماشية", "باقية", "فانية", "راضية",
  "قاضية", "ماضية", "آتية", "بادية", "خافية", "صافية", "كافية", "وافية", "رانية", "شادية",
  "هادية", "نادية", "فادية", "باهرة", "زاهرة", "طاهرة", "ناضرة", "قاهرة", "ناصرة", "شاغرة",
  "فاخرة", "ساخرة", "ماكرة", "ذاكرة", "حائرة", "ثائرة", "سائرة", "جائرة", "غائرة", "طائرة",
  "حارسة", "فارسة", "دارسة", "غارسة", "لابسة", "يابسة", "عابسة", "عابرة", "جابرة", "كابرة",
  "غامرة", "ثامرة", "ناعمة", "غانمة", "سالمة", "حالمة", "ظالمة", "حازمة", "عازمة", "جازمة",
  "قاصمة", "عاصمة", "خاتمة", "كاتمة", "كاظمة", "ناظمة", "فاهمة", "داهمة", "ساهمة", "نادمة",
  "خادمة", "صادمة", "رادمة", "واهمة", "ناهمة", "شاتمة", "هازمة", "لازمة", "وازنة", "ضامنة",
  "مكتوب", "مكسور", "منقول", "مقبول", "مرفوض", "محمول", "مرسوم", "مسؤول", "مجهول", "معلوم",
  "مطلوب", "مظلوم", "منظور", "مسرور", "مشكور", "مغفور", "منشور", "محظور", "مبتور", "مسحور",
  "تدريب", "تعليم", "تطوير", "تصميم", "تصوير", "تنظيم", "تنسيق", "توزيع", "توقيع", "توفير",
  "تركيب", "ترتيب", "ترحيب", "ترشيح", "تعريف", "تحقيق", "تحويل", "تعديل", "تقديم", "تقرير",
  "أحلام", "أخبار", "أسرار", "أنوار", "ألوان", "ألحان", "أرقام", "أصحاب", "أصوات", "أضواء",
  "أطفال", "أعمال", "أفلام", "إحسان", "إكرام", "إنعام", "إلهام", "إبداع", "إسراع", "إقناع",
  "إمتاع", "إشراق", "إخفاق", "إبراق", "إحراق", "إغراق", "إنفاق", "إشفاق", "إعتاق", "إغلاق",
  "إطلاق", "إحلاق", "إملاق", "إلحاق", "إنضاج", "إنتاج", "إخراج", "إدراج", "إزعاج", "إيلاج",
  "إيضاح", "إصلاح", "إفلاح", "إنكاح", "إنجاح", "إشباع", "إرجاع", "إيقاع", "إقذاع", "إفزاع",
  "إقزاع", "إبضاع", "إنباع", "إنصاع", "إضجاع", "إيداع", "إدفاع", "إشماع", "إيفاع", "إيناع",
  "إيقاف", "إنصاف", "إسعاف", "إسفاف", "انتقل", "انتصر", "انتشر", "اشتهر", "استمع", "ابتعد",
  "اقترب", "اعتذر", "اعترف", "اعتقد", "اختبر", "اخترع", "اختلف", "اكتشف", "اكتمل", "التزم",
  "التحق", "انفجر", "انطلق", "انكسر", "أقبلت", "أدخلت", "أخرجت", "أرسلت", "أعلمت", "أكرمت",
  "أمهلت", "أهملت", "أوجعت", "أوقفت", "أوصلت", "أنزلت", "أبصرت", "أضاعت", "أقامت", "أفادت",
  "أجابت", "أعادت", "أرادت", "أنارت", "يشارك", "يتابع", "يساهم", "يطور", "يفكر", "ينظم",
  "يوزع", "يؤكد", "يبدع", "يحاول", "يساعد", "يشجع", "يؤيد", "يحاور", "يسافر", "يراقب",
  "ينافس", "يهاجم", "يدافع", "يشاهد", "تتحدث", "تتصرف", "تتعلم", "تتذكر", "تتمنى", "تتوقع",
  "تتردد", "تتغير", "تتحسن", "تتقدم", "تتعاون", "تتفاهم", "تتنافس", "تتساءل", "تتواصل", "تتواجد",
  "تتألق", "تتبخر", "تتحطم", "تتجمد", "يستلم", "يستند", "يستعد", "يستبق", "يستتر", "يستحم",
  "يستوي", "يسترق", "يستفز", "يتحدث", "يتعلم", "يتتقدم", "يتتحسن", "يتتبسم", "يتذكر", "يتخيل",
  "يتصور", "يتوقع", "يتألم", "يتمتع", "يتجمع", "يتفرع", "يتوسع", "يتسلق", "يتألق", "يتتحرك",
  "يتدرب", "يترتب", "يتطلب", "مقاتل", "مشاهد", "مساعد", "متابع", "مدافع", "مهاجم", "منافس",
  "مراقب", "محاضر", "مسافر", "مجاهد", "مبادر", "مباشر", "مغامر", "محاور", "محارب", "مساهم",
  "مشابه", "مطابق", "معالج", "مكاتب", "ملاعب", "مطاعم", "مصانع", "مزارع", "مناهج", "مباهج",
  "مسارح", "مسابح", "مقاعد", "مخابز", "متاجر", "مراكز", "مواقع", "مواجع", "مدامع", "مخازن",
  "معابد", "مجالس", "قواعد", "فوائد", "فرائد", "جرائد", "قصائد", "فرائض", "عوائد", "زوائد",
  "شوارد", "نوافذ", "حوافز", "قوافل", "حوافل", "عوالم", "عواصم", "قواسم", "لوازم", "هواجس",
  "فوارق", "طبيعة", "وسيمة", "كريمة", "رحيمة", "حكيمة", "عليمة", "عظيمة", "قديمة", "حديثة",
  "سريعة", "بطيئة", "خفيفة", "ثقيلة", "جميلة", "قبيحة", "طويلة", "قصيرة", "بعيدة", "قريبة",
  "نظيفة", "رقيقة", "عميقة", "غريقة", "حريقة", "طريقة", "حديقة", "شقيقة", "رفيقة", "عشيقة",
  "صديقة", "عتيقة", "رشيقة", "دقيقة", "حقيقة", "وثيقة", "خليفة", "ظريفة", "لطيفة", "شريفة",
  "عفيفة", "مخيفة", "أليفة", "منيرة", "مثيرة", "قديرة", "بصيرة", "شهيرة", "حقيرة", "رهينة",
  "مذيعة", "معلقة", "موظفة", "مدربة", "ممرضة", "مصورة", "مؤلفة", "مخرجة", "منتجة", "ممثلة",
  "مغنية", "عازفة", "راقصة", "خبازة", "جزارة", "طباخة", "حلاقة", "خياطة", "غسالة", "كواية",
  "سواقة", "دلالة", "عمالة", "بطالة", "جهالة", "سفالة", "نذالة", "أصالة", "بسالة", "عدالة",
  "حمالة", "زمالة", "كفالة", "وكالة", "إقالة", "إمالة", "إطالة", "إزالة", "إعالة", "إدانة",
  "إهانة", "إعانة", "إبانة", "إباحة", "إشاعة", "إضاعة", "إراقة", "إفاقة", "أثواب", "أحواض",
  "أدوات", "أذواق", "أرباح", "أرزاق", "أزمان", "أسراب", "أسعار", "أسلاك", "أشواط", "أصهار",
  "أصناف", "أصول", "أضلاع", "أطراف", "أطنان", "أعصاب", "أعضاء", "أعواد", "أغصان", "أفراد",
  "أفران", "أفعال", "أفواه", "أقدار", "أقسام", "أقطار", "أكياس", "ألعاب", "ألقاب", "ألياف",
  "أمثال", "أمداح", "أمراض", "أمصار", "أنسجة", "أنصار", "أنعام", "أنفاس", "أهداف", "أهوال",
  "أوتار", "أوقات", "أوعية", "أوهام", "أنياب", "أيتام", "أيامى", "أبناء", "مراعي", "ملاهي",
  "مقاهي", "نوادي", "صحارى", "فلوات", "هضبات", "بحيرة", "جزيرة", "منارة", "مغارة", "قمامة",
  "كرامة", "شهامة", "ضخامة", "وسامة", "جسامة", "فخامة", "كمامة", "عمامة", "غمامة", "ملامة",
  "قيامة", "إقامة", "وسادة", "قلادة", "عيادة", "إبادة", "إفادة", "إرادة", "إجادة", "هبابة",
  "دبابة", "سبابة", "عبابة", "بوابة", "جذابة", "خلابة", "نسابة", "مرابة", "ضرابة", "غرابة",
  "قرابة", "صلابة", "رطابة", "خطابة", "ذؤابة", "حرارة", "شرارة", "قرارة", "زمردة", "لؤلؤة",
  "فيروز", "نسرين", "ريحان", "صنوبر", "زيتون", "جوافة", "كرزات", "عنبات", "خوخات", "ثمارك",
  "ميدان", "عنوان", "ديوان", "فرسان", "غزلان", "جدران", "كتمان", "حرمان", "نسيان", "هذيان",
  "شيبان", "إنسان", "مكانك", "زمانك", "لسانك", "بنانك", "كيانك", "بيانك", "مناهل", "مواكب",
  "مباهج", "مفاتح", "عاقلة", "فاضلة", "كاملة", "شاملة", "عادلة", "قادرة", "نادرة", "ماهرة",
  "غافرة", "ظافرة", "أقمار", "أمتار", "أبصار", "أعمار", "أخطار", "أوزار", "أشرار", "أحرار",
  "عيونه", "بصيرة", "عشيرة", "كبيرة", "صغيرة", "أبدية", "تمامه", "غالبة", "فجاءة", "ملابس",
  "ستائر", "وسائد", "قلائد", "قصائد", "فرائد", "شوارد", "زوائد", "عوائد", "موائد", "وسائط",
  "خرائط", "حوائط", "شرائط", "سبائك", "أرائك", "أوائل", "أصايل", "ثقافة", "حضارة", "مهارة",
  "ريادة", "سيادة", "سعادة", "شحادة", "شهادة", "قيادة", "تاريخ", "فلسفة", "برمجة", "تطبيق",
  "تحديث", "تنبيه", "تفاعل", "تخزين", "تحميل", "تشفير", "إتقان", "فضاحة" "طاولة", "مكتبة", "تفاحة", "خزانة", "نافذة", "شاشات", "أبواب", "أقلام", "أوراق", "دفاتر", "مسطرة", "مفتاح", "سيارة", "طيارة", "دراجة", "حافلة", "شاحنة", "باخرة", "سفينة", "محطات", "مدينة", "قريات", "حديقة", "غابات", "صحراء", "هضبات", "أنهار", "أمواج", "كواكب", "قمرات", "أشعات", "أتربة", "أحجار", "أشجار", "أزهار", "وردات", "نخلات", "أعناب", "موزات", "جزرات", "بصلات", "ليمون", "خوخات", "توتات", "رمانة", "بطيخة", "قمصان", "فستان", "معاطف", "قبعات", "أحذية", "جوارب", "شنطات", "ساعات", "الورد", "صابون", "منشفة", "وسادة", "ألحفة", "سجادة", "مرايا", "لوحات", "ذهبية", "فضيات", "خواتم", "قلادة", "أساور", "أطباء", "مهندس", "أستاذ", "تلميذ", "علماء", "أدباء", "فقهاء", "أمراء", "خبراء", "أوطان", "كيميا", "رسمات", "سباحة", "رماية", "تجارة", "أموال", "معادن", "ألماظ", "ياقوت", "مرجان", "أصداف", "بركان", "زلزال", "إعصار", "إيمان", "إسلام", "صلوات", "صدقات", "مساجد", "عبادة", "إخلاص", "أمانة", "قادمة", "ذاهبة", "عالمة", "جاهلة", "كاتبة", "قارئة", "ناجحة", "فاشلة", "صابرة", "شاكرة", "حامدة", "راكعة", "ساجدة", "صائمة", "قائمة", "نائمة", "جالسة", "واقفة", "سارحة", "غارقة", "طافية", "عالية", "دانية", "غالية", "بالية", "تالية", "ماشية", "باقية", "فانية", "راضية", "قاضية", "ماضية", "آتية", "بادية", "خافية", "صافية", "كافية", "وافية", "رانية", "شادية", "هادية", "نادية", "فادية", "باهرة", "زاهرة", "طاهرة", "ناضرة", "قاهرة", "ناصرة", "شاغرة", "فاخرة", "ساخرة", "ماكرة", "ذاكرة", "حائرة", "ثائرة", "سائرة", "جائرة", "غائرة", "طائرة", "حارسة", "فارسة", "دارسة", "غارسة", "لابسة", "يابسة", "عابسة", "عابرة", "جابرة", "كابرة", "غامرة", "ثامرة", "ناعمة", "غانمة", "سالمة", "حالمة", "ظالمة", "حازمة", "عازمة", "جازمة", "قاصمة", "عاصمة", "خاتمة", "كاتمة", "كاظمة", "ناظمة", "فاهمة", "داهمة", "ساهمة", "نادمة", "خادمة", "صادمة", "رادمة", "واهمة", "ناهمة", "شاتمة", "هازمة", "لازمة", "وازنة", "ضامنة", "مكتوب", "مكسور", "منقول", "مقبول", "مرفوض", "محمول", "مرسوم", "مسؤول", "مجهول", "معلوم", "مطلوب", "مظلوم", "منظور", "مسرور", "مشكور", "مغفور", "منشور", "محظور", "مبتور", "مسحور", "تدريب", "تعليم", "تطوير", "تصميم", "تصوير", "تنظيم", "تنسيق", "توزيع", "توقيع", "توفير", "تركيب", "ترتيب"
  , "ترحيب", "ترشيح", "تعريف", "تحقيق", "تحويل", "تعديل", "تقديم", "تقرير", "أحلام", "أخبار"
  , "أسرار", "أنوار", "ألوان", "ألحان", "أرقام", "أصحاب", "أصوات", "أضواء", "أطفال", "أعمال", "أفلام", "انتقل", "انتصر", "انتشر", "اشتهر", "استمع", "ابتعد", "اقترب", "اعتذر", "اعترف", "اعتقد", "اختبر", "اخترع", "اختلف", "اكتشف", "اكتمل", "التزم", "التحق", "انفجر", "انطلق", "انكسر", "أقبلت", "أدخلت", "أخرجت", "أرسلت", "أعلمت", "أكرمت", "أمهلت", "أهملت", "أوجعت", "أوقفت", "أوصلت", "أنزلت", "أبصرت", "أضاعت", "أقامت", "أفادت", "أجابت", "أعادت", "أرادت", "أنارت", "يشارك", "يتابع", "يساهم", "يحاول", "يساعد", "يشجع", "يؤيد", "يحاور", "يسافر", "يراقب", "ينافس", "يهاجم", "يدافع", "يشاهد", "تتحدث", "تتصرف", "تتعلم", "تتذكر", "تتمنى", "تتوقع", "تتردد", "تتغير", "تتحسن", "تتقدم", "يستلم", "يستند", "يستعد", "يستمع", "يستبق", "يستتر", "يستحم", "يستوي", "يسترق", "يستفز", "يتحدث", "يتعلم", "يتألم", "يتمتع", "يتجمع", "يتفرع", "يتوسع", "يتسلق", "يتألق", "يتدرب", "يترتب", "يتطلب", "مقاتل", "مشاهد", "مساعد", "متابع", "مدافع", "مهاجم", "منافس", "مراقب", "مسافر", "مجاهد", "مبادر", "مباشر", "مغامر", "محاور", "محارب", "مساهم", "مشابه", "مطابق", "معالج", "مكاتب", "ملاعب", "مطاعم", "مصانع", "مزارع", "مناهج", "مباهج", "مسارح", "مسابح", "مقاعد", "مخابز", "متاجر", "مراكز", "مواقع", "مواجع", "مدامع", "مخازن", "معابد", "مجالس", "قواعد", "فوائد", "فرائد", "جرائد", "قصائد", "فرائض", "عوائد", "زوائد", "شوارد", "نوافذ", "حوافز", "قوافل", "حوافل", "عوالم", "عواصم", "قواسم", "لوازم", "هواجس", "فوارق", "طبيعة", "وسيمة", "كريمة", "رحيمة", "حكيمة", "عليمة", "عظيمة", "قديمة", "حديثة", "سريعة", "بطيئة", "خفيفة", "ثقيلة", "جميلة", "قبيحة", "طويلة", "قصيرة", "بعيدة", "قريبة", "نظيفة", "رقيقة", "عميقة", "غريقة", "حريقة", "طريقة", "حديقة", "شقيقة", "رفيقة", "عشيقة", "صديقة", "عتيقة", "رشيقة", "دقيقة", "حقيقة", "وثيقة", "خليفة", "ظريفة", "لطيفة", "شريفة", "عفيفة", "مخيفة", "أليفة", "منيرة", "مثيرة", "قديرة", "بصيرة", "شهيرة", "حقيرة", "رهينة", "مذيعة", "معلقة", "موظفة", "مدربة", "ممرضة", "مصورة", "مؤلفة", "مخرجة", "منتجة", "ممثلة", "مغنية", "عازفة", "راقصة", "خبازة", "جزارة", "طباخة", "حلاقة", "خياطة", "غسالة", "كواية", "سواقة", "دلالة", "عمالة", "بطالة", "جهالة", "سفالة", "نذالة", "أصالة", "بسالة", "عدالة", "حمالة", "زمالة", "كفالة", "وكالة", "إقالة", "إمالة", "إطالة", "إزالة", "إعالة", "إدانة", "إهانة", "إعانة", "إبانة", "إباحة", "إشاعة", "إضاعة", "إراقة", "إفاقة", "أثواب", "أحواض", "أدوات", "أذواق", "أرباح", "أرزاق", "أزمان", "أسراب", "أسعار", "أسلاك", "أشواط", "أصهار", "أصناف", "أصول", "أضلاع", "أطراف", "أطنان", "أعصاب", "أعضاء", "أعواد", "أغصان", "أفراد", "أفران", "أفعال", "أفواه", "أقدار", "أقسام", "أقطار", "أكياس", "ألعاب", "ألقاب", "ألياف", "أمثال", "أمراض", "أمصار", "أنسجة", "أنصار", "أنعام", "أنفاس", "أهداف", "أهوال", "أوتار", "أوقات", "أوعية", "أوهام", "أنياب", "أيتام", "أيامى", "أبناء", "مراعي", "ملاهي", "مقاهي", "نوادي", "صحارى", "فلوات", "هضبات", "بحيرة", "جزيرة", "منارة", "مغارة", "قمامة", "كرامة", "شهامة", "ضخامة", "وسامة", "جسامة", "فخامة", "كمامة", "عمامة", "غمامة", "ملامة", "قيامة", "إقامة", "وسادة", "قلادة", "عيادة", "إبادة", "إفادة", "إرادة", "إجادة", "هبابة", "دبابة", "سبابة", "عبابة", "بوابة", "جذابة", "خلابة", "نسابة", "مرابة", "ضرابة", "غرابة", "قرابة", "صلابة", "رطابة", "خطابة", "ذؤابة", "حرارة", "شرارة", "قرارة", "زمردة", "لؤلؤة", "فيروز", "نسرين", "ريحان", "صنوبر", "زيتون", "جوافة", "كرزات", "عنبات", "خوخات", "ميدان", "عنوان", "ديوان", "فرسان", "غزلان", "جدران", "كتمان", "حرمان", "نسيان", "هذيان", "شيبان", "إنسان", "مناهل", "مواكب", "مباهج", "مفاتح", "عاقلة", "فاضلة", "كاملة", "شاملة", "عادلة", "قادرة", "نادرة", "ماهرة", "غافرة", "ظافرة", "أقمار", "أمتار", "أبصار", "أعمار", "أخطار", "أوزار", "أشرار", "أحرار", "بصيرة", "عشيرة", "كبيرة", "صغيرة", "أبدية", "غالبة", "فجاءة", "ملابس", "ستائر", "وسائد", "قلائد", "قصائد", "فرائد", "شوارد", "زوائد", "عوائد", "موائد", "وسائط", "خرائط", "حوائط", "شرائط", "سبائك", "أرائك", "أوائل", "أصايل", "ثقافة", "حضارة", "مهارة", "ريادة", "سيادة", "سعادة", "شحادة", "شهادة", "قيادة", "تاريخ", "فلسفة", "برمجة", "تطبيق", "تحديث", "تنبيه", "تفاعل", "تخزين", "تحميل", "تشفير", "إتقان", "تصدير", "توريد", "تجهيز", "تقدير", "تمثيل", "تأكيد", "عجائب", "غرائب", "فضائل", "لطائف", "مصائب", "ضرائب", "عقائب", "رقائق", "دقائق", "حقائق", "مرفوع", "مدعوم", "مشدود", "مسدود", "مهروس", "منفوش", "مدهوش", "مكبوت", "مرصود", "مقدود", "مديرة", "وزيرة", "شهيرة", "أميرة", "فقيرة", "نصيرة", "بصيرة", "منيرة", "سفيرة", "جزيرة", "أولياء", "أتقياء", "أصفياء", "أوفياء", "أدعية", "أنبياء", "أوصياء", "أحياء", "أشياء", "أعباء", "بصارة", "دعامة", "زرافة", "حصادة", "كمامة", "مدرعة", "قنبلة", "غواصة", "مذياع", "تلفاز", "تفسير", "تخدير", "تأطير", "تلوين", "تأمين", "توطين", "تسكين", "تلقين", "تمديد", "تحديد", "ألباب", "أرباب", "أنساب", "أعتاب", "أطياب", "أحباب", "أغراب", "أذناب", "أحفاد", "أجداد", "عقلاء", "كرماء", "بخلاء", "جهلاء", "سفهاء", "رحماء", "زعماء", "حكماء", "عظماء", "قدماء", "مضخة", "مقبرة", "مغسلة", "مدفئة", "مروحة", "منقلة", "مسبار", "منظار", "محرار", "مزمار", "مسمار", "مسبحة", "معصرة", "أوجاع", "أوضاع", "أتباع", "أشياع", "أنواع", "أرباع", "إيقاع", "إسماع", "إتحاف", "إضعاف", "إتلاف", "أطياف", "أصياف", "أكتاف", "ألطاف", "أحلاف", "أخلاف", "أوصاف", "أكناف", "أعناق", "أحداق", "أعماق", "أرزاق", 
  "أعذاق", "أرياف", "حيوان", "عدوان", "أعوان", "إخوان", "رهوان", "صفوان", "علوان", "نشوان", "بهوان", "غضبان", "يقابل", "يقاتل", "يغازل", "يناضل", "يواصل", "يعادل", "يجامل", "يعالج", "يحاذر", "يباغت", "تغادر", "تحاول", "تراسل", "تجادل", "تقاوم", "تداوم", "تذاكر", "تراكم", "تباكر", "ساعات", "قارات", "برقوق", "فلفلة", "قناعة", "شجاعة", "مناعة", "وضاعة", "وداعة", "صناعة", "زراعة", "براعة", "دينية", "وطنية", "علمية", "أدبية", "خلفية", "بحرية", "أطباق", "أبراق", "أشداق", "أنماط", "أرهاط", "أفساط", "أوساط", "أمشاط", "أنباط", "أبساط", "أحواط", "أخطاط", "أخلاط", "أقساط", "أغلاط", "أبواغ", "أصباغ", "الذهب", "الفضة", "الشمس", "القمر", "النجم", "الجبل", "البحر", "النهر", "السهل", "الغيم", "المطر", "الثلج", "البرد", "الرعد", "البرق", "الريح", "الفجر", "الصبح", "الظهر", "العصر", "الوقت", "العمر", "اليوم", "الليل", "الضوء", "النور", "العين", "الأنف", "الأذن", "الوجه", "الرأس", "البطن", "القدم", "الساق", "القلب", "العقل", "الروح", "النفس", "الجلد", "العظم", "اللحم", "العصب", "اللبن", "الماء", "الملح", "الزيت", "التمر", "الخبز", "العسل", "الشجر", "الثمر", "الحجر", "الرمل", "الطين", "الورد", "الزهر", "العطر", "المسك", "العود", "الباب", "الدار", "السور", "القفل", "الحبل", "العلم", "الفهم", "الصدق", "العدل", "الحمد", "الشكر", "الصبر", "النصر", "الفتح", "الرزق", "الفضل", "الكرم", "الجود", "المجد", "الفوز", "الربح", "السعد", "البشر", "الفرح", "المرح", "اللعب", "النوم", "الضحك", "الحزن", "الخوف", "الشوق", "القرب", "البعد", "الوصل", "العهد", "الوعد", "القصد", "الرأي", "الفكر", "الخبر", "نرجسة", "نسرين", "خميلة", "كافور", "عنبر", "بخور", "جوافة", "مانجو", "نخيلة", "شتيلة", "سحابة", "صاعقة", "عاصفة", "مروحة", "مدفئة", "مبخرة", "طنجرة", "مقلاة", "فنجان", "إبريق", "مطحنة", "مغرفة", "عصارة", "مصفاة", "نشافة", "مبراة", "ريشات", "دويات", "أغنية", "رواية", "تمثال", "نيزك", "منطاد", "بلور", "رخام", "بنزين", "دستور", "قانون", "نموذج", "أسلوب", "صدارة", "جدارة", "خسارة", "مرارة", "شطارة", "إنارة", "عمارة", "وزارة", "سفارة", "إدارة", "إشارة", "بشارة", "نضارة", "شرارة", "قرارة", "فرارة", "جرارة", "برارة", "غنيمة", "هزيمة", "وليمة", "شتيمة", "يتيمة", "عديمة", "جسيمة", "نميمة", "ذميمة", "حطيمة", "أسيرة", "ضريرة", "سريرة", "حريرة", "مريرة", "قريرة", "شريرة", "وتيرة", "مدريد", "فيينا", "باريس", "برلين", "القدس", "لبنان", "اليمن", "جيزان", "نجران", "تاروت", "زجاجة", "فخارة", "قارات", "خلايا"
];

const App = () => {
  const [targetWord, setTargetWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState("playing"); // playing, won, lost
  const [letterStatuses, setLetterStatuses] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [stats, setStats] = useState({ played: 0, wins: 0, streak: 0, maxStreak: 0 });
  const [shakeRow, setShakeRow] = useState(-1);
  const [cache, setCache] = useState(new Set());

  const apiKey = ""; 

  // دالة توحيد الحركات والهمزات للمقارنة المرنة (إلى حد ما)
  const normalize = (word) => {
    if (!word) return "";
    return word
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/[\u064B-\u065F]/g, ""); 
  };

  useEffect(() => {
    // اختيار كلمة اليوم بشكل عشوائي بناءً على تاريخ اليوم
    const seed = new Date().toDateString();
    const todayIndex = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % LOCAL_DICT.length;
    setTargetWord(LOCAL_DICT[todayIndex]);

    const savedStats = localStorage.getItem('kalima-v15-stats');
    if (savedStats) setStats(JSON.parse(savedStats));

    const savedCache = localStorage.getItem('kalima-v15-cache');
    if (savedCache) setCache(new Set(JSON.parse(savedCache)));

    const savedState = localStorage.getItem('kalima-v15-state');
    const lastPlayed = localStorage.getItem('kalima-v15-last-played');
    if (lastPlayed === seed && savedState) {
      const { guesses, status, target } = JSON.parse(savedState);
      if (target === LOCAL_DICT[todayIndex]) {
        setGuesses(guesses);
        setGameState(status);
        updateKeyboard(guesses, LOCAL_DICT[todayIndex]);
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

  const checkWordValidity = async (word) => {
    const nWord = normalize(word);
    // 1. فحص القاموس المحلي فوراً
    if (LOCAL_DICT.some(w => normalize(w) === nWord) || cache.has(word)) return true;

    // 2. سؤال المحرك المتصل (AI)
    setIsChecking(true);
    const systemPrompt = "You are a specialized Arabic linguistic expert. Answer ONLY 'YES' if the input is a valid 5-letter Arabic word (meaningful noun, verb, or plural). Answer ONLY 'NO' otherwise.";
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Is "${word}" a valid 5-letter Arabic word?` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toUpperCase();
      const isValid = result.includes('YES');
      setIsChecking(false);
      
      if (isValid) {
        const newCache = new Set(cache).add(word);
        setCache(newCache);
        localStorage.setItem('kalima-v15-cache', JSON.stringify(Array.from(newCache)));
      }
      return isValid;
    } catch (e) {
      setIsChecking(false);
      return true; // Fallback في حال تعطل الإنترنت
    }
  };

  const handleKeyPress = useCallback(async (key) => {
    if (gameState !== "playing" || isChecking || errorMessage) return;

    if (key === "Enter") {
      if (currentGuess.length !== 5) { triggerError("الكلمة ناقصة"); return; }
      
      const isValid = await checkWordValidity(currentGuess);
      if (!isValid) { triggerError("ليست في القاموس"); return; }

      const idx = guesses.findIndex(g => g === "");
      const newGuesses = [...guesses];
      newGuesses[idx] = currentGuess;
      setGuesses(newGuesses);
      updateKeyboard(newGuesses, targetWord);

      if (normalize(currentGuess) === normalize(targetWord)) {
        finishGame(true, newGuesses);
      } else if (idx === 5) {
        finishGame(false, newGuesses);
      } else {
        saveState(newGuesses, "playing");
      }
      setCurrentGuess("");

    } else if (key === "Backspace") {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[\u0600-\u06FF]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, guesses, gameState, targetWord, isChecking, errorMessage, cache]);

  const triggerError = (msg) => {
    setErrorMessage(msg);
    setShakeRow(guesses.findIndex(g => g === ""));
    setTimeout(() => { setErrorMessage(""); setShakeRow(-1); }, 1500);
  };

  const saveState = (history, status) => {
    localStorage.setItem('kalima-v15-state', JSON.stringify({ guesses: history, status, target: targetWord }));
    localStorage.setItem('kalima-v15-last-played', new Date().toDateString());
  };

  const finishGame = (won, history) => {
    setGameState(won ? "won" : "lost");
    const newStats = {
      played: stats.played + 1,
      wins: stats.wins + (won ? 1 : 0),
      streak: won ? stats.streak + 1 : 0,
      maxStreak: Math.max(stats.maxStreak, won ? stats.streak + 1 : 0)
    };
    setStats(newStats);
    localStorage.setItem('kalima-v15-stats', JSON.stringify(newStats));
    saveState(history, won ? "won" : "lost");
    setTimeout(() => setShowStats(true), 2000);
  };

  const startNewRandom = () => {
    const randomWord = LOCAL_DICT[Math.floor(Math.random() * LOCAL_DICT.length)];
    setTargetWord(randomWord);
    setGuesses(Array(6).fill(""));
    setCurrentGuess("");
    setGameState("playing");
    setLetterStatuses({});
    setShowStats(false);
  };

  const getCellColor = (char, index, fullGuess) => {
    if (!fullGuess) return "border-zinc-800";
    const nTarget = normalize(targetWord);
    const nGuess = normalize(fullGuess);
    const nChar = normalize(char);

    if (nChar === nTarget[index]) return "bg-emerald-600 border-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]";
    
    const targetCount = nTarget.split('').filter(c => c === nChar).length;
    const matchesBefore = nGuess.substring(0, index).split('').filter(c => c === nChar).length;
    
    if (nTarget.includes(nChar) && matchesBefore < targetCount) return "bg-amber-500 border-amber-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]";
    
    return "bg-zinc-800 border-zinc-800 text-zinc-500";
  };

  const keyboardRows = [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
    ["ش", "س", "ي", "ب", "ل", "ت", "ن", "م", "ك", "ط", "ذ"],
    ["Enter", "أ", "إ", "آ", "ئ", "ء", "ؤ", "ر", "ا", "ى", "ة", "و", "ز", "Backspace"]
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

      {isChecking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-2xl flex flex-col items-center gap-3 border border-zinc-800 shadow-2xl">
            <Loader2 size={32} className="animate-spin text-emerald-500" />
            <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">جاري التحقق لغوياً...</span>
          </div>
        </div>
      )}

      <header className="w-full max-w-md flex justify-between items-center border-b border-zinc-900 pb-3 mb-8">
        <button onClick={() => setShowHelp(true)} className="p-2 text-zinc-500 hover:text-white transition-colors"><HelpCircle size={24} /></button>
        <div className="text-center">
          <h1 className="text-3xl font-black tracking-tighter uppercase">كَلِمَة</h1>
          <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">إصدار المعجم الشامل v15</div>
        </div>
        <button onClick={() => setShowStats(true)} className="p-2 text-zinc-500 hover:text-white transition-colors"><BarChart2 size={24} /></button>
      </header>

      <main className="flex-grow flex flex-col justify-center gap-1.5 mb-10">
        {guesses.map((g, r) => {
          const isCurrent = r === guesses.findIndex(gr => gr === "");
          const display = isCurrent ? currentGuess : g;
          return (
            <div key={r} className={`flex gap-1.5 ${shakeRow === r ? 'animate-shake' : ''}`}>
              {Array(5).fill("").map((_, c) => (
                <div 
                  key={c} 
                  className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-3xl font-bold transition-all duration-500 rounded-lg ${g && !isCurrent ? getCellColor(display[c], c, g) : "border-zinc-800"} ${display[c] && isCurrent ? 'border-zinc-500 scale-105 shadow-lg' : ''}`}
                  style={{ transitionDelay: !isCurrent && g ? `${c * 150}ms` : '0ms' }}
                >
                  {display[c]}
                </div>
              ))}
            </div>
          );
        })}
      </main>

      <div className="w-full max-w-lg space-y-1.5 pb-6">
        {keyboardRows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 px-1">
            {row.map(k => {
              const s = letterStatuses[k];
              let bg = s === 'correct' ? "bg-emerald-600" : s === 'present' ? "bg-amber-500" : s === 'absent' ? "bg-zinc-900 opacity-40" : "bg-zinc-600";
              const isAction = k === "Enter" || k === "Backspace";
              return (
                <button 
                  key={k} 
                  onClick={() => handleKeyPress(k)} 
                  className={`${bg} h-12 sm:h-14 rounded-lg flex items-center justify-center font-bold text-xs sm:text-base active:scale-90 flex-1 transition-all ${isAction ? 'px-4 min-w-[55px] bg-zinc-700' : ''}`}
                >
                  {k === "Backspace" ? "⌫" : k}
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
            <div className="grid grid-cols-4 gap-2 mb-10 text-[10px] sm:text-xs">
              <div><div className="text-2xl text-white font-black">{stats.played}</div>لعب</div>
              <div><div className="text-2xl text-white font-black">{stats.played ? Math.round((stats.wins/stats.played)*100) : 0}</div>فوز%</div>
              <div><div className="text-2xl text-white font-black">{stats.streak}</div>حالي</div>
              <div><div className="text-2xl font-black text-white">{stats.maxStreak}</div>أفضل</div>
            </div>
            <button onClick={startNewRandom} className="w-full bg-emerald-600 py-4 rounded-xl font-black text-lg active:scale-95 shadow-lg transition-transform">تحدي جديد</button>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[100]">
          <div className="bg-zinc-900 w-full max-w-sm p-8 rounded-2xl border border-zinc-800 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 text-center text-emerald-500 tracking-widest uppercase">كيفية اللعب</h2>
            <p className="text-zinc-400 text-sm mb-10 text-center leading-relaxed font-medium">خمن الكلمة الخماسية في 6 محاولات فقط. هذا الإصدار يستوعب آلاف الكلمات العربية الفصحى.</p>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">خ</div>
                <p className="text-xs font-bold text-zinc-300">الحرف صحيح وفي مكانه الصحيح.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">س</div>
                <p className="text-xs font-bold text-zinc-300">الحرف موجود ولكن بمكان آخر.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center font-bold text-xl text-zinc-500 border border-zinc-700">م</div>
                <p className="text-xs font-bold text-zinc-500">الحرف غير موجود في الكلمة نهائياً.</p>
              </div>
            </div>
            <button onClick={() => setShowHelp(false)} className="w-full mt-10 bg-zinc-100 text-black py-4 rounded-xl font-black text-lg">ابدأ الآن</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;

