export const OFFICIAL_SITE_LINKS = {
  home: "https://salymbekov.com/en/",
  contacts: "https://salymbekov.com/en/contact/",
  admissionCommittee: "https://salymbekov.com/en/priemnaja-komissija/",
  enrollee: "https://salymbekov.com/en/enrollee/",
  foreignAdmission: "https://salymbekov.com/en/admission/",
  tuition: "https://salymbekov.com/en/stoimost-obuchenija/",
  hostel: "https://salymbekov.com/en/studencheskoe-obshhezhitie/",
  regulations: "https://salymbekov.com/en/instrukcijaipolozhenija/",
  mobility: "https://salymbekov.com/en/akademmobilnost/",
  studentCouncil: "https://salymbekov.com/en/about-student-council/",
  studentSupport: "https://salymbekov.com/en/komissija-po-socialnoj-podderzhke-studentov/",
};

const contactsShared = {
  phoneMain: "+996 (312) 658-538",
  phoneMobile1: "+996 505 65 85 18",
  phoneMobile2: "+996 774 83 88 83",
  phoneMobile3: "+996 501 83 88 83",
  emailMain: "info@salymbekov.com",
  whatsapp: "https://wa.me/996505658518",
  addressMain: "3 Fuchika St., Bishkek",
  addressMedical: "3 Fuchika St., Bishkek",
  addressCollege: "24b Maldybaeva St. / 125/2 Akhunbaeva Ave., Bishkek",
  legalAddress: "115A Ibraimova St., Bishkek",
};

