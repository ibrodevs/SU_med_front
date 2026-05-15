export const hospitalsFallbackData = [
  {
    id: 1,
    name_ru: "DOC university hospital",
    name_en: "DOC University Hospital",
    name_kg: "DOC University Hospital",
    description_ru: "Современная многопрофильная университетская больница, предоставляющая высококачественные медицинские услуги и служащая клинической базой для студентов.",
    description_en: "A modern multidisciplinary university hospital providing high-quality medical services and serving as a clinical base for students.",
    description_kg: "Студенттер үчүн клиникалык база катары кызмат кылган жана жогорку сапаттагы медициналык кызматтарды көрсөткөн заманбап көп тармактуу университеттик оорукана.",
    address_ru: "г. Бишкек",
    address_en: "Bishkek",
    address_kg: "Бишкек ш.",
    contact_phone: "+996 (555) 123 456",
    contact_email: "info@doc-hospital.kg",
    photo_url: "https://doclinic.kg/wp-content/uploads/2021/04/doc-clinic-1.jpg",
    is_active: true,
    departments: [
      {
        name_ru: "Терапевтическое отделение",
        name_en: "Therapy Department",
        name_kg: "Терапия бөлүмү",
        description_ru: "Диагностика и лечение внутренних болезней.",
        description_en: "Diagnosis and treatment of internal diseases.",
        description_kg: "Ички ооруларды диагностикалоо жана дарылоо."
      },
      {
        name_ru: "Хирургическое отделение",
        name_en: "Surgery Department",
        name_kg: "Хирургия бөлүмү",
        description_ru: "Проведение оперативных вмешательств и обучение хирургическим навыкам.",
        description_en: "Performing surgical interventions and training in surgical skills.",
        description_kg: "Хирургиялык кийлигишүүлөрдү жүргүзүү жана хирургиялык көндүмдөргө үйрөтүү."
      }
    ],
    practice_opportunities_ru: "Наблюдение за пациентами, участие в обходах, ассистирование на операциях.",
    practice_opportunities_en: "Patient monitoring, participation in rounds, assisting in surgeries.",
    practice_opportunities_kg: "Бейтаптарды көзөмөлдөө, айланып чыгууларга катышуу, операцияларда жардам берүү.",
    specialties: ["Терапия", "Хирургия", "Кардиология"]
  },
  {
    id: 4,
    name_ru: "Клиника ЛАЗМЕД",
    name_en: "LASMED Clinic",
    name_kg: "ЛАЗМЕД клиникасы",
    description_ru: "Специализированная клиника лазерной медицины и косметологии.",
    description_en: "Specialized clinic for laser medicine and cosmetology.",
    description_kg: "Лазердик медицина жана косметология боюнча адистештирилген клиника.",
    address_ru: "г. Бишкек",
    address_en: "Bishkek",
    address_kg: "Бишкек ш.",
    contact_phone: "+996 (555) 456 789",
    photo_url: "https://salymbekov.com/wp-content/uploads/2023/06/lazmed.jpg",
    is_active: true,
    departments: [
      {
        name_ru: "Отделение лазерной хирургии",
        name_en: "Laser Surgery Department",
        name_kg: "Лазердик хирургия бөлүмү",
        description_ru: "Проведение малоинвазивных операций с использованием лазерных технологий.",
        description_en: "Minimally invasive surgeries using laser technologies.",
        description_kg: "Лазердик технологияларды колдонуу менен аз инвазивдик операцияларды жүргүзүү."
      }
    ],
    practice_opportunities_ru: "Ознакомление с лазерными технологиями в медицине.",
    practice_opportunities_en: "Familiarization with laser technologies in medicine.",
    practice_opportunities_kg: "Медицинадагы лазердик технологиялар менен таанышуу.",
    specialties: ["Дерматология", "Косметология", "Хирургия"]
  }
];

export const startupsFallbackData = {
  success: true,
  data: {
    categories: [
      { id: 'medtech', name_ru: 'MedTech', name_en: 'MedTech', name_kg: 'MedTech', count: 2, icon: '🏥' }
    ],
    startups: [
      {
        id: 1,
        name: 'MedAI Assistant',
        category: 'medtech',
        description_ru: 'ИИ-ассистент для предварительной диагностики заболеваний.',
        description_en: 'AI assistant for preliminary disease diagnosis.',
        description_kg: 'Ооруларды алдын ала диагностикалоо үчүн КИ-жардамчы.',
        status: 'active',
        year: 2023
      }
    ],
    statistics: { total_funding: '$5,000', team_members: 2, patents: 0 }
  }
};

export const classroomsFallbackData = {
  success: true,
  data: {
    categories: [
      { id: 1, name: 'Лекционные залы', icon: '👨‍🏫', count: 12 },
      { id: 2, name: 'Семинарские', icon: '📝', count: 25 }
    ],
    classrooms: [
      {
        id: 1,
        name: 'Аудитория 101',
        category_name: 'Лекционные залы',
        capacity: 150,
        image: 'https://salymbekov.com/wp-content/uploads/2023/10/accr-1.jpg',
        equipment: ['Проектор', 'Интерактивная доска']
      }
    ]
  }
};
