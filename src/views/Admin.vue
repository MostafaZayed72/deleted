<template>
  <div dir="rtl" class="min-h-screen" :class="appearanceClasses">
    <!-- شريط التنقل يعرض من خلال AppHeader المجلّد في components -->
         <AppHeader />
    <div class="pt-6"></div>

    <!-- المحتوى الرئيسي فقط -->
    <div class="container mx-auto px-4 py-8" :class="containerClasses">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Admin',
  setup() {
    const router = useRouter()
    const userData = ref(null)

    // دالة لتحميل الإعدادات من localStorage
    const getSystemSettings = () => {
      try {
        return {
          general: JSON.parse(localStorage.getItem('generalConfig') || '{}'),
          security: JSON.parse(localStorage.getItem('securityConfig') || '{}'),
          appearance: JSON.parse(localStorage.getItem('appearanceConfig') || '{}'),
          content: JSON.parse(localStorage.getItem('contentConfig') || '{}'),
          registration: JSON.parse(localStorage.getItem('registrationConfig') || '{}')
        }
      } catch (error) {
        console.error('خطأ في تحميل الإعدادات:', error)
        return {}
      }
    }

    // دالة لتطبيق إعدادات المظهر
    const applyAppearanceSettings = () => {
      const settings = getSystemSettings()
      const appearance = settings.appearance || {}
      
      // تطبيق الخط
      if (appearance.fontFamily) {
        document.documentElement.style.setProperty('--font-family', appearance.fontFamily)
      }
      
      // تطبيق الألوان
      if (appearance.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', appearance.primaryColor)
      }
      
      if (appearance.secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', appearance.secondaryColor)
      }
      
      // تطبيق حجم الخط
      if (appearance.baseFontSize) {
        document.documentElement.style.fontSize = appearance.baseFontSize
      }
    }

    // الحصول على إعدادات النظام
    const systemSettings = computed(() => getSystemSettings())
    const platformName = computed(() => systemSettings.value.general?.platformName || 'مركز صالح بن صالح')

    // تطبيق إعدادات المظهر
    const appearanceClasses = computed(() => {
      const appearance = systemSettings.value.appearance || {}
      const classes = {
        'bg-gray-50': !appearance.darkMode,
        'bg-gray-900': appearance.darkMode,
      }
      
      // إضافة فئة الخط إذا كان محدداً
      if (appearance.fontFamily) {
        const fontClass = getFontFamilyClass(appearance.fontFamily)
        if (fontClass) classes[fontClass] = true
      }
      
      return classes
    })

    // دالة مساعدة للحصول على فئة الخط
    const getFontFamilyClass = (fontFamily) => {
      const fontMap = {
        'Tahoma': 'font-tahoma',
        'Arial': 'font-arial',
        'Helvetica': 'font-helvetica',
        "'Segoe UI'": 'font-segoe',
        "'Traditional Arabic'": 'font-traditional'
      }
      return fontMap[fontFamily] || ''
    }

    const navStyle = computed(() => {
      const appearance = systemSettings.value.appearance || {}
      return {
        backgroundColor: appearance.primaryColor || '#01352c'
      }
    })

    const containerClasses = computed(() => {
      const appearance = systemSettings.value.appearance || {}
      return {
        'max-w-full': appearance.fullWidth,
        'max-w-7xl': !appearance.fullWidth
      }
    })

    const loadUserData = () => {
      const storedUser = localStorage.getItem('userData')
      if (storedUser) {
        userData.value = JSON.parse(storedUser)
      }
    }

    const logout = () => {
      if (confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('lastActivity')
        router.push('/login')
      }
    }

    // التحقق من صلاحية الجلسة
    const checkSession = () => {
      const security = systemSettings.value.security || {}
      const sessionTimeout = security.sessionTimeout || 60
      
      if (sessionTimeout > 0) {
        const lastActivity = localStorage.getItem('lastActivity')
        if (lastActivity) {
          const now = new Date().getTime()
          const diff = (now - parseInt(lastActivity)) / (1000 * 60) // الفرق بالدقائق
          
          if (diff > sessionTimeout) {
            alert('انتهت الجلسة بسبب عدم النشاط')
            logout()
          }
        }
      }
    }

    // تحديث وقت النشاط
    const updateActivityTime = () => {
      localStorage.setItem('lastActivity', new Date().getTime().toString())
    }

    onMounted(() => {
      loadUserData()
      applyAppearanceSettings()
      
      // إعداد متابعة النشاط
      updateActivityTime()
      document.addEventListener('click', updateActivityTime)
      document.addEventListener('keypress', updateActivityTime)
      
      // التحقق الدوري من الجلسة
      const sessionInterval = setInterval(checkSession, 60000) // كل دقيقة
      
      // تنظيف الـ interval عند تدمير المكون
      return () => {
        clearInterval(sessionInterval)
        document.removeEventListener('click', updateActivityTime)
        document.removeEventListener('keypress', updateActivityTime)
      }
    })

    return {
      userData,
      platformName,
      appearanceClasses,
      navStyle,
      containerClasses,
      logout
    }
  }
}
</script>

<style scoped>
/* تطبيق إعدادات الخطوط ديناميكياً */
:deep(*) {
  font-family: inherit;
}

/* تحسين المظهر في الوضع الداكن */
:deep(.bg-gray-50) {
  background-color: #f9fafb;
}

:deep(.bg-gray-900) {
  background-color: #111827;
  color: #f9fafb;
}

:deep(.bg-gray-900 .text-white) {
  color: #f9fafb;
}

/* تعريف فئات الخطوط */
.font-tahoma {
  font-family: Tahoma, Arial, sans-serif;
}

.font-arial {
  font-family: Arial, sans-serif;
}

.font-helvetica {
  font-family: Helvetica, Arial, sans-serif;
}

.font-segoe {
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.font-traditional {
  font-family: 'Traditional Arabic', 'Segoe UI', Tahoma, sans-serif;
}
</style>