export const officialSiteContent = {
  ru: {
    footer: {
      about:
        "Официальная информация на сайте университета подчеркивает мультидисциплинарную экосистему Salymbekov University: образование в медицине, IT и бизнесе, международные партнерства и практико-ориентированную подготовку.",
      addressLabel: "Основной адрес",
      address: "г. Бишкек, ул. Фучика, 3",
      phoneLabel: "Телефон",
      emailLabel: "Email",
    },
    contacts: {
      title: "Контакты университета",
      subtitle:
        "Контактные данные собраны по официальным страницам Salymbekov University и используются как единый ориентир для абитуриентов, студентов и партнеров.",
      campusTitle: "Кампусы и адреса",
      campuses: [
        {
          name: "Главный кампус / Высшая школа медицины",
          address: "г. Бишкек, ул. Фучика, 3",
          note: "Основной контактный адрес университета и медицинского направления.",
        },
        {
          name: "Международный колледж IT и бизнеса",
          address: "г. Бишкек, ул. Малдыбаева, 24б / пр. Ахунбаева, 125/2",
          note: "Адрес указан на официальной странице стоимости обучения и контактов колледжа.",
        },
        {
          name: "Юридический адрес",
          address: "г. Бишкек, ул. Ибраимова, 115А",
          note: "Используется в официальных реквизитах университета.",
        },
      ],
      contactTitle: "Основные каналы связи",
      contactItems: [
        { label: "Приемная / общий номер", value: contactsShared.phoneMain, href: "tel:+996312658538" },
        { label: "Мобильный номер", value: contactsShared.phoneMobile1, href: "tel:+996505658518" },
        { label: "Email", value: contactsShared.emailMain, href: "mailto:info@salymbekov.com" },
        { label: "WhatsApp", value: contactsShared.phoneMobile1, href: contactsShared.whatsapp },
      ],
      departmentTitle: "Кому писать и звонить",
      departments: [
        {
          name: "Приемная комиссия",
          contact: contactsShared.phoneMobile2,
          email: contactsShared.emailMain,
          details: "Вопросы поступления, перечень документов, зачисление и график приемной кампании.",
        },
        {
          name: "Международный набор",
          contact: contactsShared.phoneMobile3,
          email: contactsShared.emailMain,
          details: "Поступление иностранных граждан, визовые и миграционные вопросы, адаптация.",
        },
        {
          name: "Общие обращения",
          contact: contactsShared.phoneMain,
          email: contactsShared.emailMain,
          details: "Навигация по структуре университета, официальный ответ и перенаправление в нужный отдел.",
        },
      ],
      officeHours: "Пн-Пт: в рабочее время университета, ответы по поступлению рекомендуется уточнять заранее по телефону.",
      mapLabel: "Карта кампуса",
    },
    applicants: {
      title: "Абитуриенту",
      subtitle:
        "На официальном сайте отдельные материалы для абитуриентов разделены на правила приема, перечни документов, стоимость обучения, льготы и адаптацию. Здесь мы собрали их в один маршрут.",
      cards: [
        {
          title: "Требования и документы",
          description: "Оригинал документа об образовании, паспорт, медицинские документы и фото. Для граждан КР отдельно действует прием по ОРТ.",
          link: "/admissions/requirements",
        },
        {
          title: "Порядок приема",
          description: "Прозрачная работа приемной комиссии, публикация результатов, апелляции и календарь приема на основе официальных правил университета.",
          link: "/admissions/procedure",
        },
        {
          title: "Стоимость и льготы",
          description: "Актуальные суммы для General Medicine, а также политика по социальным льготам, общежитию и рассрочке.",
          link: "/admission/scholarships",
        },
      ],
      factsTitle: "Что важно знать до подачи документов",
      facts: [
        "Основной медицинский кампус расположен по адресу: г. Бишкек, ул. Фучика, 3.",
        "Официальный email университета для обращений: info@salymbekov.com.",
        "Для иностранных граждан поступление на англоязычные программы сопровождается вступительным тестом по биологии и химии.",
        "Для граждан КР документы онлайн подаются копиями, оригиналы предъявляются к началу учебного года.",
      ],
    },
    citizens: {
      title: "Поступление для граждан Кыргызской Республики",
      subtitle:
        "Официальная страница абитуриента университета выделяет для граждан КР отдельный пакет документов и прием на бюджет / контракт с учетом результатов ОРТ.",
      steps: [
        {
          title: "Подготовить пакет документов",
          timing: "До начала приемной кампании",
          items: [
            "Заявление на имя ректора.",
            "Оригинал сертификата ОРТ.",
            "Документ о среднем общем или среднем профессиональном образовании.",
            "Копия паспорта.",
            "2 фото 4x6 и 4 фото 3x4.",
            "Медицинская справка 086-У.",
            "Военный билет или приписное свидетельство.",
          ],
        },
        {
          title: "Подать копии онлайн и принести оригиналы к старту учебного года",
          timing: "Во время приема документов",
          items: [
            "Во время онлайн-подачи прикладываются копии.",
            "Оригиналы документов сдаются к началу учебного года.",
            "Статус и дальнейшие шаги уточняются через приемную комиссию.",
          ],
        },
        {
          title: "Участвовать в конкурсе по ОРТ",
          timing: "После завершения приема документов",
          items: [
            "Граждане КР, Казахстана, России, Беларуси и Таджикистана могут участвовать в конкурсе по ОРТ на бюджет.",
            "Пороговые баллы для бюджетной и контрактной формы определяет Министерство образования и науки КР.",
            "Итоговое зачисление оформляется после публикации результатов и подтверждения места.",
          ],
        },
      ],
      highlights: [
        "ОРТ обязателен для участия в бюджетном конкурсе.",
        "Приемная комиссия работает открыто и публикует результаты по установленному порядку.",
        "Документы и сроки стоит перепроверять перед подачей, так как официальный сайт регулярно обновляет правила приема.",
      ],
    },
    foreign: {
      title: "Поступление для иностранных граждан",
      subtitle:
        "Официальная англоязычная страница университета описывает прием на программу General Medicine, требования к документам, тест по биологии и химии и поддержку при адаптации.",
      advantagesTitle: "Преимущества по данным официального сайта",
      advantages: [
        "7 лабораторий: химия, физика, биология, биохимия и анатомия.",
        "2 диагностические лаборатории.",
        "Симуляционный и фантомный центр.",
        "Подготовительные классы.",
        "3 собственные клиники с современным оборудованием.",
        "Сотрудничество с зарубежными университетами и клиниками.",
      ],
      steps: [
        {
          title: "Подготовка документов",
          timing: "Первый этап",
          items: [
            "Заявление на имя ректора.",
            "Паспорт с визой, соответствующей законодательству КР, и копия.",
            "Оригинал документа о полном среднем образовании с перечнем предметов и оценок, а также нотариальная копия.",
            "Нотариальный перевод документа об образовании на официальный язык Кыргызской Республики.",
            "Справка Министерства образования и науки КР об эквивалентности полного среднего образования.",
            "2 фото 4x6 и 4 фото 3x4.",
            "Результаты медицинского обследования.",
          ],
        },
        {
          title: "Вступительные испытания",
          timing: "После проверки документов",
          items: [
            "Для англоязычного обучения вступительные экзамены проводятся в форме письменного теста по химии и биологии.",
            "Минимум по биологии: 50 баллов.",
            "Минимум по химии: 50 баллов.",
            "Минимальный порог для участия в конкурсе: 40% от максимально возможного результата.",
          ],
        },
        {
          title: "Зачисление и апелляции",
          timing: "Финальный этап",
          items: [
            "Результаты публикуются не позднее 10:00 следующего дня после теста.",
            "Апелляция подается лично на следующий день после объявления оценки.",
            "Зачисление проводится при наличии оригинала документа об образовании, подтверждения от МОиН КР и оплаты 50% стоимости одного года обучения.",
          ],
        },
      ],
      supportTitle: "Поддержка и адаптация",
      supportItems: [
        "Университет описывает собственную адаптационную программу для новых студентов.",
        "На официальном сайте отдельно выделены психологическая и социальная поддержка студентов.",
        "Для проживания доступно университетское общежитие и сопровождение по бытовым вопросам.",
      ],
    },
    committee: {
      title: "Приемная комиссия",
      subtitle:
        "Официальная страница приемной комиссии подчеркивает открытость приема и работу сразу по нескольким образовательным направлениям университета.",
      overview:
        "На базе Salymbekov University работают Международный факультет медицины, Международный колледж IT и бизнеса и Salymbekov Business School. Комиссия сопровождает прием по медицине, IT и бизнес-направлениям, а также дает разъяснения по правилам приема и требованиям к документам.",
      principlesTitle: "Как организован прием",
      principles: [
        "Соблюдение прав граждан в сфере образования.",
        "Прозрачность и открытость работы приемной комиссии.",
        "Объективная оценка способностей и склонностей поступающих.",
        "Доступность руководства приемной комиссии на всех этапах приема.",
      ],
      contactsTitle: "Контакты комиссии",
      contacts: [
        "Главный телефон университета: +996 (312) 658-538",
        "Медицинский набор: +996 774 83 88 83 и +996 501 83 88 83",
        "Общий email: info@salymbekov.com",
        "Адрес медицинского кампуса: г. Бишкек, ул. Фучика, 3",
      ],
    },
    procedure: {
      title: "Порядок приема",
      subtitle:
        "Собрано по официальным страницам: документы, ключевые правила, стоимость обучения, поддержка и полезные материалы для дальнейшего действия.",
      sections: [
        {
          heading: "1. Подготовка документов",
          body:
            "Для граждан КР и иностранных граждан университет публикует разные перечни документов. Общая логика одна: сначала проверка копий, затем предъявление оригиналов к началу учебного года.",
          bullets: [
            "Заявление на имя ректора.",
            "Документ об образовании.",
            "Паспорт и копии.",
            "Фотографии установленного формата.",
            "Медицинские документы.",
          ],
        },
        {
          heading: "2. Проверка академических оснований",
          body:
            "Для граждан КР важен результат ОРТ и конкурс по правилам Министерства образования и науки КР. Для иностранных граждан на англоязычных программах проводится письменный тест по биологии и химии.",
          bullets: [
            "ОРТ для бюджетного конкурса у граждан КР.",
            "Минимум 50 баллов по биологии и химии для иностранных граждан.",
            "Порог не ниже 40% от максимального результата для участия иностранного абитуриента в конкурсе.",
          ],
        },
        {
          heading: "3. Подтверждение места и оплата",
          body:
            "После публикации результатов комиссия оформляет зачисление. Для иностранных граждан официально указано требование об оплате 50% стоимости одного года обучения до окончательного зачисления.",
          bullets: [
            "General Medicine 5 years: 3 500 USD в год.",
            "General Medicine 6 years: 100 000 сом в год.",
            "Студенты имеют право платить стоимость обучения равными долями в течение учебного года.",
          ],
        },
        {
          heading: "4. Адаптация и инфраструктура",
          body:
            "Официальный сайт отдельно описывает общежитие, психологическую поддержку, академическую мобильность и инструкции для студентов, поэтому после зачисления абитуриенту не нужно искать эту информацию по разным разделам.",
          bullets: [
            "Общежитие: 4 этажа, 54 комнаты, 2- и 3-местное размещение.",
            "Есть адаптационная и психологическая поддержка студентов.",
            "Разделы с инструкциями, библиотекой и Research4Life доступны на официальном сайте университета.",
          ],
        },
      ],
    },
    scholarships: {
      title: "Льготы, общежитие и поддержка",
      subtitle:
        "В legacy-маршруте вместо пустой заглушки теперь собрана официальная информация о стоимости, социальной поддержке и условиях проживания студентов.",
      benefitsTitle: "Социальная поддержка по официальным положениям",
      benefits: [
        "Социальная поддержка может выражаться в снижении стоимости обучения в процентах от установленной суммы.",
        "Дополнительно возможны бесплатное проживание в общежитии, льготное питание и иные исключения по решению комиссии.",
        "Формы и размеры поддержки определяются университетом исходя из финансовых возможностей.",
        "Рассрочка и отсрочка оплаты возможны по рекомендации учебных подразделений при отсутствии академической и финансовой задолженности.",
      ],
      categoriesTitle: "Кто может претендовать на льготы",
      categories: [
        "Студенты очной формы обучения с отличной успеваемостью по итогам учебного года.",
        "Студенты, потерявшие кормильца, круглые сироты, лица с инвалидностью I и II группы.",
        "Студенты, родители которых являются штатными сотрудниками университета и внесли значимый вклад в его развитие.",
      ],
      tuitionTitle: "Официально опубликованная стоимость для медицины",
      tuition: [
        "General Medicine 5 years — 3 500 USD в год.",
        "General Medicine 6 years — 100 000 сом в год.",
      ],
      hostelTitle: "Общежитие",
      hostel: [
        "Общежитие университета находится в селе Новопокровка рядом с Бишкеком.",
        "В 4-этажном здании предусмотрены 54 комнаты для 2- и 3-местного размещения.",
        "На официальной странице отмечены кровати, учебные столы, высокоскоростной интернет, душевые, столовая и бытовые условия для подготовки к занятиям.",
      ],
    },
    campusEvents: {
      title: "Студенческие события и сообщества",
      subtitle:
        "Для legacy-маршрута мы собрали официальный минимум из разделов про студенческий совет, академическую мобильность и поддержку студентов.",
      studentCouncilTitle: "Студенческий совет",
      studentCouncil:
        "На официальном сайте студсовет описан как постоянный орган студенческого самоуправления, который представляет интересы студентов, участвует в общественной, учебной и научной жизни университета и помогает улучшать качество образования.",
      studentCouncilFacts: [
        "Студенческий сенат состоит из 8 участников с распределением по направлениям деятельности.",
        "Совет участвует в защите прав и интересов студентов и во взаимодействии с администрацией университета.",
        "В структуре упоминаются спортивное, культурное, учебное, научное и иные направления работы.",
      ],
      mobilityTitle: "Академическая мобильность",
      mobility:
        "Официальная страница академической мобильности показывает, что университет публикует студенческие и преподавательские презентации, научные работы и материалы совместных активностей с зарубежными партнерами.",
      mobilityPartners: [
        "Adam University",
        "Akfa University",
        "AsMI",
        "EMU, Tashkent",
        "Внутриуниверситетские Science Day активности",
      ],
      supportTitle: "Адаптация и поддержка",
      support:
        "Университет отдельно описывает адаптационную программу, психологическую помощь и социальную поддержку, чтобы студенты быстрее включались в учебный и внеучебный ритм.",
    },
  },
  en: {
    footer: {
      about:
        "The official university website presents Salymbekov University as a multidisciplinary ecosystem combining medicine, IT, business education, international partnerships, and practice-based learning.",
      addressLabel: "Main address",
      address: contactsShared.addressMain,
      phoneLabel: "Phone",
      emailLabel: "Email",
    },
    contacts: {
      title: "University contacts",
      subtitle:
        "This page consolidates the official contact details published across the Salymbekov University website so applicants, students, and partners can navigate the institution faster.",
      campusTitle: "Campuses and addresses",
      campuses: [
        {
          name: "Main campus / Higher School of Medicine",
          address: contactsShared.addressMedical,
          note: "Primary address used across the official university pages.",
        },
        {
          name: "International College of IT and Business",
          address: contactsShared.addressCollege,
          note: "Listed on the official tuition and contact pages for the college.",
        },
        {
          name: "Legal address",
          address: contactsShared.legalAddress,
          note: "Used in the official university requisites.",
        },
      ],
      contactTitle: "Main communication channels",
      contactItems: [
        { label: "Reception / general line", value: contactsShared.phoneMain, href: "tel:+996312658538" },
        { label: "Mobile contact", value: contactsShared.phoneMobile1, href: "tel:+996505658518" },
        { label: "Email", value: contactsShared.emailMain, href: "mailto:info@salymbekov.com" },
        { label: "WhatsApp", value: contactsShared.phoneMobile1, href: contactsShared.whatsapp },
      ],
      departmentTitle: "Who to contact",
      departments: [
        {
          name: "Admissions Committee",
          contact: contactsShared.phoneMobile2,
          email: contactsShared.emailMain,
          details: "Admissions, document requirements, enrollment, and annual intake questions.",
        },
        {
          name: "International admissions",
          contact: contactsShared.phoneMobile3,
          email: contactsShared.emailMain,
          details: "Foreign applicant support, migration and visa questions, onboarding and adaptation.",
        },
        {
          name: "General enquiries",
          contact: contactsShared.phoneMain,
          email: contactsShared.emailMain,
          details: "Official routing for departments, structure, and public-facing requests.",
        },
      ],
      officeHours: "Monday to Friday during university working hours. Admissions timing should be confirmed directly by phone.",
      mapLabel: "Campus map",
    },
    applicants: {
      title: "For applicants",
      subtitle:
        "The official website spreads applicant information across admissions rules, document lists, tuition fees, benefits, and adaptation. This page brings those pieces together in one place.",
      cards: [
        {
          title: "Requirements and documents",
          description: "Education document, passport, medical papers, and photos. Citizens of the Kyrgyz Republic also apply through the ORT-based process.",
          link: "/admissions/requirements",
        },
        {
          title: "Admission procedure",
          description: "Transparent committee workflow, publication of results, appeals, and admissions timing based on official university rules.",
          link: "/admissions/procedure",
        },
        {
          title: "Tuition and benefits",
          description: "Published General Medicine tuition figures plus social support, hostel, and installment options.",
          link: "/admission/scholarships",
        },
      ],
      factsTitle: "Before you apply",
      facts: [
        "The main medical campus is located at 3 Fuchika Street, Bishkek.",
        "The official email for public enquiries is info@salymbekov.com.",
        "Foreign citizens entering English-medium study take a written biology and chemistry test.",
        "Online applicants upload copies first and present originals by the beginning of the academic year.",
      ],
    },
    citizens: {
      title: "Admission for citizens of the Kyrgyz Republic",
      subtitle:
        "The official enrollee page defines a dedicated package of documents for Kyrgyz applicants and links budget admission to ORT-based competition.",
      steps: [
        {
          title: "Prepare the document package",
          timing: "Before the intake starts",
          items: [
            "Application addressed to the Rector.",
            "Original ORT certificate.",
            "State-issued school or vocational education document.",
            "Passport copy.",
            "2 photos 4x6 and 4 photos 3x4.",
            "Medical certificate 086-U.",
            "Military ID or registration certificate.",
          ],
        },
        {
          title: "Submit copies online and provide originals before the academic year starts",
          timing: "During the document submission window",
          items: [
            "Online admissions require copies of the relevant documents.",
            "Originals are submitted at the beginning of the school year.",
            "The admissions committee confirms the next steps after review.",
          ],
        },
        {
          title: "Participate in the ORT-based competition",
          timing: "After document review",
          items: [
            "Citizens of Kyrgyzstan, Kazakhstan, Russia, Belarus, and Tajikistan may participate in ORT-based competition for budget places.",
            "Threshold scores for budget and contract formats are determined by the Ministry of Education and Science of the Kyrgyz Republic.",
            "Final enrollment follows publication of results and seat confirmation.",
          ],
        },
      ],
      highlights: [
        "ORT is mandatory for budget-based competition.",
        "The admissions process is structured around official ministry thresholds and university rules.",
        "Applicants should re-check dates and documents before submission because official updates appear on the university site.",
      ],
    },
    foreign: {
      title: "Admission for foreign citizens",
      subtitle:
        "The official English-language admissions page describes entry to General Medicine, the foreign applicant document list, biology and chemistry testing, and student support.",
      advantagesTitle: "Officially published university strengths",
      advantages: [
        "7 laboratories in chemistry, physics, biology, biochemistry, and anatomy.",
        "2 diagnostic laboratories.",
        "Simulation and dummy center.",
        "Preparator classes.",
        "3 university clinics with modern equipment.",
        "Cooperation with foreign universities and clinics.",
      ],
      steps: [
        {
          title: "Prepare your documents",
          timing: "Step 1",
          items: [
            "Application addressed to the Rector.",
            "Passport with a visa compliant with Kyrgyz legislation and a copy.",
            "Original secondary education document with subjects and grades, plus notarized copy.",
            "Notarized translation of the education document into the official language of the Kyrgyz Republic.",
            "Certificate from the Ministry of Education and Science of the Kyrgyz Republic confirming equivalence of secondary education.",
            "2 photos 4x6 and 4 photos 3x4.",
            "Medical examination results.",
          ],
        },
        {
          title: "Take the entrance tests",
          timing: "Step 2",
          items: [
            "For English-medium study, foreign applicants sit a written chemistry and biology test.",
            "Minimum biology score: 50.",
            "Minimum chemistry score: 50.",
            "Minimum competition threshold: 40% of the maximum possible score.",
          ],
        },
        {
          title: "Enrollment and appeals",
          timing: "Step 3",
          items: [
            "Results are published by 10:00 the next morning after the tests.",
            "Appeals are filed personally on the day after the score announcement.",
            "Enrollment requires the original education document, Kyrgyz equivalency confirmation, and payment of 50% of one academic year's tuition.",
          ],
        },
      ],
      supportTitle: "Support and adaptation",
      supportItems: [
        "The official website highlights a dedicated adaptation program for students entering a new cultural environment.",
        "Psychological and social support are listed as structured student services.",
        "Hostel access and practical onboarding support are part of the student experience described by the university.",
      ],
    },
    committee: {
      title: "Admissions Committee",
      subtitle:
        "The official committee page emphasizes transparent admissions and a shared intake structure across the university's medicine, IT, and business directions.",
      overview:
        "Salymbekov University operates the International Faculty of Medicine, the International College of IT and Business, and Salymbekov Business School. The admissions committee routes applicants through the relevant document, rule, and enrollment flow.",
      principlesTitle: "How admissions are organized",
      principles: [
        "Protection of citizens' rights in education.",
        "Transparency and openness of the admissions process.",
        "Objective evaluation of applicants' abilities and interests.",
        "Availability of admissions leadership at every stage of intake.",
      ],
      contactsTitle: "Committee contact points",
      contacts: [
        `Main university line: ${contactsShared.phoneMain}`,
        `Medical admissions: ${contactsShared.phoneMobile2} and ${contactsShared.phoneMobile3}`,
        `General email: ${contactsShared.emailMain}`,
        `Medical campus address: ${contactsShared.addressMedical}`,
      ],
    },
    procedure: {
      title: "Admission procedure",
      subtitle:
        "This route now summarizes the official pages for required documents, admissions rules, tuition figures, student support, and follow-up materials.",
      sections: [
        {
          heading: "1. Prepare the required documents",
          body:
            "The university publishes separate lists for Kyrgyz applicants and foreign applicants. In both cases, applicants submit copies first and provide originals before the academic year starts.",
          bullets: [
            "Application to the Rector.",
            "Education document.",
            "Passport and copies.",
            "Photos in the required format.",
            "Medical documents.",
          ],
        },
        {
          heading: "2. Confirm your academic eligibility",
          body:
            "Citizens of the Kyrgyz Republic compete through ORT-based admission, while foreign citizens entering English-medium study take written biology and chemistry tests.",
          bullets: [
            "ORT-based competition for Kyrgyz applicants.",
            "Minimum 50 points in biology and chemistry for foreign applicants.",
            "Minimum 40% overall threshold for foreign applicants to stay in competition.",
          ],
        },
        {
          heading: "3. Confirm enrollment and payment",
          body:
            "After results are published, applicants finalize enrollment. The official foreign admissions page specifically states that enrollment follows payment of 50% of one academic year's tuition.",
          bullets: [
            "General Medicine 5 years: 3,500 USD per year.",
            "General Medicine 6 years: 100,000 KGS per year.",
            "The university states that tuition can be paid in equal installments during the academic year.",
          ],
        },
        {
          heading: "4. Move into student life",
          body:
            "The official site links admissions to student infrastructure, including hostel access, psychological support, academic mobility, and regulations.",
          bullets: [
            "Hostel: 4 floors, 54 rooms, 2- and 3-bed accommodation.",
            "Adaptation and psychological support are described as structured services.",
            "Instructions, regulations, library rules, and Research4Life materials are published in dedicated student sections.",
          ],
        },
      ],
    },
    scholarships: {
      title: "Benefits, hostel, and support",
      subtitle:
        "This legacy route now shows official information instead of a placeholder, combining tuition support, accommodation, and student benefits published by the university.",
      benefitsTitle: "Social support in the official regulations",
      benefits: [
        "Social support may reduce tuition fees by a percentage of the established amount.",
        "Additional support may include free hostel accommodation, preferential meals, and exceptional cases approved by the commission.",
        "The number and size of support measures are determined by the university based on financial capacity.",
        "Deferral or installment options may be granted when recommended by academic departments and when the student has no academic or financial debt.",
      ],
      categoriesTitle: "Who can apply for support",
      categories: [
        "Full-time students with excellent academic results.",
        "Students who lost a breadwinner, full orphans, and students with disability category I or II.",
        "Students whose parents are full-time university employees who made a significant contribution to university development.",
      ],
      tuitionTitle: "Official medicine tuition figures",
      tuition: [
        "General Medicine 5 years — 3,500 USD per year.",
        "General Medicine 6 years — 100,000 KGS per year.",
      ],
      hostelTitle: "Hostel",
      hostel: [
        "The official hostel page places the dormitory in Novopokrovka near Bishkek.",
        "The 4-storey building includes 54 rooms with 2-bed and 3-bed accommodation.",
        "The page lists beds, study tables, high-speed internet, showers, dining facilities, and conditions for study preparation.",
      ],
    },
    campusEvents: {
      title: "Student events and communities",
      subtitle:
        "This legacy page now pulls together official student-life material from the student council, academic mobility, and support sections.",
      studentCouncilTitle: "Student Council",
      studentCouncil:
        "The official website describes the Student Council as a permanent student self-government body that represents student interests, participates in social, educational, and scientific life, and contributes to improving education quality.",
      studentCouncilFacts: [
        "The student senate consists of 8 members with assigned directions of activity.",
        "The council helps represent and protect student rights and interests.",
        "Its structure covers sports, cultural, academic, scientific, and other student-facing sectors.",
      ],
      mobilityTitle: "Academic mobility",
      mobility:
        "The official mobility page showcases student and teacher presentations, research, and collaborative academic activity with partner institutions.",
      mobilityPartners: [
        "Adam University",
        "Akfa University",
        "AsMI",
        "EMU, Tashkent",
        "Internal Science Day activities",
      ],
      supportTitle: "Adaptation and support",
      support:
        "The university also publishes adaptation, psychological support, and social support resources so students can navigate both academic and personal transition into university life.",
    },
  },
  kg: {
    footer: {
      about:
        "Расмий сайттагы маалымат боюнча Salymbekov University медицина, IT жана бизнес багыттарын бириктирген, эл аралык өнөктөштүгү бар жана практика багытындагы билим берүүгө басым жасаган университет.",
      addressLabel: "Негизги дарек",
      address: "Бишкек ш., Фучик көч., 3",
      phoneLabel: "Телефон",
      emailLabel: "Email",
    },
    contacts: {
      title: "Университеттин байланыштары",
      subtitle:
        "Бул баракка Salymbekov University расмий сайтында жарыяланган негизги байланыштар чогултулду, ошондуктан абитуриенттерге жана студенттерге керектүү бөлүмдү табуу жеңил болот.",
      campusTitle: "Кампустар жана даректер",
      campuses: [
        {
          name: "Негизги кампус / Жогорку медицина мектеби",
          address: "Бишкек ш., Фучик көч., 3",
          note: "Расмий сайттагы башкы байланыш дареги.",
        },
        {
          name: "Эл аралык IT жана бизнес колледжи",
          address: "Бишкек ш., Малдыбаева көч., 24б / Ахунбаев проспекти, 125/2",
          note: "Колледждин расмий байланыш жана төлөм барактарында көрсөтүлгөн.",
        },
        {
          name: "Юридикалык дарек",
          address: "Бишкек ш., Ибраимов көч., 115А",
          note: "Университеттин расмий реквизиттеринде колдонулат.",
        },
      ],
      contactTitle: "Негизги байланыш каналдары",
      contactItems: [
        { label: "Жалпы кабыл алуу", value: contactsShared.phoneMain, href: "tel:+996312658538" },
        { label: "Уюлдук байланыш", value: contactsShared.phoneMobile1, href: "tel:+996505658518" },
        { label: "Email", value: contactsShared.emailMain, href: "mailto:info@salymbekov.com" },
        { label: "WhatsApp", value: contactsShared.phoneMobile1, href: contactsShared.whatsapp },
      ],
      departmentTitle: "Кайсы суроо менен кимге кайрылуу керек",
      departments: [
        {
          name: "Кабыл алуу комиссиясы",
          contact: contactsShared.phoneMobile2,
          email: contactsShared.emailMain,
          details: "Тапшыруу, документтердин тизмеси, кабыл алуу тартиби жана жыйынтык боюнча суроолор.",
        },
        {
          name: "Эл аралык кабыл алуу",
          contact: contactsShared.phoneMobile3,
          email: contactsShared.emailMain,
          details: "Чет өлкөлүк жарандар, виза жана миграция маселелери, адаптация боюнча колдоо.",
        },
        {
          name: "Жалпы кайрылуулар",
          contact: contactsShared.phoneMain,
          email: contactsShared.emailMain,
          details: "Университеттин түзүмү, бөлүмдөрү жана жалпы расмий суроолор.",
        },
      ],
      officeHours: "Дүйшөмбүдөн жумага чейин. Кабыл алуу боюнча убакытты алдын ала телефон аркылуу тактап алуу сунушталат.",
      mapLabel: "Кампус картасы",
    },
    applicants: {
      title: "Абитуриентке",
      subtitle:
        "Расмий сайтта абитуриенттер үчүн маалымат ар башка бөлүмдөргө бөлүнгөн: кабыл алуу эрежелери, документтер, окуу акысы, жеңилдиктер жана адаптация. Бул бетте биз аларды бириктирдик.",
      cards: [
        {
          title: "Талаптар жана документтер",
          description: "Билим берүү документи, паспорт, медициналык маалымкат жана сүрөттөр. КР жарандары үчүн ОРТ өзүнчө маанилүү.",
          link: "/admissions/requirements",
        },
        {
          title: "Кабыл алуу тартиби",
          description: "Кабыл алуу комиссиясынын ачык иши, жыйынтыктарды жарыялоо, апелляция жана кабыл алуу календары.",
          link: "/admissions/procedure",
        },
        {
          title: "Окуу акысы жана жеңилдиктер",
          description: "General Medicine боюнча расмий баалар, ошондой эле социалдык колдоо, жатакана жана бөлүп төлөө мүмкүнчүлүгү.",
          link: "/admission/scholarships",
        },
      ],
      factsTitle: "Тапшырар алдында маанилүү нерселер",
      facts: [
        "Медициналык негизги кампус Бишкек шаарындагы Фучик көчөсү 3 дарегинде жайгашкан.",
        "Университеттин расмий электрондук дареги: info@salymbekov.com.",
        "Англис тилдүү программага тапшырган чет өлкөлүк жарандар биология жана химия боюнча тест тапшырат.",
        "Онлайн тапшырууда көчүрмөлөр жөнөтүлөт, оригиналдар окуу жылы башталганда берилет.",
      ],
    },
    citizens: {
      title: "Кыргыз Республикасынын жарандары үчүн кабыл алуу",
      subtitle:
        "Расмий абитуриент барагында КР жарандары үчүн өзүнчө документтер пакети жана ОРТга негизделген кабыл алуу тартиби көрсөтүлгөн.",
      steps: [
        {
          title: "Документтерди даярдоо",
          timing: "Кабыл алуу башталганга чейин",
          items: [
            "Ректордун атына арыз.",
            "ОРТнын түп нуска сертификаты.",
            "Орто же орто кесиптик билим жөнүндө мамлекеттик документ.",
            "Паспорттун көчүрмөсү.",
            "2 даана 4x6 жана 4 даана 3x4 сүрөт.",
            "086-У медициналык маалымкаты.",
            "Аскер билети же каттоо күбөлүгү.",
          ],
        },
        {
          title: "Алгач көчүрмөлөрдү тапшыруу, кийин оригиналдарды берүү",
          timing: "Документ кабыл алуу учурунда",
          items: [
            "Онлайн кабыл алууда документтердин көчүрмөлөрү тиркелет.",
            "Оригиналдар окуу жылы башталганда өткөрүлөт.",
            "Андан кийинки кадамдарды кабыл алуу комиссиясы ырастайт.",
          ],
        },
        {
          title: "ОРТ боюнча конкурска катышуу",
          timing: "Документтер текшерилгенден кийин",
          items: [
            "КР, Казакстан, Россия, Беларусь жана Тажикстан жарандары бюджеттик орундар үчүн ОРТ конкурсуна катыша алышат.",
            "Бюджеттик жана контракттык форманын босого упайларын КР Билим берүү жана илим министрлиги аныктайт.",
            "Акыркы кабыл алуу жыйынтык жарыялангандан жана орун тастыкталгандан кийин жүргүзүлөт.",
          ],
        },
      ],
      highlights: [
        "Бюджеттик конкурс үчүн ОРТ милдеттүү.",
        "Кабыл алуу ачык тартипте жана министрликтин талаптарына ылайык жүргүзүлөт.",
        "Документтер менен мөөнөттөрдү тапшыруудан мурда расмий сайттан кайра тактап алуу керек.",
      ],
    },
    foreign: {
      title: "Чет өлкөлүк жарандар үчүн кабыл алуу",
      subtitle:
        "Расмий англис тилдүү кабыл алуу барагында General Medicine программасына тапшыруу, документтер, биология жана химия боюнча тест, ошондой эле студенттик колдоо баяндалган.",
      advantagesTitle: "Расмий сайтта көрсөтүлгөн артыкчылыктар",
      advantages: [
        "Химия, физика, биология, биохимия жана анатомия боюнча 7 лаборатория.",
        "2 диагностикалык лаборатория.",
        "Симуляция жана фантом борбору.",
        "Даярдоо класстары.",
        "Заманбап жабдуусу бар 3 клиника.",
        "Чет элдик университеттер жана клиникалар менен кызматташтык.",
      ],
      steps: [
        {
          title: "Документтерди даярдоо",
          timing: "1-этап",
          items: [
            "Ректордун атына арыз.",
            "КР мыйзамдарына ылайык виза коюлган паспорт жана анын көчүрмөсү.",
            "Предметтер жана баалар көрсөтүлгөн орто билим тууралуу документтин түп нускасы жана нотариалдык көчүрмөсү.",
            "Билим документин Кыргыз Республикасынын расмий тилине нотариалдык котормосу.",
            "КР Билим берүү жана илим министрлигинен эквиваленттүүлүк боюнча маалымкат.",
            "2 даана 4x6 жана 4 даана 3x4 сүрөт.",
            "Медициналык текшерүүнүн жыйынтыгы.",
          ],
        },
        {
          title: "Кириш тесттерин тапшыруу",
          timing: "2-этап",
          items: [
            "Англис тилдүү окууга тапшырган чет өлкөлүк жарандар биология жана химия боюнча жазуу түрүндөгү тест тапшырат.",
            "Биология боюнча минималдуу упай: 50.",
            "Химия боюнча минималдуу упай: 50.",
            "Конкурска катышуу үчүн жалпы босого: максималдуу упайдын 40%ы.",
          ],
        },
        {
          title: "Кабыл алуу жана апелляция",
          timing: "3-этап",
          items: [
            "Жыйынтык тесттен кийинки эртең мененки саат 10:00дөн кечиктирилбей жарыяланат.",
            "Апелляция баа жарыяланган эртеси күнү жеке берилет.",
            "Акыркы кабыл алуу үчүн билим документинин түп нускасы, КР министрлигинин ырастамасы жана бир жылдык окуу акысынын 50% төлөмү керек.",
          ],
        },
      ],
      supportTitle: "Колдоо жана адаптация",
      supportItems: [
        "Расмий сайт жаңы маданий чөйрөгө ылайыкташуу үчүн атайын адаптация программасын баса белгилейт.",
        "Психологиялык жана социалдык колдоо өзүнчө студенттик кызмат катары көрсөтүлгөн.",
        "Жатакана жана турмуштук маселелер боюнча коштоочу жардам каралган.",
      ],
    },
    committee: {
      title: "Кабыл алуу комиссиясы",
      subtitle:
        "Расмий кабыл алуу комиссиясынын барагы университетте медицина, IT жана бизнес багыттары боюнча бирдиктүү, бирок ачык уюштурулган кабыл алуу бар экенин көрсөтөт.",
      overview:
        "Salymbekov University базасында Эл аралык медицина факультети, Эл аралык IT жана бизнес колледжи жана Salymbekov Business School иштейт. Кабыл алуу комиссиясы талапкерди тиешелүү багыттын документ, эрежелер жана каттоо процессине багыттайт.",
      principlesTitle: "Кабыл алуу кандай жүргүзүлөт",
      principles: [
        "Билим алуу укуктарын сактоо.",
        "Кабыл алуу процессинин ачыктыгы жана айкындуулугу.",
        "Талапкерлердин жөндөмүн жана кызыгуусун объективдүү баалоо.",
        "Кабыл алуунун бардык этабында комиссия жетекчилигинин жеткиликтүүлүгү.",
      ],
      contactsTitle: "Комиссиянын байланыштары",
      contacts: [
        `Университеттин негизги номери: ${contactsShared.phoneMain}`,
        `Медициналык кабыл алуу: ${contactsShared.phoneMobile2} жана ${contactsShared.phoneMobile3}`,
        `Жалпы email: ${contactsShared.emailMain}`,
        `Медициналык кампус: ${contactsShared.addressMedical}`,
      ],
    },
    procedure: {
      title: "Кабыл алуу тартиби",
      subtitle:
        "Бул маршрут расмий булактардагы документтерди, кабыл алуу эрежелерин, окуу акысынын суммаларын жана студенттик инфраструктураны бир жерге топтойт.",
      sections: [
        {
          heading: "1. Керектүү документтерди даярдоо",
          body:
            "Университет КР жарандары жана чет өлкөлүк жарандар үчүн өзүнчө тизмелерди берет. Экөөндө тең алгач көчүрмөлөр, кийин оригиналдар талап кылынат.",
          bullets: [
            "Ректордун атына арыз.",
            "Билим жөнүндө документ.",
            "Паспорт жана көчүрмөлөр.",
            "Талап кылынган форматтагы сүрөттөр.",
            "Медициналык документтер.",
          ],
        },
        {
          heading: "2. Академиялык негизди ырастоо",
          body:
            "КР жарандары үчүн ОРТ маанилүү, ал эми англис тилдүү багытка тапшырган чет өлкөлүк талапкерлер биология жана химия боюнча жазуу тест тапшырат.",
          bullets: [
            "КР жарандары үчүн ОРТ конкурсу.",
            "Чет өлкөлүк талапкерлер үчүн биология жана химиядан кеминде 50 упай.",
            "Жалпы босого 40%дан төмөн болбошу керек.",
          ],
        },
        {
          heading: "3. Орунду ырастоо жана төлөм",
          body:
            "Жыйынтык жарыялангандан кийин кабыл алуу аяктайт. Расмий чет өлкөлүк кабыл алуу барагында окуунун бир жылдык акысынын 50% төлөнгөндөн кийин каттоо жүргүзүлөрү айтылат.",
          bullets: [
            "General Medicine 5 years: жылына 3 500 USD.",
            "General Medicine 6 years: жылына 100 000 сом.",
            "Окуу акысын окуу жылы ичинде тең бөлүп төлөөгө болот.",
          ],
        },
        {
          heading: "4. Студенттик жашоого өтүү",
          body:
            "Расмий сайт кабыл алуудан кийин жатакана, психологиялык колдоо, академиялык мобилдүүлүк жана нускамалар сыяктуу ресурстарга өтүүнү жеңилдетет.",
          bullets: [
            "Жатакана: 4 кабат, 54 бөлмө, 2 жана 3 орундуу жайгашуу.",
            "Адаптация жана психологиялык жардам бар.",
            "Нускамалар, китепкана эрежелери жана Research4Life материалдары өзүнчө бөлүмдөрдө жарыяланган.",
          ],
        },
      ],
    },
    scholarships: {
      title: "Жеңилдиктер, жатакана жана колдоо",
      subtitle:
        "Бул legacy маршрут эми бош эмес: расмий булактардагы окуу акысы, социалдык колдоо жана жатакана боюнча маалымат бир баракка чогултулду.",
      benefitsTitle: "Социалдык колдоо боюнча расмий жобо",
      benefits: [
        "Социалдык колдоо окуу акысынын белгиленген суммасынан пайыздык түрдө жеңилдик берүү катары колдонулушу мүмкүн.",
        "Кошумча колдоо катары жатаканада акысыз жашоо, жеңилдетилген тамактануу жана өзгөчө учурларда башка көмөк каралышы мүмкүн.",
        "Колдоонун көлөмү жана формасы университеттин финансылык мүмкүнчүлүгүнө жараша аныкталат.",
        "Окуу төлөмүн кийинкиге жылдыруу же бөлүп төлөө академиялык жана финансылык карыз жок болгондо каралат.",
      ],
      categoriesTitle: "Кимдер жеңилдик ала алат",
      categories: [
        "Күндүзгү бөлүмдө окуган жана эң жогорку академиялык жыйынтык көрсөткөн студенттер.",
        "Багуучусун жоготкон студенттер, толук жетимдер жана I-II топтогу майыптыгы бар студенттер.",
        "Ата-энеси университеттин штаттык кызматкери болуп, анын өнүгүшүнө олуттуу салым кошкон студенттер.",
      ],
      tuitionTitle: "Медицина багыты боюнча расмий окуу акысы",
      tuition: [
        "General Medicine 5 years — жылына 3 500 USD.",
        "General Medicine 6 years — жылына 100 000 сом.",
      ],
      hostelTitle: "Жатакана",
      hostel: [
        "Расмий жатакана барагында ал Новопокровка айылында, Бишкекке жакын жайгашканы айтылат.",
        "4 кабаттуу имаратта 54 бөлмө бар, 2 жана 3 орундуу жайгашуу каралган.",
        "Керебеттер, окуу столдору, ылдам интернет, душ, ашкана жана окууга даярдануу үчүн шарттар көрсөтүлгөн.",
      ],
    },
    campusEvents: {
      title: "Студенттик иш-чаралар жана коомчулуктар",
      subtitle:
        "Бул legacy бет эми расмий студенттик кеңеш, академиялык мобилдүүлүк жана колдоо бөлүмдөрүндөгү маалыматты бириктирет.",
      studentCouncilTitle: "Студенттик кеңеш",
      studentCouncil:
        "Расмий сайт студенттик кеңешти студенттердин кызыкчылыгын коргогон, коомдук, окуу жана илимий турмушка катышкан туруктуу өз алдынча башкаруу органы катары сүрөттөйт.",
      studentCouncilFacts: [
        "Студенттик сенат 8 мүчөдөн турат жана ар биринин багыты бөлүштүрүлгөн.",
        "Кеңеш студенттердин укуктарын жана кызыкчылыктарын коргоого көмөктөшөт.",
        "Спорттук, маданий, окуу, илимий жана башка секторлор каралган.",
      ],
      mobilityTitle: "Академиялык мобилдүүлүк",
      mobility:
        "Расмий мобилдүүлүк барагында студенттер менен окутуучулардын презентациялары, илимий иштери жана өнөктөш университеттер менен активдүүлүгү көрсөтүлгөн.",
      mobilityPartners: [
        "Adam University",
        "Akfa University",
        "AsMI",
        "EMU, Tashkent",
        "Ички Science Day иш-чаралары",
      ],
      supportTitle: "Адаптация жана колдоо",
      support:
        "Университет адаптациялык программа, психологиялык колдоо жана социалдык жардам тууралуу да өзүнчө маалымат берет.",
    },
  },
};

export const getOfficialContent = (language = "ru") => {
  if (language === "kg") {
    return officialSiteContent.kg;
  }

  if (language === "en") {
    return officialSiteContent.en;
  }

  return officialSiteContent.ru;
};
