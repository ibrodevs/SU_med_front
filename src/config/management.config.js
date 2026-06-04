// management.config.js
// Конфигурация для Management компонента

export const managementConfig = {
  // API настройки
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    endpoints: {
      organizationStructure: '/api/organization/structure',
      staffList: '/api/staff',
      exportData: '/api/export',
      analytics: '/api/analytics/management'
    },
    timeout: 10000,
    retryAttempts: 3
  },

  // Настройки поиска
  search: {
    debounceMs: 300,
    minQueryLength: 2,
    maxResults: 100,
    highlightMatches: true,
    fuzzySearch: true,
    searchFields: ['name', 'position', 'department', 'bio', 'specialization']
  },

  // Настройки экспорта
  export: {
    formats: ['pdf', 'excel', 'json', 'csv'],
    defaultFormat: 'pdf',
    includePhotos: true,
    includeContacts: true,
    includeHierarchy: true,
    maxFileSize: '10MB',
    compression: true
  },

  // Настройки интерфейса
  ui: {
    defaultViewMode: 'tree', // 'tree' | 'list'
    enableAnimations: true,
    animationDuration: 300,
    showPhotos: true,
    showContacts: true,
    showExperience: true,
    compactMode: false,
    darkMode: false,
    responsiveBreakpoints: {
      mobile: 768,
      tablet: 1024,
      desktop: 1440
    }
  },

  // Настройки аналитики
  analytics: {
    enabled: import.meta.env.MODE === 'production',
    trackSearches: true,
    trackProfileViews: true,
    trackExports: true,
    trackSessionTime: true,
    batchSize: 10,
    flushInterval: 30000 // 30 секунд
  },

  // Настройки кэширования
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 минут
    maxSize: 50, // максимум записей в кэше
    storage: 'localStorage', // 'localStorage' | 'sessionStorage' | 'memory'
    prefix: 'management_cache_'
  },

  // Цветовая схема
  theme: {
    light: {
      primary: '#3B82F6',
      secondary: '#1D4ED8',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      shadow: 'rgba(0, 0, 0, 0.1)',
      administration: '#DC2626',
      faculty: '#2563EB',
      department: '#059669',
      staff: '#7C3AED'
    },
    dark: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      border: '#334155',
      shadow: 'rgba(0, 0, 0, 0.3)',
      administration: '#EF4444',
      faculty: '#3B82F6',
      department: '#10B981',
      staff: '#8B5CF6'
    }
  },

  // Настройки доступности
  accessibility: {
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    highContrast: false,
    reducedMotion: false,
    focusRingWidth: 2,
    tabIndex: {
      searchInput: 1,
      filterSelect: 2,
      viewModeToggle: 3,
      exportButton: 4,
      orgNodes: 100 // начинается с 100 для узлов дерева
    }
  },

  // Настройки производительности
  performance: {
    virtualizeList: true,
    lazyLoadImages: true,
    debounceResize: 250,
    throttleScroll: 100,
    memoizeComponents: true,
    prefetchOnHover: false
  },

  // Локализация
  localization: {
    defaultLanguage: 'ru',
    supportedLanguages: ['ru', 'en', 'kg'],
    rtlLanguages: [],
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    numberFormat: {
      locale: 'ru-RU',
      style: 'decimal'
    }
  },

  // Настройки безопасности  
  security: {
    sanitizeInput: true,
    maxInputLength: 1000,
    allowedImageTypes: ['jpg', 'jpeg', 'png', 'webp'],
    maxImageSize: '2MB',
    validateEmails: true,
    validatePhones: true
  },

  // Настройки офлайн режима
  offline: {
    enabled: false,
    cacheStrategy: 'cacheFirst', // 'cacheFirst' | 'networkFirst' | 'staleWhileRevalidate'
    syncOnReconnect: true,
    showOfflineIndicator: true
  },

  // Настройки уведомлений
  notifications: {
    enabled: true,
    position: 'top-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    duration: 5000,
    showProgress: true,
    types: {
      success: { color: '#10B981', icon: '' },
      error: { color: '#EF4444', icon: '' },
      warning: { color: '#F59E0B', icon: '' },
      info: { color: '#3B82F6', icon: 'ℹ' }
    }
  },

  // Настройки валидации
  validation: {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 100
    },
    phone: {
      pattern: /^[\+]?[1-9][\d]{0,15}$/,
      maxLength: 20
    },
    name: {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Zа-яёА-ЯЁ\s\-\.]+$/
    }
  },

  // Экспериментальные функции
  experimental: {
    enableDragDrop: false,
    enableRealTimeUpdates: false,
    enableVoiceSearch: false,
    enableAIAssistant: false,
    enableAutocomplete: true
  },

  // Debug настройки
  debug: {
    enabled: import.meta.env.MODE === 'development',
    logLevel: 'warn', // 'error' | 'warn' | 'info' | 'debug'
    showPerformanceMetrics: false,
    logApiRequests: true,
    logStateChanges: false
  }
};

// Функции для работы с конфигурацией
export const getConfig = (path) => {
  return path.split('.').reduce((config, key) => config?.[key], managementConfig);
};

export const updateConfig = (path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((config, key) => config[key], managementConfig);
  if (target) {
    target[lastKey] = value;
  }
};

export const mergeConfig = (customConfig) => {
  return {
    ...managementConfig,
    ...customConfig,
    // Глубокое слияние для вложенных объектов
    theme: {
      ...managementConfig.theme,
      ...customConfig.theme
    },
    ui: {
      ...managementConfig.ui,
      ...customConfig.ui
    }
  };
};

// Валидация конфигурации
export const validateConfig = (config = managementConfig) => {
  const errors = [];

  // Проверка обязательных полей
  if (!config.api?.baseUrl) {
    errors.push('api.baseUrl is required');
  }

  if (config.search?.debounceMs < 0) {
    errors.push('search.debounceMs must be non-negative');
  }

  if (!['tree', 'list'].includes(config.ui?.defaultViewMode)) {
    errors.push('ui.defaultViewMode must be "tree" or "list"');
  }

  if (config.cache?.ttl < 0) {
    errors.push('cache.ttl must be non-negative');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Получение конфигурации для окружения
export const getEnvironmentConfig = () => {
  const env = import.meta.env.MODE || 'development';
  
  switch (env) {
    case 'production':
      return {
        ...managementConfig,
        debug: { ...managementConfig.debug, enabled: false },
        analytics: { ...managementConfig.analytics, enabled: true },
        performance: { ...managementConfig.performance, prefetchOnHover: true }
      };
    
    case 'development':
      return {
        ...managementConfig,
        debug: { ...managementConfig.debug, enabled: true, logLevel: 'debug' },
        cache: { ...managementConfig.cache, ttl: 1000 } // 1 секунда для разработки
      };
    
    case 'test':
      return {
        ...managementConfig,
        api: { ...managementConfig.api, timeout: 1000 },
        analytics: { ...managementConfig.analytics, enabled: false },
        notifications: { ...managementConfig.notifications, enabled: false }
      };
    
    default:
      return managementConfig;
  }
};

export default managementConfig;
