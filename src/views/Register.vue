<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      
      <!-- بطاقة إنشاء الحساب -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        
        <!-- الشعار -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#1B3C53] to-[#234C6A] mx-auto mb-4 shadow-lg">
            <span class="material-icons text-white text-2xl">person_add</span>
          </div>
          <h2 class="text-2xl font-bold text-[#1B3C53] dark:text-white mb-2">أنشئ حسابك الجديد</h2>
          <p class="text-[#456882] dark:text-gray-300">مركز صالح بن صالح - مكتبة الطفل الرقمية</p>
        </div>

        <!-- نموذج إنشاء الحساب -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          
          <!-- الاسم الكامل -->
          <div>
            <label class="block text-sm font-medium mb-2 text-[#1B3C53] dark:text-gray-300">الاسم الكامل</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 text-lg">person</span>
              <input 
                type="text" 
                v-model="form.fullName"
                required
                placeholder="ادخل اسمك الكامل"
                class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
              >
            </div>
          </div>

          <!-- البريد الإلكتروني -->
          <div>
            <label class="block text-sm font-medium mb-2 text-[#1B3C53] dark:text-gray-300">البريد الإلكتروني</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 text-lg">email</span>
              <input 
                type="email" 
                v-model="form.email"
                required
                placeholder="ادخل بريدك الإلكتروني"
                class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
              >
            </div>
          </div>

          <!-- كلمة المرور -->
          <div>
            <label class="block text-sm font-medium mb-2 text-[#1B3C53] dark:text-gray-300">كلمة المرور</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 text-lg">lock</span>
              <input 
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="اختر كلمة مرور قوية"
                class="w-full px-4 py-3 pr-20 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
              >
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 hover:text-[#1B3C53] dark:hover:text-white transition-colors duration-200"
              >
                <span class="material-icons text-lg">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
            <p class="text-xs mt-2 text-[#456882] dark:text-gray-400">يجب أن تحتوي على 6 أحرف على الأقل</p>
          </div>

          <!-- تأكيد كلمة المرور -->
          <div>
            <label class="block text-sm font-medium mb-2 text-[#1B3C53] dark:text-gray-300">تأكيد كلمة المرور</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 text-lg">lock</span>
              <input 
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="أعد إدخال كلمة المرور"
                class="w-full px-4 py-3 pr-20 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
              >
              <button 
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 hover:text-[#1B3C53] dark:hover:text-white transition-colors duration-200"
              >
                <span class="material-icons text-lg">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <!-- نوع الحساب -->
          <div>
            <label class="block text-sm font-medium mb-2 text-[#1B3C53] dark:text-gray-300">نوع الحساب</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 text-lg">person_outline</span>
              <select 
                v-model="form.accountType" 
                class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none transition-all duration-200"
              >
                <option value="parent">ولي أمر</option>
                <option value="teacher">معلم</option>
                <option value="student">طالب</option>
              </select>
            </div>
            <p class="text-xs mt-2 text-[#456882] dark:text-gray-400">ملاحظة: لا يمكن إنشاء حسابات مدير أو موظف من هنا</p>
          </div>

          <!-- رقم الهاتف -->
          <div>
            <label class="block text-sm font-medium mb-2 text-[#1B3C53] dark:text-gray-300">رقم الهاتف (اختياري)</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400 text-lg">phone</span>
              <input 
                type="tel" 
                v-model="form.phone"
                placeholder="ادخل رقم هاتفك"
                class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
              >
            </div>
          </div>

          <!-- الموافقة على الشروط -->
          <div class="flex items-start gap-3">
            <input 
              type="checkbox" 
              v-model="form.agreeTerms"
              required
              class="mt-1 rounded border-gray-300 dark:border-gray-600 focus:ring-[#1B3C53] bg-white dark:bg-gray-700"
            >
            <label class="text-sm text-[#1B3C53] dark:text-gray-300 flex-1">
              أوافق على 
              <a href="#" class="font-medium text-[#1B3C53] dark:text-blue-400 hover:underline transition-colors duration-200">شروط الاستخدام</a>
              و
              <a href="#" class="font-medium text-[#1B3C53] dark:text-blue-400 hover:underline transition-colors duration-200">سياسة الخصوصية</a>
            </label>
          </div>

          <!-- رسائل الخطأ -->
          <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
            {{ errorMessage }}
          </div>

          <!-- زر إنشاء الحساب -->
          <button 
            type="submit"
            :disabled="loading || !form.agreeTerms"
            class="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3 px-4 rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري إنشاء الحساب...</span>
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="material-icons text-lg">person_add</span>
              <span>إنشاء حساب</span>
            </span>
          </button>

        </form>

        <!-- الخط الفاصل -->
        <div class="flex items-center my-6">
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span class="px-4 text-sm text-[#456882] dark:text-gray-400">أو</span>
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <!-- رابط تسجيل الدخول -->
        <div class="text-center">
          <p class="text-[#1B3C53] dark:text-gray-300">لديك حساب بالفعل؟</p>
          <button @click="goToLogin" class="font-semibold mt-2 text-[#1B3C53] dark:text-blue-400 hover:underline transition-colors duration-200 flex items-center justify-center gap-2 mx-auto">
            <span class="material-icons text-lg">login</span>
            <span>سجل الدخول الآن</span>
          </button>
        </div>

      </div>

      <!-- الرجوع للرئيسية -->
      <div class="text-center mt-6">
        <router-link to="/" class="inline-flex items-center gap-2 text-[#1B3C53] dark:text-gray-300 hover:text-[#234C6A] dark:hover:text-white transition-colors duration-200">
          <span class="material-icons">arrow_back</span>
          <span>الرجوع إلى الرئيسية</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const errorMessage = ref('')
    
    const form = ref({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      accountType: 'parent',
      phone: '',
      agreeTerms: false
    })

    // الحصول على المستخدمين الحاليين
    const getExistingUsers = () => {
      try {
        return JSON.parse(localStorage.getItem('libraryUsers') || '[]')
      } catch (error) {
        console.error('Error loading users:', error)
        return []
      }
    }

    // الحصول على الموظفين
    const getEmployees = () => {
      try {
        return JSON.parse(localStorage.getItem('libraryEmployees') || '[]')
      } catch (error) {
        console.error('Error loading employees:', error)
        return []
      }
    }

    // حفظ المستخدم الجديد
    const saveUser = (userData) => {
      const users = getExistingUsers()
      users.push(userData)
      localStorage.setItem('libraryUsers', JSON.stringify(users))
      
      // تحديث إحصائيات الموظفين
      updateEmployeeStats(userData)
    }

    // تحديث إحصائيات الموظفين
    const updateEmployeeStats = (userData) => {
      const employees = getEmployees()
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
      
      if (currentUser.role === 'employee') {
        // البحث عن الموظف الحالي وتحديث إحصائياته
        const updatedEmployees = employees.map(emp => {
          if (emp.id === currentUser.id) {
            const stats = emp.stats || {
              totalUsers: 0,
              parents: 0,
              teachers: 0,
              students: 0
            }
            
            stats.totalUsers++
            stats[`${userData.role}s`]++
            
            return {
              ...emp,
              stats,
              lastActivity: new Date().toISOString()
            }
          }
          return emp
        })
        
        localStorage.setItem('libraryEmployees', JSON.stringify(updatedEmployees))
      }
    }

    // التحقق من صحة البيانات
    const validateForm = () => {
      if (form.value.password.length < 6) {
        errorMessage.value = 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل'
        return false
      }

      if (form.value.password !== form.value.confirmPassword) {
        errorMessage.value = 'كلمات المرور غير متطابقة'
        return false
      }

      if (!form.value.agreeTerms) {
        errorMessage.value = 'يجب الموافقة على الشروط والأحكام'
        return false
      }

      // التحقق من عدم تكرار البريد الإلكتروني
      const existingUsers = getExistingUsers()
      const userExists = existingUsers.find(user => user.email === form.value.email)
      if (userExists) {
        errorMessage.value = 'البريد الإلكتروني مسجل مسبقاً'
        return false
      }

      errorMessage.value = ''
      return true
    }

    // دالة للتحقق من وجود صفحة للعودة إليها بعد التسجيل
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

    // تسجيل الدخول التلقائي بعد التسجيل
    const autoLoginAfterRegister = (userData) => {
      // حفظ بيانات الجلسة
      const token = `user-token-${Date.now()}`
      localStorage.setItem('authToken', token)
      localStorage.setItem('userData', JSON.stringify({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        isAdmin: false,
        type: userData.role,
        phone: userData.phone || ''
      }))
      localStorage.setItem('userType', userData.role)

      // تحديث وقت النشاط
      localStorage.setItem('lastActivity', new Date().getTime().toString())

      console.log('✅ تم التسجيل وتسجيل الدخول تلقائياً:', userData)
      
      // إشعار التطبيقات الأخرى بتغير حالة المصادقة
      notifyAuthChange()
    }

    const handleRegister = async () => {
      if (!validateForm()) return

      loading.value = true

      try {
        // محاكاة عملية التسجيل
        await new Promise(resolve => setTimeout(resolve, 1500))

        // إنشاء المستخدم الجديد
        const newUser = {
          id: Date.now(),
          name: form.value.fullName,
          email: form.value.email,
          password: form.value.password,
          role: form.value.accountType,
          phone: form.value.phone || null,
          avatar: form.value.fullName.charAt(0),
          isActive: true,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          preferences: {
            language: 'ar',
            theme: 'light',
            notifications: true
          },
          stats: {
            storiesRead: 0,
            favorites: 0,
            readingTime: 0
          }
        }

        // حفظ المستخدم
        saveUser(newUser)

        // تسجيل الدخول التلقائي
        autoLoginAfterRegister(newUser)

        // التحقق من وجود صفحة للعودة إليها
        const redirectTo = checkRedirectAfterAuth()
        if (redirectTo) {
          // العودة إلى الصفحة الأصلية
          router.replace(redirectTo)
        } else {
          // إظهار رسالة نجاح والتوجيه إلى الصفحة الرئيسية
          alert('🎉 تم إنشاء حسابك وتسجيل الدخول بنجاح!')
          router.push('/')
        }
        
      } catch (error) {
        console.error('❌ Register error:', error)
        errorMessage.value = 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.'
      } finally {
        loading.value = false
      }
    }

    const goToLogin = () => {
      router.push('/login')
    }

    // إحصائيات الموظفين (للعرض في الكونسول للتطوير)
    onMounted(() => {
      const employees = getEmployees()
      const users = getExistingUsers()
      console.log('👥 إحصائيات المستخدمين:', {
        totalUsers: users.length,
        parents: users.filter(u => u.role === 'parent').length,
        teachers: users.filter(u => u.role === 'teacher').length,
        students: users.filter(u => u.role === 'student').length,
        employees: employees.length
      })
    })

    return {
      form,
      loading,
      showPassword,
      showConfirmPassword,
      errorMessage,
      handleRegister,
      goToLogin
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* تنسيقات إضافية للحقول */
input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(27, 60, 83, 0.2);
}

/* تحسين مظهر select */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23456882' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: left 0.75rem center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
  padding-left: 2.5rem;
}

.dark select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
}
</style>