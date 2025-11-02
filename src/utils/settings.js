// utils/settings.js

// دالة لتحميل الإعدادات من localStorage
export const getSystemSettings = () => {
  try {
    return {
      security: JSON.parse(localStorage.getItem('securityConfig') || '{}'),
      content: JSON.parse(localStorage.getItem('contentConfig') || '{}'),
      registration: JSON.parse(localStorage.getItem('registrationConfig') || '{}'),
      general: JSON.parse(localStorage.getItem('generalConfig') || '{}'),
      appearance: JSON.parse(localStorage.getItem('appearanceConfig') || '{}')
    }
  } catch (error) {
    console.error('❌ خطأ في تحميل الإعدادات:', error)
    return {}
  }
}

// دالة للتحقق من صحة كلمة المرور بناءً على الإعدادات
export const validatePassword = (password) => {
  const settings = getSystemSettings()
  const security = settings.security || {}
  
  const minLength = security.minPasswordLength || 6
  const requireStrong = security.requireStrongPassword || false
  
  if (password.length < minLength) {
    return {
      valid: false,
      message: `كلمة المرور يجب أن تحتوي على ${minLength} أحرف على الأقل`
    }
  }
  
  if (requireStrong) {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return {
        valid: false,
        message: 'كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز'
      }
    }
  }
  
  return { valid: true, message: 'كلمة المرور صالحة' }
}

// دالة لتطبيق إعدادات المظهر
export const applyAppearanceSettings = () => {
  const settings = getSystemSettings()
  const appearance = settings.appearance || {}
  
  // تطبيق الألوان
  if (appearance.primaryColor) {
    document.documentElement.style.setProperty('--primary-color', appearance.primaryColor)
    document.documentElement.style.setProperty('--primary-color-rgb', hexToRgb(appearance.primaryColor))
  }
  
  if (appearance.secondaryColor) {
    document.documentElement.style.setProperty('--secondary-color', appearance.secondaryColor)
    document.documentElement.style.setProperty('--secondary-color-rgb', hexToRgb(appearance.secondaryColor))
  }
  
  // تطبيق الخطوط
  if (appearance.fontFamily) {
    document.documentElement.style.setProperty('--font-family', appearance.fontFamily)
  }
  
  if (appearance.baseFontSize) {
    document.documentElement.style.setProperty('--base-font-size', appearance.baseFontSize)
  }
  
  // تطبيق الوضع الداكن
  if (appearance.darkMode) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
}

// تحويل HEX إلى RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
    : '1, 53, 44'
}

// دالة للتحقق من أنواع الملفات المسموحة
export const isFileTypeAllowed = (fileType) => {
  const settings = getSystemSettings()
  const content = settings.content || {}
  const allowedTypes = content.allowedTypes || ['pdf', 'image', 'video', 'audio']
  
  const typeMap = {
    'application/pdf': 'pdf',
    'image/jpeg': 'image',
    'image/png': 'image',
    'image/gif': 'image',
    'video/mp4': 'video',
    'video/avi': 'video',
    'audio/mp3': 'audio',
    'audio/wav': 'audio',
    'text/plain': 'text'
  }
  
  const fileCategory = typeMap[fileType]
  return allowedTypes.includes(fileCategory)
}

// دالة للتحقق من حجم الملف
export const isFileSizeAllowed = (fileSize) => {
  const settings = getSystemSettings()
  const content = settings.content || {}
  const maxSize = (content.maxFileSize || 25) * 1024 * 1024 // تحويل إلى bytes
  
  return fileSize <= maxSize
}

// دالة للتحقق من وضع الصيانة
export const checkMaintenanceMode = () => {
  const settings = getSystemSettings()
  const general = settings.general || {}
  return general.maintenanceMode || false
}

// دالة للتحقق من صلاحيات الدخول
export const validateLoginPermissions = (selectedLoginType, userAccountType) => {
  if (selectedLoginType === 'admin' && !['admin', 'employee'].includes(userAccountType)) {
    return {
      allowed: false,
      message: '❌ ليس لديك صلاحيات الدخول كمدير. يجب أن يكون لديك حساب مدير للدخول بهذه الصلاحية.'
    }
  }
  
  if (selectedLoginType === 'user' && ['admin', 'employee'].includes(userAccountType)) {
    return {
      allowed: false,
      message: '❌ لا يمكن للمديرين الدخول كمستفيدين. يرجى إنشاء حساب مستفيد منفصل للدخول كمستخدم عادي.'
    }
  }
  
  return { allowed: true, message: '' }
}

// دالة للتحقق من إعدادات التسجيل
export const checkRegistrationSettings = (accountType) => {
  const settings = getSystemSettings()
  const registration = settings.registration || {}
  
  if (!registration.allowPublicRegistration) {
    return {
      allowed: false,
      message: '❌ التسجيل مغلق حالياً. يرجى التواصل مع الإدارة.'
    }
  }
  
  // التحقق من الأدوار المسموحة
  const allowedRoles = registration.allowedRoles || ['parent', 'teacher', 'student']
  if (!allowedRoles.includes(accountType)) {
    return {
      allowed: false,
      message: '❌ هذا النوع من الحسابات غير مسموح به حالياً'
    }
  }
  
  return { allowed: true, message: '' }
}