<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#1B3C53] dark:text-white mb-3">
          إعدادات النظام
        </h1>
        <p class="text-lg text-[#456882] dark:text-gray-300">
          إدارة إعدادات وتكوينات المنصة
        </p>
      </div>

      <!-- تنبيه الصيانة -->
      <div 
        v-if="settings.general.maintenanceMode" 
        class="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6"
      >
        <div class="flex items-center gap-3">
          <span class="material-icons text-yellow-600 dark:text-yellow-400 text-2xl">warning</span>
          <div>
            <h3 class="font-bold text-yellow-800 dark:text-yellow-300">وضع الصيانة مفعل</h3>
            <p class="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
              الموقع حالياً في وضع الصيانة. المستخدمون العاديون لا يمكنهم الوصول للمحتوى.
            </p>
          </div>
        </div>
      </div>

      <!-- الإعدادات الرئيسية -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- القائمة الجانبية -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
            <div class="p-4 space-y-2">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'w-full text-right px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center justify-between gap-3',
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white shadow-lg' 
                    : 'text-[#1B3C53] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#1B3C53] dark:hover:text-white'
                ]"
              >
                <span class="flex items-center gap-2">
                  <span class="material-icons text-lg">{{ tab.icon }}</span>
                  <span>{{ tab.name }}</span>
                </span>
                <span 
                  v-if="hasUnsavedChanges && tab.id === activeTab"
                  class="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                ></span>
              </button>
            </div>

            <!-- إحصائيات سريعة -->
            <div class="p-4 border-t border-gray-200 dark:border-gray-600">
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center text-[#456882] dark:text-gray-400">
                  <span>آخر تحديث:</span>
                  <span class="font-medium">{{ lastSavedTime }}</span>
                </div>
                <div class="flex justify-between items-center text-[#456882] dark:text-gray-400">
                  <span>التغييرات غير المحفوظة:</span>
                  <span class="font-medium text-red-600">{{ unsavedChangesCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- محتوى الإعدادات -->
        <div class="lg:col-span-3 space-y-6">
          
          <!-- إعدادات عامة -->
          <div v-if="activeTab === 'general'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white">الإعدادات العامة</h3>
              <p class="text-[#456882] dark:text-gray-300 text-sm mt-1">الإعدادات الأساسية للمنصة</p>
            </div>
            
            <div class="p-6 space-y-6">
              <!-- معلومات المنصة -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">
                    اسم المنصة
                    <span class="text-red-500">*</span>
                  </label>
                  <input 
                    v-model="settings.general.platformName"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                    placeholder="أدخل اسم المنصة"
                    @input="markAsChanged"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">لغة المنصة</label>
                  <select 
                    v-model="settings.general.defaultLanguage"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                    @change="markAsChanged"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </div>

              <!-- وصف المنصة -->
              <div>
                <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">وصف المنصة</label>
                <textarea 
                  v-model="settings.general.platformDescription"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 resize-none"
                  placeholder="أدخل وصف مختصر عن المنصة"
                  @input="markAsChanged"
                ></textarea>
              </div>

              <!-- المنطقة الزمنية -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">المنطقة الزمنية</label>
                  <select 
                    v-model="settings.general.timezone"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                    @change="markAsChanged"
                  >
                    <option value="+03:00">(UTC+3) الرياض، الرياض</option>
                    <option value="+04:00">(UTC+4) دبي، الإمارات</option>
                    <option value="+02:00">(UTC+2) القاهرة، مصر</option>
                    <option value="+01:00">(UTC+1) الرباط، المغرب</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">تنسيق التاريخ</label>
                  <select 
                    v-model="settings.general.dateFormat"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                    @change="markAsChanged"
                  >
                    <option value="DD/MM/YYYY">يوم/شهر/سنة (25/12/2024)</option>
                    <option value="MM/DD/YYYY">شهر/يوم/سنة (12/25/2024)</option>
                    <option value="YYYY-MM-DD">سنة-شهر-يوم (2024-12-25)</option>
                    <option value="DD MMMM YYYY">يوم شهر سنة (25 ديسمبر 2024)</option>
                  </select>
                </div>
              </div>

              <!-- إعدادات الصيانة -->
              <div class="border border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-900/50">
                <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
                  <span class="material-icons text-yellow-600">construction</span>
                  إعدادات الصيانة
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div class="flex-1">
                      <p class="font-semibold text-[#1B3C53] dark:text-white">تفعيل وضع الصيانة</p>
                      <p class="text-sm text-[#456882] dark:text-gray-400 mt-1">
                        إيقاف الموقع عن العمل للمستخدمين العاديين وعرض رسالة الصيانة
                      </p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="settings.general.maintenanceMode" 
                        class="sr-only peer" 
                        @change="markAsChanged"
                      >
                      <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>

                  <!-- رسالة الصيانة -->
                  <div v-if="settings.general.maintenanceMode" class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-3">رسالة الصيانة</label>
                    <textarea 
                      v-model="settings.general.maintenanceMessage"
                      rows="4"
                      class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 resize-none"
                      placeholder="اكتب رسالة اعتذار للمستخدمين أثناء الصيانة..."
                      @input="markAsChanged"
                    ></textarea>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mt-2">
                      هذه الرسالة ستظهر لجميع المستخدمين العاديين عند محاولة الوصول للموقع أثناء الصيانة
                    </p>
                  </div>

                  <!-- الوصول أثناء الصيانة -->
                  <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div class="flex-1">
                      <p class="font-semibold text-[#1B3C53] dark:text-white">السماح للمديرين</p>
                      <p class="text-sm text-[#456882] dark:text-gray-400 mt-1">
                        السماح للمديرين والموظفين بالوصول للموقع أثناء الصيانة
                      </p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        v-model="settings.general.allowAdminsDuringMaintenance" 
                        class="sr-only peer" 
                        @change="markAsChanged"
                      >
                      <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- إعدادات الأمان -->
          <div v-if="activeTab === 'security'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white">إعدادات الأمان</h3>
              <p class="text-[#456882] dark:text-gray-300 text-sm mt-1">إعدادات الحماية والأمان المتقدمة</p>
            </div>
            
            <div class="p-6 space-y-6">
              <!-- سياسة كلمة المرور -->
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-red-500">password</span>
                  سياسة كلمة المرور
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الحد الأدنى لطول كلمة المرور</label>
                    <select 
                      v-model="settings.security.minPasswordLength"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      @change="markAsChanged"
                    >
                      <option value="6">6 أحرف</option>
                      <option value="8">8 أحرف</option>
                      <option value="10">10 أحرف</option>
                      <option value="12">12 أحرف</option>
                    </select>
                  </div>

                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">مدة انتهاء كلمة المرور</label>
                    <select 
                      v-model="settings.security.passwordExpiry"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      @change="markAsChanged"
                    >
                      <option value="30">30 يوم</option>
                      <option value="60">60 يوم</option>
                      <option value="90">90 يوم</option>
                      <option value="0">لا تنتهي</option>
                    </select>
                  </div>
                </div>

                <!-- متطلبات كلمة المرور -->
                <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-4">
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-3">متطلبات كلمة المرور</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <input 
                        type="checkbox" 
                        v-model="settings.security.requireUppercase" 
                        class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                        @change="markAsChanged"
                      >
                      <div>
                        <span class="font-medium text-[#1B3C53] dark:text-white text-sm">حرف كبير على الأقل</span>
                        <span class="text-xs text-[#456882] dark:text-gray-400 block">(A-Z)</span>
                      </div>
                    </label>
                    
                    <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <input 
                        type="checkbox" 
                        v-model="settings.security.requireLowercase" 
                        class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                        @change="markAsChanged"
                      >
                      <div>
                        <span class="font-medium text-[#1B3C53] dark:text-white text-sm">حرف صغير على الأقل</span>
                        <span class="text-xs text-[#456882] dark:text-gray-400 block">(a-z)</span>
                      </div>
                    </label>
                    
                    <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <input 
                        type="checkbox" 
                        v-model="settings.security.requireNumbers" 
                        class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                        @change="markAsChanged"
                      >
                      <div>
                        <span class="font-medium text-[#1B3C53] dark:text-white text-sm">رقم على الأقل</span>
                        <span class="text-xs text-[#456882] dark:text-gray-400 block">(0-9)</span>
                      </div>
                    </label>
                    
                    <label class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <input 
                        type="checkbox" 
                        v-model="settings.security.requireSymbols" 
                        class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                        @change="markAsChanged"
                      >
                      <div>
                        <span class="font-medium text-[#1B3C53] dark:text-white text-sm">رمز خاص على الأقل</span>
                        <span class="text-xs text-[#456882] dark:text-gray-400 block">(!@#$%)</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- جلسات المستخدمين -->
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-blue-500">security</span>
                  جلسات المستخدمين
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">مدة الجلسة (دقائق)</label>
                    <select 
                      v-model="settings.security.sessionTimeout"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      @change="markAsChanged"
                    >
                      <option value="30">30 دقيقة</option>
                      <option value="60">60 دقيقة</option>
                      <option value="120">120 دقيقة</option>
                      <option value="0">غير محدد</option>
                    </select>
                  </div>

                  <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الحد الأقصى لمحاولات الدخول</label>
                    <select 
                      v-model="settings.security.maxLoginAttempts"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      @change="markAsChanged"
                    >
                      <option value="3">3 محاولات</option>
                      <option value="5">5 محاولات</option>
                      <option value="10">10 محاولات</option>
                    </select>
                  </div>
                </div>

                <!-- الأمان المتقدم -->
                <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-4">
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-3">الأمان المتقدم</label>
                  <div class="space-y-3">
                    <label class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div>
                        <span class="font-medium text-[#1B3C53] dark:text-white text-sm">المصادقة الثنائية (2FA)</span>
                        <span class="text-xs text-[#456882] dark:text-gray-400 block">للمديرين والموظفين</span>
                      </div>
                      <input 
                        type="checkbox" 
                        v-model="settings.security.twoFactorAuth" 
                        class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                        @change="markAsChanged"
                      >
                    </label>
                    
                    <label class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div>
                        <span class="font-medium text-[#1B3C53] dark:text-white text-sm">تسجيل نشاط المستخدم</span>
                        <span class="text-xs text-[#456882] dark:text-gray-400 block">تسجيل جميع أنشطة المستخدمين</span>
                      </div>
                      <input 
                        type="checkbox" 
                        v-model="settings.security.userActivityLogging" 
                        class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                        @change="markAsChanged"
                      >
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- إعدادات المظهر -->
          <div v-if="activeTab === 'appearance'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white">إعدادات المظهر</h3>
              <p class="text-[#456882] dark:text-gray-300 text-sm mt-1">تخصيص مظهر وتصميم المنصة</p>
            </div>
            
            <div class="p-6 space-y-6">
              <!-- الألوان -->
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-purple-500">palette</span>
                  الألوان
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-3">اللون الأساسي</label>
                    <div class="flex items-center gap-4">
                      <input 
                        type="color" 
                        v-model="settings.appearance.primaryColor"
                        class="w-16 h-16 rounded-xl border-2 border-gray-300 dark:border-gray-600 cursor-pointer shadow-lg"
                        @input="markAsChanged"
                      >
                      <div class="flex-1">
                        <div class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                          {{ settings.appearance.primaryColor }}
                        </div>
                        <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">لون العناوين والأزرار الرئيسية</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-3">اللون الثانوي</label>
                    <div class="flex items-center gap-4">
                      <input 
                        type="color" 
                        v-model="settings.appearance.secondaryColor"
                        class="w-16 h-16 rounded-xl border-2 border-gray-300 dark:border-gray-600 cursor-pointer shadow-lg"
                        @input="markAsChanged"
                      >
                      <div class="flex-1">
                        <div class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                          {{ settings.appearance.secondaryColor }}
                        </div>
                        <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">لون العناصر الثانوية والتأكيدات</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- الوضع الداكن -->
                <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div class="flex-1">
                    <p class="font-semibold text-[#1B3C53] dark:text-white">تفعيل الوضع الداكن</p>
                    <p class="text-sm text-[#456882] dark:text-gray-400 mt-1">
                      السماح للمستخدمين بتبديل الوضع الداكن
                    </p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="settings.appearance.darkModeEnabled" 
                      class="sr-only peer" 
                      @change="markAsChanged"
                    >
                    <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B3C53]"></div>
                  </label>
                </div>
              </div>

              <!-- الخطوط -->
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-green-500">format_size</span>
                  الخطوط
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">عائلة الخط الأساسية</label>
                    <select 
                      v-model="settings.appearance.fontFamily"
                      class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                      @change="markAsChanged"
                    >
                      <optgroup label="الخطوط العربية الموصى بها">
                        <option value="'IBM Plex Sans Arabic'">IBM Plex Sans Arabic</option>
                        <option value="'Cairo'">Cairo</option>
                        <option value="'Tajawal'">Tajawal</option>
                        <option value="'Almarai'">Almarai</option>
                        <option value="'Amiri'">Amiri</option>
                        <option value="'Mada'">Mada</option>
                        <option value="'Lato'">Lato (مدعم للعربية)</option>
                        <option value="'Noto Sans Arabic'">Noto Sans Arabic</option>
                      </optgroup>
                      <optgroup label="الخطوط العالمية">
                        <option value="'Inter'">Inter</option>
                        <option value="'Roboto'">Roboto</option>
                        <option value="'Open Sans'">Open Sans</option>
                        <option value="'Poppins'">Poppins</option>
                        <option value="'Montserrat'">Montserrat</option>
                      </optgroup>
                      <optgroup label="الخطوط النظامية">
                        <option value="Tahoma">Tahoma</option>
                        <option value="Arial">Arial</option>
                        <option value="'Segoe UI'">Segoe UI</option>
                        <option value="'Helvetica Neue'">Helvetica Neue</option>
                      </optgroup>
                    </select>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mt-2">
                      سيتم تحميل الخط تلقائياً من Google Fonts
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">حجم الخط الأساسي</label>
                    <select 
                      v-model="settings.appearance.baseFontSize"
                      class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                      @change="markAsChanged"
                    >
                      <option value="14px">صغير (14px)</option>
                      <option value="16px">متوسط (16px)</option>
                      <option value="18px">كبير (18px)</option>
                      <option value="20px">كبير جداً (20px)</option>
                    </select>
                  </div>
                </div>

                <!-- معاينة الخط -->
                <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-3">معاينة الخط</label>
                  <div 
                    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 text-center"
                    :style="{ fontFamily: settings.appearance.fontFamily, fontSize: settings.appearance.baseFontSize }"
                  >
                    <p class="text-[#1B3C53] dark:text-white mb-2">مرحباً بك في مكتبة الأطفال الرقمية</p>
                    <p class="text-[#456882] dark:text-gray-300 text-sm">
                      هذا نموذج لعرض كيفية ظهور النص مع الإعدادات الحالية
                    </p>
                  </div>
                </div>
              </div>

              <!-- التخطيط -->
              <div class="space-y-4">
                <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-blue-500">dashboard</span>
                  التخطيط
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <p class="font-semibold text-[#1B3C53] dark:text-white">العرض الكامل</p>
                      <p class="text-sm text-[#456882] dark:text-gray-400 mt-1">استخدام كامل عرض الشاشة</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settings.appearance.fullWidth" 
                      class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                      @change="markAsChanged"
                    >
                  </label>

                  <label class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <p class="font-semibold text-[#1B3C53] dark:text-white">الشريط الجانبي</p>
                      <p class="text-sm text-[#456882] dark:text-gray-400 mt-1">إظهار الشريط الجانبي</p>
                    </div>
                    <input 
                      type="checkbox" 
                      v-model="settings.appearance.showSidebar" 
                      class="rounded text-[#1B3C53] focus:ring-[#1B3C53]"
                      @change="markAsChanged"
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- باقي التبويبات (المحتوى، التسجيل) تتبع نفس النمط -->

          <!-- أزرار الحفظ -->
          <div class="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex items-center gap-3">
              <div 
                v-if="hasUnsavedChanges" 
                class="flex items-center gap-2 text-orange-600 dark:text-orange-400"
              >
                <span class="material-icons text-sm">info</span>
                <span class="text-sm font-medium">هناك تغييرات غير محفوظة</span>
              </div>
              <div 
                v-else 
                class="flex items-center gap-2 text-green-600 dark:text-green-400"
              >
                <span class="material-icons text-sm">check_circle</span>
                <span class="text-sm font-medium">جميع التغييرات محفوظة</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <button 
                @click="resetToDefaults"
                :disabled="!hasUnsavedChanges"
                class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span class="material-icons text-sm">restart_alt</span>
                إعادة التعيين
              </button>
              <button 
                @click="saveSettings"
                :disabled="!hasUnsavedChanges"
                class="px-6 py-2 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span class="material-icons text-sm">save</span>
                حفظ الإعدادات
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'

export default {
  name: 'SystemSettings',
  setup() {
    const activeTab = ref('general')
    const hasUnsavedChanges = ref(false)
    const lastSavedTime = ref('')
    const originalSettings = ref({})

    const tabs = [
      { id: 'general', name: 'الإعدادات العامة', icon: 'settings' },
      { id: 'security', name: 'الأمان', icon: 'security' },
      { id: 'appearance', name: 'المظهر', icon: 'palette' },
      { id: 'content', name: 'المحتوى', icon: 'library_books' },
      { id: 'registration', name: 'التسجيل', icon: 'person_add' },
      { id: 'notifications', name: 'الإشعارات', icon: 'notifications' },
      { id: 'backup', name: 'النسخ الاحتياطي', icon: 'backup' }
    ]

    // الإعدادات الافتراضية المحسنة
    const defaultSettings = {
      general: {
        platformName: 'مكتبة الأطفال الرقمية',
        platformDescription: 'منصة تعليمية شاملة للأطفال تحتوي على قصص وأنشطة تفاعلية',
        defaultLanguage: 'ar',
        timezone: '+03:00',
        dateFormat: 'DD/MM/YYYY',
        maintenanceMode: false,
        maintenanceMessage: 'نعتذر، الموقع قيد الصيانة حاليًا. سنعود قريبًا بخدمة أفضل.',
        allowAdminsDuringMaintenance: true
      },
      security: {
        minPasswordLength: 8,
        passwordExpiry: 90,
        sessionTimeout: 60,
        maxLoginAttempts: 5,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: false,
        twoFactorAuth: false,
        userActivityLogging: true
      },
      appearance: {
        primaryColor: '#1B3C53',
        secondaryColor: '#456882',
        darkModeEnabled: true,
        fontFamily: "'Tajawal', sans-serif",
        baseFontSize: '16px',
        fullWidth: false,
        showSidebar: true
      },
      content: {
        maxFileSize: 25,
        allowedTypes: ['pdf', 'image', 'video', 'audio'],
        commentApproval: true,
        maxCommentsPerStory: 100,
        autoApproveStories: false,
        maxStoriesPerUser: 10,
        enableContentRatings: true,
        allowUserUploads: true
      },
      registration: {
        allowPublicRegistration: true,
        requireEmailVerification: false,
        defaultUserRole: 'parent',
        allowedRoles: ['parent', 'teacher', 'student'],
        minAgeRequirement: 13,
        requireParentConsent: true
      }
    }

    const settings = ref(JSON.parse(JSON.stringify(defaultSettings)))

    // الحسابات المشتقة
    const unsavedChangesCount = computed(() => {
      if (!hasUnsavedChanges.value) return 0
      return Object.keys(settings.value).reduce((count, category) => {
        return count + Object.keys(settings.value[category]).length
      }, 0)
    })

    // تحميل الإعدادات
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('systemSettings')
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings)
          settings.value = {
            ...defaultSettings,
            ...parsed,
            general: { ...defaultSettings.general, ...parsed.general },
            security: { ...defaultSettings.security, ...parsed.security },
            appearance: { ...defaultSettings.appearance, ...parsed.appearance },
            content: { ...defaultSettings.content, ...parsed.content },
            registration: { ...defaultSettings.registration, ...parsed.registration }
          }
        }
        originalSettings.value = JSON.parse(JSON.stringify(settings.value))
        
        const savedTime = localStorage.getItem('systemSettingsLastSaved')
        lastSavedTime.value = savedTime ? new Date(savedTime).toLocaleString('ar-EG') : 'لم يتم الحفظ بعد'
        
      } catch (error) {
        console.error('❌ خطأ في تحميل الإعدادات:', error)
        settings.value = JSON.parse(JSON.stringify(defaultSettings))
        originalSettings.value = JSON.parse(JSON.stringify(defaultSettings))
      }
    }

    //标记 التغيير
    const markAsChanged = () => {
      hasUnsavedChanges.value = true
    }

    // تطبيق الإعدادات على النظام
    const applySettings = () => {
      try {
        // تطبيق إعدادات المظهر
        if (settings.value.appearance.fontFamily) {
          document.documentElement.style.setProperty('--font-family', settings.value.appearance.fontFamily)
        }
        
        if (settings.value.appearance.primaryColor) {
          document.documentElement.style.setProperty('--primary-color', settings.value.appearance.primaryColor)
        }
        
        if (settings.value.appearance.secondaryColor) {
          document.documentElement.style.setProperty('--secondary-color', settings.value.appearance.secondaryColor)
        }

        // حفظ إعدادات الصيانة بشكل منفصل للوصول السريع
        localStorage.setItem('maintenanceMode', settings.value.general.maintenanceMode.toString())
        localStorage.setItem('maintenanceMessage', settings.value.general.maintenanceMessage)

        console.log('✅ تم تطبيق الإعدادات على النظام')
      } catch (error) {
        console.error('❌ خطأ في تطبيق الإعدادات:', error)
      }
    }

    // حفظ الإعدادات
    const saveSettings = async () => {
      try {
        // التحقق من صحة الإعدادات
        if (!validateSettings()) {
          return
        }

        // حفظ الإعدادات
        localStorage.setItem('systemSettings', JSON.stringify(settings.value))
        localStorage.setItem('systemSettingsLastSaved', new Date().toISOString())
        
        // تطبيق الإعدادات
        applySettings()
        
        // تحديث الحالة
        originalSettings.value = JSON.parse(JSON.stringify(settings.value))
        hasUnsavedChanges.value = false
        lastSavedTime.value = new Date().toLocaleString('ar-EG')
        
        // إظهار رسالة النجاح
        showNotification('تم حفظ الإعدادات بنجاح', 'success')
        
      } catch (error) {
        console.error('❌ خطأ في حفظ الإعدادات:', error)
        showNotification('حدث خطأ أثناء حفظ الإعدادات', 'error')
      }
    }

    // التحقق من صحة الإعدادات
    const validateSettings = () => {
      const { general, security, content } = settings.value

      if (!general.platformName?.trim()) {
        showNotification('اسم المنصة مطلوب', 'error')
        return false
      }

      if (security.minPasswordLength < 6) {
        showNotification('الحد الأدنى لكلمة المرور يجب أن يكون 6 أحرف على الأقل', 'error')
        return false
      }

      if (security.maxLoginAttempts < 3) {
        showNotification('الحد الأقصى لمحاولات الدخول يجب أن يكون 3 على الأقل', 'error')
        return false
      }

      if (content.maxFileSize > 100) {
        showNotification('الحد الأقصى لحجم الملف لا يمكن أن يتجاوز 100 MB', 'error')
        return false
      }

      if (content.allowedTypes.length === 0) {
        showNotification('يجب اختيار نوع ملف واحد على الأقل', 'error')
        return false
      }

      return true
    }

    // إعادة التعيين للإعدادات الافتراضية
    const resetToDefaults = () => {
      if (confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات إلى القيم الافتراضية؟ سيتم فقدان جميع التغييرات غير المحفوظة.')) {
        settings.value = JSON.parse(JSON.stringify(defaultSettings))
        hasUnsavedChanges.value = true
        showNotification('تم إعادة التعيين للإعدادات الافتراضية', 'info')
      }
    }

    // عرض الإشعارات
    const showNotification = (message, type = 'info') => {
      // في التطبيق الحقيقي، استخدم مكتبة إشعارات أو مكون مخصص
      const notification = document.createElement('div')
      notification.className = `fixed top-4 right-4 p-4 rounded-xl shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
      }`
      notification.textContent = message
      document.body.appendChild(notification)

      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }

    // منع فقدان التغييرات
    const beforeUnload = (event) => {
      if (hasUnsavedChanges.value) {
        event.preventDefault()
        event.returnValue = 'هناك تغييرات غير محفوظة. هل تريد المغادرة دون الحفظ؟'
        return event.returnValue
      }
    }

    onMounted(() => {
      loadSettings()
      window.addEventListener('beforeunload', beforeUnload)
    })

    // المراقبة للتغييرات
    watch(settings, () => {
      hasUnsavedChanges.value = true
    }, { deep: true, immediate: false })

    return {
      activeTab,
      tabs,
      settings,
      hasUnsavedChanges,
      lastSavedTime,
      unsavedChangesCount,
      saveSettings,
      resetToDefaults,
      markAsChanged
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap');

/* تحسينات select */
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

/* تخصيص input color */
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  cursor: pointer;
  width: 60px;
  height: 60px;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: 3px solid #e5e7eb;
  border-radius: 12px;
}

.dark input[type="color"]::-webkit-color-swatch {
  border-color: #4b5563;
}

/* تحسينات للشاشات الصغيرة */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
}

/* تحسينات للتبديل */
input[type="checkbox"]:checked {
  background-color: #1B3C53;
}

/* تحسينات للرسوم المتحركة */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* تخصيص شريط التمرير */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}
</style>