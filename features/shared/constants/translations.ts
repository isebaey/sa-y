export type Locale = 'ar' | 'en'

export interface TranslationKeys {
  // App
  appName: string
  appTagline: string

  // Nav
  navHome: string
  navAdd: string
  navGoals: string
  navStats: string

  // Dashboard
  graceMode: string
  todayHabits: string
  graceModeToday: string
  noHabitsYet: string
  noGraceHabits: string
  addFirstHabit: string
  noHabitsChart: string
  progress: string

  // Daily Anchor
  anchorPrompt: string
  anchorPlaceholder: string
  anchorSave: string
  anchorBadgeLabel: string

  // Time Blocks
  currentBlock: string

  // Add Habit
  addHabitTitle: string
  addHabitSubtitle: string
  habitName: string
  habitNamePlaceholder: string
  selectAspect: string
  aspectLabel: string
  selectGoal: string
  goalLabel: string
  selectTimeBlock: string
  timeBlockLabel: string
  stackAfterLabel: string
  stackAfterPlaceholder: string
  setMinimumDaily: string
  graceTag: string
  saveHabit: string
  habitNameRequired: string
  aspectRequired: string
  goalRequired: string
  minBadge: string

  // Goals
  goalsTitle: string
  goalsSubtitle: string
  addGoal: string
  goalName: string
  goalNamePlaceholder: string
  goalIntention: string
  goalIntentionPlaceholder: string
  goalStage: string
  saveGoal: string
  goalNameRequired: string
  noGoalsYet: string
  addFirstGoal: string
  habitsCount: string

  // Psych Stages
  stage1: string
  stage2: string
  stage3: string
  stage4: string
  stage5: string
  stage6: string

  // Habit Item
  confirm: string
  cancel: string
  deleteLabel: string

  // Reflection
  reflectionTitle: string
  reflectionSubtitle: string
  reflectionAccomplished: string
  reflectionAccomplishedPlaceholder: string
  reflectionImprove: string
  reflectionImprovePlaceholder: string
  reflectionHurt: string
  reflectionHurtPlaceholder: string
  reflectionSave: string
  reflectionPrompt: string
  reflectionAlreadySaved: string

  // Winter Mode
  winterTitle: string
  winterMessage: string
  winterAccept: string
  winterDismiss: string

  // Correlation Insights
  insightTitle: string
  insightTemplate: string // "عندما تكتمل مهامك {aspect1}، ترتفع {aspect2}"

  // Settings
  settings: string
  language: string
  theme: string
  darkMode: string
  lightMode: string
  adaptiveMode: string
  timelineModeSetting: string
  prayerMode: string
  dayNightMode: string
  optional: string
  unassignedHabits: string

  // Stats
  statsTitle: string
  statsSubtitle: string
  exportCSV: string
  exporting: string
  exported: string
  statCompletions: string
  statStreak: string

  // Info Sections
  infoTitle: string
  stagesInfoTitle: string
  aspectsInfoTitle: string
  stage1Desc: string
  stage2Desc: string
  stage3Desc: string
  stage4Desc: string
  stage5Desc: string
  stage6Desc: string
  spiritualDesc: string
  healthDesc: string
  workDesc: string
  familyDesc: string
  socialDesc: string
  financialDesc: string
  mentalDesc: string
  leisureDesc: string

  // Aspects
  spiritual: string
  health: string
  work: string
  family: string
  social: string
  financial: string
  mental: string
  leisure: string
}

