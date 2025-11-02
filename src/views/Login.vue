<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-8">
    <AppHeader />

    <main class="container mx-auto px-4 py-8 max-w-4xl">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          تسجيل الدخول إلى المكتبة
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          اختر نوع الحساب وأدخل بيانات الدخول
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- الشريط الجانبي -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">أنواع الحسابات</h3>
            
            <div class="space-y-4">
              <!-- حساب المدير -->
              <div class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#1B3C53] dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
                   @click="selectLoginType('admin')"
                   :class="{ 'border-[#1B3C53] dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20': selectedLoginType === 'admin' }">
                <div class="w-12 h-12 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-xl flex items-center justify-center text-white">
                  <span class="material-icons">admin_panel_settings</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 dark:text-white">مدير النظام</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">صلاحيات كاملة على النظام</p>
                </div>
              </div>

              <!-- حساب المستفيد -->
              <div class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#1B3C53] dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
                   @click="selectLoginType('user')"
                   :class="{ 'border-[#1B3C53] dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20': selectedLoginType === 'user' }">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <span class="material-icons">person</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 dark:text-white">مستفيد</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">تصفح المحتوى والتفاعل</p>
                </div>
              </div>

              <!-- حساب موظف -->
              <div class="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#1B3C53] dark:hover:border-blue-600 transition-all duration-200 cursor-pointer"
                   @click="selectLoginType('employee')"
                   :class="{ 'border-[#1B3C53] dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20': selectedLoginType === 'employee' }">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <span class="material-icons">engineering</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-800 dark:text-white">موظف</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">إدارة المحتوى والمستخدمين</p>
                </div>
              </div>
            </div>

            <!-- معلومات الحسابات التجريبية -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-3">حسابات تجريبية</h4>
              
              <div class="space-y-3">
                <div v-for="account in demoAccounts" :key="account.type"
                     class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                     @click="fillCredentials(account.type)">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-xs font-medium text-gray-800 dark:text-white">{{ account.name }}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">{{ account.email }}</p>
                    </div>
                    <span class="material-icons text-gray-400 text-sm">content_copy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- نموذج تسجيل الدخول -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            
            <!-- رأس النموذج -->
            <div class="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] p-6 text-white">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="material-icons text-2xl">login</span>
                  <div>
                    <h2 class="text-xl font-bold">تسجيل الدخول</h2>
                    <p class="text-blue-100 text-sm">{{ selectedLoginType ? getLoginTypeInfo(selectedLoginType).description : 'اختر نوع الحساب' }}</p>
                  </div>
                </div>
                <div v-if="selectedLoginType" class="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-1">
                  <span class="material-icons text-sm">{{ getLoginTypeInfo(selectedLoginType).icon }}</span>
                  <span class="font-medium text-sm">{{ getLoginTypeInfo(selectedLoginType).name }}</span>
                </div>
              </div>
            </div>

            <!-- محتوى النموذج -->
            <div class="p-6">
              <div v-if="!selectedLoginType" class="text-center py-12">
                <span class="material-icons text-6xl text-gray-400 mb-4">account_circle</span>
                <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">اختر نوع الحساب</h3>
                <p class="text-gray-600 dark:text-gray-400">يرجى اختيار نوع الحساب من القائمة الجانبية للمتابعة</p>
              </div>

              <div v-else class="space-y-6">
                <!-- نموذج الدخول -->
                <form @submit.prevent="performLogin" class="space-y-6">
                  
                  <!-- معلومات الحساب المختار -->
                  <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                           :style="getLoginTypeStyle(selectedLoginType)">
                        <span class="material-icons text-sm">{{ getLoginTypeInfo(selectedLoginType).icon }}</span>
                      </div>
                      <div>
                        <h4 class="font-bold text-gray-800 dark:text-white">{{ getLoginTypeInfo(selectedLoginType).name }}</h4>
                        <p class="text-xs text-gray-600 dark:text-gray-400">{{ getLoginTypeInfo(selectedLoginType).description }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- حقل البريد الإلكتروني -->
                  <div class="group">
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <span class="material-icons text-[#1B3C53] text-lg">email</span>
                      البريد الإلكتروني *
                    </label>
                    <input
                      v-model="form.email"
                      type="email"
                      required
                      class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                      placeholder="ادخل بريدك الإلكتروني"
                      @input="clearError"
                    >
                  </div>

                  <!-- حقل كلمة المرور -->
                  <div class="group">
                    <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <span class="material-icons text-[#1B3C53] text-lg">lock</span>
                      كلمة المرور *
                    </label>
                    <div class="relative">
                      <input
                        v-model="form.password"
                        :type="showPassword ? 'text' : 'password'"
                        required
                        class="w-full px-4 py-3 pr-12 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                        placeholder="ادخل كلمة المرور"
                        @input="clearError"
                      >
                      <button
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#1B3C53] dark:hover:text-white transition-colors duration-200"
                      >
                        <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- خيارات إضافية -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <input
                        id="remember-me"
                        v-model="form.rememberMe"
                        type="checkbox"
                        class="w-4 h-4 text-[#1B3C53] border-gray-300 rounded focus:ring-[#1B3C53] focus:ring-2"
                      >
                      <label for="remember-me" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        تذكرني على هذا الجهاز
                      </label>
                    </div>

                    <button type="button" class="text-sm text-[#1B3C53] dark:text-blue-400 hover:underline transition-colors duration-200">
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  <!-- رسالة الخطأ -->
                  <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div class="flex items-center gap-3">
                      <span class="material-icons text-red-500">error</span>
                      <div>
                        <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- زر تسجيل الدخول -->
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
                  >
                    <span class="material-icons">{{ loading ? 'autorenew' : 'login' }}</span>
                    {{ loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول' }}
                  </button>
                </form>

                <!-- تسجيل سريع -->
                <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
                  <button
                    @click="fillCredentials(selectedLoginType)"
                    class="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1B3C53] text-[#1B3C53] dark:text-white rounded-xl hover:bg-[#1B3C53] hover:text-white transition-all duration-200 font-medium"
                  >
                    <span class="material-icons">play_arrow</span>
                    استخدام حساب تجريبي
                  </button>
                </div>

                <!-- رابط إنشاء حساب -->
                <div class="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    ليس لديك حساب؟ 
                    <router-link to="/register" class="text-[#1B3C53] dark:text-blue-400 font-bold hover:underline transition-colors duration-200">
                      أنشئ حساب جديد
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const error = ref('')
    const showPassword = ref(false)
    const selectedLoginType = ref(null)

    const form = ref({
      email: '',
      password: '',
      rememberMe: false
    })

    // معلومات أنواع الحسابات
    const loginTypes = {
      admin: {
        name: 'مدير النظام',
        description: 'صلاحيات كاملة على النظام والمحتوى',
        icon: 'admin_panel_settings',
        color: 'from-[#1B3C53] to-[#234C6A]'
      },
      user: {
        name: 'مستفيد',
        description: 'تصفح المحتوى والتفاعل مع القصص',
        icon: 'person',
        color: 'from-green-500 to-emerald-600'
      },
      employee: {
        name: 'موظف',
        description: 'إدارة المحتوى والمستخدمين والتقارير',
        icon: 'engineering',
        color: 'from-purple-500 to-indigo-600'
      }
    }

    // الحسابات التجريبية
    const demoAccounts = [
      { type: 'admin', name: 'مدير النظام', email: 'admin@example.com', password: 'password123' },
      { type: 'user', name: 'مستفيد', email: 'user@example.com', password: 'password123' },
      { type: 'employee', name: 'موظف', email: 'employee@example.com', password: 'password123' }
    ]

    // الحصول على معلومات نوع الدخول
    const getLoginTypeInfo = (type) => {
      return loginTypes[type] || loginTypes.user
    }

    // الحصول على نمط نوع الدخول
    const getLoginTypeStyle = (type) => {
      const info = getLoginTypeInfo(type)
      return {
        background: `linear-gradient(135deg, ${info.color.split(' ')[1]}, ${info.color.split(' ')[3]})`
      }
    }

    // اختيار نوع الدخول
    const selectLoginType = (type) => {
      selectedLoginType.value = type
      clearError()
    }

    // تعبئة بيانات الاعتماد
    const fillCredentials = (type) => {
      const account = demoAccounts.find(acc => acc.type === type)
      if (account) {
        form.value.email = account.email
        form.value.password = account.password
        clearError()
      }
    }

    // مسح رسالة الخطأ
    const clearError = () => {
      error.value = ''
    }

    // تهيئة الحسابات الافتراضية
    const initializeDefaultAccounts = () => {
      const users = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
      
      // إضافة الحسابات إذا لم تكن موجودة
      demoAccounts.forEach(account => {
        const exists = users.find(user => user.email === account.email)
        if (!exists) {
          users.push({
            id: Date.now() + Math.random(),
            fullName: account.name,
            email: account.email,
            password: account.password,
            accountType: account.type,
            phone: '+966500000000',
            status: 'active',
            createdAt: new Date().toISOString(),
            lastLogin: null,
            avatar: account.name.charAt(0)
          })
        }
      })

      localStorage.setItem('libraryUsers', JSON.stringify(users))
    }

    // تحميل بيانات المستخدمين
    const getUsers = () => {
      try {
        const users = localStorage.getItem('libraryUsers')
        return users ? JSON.parse(users) : []
      } catch (error) {
        console.error('❌ خطأ في تحميل بيانات المستخدمين:', error)
        return []
      }
    }

    // المصادقة
    const authenticateUser = (email, password) => {
      const users = getUsers()
      const user = users.find(u => u.email === email && u.status === 'active')
      
      if (!user) {
        return null
      }

      if (user.password !== password) {
        return null
      }

      return user
    }

    // تحديد لوحة التحكم
    const getUserDashboard = (accountType) => {
      const dashboards = {
        admin: '/admin',
        employee: '/employee/stories',
        user: '/favorites'
      }
      return dashboards[accountType] || '/favorites'
    }

    // دالة للتحقق من وجود صفحة للعودة إليها بعد المصادقة
    const checkRedirectAfterAuth = () => {
      const redirectTo = localStorage.getItem('redirectAfterLogin')
      if (redirectTo) {
        localStorage.removeItem('redirectAfterLogin')
        return redirectTo
      }
      return null
    }

    // إشعار التطبيقات الأخرى بتغير حالة المصادقة
    const notifyAuthChange = () => {
      // إنشاء حدث تخزين مخصص
      const storageEvent = new StorageEvent('storage', {
        key: 'authToken',
        newValue: localStorage.getItem('authToken'),
        oldValue: null,
        url: window.location.href,
        storageArea: localStorage
      })
      window.dispatchEvent(storageEvent)
      
      // تحديث مباشر للصفحات المفتوحة
      if (window.opener) {
        window.opener.postMessage({ type: 'AUTH_CHANGE', authenticated: true }, '*')
      }
      
      // إرسال رسالة لجميع النوافذ
      window.postMessage({ type: 'AUTH_CHANGE', authenticated: true }, '*')
      
      // تحديث localStorage لإطلاق الحدث
      const currentToken = localStorage.getItem('authToken')
      localStorage.setItem('authToken', currentToken)
    }

    // تنفيذ تسجيل الدخول
    const performLogin = async () => {
      if (!selectedLoginType.value) {
        error.value = 'يرجى اختيار نوع الحساب أولاً'
        return
      }

      loading.value = true
      error.value = ''

      try {
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (!form.value.email || !form.value.password) {
          error.value = 'يرجى إدخال البريد الإلكتروني وكلمة المرور'
          return
        }

        const authenticatedUser = authenticateUser(form.value.email, form.value.password)

        if (authenticatedUser) {
          // إعداد بيانات المستخدم
          const userData = {
            id: authenticatedUser.id,
            name: authenticatedUser.fullName,
            email: authenticatedUser.email,
            role: authenticatedUser.accountType,
            avatar: authenticatedUser.avatar,
            isAdmin: ['admin', 'employee'].includes(authenticatedUser.accountType),
            type: authenticatedUser.accountType,
            phone: authenticatedUser.phone || ''
          }

          // حفظ بيانات الجلسة
          const token = `user-token-${Date.now()}`
          localStorage.setItem('authToken', token)
          localStorage.setItem('userData', JSON.stringify(userData))
          localStorage.setItem('userType', authenticatedUser.accountType)

          if (form.value.rememberMe) {
            localStorage.setItem('rememberedEmail', form.value.email)
          } else {
            localStorage.removeItem('rememberedEmail')
          }

          // تحديث وقت النشاط
          localStorage.setItem('lastActivity', new Date().getTime().toString())

          console.log('✅ تم تسجيل الدخول بنجاح:', userData)
          
          // إشعار التطبيقات الأخرى بتغير حالة المصادقة
          notifyAuthChange()
          
          // التحقق من وجود صفحة للعودة إليها
          const redirectTo = checkRedirectAfterAuth()
          if (redirectTo) {
            // العودة إلى الصفحة الأصلية
            router.replace(redirectTo)
          } else {
            // التوجيه إلى لوحة التحكم الافتراضية
            const dashboardRoute = getUserDashboard(authenticatedUser.accountType)
            router.push(dashboardRoute)
          }
        } else {
          error.value = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        }
      } catch (err) {
        error.value = 'حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.'
        console.error('❌ Login error:', err)
      } finally {
        loading.value = false
      }
    }

    // تحميل البريد الإلكتروني المحفوظ
    const loadRememberedEmail = () => {
      const rememberedEmail = localStorage.getItem('rememberedEmail')
      if (rememberedEmail) {
        form.value.email = rememberedEmail
        form.value.rememberMe = true
      }
    }

    onMounted(() => {
      // تهيئة الحسابات الافتراضية
      initializeDefaultAccounts()
      
      // تحميل البريد الإلكتروني المحفوظ
      loadRememberedEmail()

      // التحقق من المصادقة الحالية
      const token = localStorage.getItem('authToken')
      const userData = localStorage.getItem('userData')
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData)
          // التحقق من وجود صفحة للعودة إليها
          const redirectTo = checkRedirectAfterAuth()
          if (redirectTo) {
            router.replace(redirectTo)
          } else {
            const dashboardRoute = getUserDashboard(user.accountType || user.type)
            router.push(dashboardRoute)
          }
        } catch (error) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('userData')
          localStorage.removeItem('userType')
        }
      }
    })

    return {
      form,
      loading,
      error,
      showPassword,
      selectedLoginType,
      demoAccounts,
      selectLoginType,
      fillCredentials,
      performLogin,
      getLoginTypeInfo,
      getLoginTypeStyle,
      clearError
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap');

* {
  font-family: 'Tajawal', sans-serif;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

/* تحسينات للرسوم المتحركة */
.transition-all {
  transition: all 0.3s ease;
}

.group:hover .group-hover\:scale-\[1\.02\] {
  transform: scale(1.02);
}
</style>