export const translations: Record<Locale, TranslationKeys> = {
  ar: {
    appName: 'سَعْي',
    appTagline: 'نظام حياتك الذكي',
    navHome: 'الرئيسية',
    navAdd: 'إضافة',
    navGoals: 'الأهداف',
    navStats: 'الإحصائيات',
    graceMode: 'وضع قليل دائم',
    todayHabits: 'عادات اليوم',
    graceModeToday: 'الحد الأدنى لليوم',
    noHabitsYet: 'لا توجد عادات بعد.',
    noGraceHabits: 'لا توجد عادات حد أدنى. أضف عادات مع تفعيل خيار الحد الأدنى.',
    addFirstHabit: '+ أضف عادة جديدة',
    noHabitsChart: 'لا توجد عادات بعد. أضف عاداتك الأولى لرؤية تقدمك.',
    progress: 'التقدم',
    anchorPrompt: 'إذا كان هذا آخر يوم لك، ما هو الشيء الواحد الذي ستفعله اليوم ليكون لحياتك معنى؟',
    anchorPlaceholder: 'الشيء الواحد الأهم اليوم...',
    anchorSave: 'حفظ',
    anchorBadgeLabel: 'الشيء الواحد',
    currentBlock: 'الوقت الحالي',
    addHabitTitle: 'إضافة عادة جديدة',
    addHabitSubtitle: 'أضف عادة لأحد جوانب حياتك الثمانية',
    habitName: 'اسم العادة',
    habitNamePlaceholder: 'مثال: قراءة ١٠ صفحات',
    selectAspect: 'اختر الجانب',
    aspectLabel: 'الجانب',
    selectGoal: 'اختر الهدف',
    goalLabel: 'الهدف',
    selectTimeBlock: 'اختر الوقت',
    timeBlockLabel: 'الوقت',
    stackAfterLabel: 'بعد أي عادة؟',
    stackAfterPlaceholder: 'اختياري — ربط بعادة أخرى',
    setMinimumDaily: 'تعيين كحد أدنى يومي',
    graceTag: '(قليل دائم)',
    saveHabit: 'حفظ العادة',
    habitNameRequired: 'اسم العادة مطلوب',
    aspectRequired: 'اختيار الجانب مطلوب',
    goalRequired: 'اختيار الهدف مطلوب',
    minBadge: 'حد أدنى',
    goalsTitle: 'الأهداف',
    goalsSubtitle: 'أهدافك مرتبة حسب جوانب حياتك',
    addGoal: '+ إضافة هدف',
    goalName: 'اسم الهدف',
    goalNamePlaceholder: 'مثال: تحسين اللياقة البدنية',
    goalIntention: 'لماذا هذا الهدف مهم لك؟',
    goalIntentionPlaceholder: 'النية والدافع الحقيقي وراء هذا الهدف...',
    goalStage: 'مرحلة التغيير',
    saveGoal: 'حفظ الهدف',
    goalNameRequired: 'اسم الهدف مطلوب',
    noGoalsYet: 'لا توجد أهداف بعد.',
    addFirstGoal: '+ أضف هدفك الأول',
    habitsCount: 'عادات',
    stage1: 'تأمل',
    stage2: 'تحضير',
    stage3: 'بدء',
    stage4: 'عمل',
    stage5: 'ثبات',
    stage6: 'تمكين',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    deleteLabel: 'حذف',
    reflectionTitle: 'خلوة المحاسبة',
    reflectionSubtitle: 'لحظة صدق مع النفس في نهاية اليوم',
    reflectionAccomplished: 'ماذا أنجزت اليوم؟',
    reflectionAccomplishedPlaceholder: 'أهم إنجازات اليوم...',
    reflectionImprove: 'ما الذي يمكن تحسينه؟',
    reflectionImprovePlaceholder: 'ما الذي كان يمكن أن يكون أفضل...',
    reflectionHurt: 'هل أذيت أحداً اليوم؟',
    reflectionHurtPlaceholder: 'كن صادقاً مع نفسك...',
    reflectionSave: 'حفظ المحاسبة',
    reflectionPrompt: 'حان وقت المحاسبة 🌙',
    reflectionAlreadySaved: 'تم حفظ محاسبة اليوم ✓',
    winterTitle: 'لحظة لطف',
    winterMessage: 'لاحظنا توقفاً. هل تريد تفعيل وضع (قليل دائم) للعودة بلطف؟',
    winterAccept: 'نعم، فعّل وضع قليل دائم',
    winterDismiss: 'لا، أستطيع المتابعة',
    insightTitle: 'رؤية ذكية',
    insightTemplate: 'عندما تكتمل مهامك {aspect1}، ترتفع {aspect2}',
    settings: 'الإعدادات',
    language: 'اللغة',
    theme: 'المظهر',
    darkMode: 'داكن',
    lightMode: 'فاتح',
    adaptiveMode: 'تلقائي',
    timelineModeSetting: 'نظام الجدول',
    prayerMode: 'مرتبط بالصلاة',
    dayNightMode: 'صباح / مساء',
    optional: 'اختياري',
    unassignedHabits: 'عادات بدون هدف',
    statsTitle: 'الإحصائيات',
    statsSubtitle: 'تتبع تقدمك وعاداتك اليومية',
    exportCSV: 'تصدير كجدول',
    exporting: 'جاري التصدير...',
    exported: 'تم التصدير بنجاح!',
    statCompletions: 'مرات الإنجاز',
    statStreak: 'أطول سلسلة',
    infoTitle: 'دليل سَعْي',
    stagesInfoTitle: 'مراحل التغيير الست',
    aspectsInfoTitle: 'جوانب الحياة الثمانية',
    stage1Desc: 'لا تدرك الحاجة للتغيير بعد. هذه مرحلة الوعي الأولى — مجرد التفكير في أن هناك شيئاً يمكن تحسينه.',
    stage2Desc: 'بدأت تدرك أن التغيير ضروري وتبحث عن المعلومات والطرق. تجهّز نفسك نفسياً وعملياً.',
    stage3Desc: 'وضعت خطة واضحة وبدأت بالخطوات الأولى الصغيرة. قد تكون خطوات بسيطة لكنها حقيقية.',
    stage4Desc: 'أنت في خضم التنفيذ اليومي. تمارس العادة بانتظام وتواجه التحديات بإصرار.',
    stage5Desc: 'العادة أصبحت جزءاً من روتينك. التحدي الآن هو الاستمرار وعدم العودة للعادات القديمة.',
    stage6Desc: 'العادة أصبحت طبيعة ثانية. لم تعد تحتاج مجهوداً واعياً — أنت تعيشها بتلقائية.',
    spiritualDesc: 'الصلاة، القرآن، الأذكار، التأمل، والعبادات. الجانب الذي يمنح حياتك معنى أعمق واتصالاً بالله.',
    healthDesc: 'الرياضة، التغذية، النوم، والصحة الجسدية. جسمك هو وسيلتك لتحقيق كل أهدافك الأخرى.',
    workDesc: 'المهارات المهنية، الإنتاجية، المشاريع، والتطوير الوظيفي. بناء مسيرة مهنية ذات أثر.',
    familyDesc: 'العلاقة مع الزوج/الزوجة، الأبناء، والوالدين. نواة حياتك وأهم استثمار بشري.',
    socialDesc: 'الصداقات، العلاقات الاجتماعية، والعطاء المجتمعي. الإنسان كائن اجتماعي بطبعه.',
    financialDesc: 'الادخار، الاستثمار، إدارة الميزانية، وبناء الاستقلال المادي. المال وسيلة لا غاية.',
    mentalDesc: 'القراءة، التعلم، التفكير النقدي، والنمو الشخصي. عقلك هو أقوى أداة تملكها.',
    leisureDesc: 'الهوايات، الترفيه، السفر، والاستمتاع بالحياة. التوازن يتطلب وقتاً للمتعة والراحة.',
    spiritual: 'الروحي والديني',
    health: 'الصحي',
    work: 'المهني',
    family: 'الأسري',
    social: 'الاجتماعي',
    financial: 'المادي',
    mental: 'العقلي والشخصي',
    leisure: 'الترفيهي',
  },
  en: {
    appName: "Sa'y",
    appTagline: 'Your Intelligent Life System',
    navHome: 'Home',
    navAdd: 'Add',
    navGoals: 'Goals',
    navStats: 'Stats',
    graceMode: 'Grace Mode',
    todayHabits: "Today's Habits",
    graceModeToday: "Today's Minimum",
    noHabitsYet: 'No habits yet.',
    noGraceHabits: 'No minimum habits. Add habits with minimum option enabled.',
    addFirstHabit: '+ Add your first habit',
    noHabitsChart: 'No habits yet. Add your first habits to see your progress.',
    progress: 'Progress',
    anchorPrompt: 'If this were your last day, what is the ONE thing you would do today to give your life meaning?',
    anchorPlaceholder: 'The one most important thing today...',
    anchorSave: 'Save',
    anchorBadgeLabel: 'The One Thing',
    currentBlock: 'Current Block',
    addHabitTitle: 'Add New Habit',
    addHabitSubtitle: 'Add a habit to one of your eight life aspects',
    habitName: 'Habit Name',
    habitNamePlaceholder: 'e.g. Read 10 pages',
    selectAspect: 'Select Aspect',
    aspectLabel: 'Aspect',
    selectGoal: 'Select Goal',
    goalLabel: 'Goal',
    selectTimeBlock: 'Select Time',
    timeBlockLabel: 'Time Block',
    stackAfterLabel: 'Stack after which habit?',
    stackAfterPlaceholder: 'Optional — link to another habit',
    setMinimumDaily: 'Set as daily minimum',
    graceTag: '(Grace Mode)',
    saveHabit: 'Save Habit',
    habitNameRequired: 'Habit name is required',
    aspectRequired: 'Aspect selection is required',
    goalRequired: 'Goal selection is required',
    minBadge: 'Min',
    goalsTitle: 'Goals',
    goalsSubtitle: 'Your goals organized by life aspects',
    addGoal: '+ Add Goal',
    goalName: 'Goal Name',
    goalNamePlaceholder: 'e.g. Improve physical fitness',
    goalIntention: 'Why is this goal important to you?',
    goalIntentionPlaceholder: 'The real intention and motivation behind this goal...',
    goalStage: 'Stage of Change',
    saveGoal: 'Save Goal',
    goalNameRequired: 'Goal name is required',
    noGoalsYet: 'No goals yet.',
    addFirstGoal: '+ Add your first goal',
    habitsCount: 'habits',
    stage1: 'Contemplate',
    stage2: 'Prepare',
    stage3: 'Start',
    stage4: 'Action',
    stage5: 'Sustain',
    stage6: 'Mastery',
    confirm: 'Confirm',
    cancel: 'Cancel',
    deleteLabel: 'Delete',
    reflectionTitle: 'Nightly Reflection',
    reflectionSubtitle: 'A moment of honesty with yourself at the end of the day',
    reflectionAccomplished: 'What did you accomplish today?',
    reflectionAccomplishedPlaceholder: "Today's key achievements...",
    reflectionImprove: 'What can be improved?',
    reflectionImprovePlaceholder: 'What could have been better...',
    reflectionHurt: 'Did you hurt anyone today?',
    reflectionHurtPlaceholder: 'Be honest with yourself...',
    reflectionSave: 'Save Reflection',
    reflectionPrompt: 'Time for reflection 🌙',
    reflectionAlreadySaved: "Today's reflection saved ✓",
    winterTitle: 'A Gentle Moment',
    winterMessage: "We noticed a pause. Would you like to activate Grace Mode to ease back in gently?",
    winterAccept: 'Yes, activate Grace Mode',
    winterDismiss: 'No, I can continue',
    insightTitle: 'Smart Insight',
    insightTemplate: 'When your {aspect1} tasks are done, your {aspect2} rises',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark',
    lightMode: 'Light',
    adaptiveMode: 'Adaptive',
    timelineModeSetting: 'Timeline System',
    prayerMode: 'Prayer-based',
    dayNightMode: 'Morning / Night',
    optional: 'optional',
    unassignedHabits: 'Unassigned Habits',
    statsTitle: 'Statistics',
    statsSubtitle: 'Track your progress and daily habits',
    exportCSV: 'Export to CSV',
    exporting: 'Exporting...',
    exported: 'Exported successfully!',
    statCompletions: 'Completions',
    statStreak: 'Longest Streak',
    infoTitle: "Sa'y Guide",
    stagesInfoTitle: 'The 6 Stages of Change',
    aspectsInfoTitle: 'The 8 Life Aspects',
    stage1Desc: "You don't yet recognize the need for change. This is the awareness stage — just thinking about what could be better.",
    stage2Desc: 'You realize change is needed and are researching ways to do it. Preparing yourself mentally and practically.',
    stage3Desc: "You've made a plan and started small. The steps might be simple, but they're real.",
    stage4Desc: "You're in the thick of daily execution. Practicing the habit regularly and facing challenges with determination.",
    stage5Desc: 'The habit is part of your routine. The challenge now is maintaining it and not reverting to old patterns.',
    stage6Desc: 'The habit is second nature. It no longer requires conscious effort — you live it automatically.',
    spiritualDesc: 'Prayer, scripture, meditation, and worship. The aspect that gives your life deeper meaning and connection to the divine.',
    healthDesc: 'Exercise, nutrition, sleep, and physical wellness. Your body is the vehicle for achieving all your other goals.',
    workDesc: 'Professional skills, productivity, projects, and career development. Building a meaningful career with impact.',
    familyDesc: 'Relationships with spouse, children, and parents. The nucleus of your life and most important human investment.',
    socialDesc: 'Friendships, social relationships, and community service. Humans are social beings by nature.',
    financialDesc: 'Saving, investing, budgeting, and building financial independence. Money is a means, not an end.',
    mentalDesc: 'Reading, learning, critical thinking, and personal growth. Your mind is the most powerful tool you possess.',
    leisureDesc: 'Hobbies, entertainment, travel, and enjoying life. Balance requires time for fun and rest.',
    spiritual: 'Spiritual',
    health: 'Health',
    work: 'Work',
    family: 'Family',
    social: 'Social',
    financial: 'Financial',
    mental: 'Mental',
    leisure: 'Leisure',
  },
}
