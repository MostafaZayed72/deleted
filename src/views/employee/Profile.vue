<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          الملف الشخصي
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          إدارة معلومات حسابك وتفضيلاتك
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- الشريط الجانبي -->
        <div class="lg:col-span-1">
          <!-- معلومات الحساب -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div class="text-center">
              <!-- الصورة الشخصية -->
              <div class="relative inline-block mb-4">
                <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg mx-auto">
                  <img 
                    v-if="user?.profileImage" 
                    :src="user.profileImage" 
                    :alt="user?.name"
                    class="w-full h-full object-cover"
                  >
                  <div 
                    v-else
                    class="w-full h-full bg-gradient-to-br from-[#1B3C53] to-[#234C6A] flex items-center justify-center text-white text-2xl font-bold"
                  >
                    {{ user?.name?.charAt(0) || 'م' }}
                  </div>
                </div>
                
                <!-- زر تغيير الصورة -->
                <button
                  @click="openImageUpload"
                  class="absolute bottom-0 right-0 w-8 h-8 bg-[#1B3C53] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#234C6A] transition-all duration-200 border-2 border-white dark:border-gray-800"
                  title="تغيير الصورة الشخصية"
                >
                  <span class="material-icons text-sm">photo_camera</span>
                </button>
              </div>

              <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-1">{{ user?.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ user?.email }}</p>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                موظف
              </span>
            </div>
          </div>

          <!-- الإحصائيات -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">إحصائياتي</h3>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm text-gray-600 dark:text-gray-400">المحتوى المضاف</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ stats.totalContent }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm text-gray-600 dark:text-gray-400">قيد المراجعة</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ stats.pendingReview }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm text-gray-600 dark:text-gray-400">منشور</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ stats.published }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm text-gray-600 dark:text-gray-400">إجمالي المشاهدات</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ formatNumber(stats.totalViews) }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm text-gray-600 dark:text-gray-400">إجمالي الإعجابات</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ formatNumber(stats.totalLikes) }}</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-sm text-gray-600 dark:text-gray-400">متوسط التقييم</span>
                <span class="font-medium text-gray-800 dark:text-white">{{ stats.averageRating.toFixed(1) }}/5</span>
              </div>
            </div>
          </div>

          <!-- الإجراءات السريعة -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">الإجراءات السريعة</h3>
            
            <div class="space-y-2">
              <button
                @click="exportMyData"
                class="w-full flex items-center gap-3 p-3 text-right text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
              >
                <span class="material-icons text-green-500 text-lg">download</span>
                <span class="flex-1 text-sm">تصدير بياناتي</span>
              </button>
              
              <button
                @click="viewActivityLog"
                class="w-full flex items-center gap-3 p-3 text-right text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
              >
                <span class="material-icons text-blue-500 text-lg">history</span>
                <span class="flex-1 text-sm">سجل النشاط</span>
              </button>
              
              <button
                @click="openPrivacySettings"
                class="w-full flex items-center gap-3 p-3 text-right text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200"
              >
                <span class="material-icons text-purple-500 text-lg">privacy_tip</span>
                <span class="flex-1 text-sm">إعدادات الخصوصية</span>
              </button>
            </div>
          </div>
        </div>

        <!-- المحتوى الرئيسي -->
        <div class="lg:col-span-2">
          <!-- المعلومات الشخصية -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white">المعلومات الشخصية</h3>
              <button
                @click="editMode = !editMode"
                class="flex items-center gap-2 px-4 py-2 text-[#1B3C53] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors duration-200 text-sm font-medium"
              >
                <span class="material-icons text-sm">{{ editMode ? 'close' : 'edit' }}</span>
                {{ editMode ? 'إلغاء' : 'تعديل' }}
              </button>
            </div>

            <form v-if="editMode" @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                  <input
                    v-model="profileForm.fullName"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الهاتف</label>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">القسم</label>
                  <input
                    v-model="profileForm.department"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نبذة عني</label>
                <textarea
                  v-model="profileForm.bio"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                  placeholder="اكتب نبذة مختصرة عن نفسك..."
                ></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  @click="cancelEdit"
                  class="px-6 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-2 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  حفظ التغييرات
                </button>
              </div>
            </form>

            <div v-else class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">الاسم الكامل</label>
                  <p class="text-gray-800 dark:text-white">{{ user?.name }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">البريد الإلكتروني</label>
                  <p class="text-gray-800 dark:text-white">{{ user?.email }}</p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">رقم الهاتف</label>
                  <p class="text-gray-800 dark:text-white">{{ user?.phone || 'غير محدد' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">تاريخ الانضمام</label>
                  <p class="text-gray-800 dark:text-white">{{ formatDate(user?.created_at) }}</p>
                </div>
              </div>
              <div v-if="user?.bio">
                <label class="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">نبذة عني</label>
                <p class="text-gray-800 dark:text-white leading-relaxed">{{ user.bio }}</p>
              </div>
            </div>
          </div>

          <!-- تغيير كلمة المرور -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">تغيير كلمة المرور</h3>
            
            <form @submit.prevent="changePassword" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الحالية</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.currentPassword"
                      :type="showCurrentPassword ? 'text' : 'password'"
                      class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                    <button
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <span class="material-icons text-sm">
                        {{ showCurrentPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور الجديدة</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                    <button
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <span class="material-icons text-sm">
                        {{ showNewPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
                  <div class="relative">
                    <input
                      v-model="passwordForm.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <span class="material-icons text-sm">
                        {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
                      </span>
                    </button>
                  </div>
                </div>
                <div class="flex items-end">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="w-full px-4 py-2 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    تغيير كلمة المرور
                  </button>
                </div>
              </div>

              <!-- مؤشر قوة كلمة المرور -->
              <div v-if="passwordForm.newPassword" class="mt-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">قوة كلمة المرور:</label>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300"
                    :class="passwordStrength.class"
                    :style="{ width: passwordStrength.percentage + '%' }"
                  ></div>
                </div>
                <p class="text-xs mt-1" :class="passwordStrength.class">
                  {{ passwordStrength.text }}
                </p>
              </div>
            </form>
          </div>

          <!-- التفضيلات -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">التفضيلات</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">الوضع الداكن</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">تفعيل الوضع الداكن تلقائياً</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.darkMode" 
                    class="sr-only peer"
                    @change="savePreferences"
                  >
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B3C53]"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">الإشعارات البريدية</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">استلام إشعارات على البريد الإلكتروني</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.emailNotifications" 
                    class="sr-only peer"
                    @change="savePreferences"
                  >
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B3C53]"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">الإشعارات التطبيقية</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">عرض إشعارات داخل التطبيق</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="preferences.pushNotifications" 
                    class="sr-only peer"
                    @change="savePreferences"
                  >
                  <div class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B3C53]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- نافذة تحميل الصورة -->
    <div v-if="showImageUpload" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-gray-800 dark:text-white">تغيير الصورة الشخصية</h3>
          <button 
            @click="showImageUpload = false"
            class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <span class="material-icons">close</span>
          </button>
        </div>

        <div class="space-y-4">
          <!-- معاينة الصورة -->
          <div class="text-center">
            <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 mx-auto mb-4">
              <img 
                v-if="imagePreview" 
                :src="imagePreview" 
                alt="معاينة الصورة"
                class="w-full h-full object-cover"
              >
              <div 
                v-else
                class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400"
              >
                <span class="material-icons text-3xl">photo_camera</span>
              </div>
            </div>
          </div>

          <!-- تحميل الصورة -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اختر صورة</label>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              class="hidden"
            >
            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-[#1B3C53] dark:hover:border-blue-400 transition-colors duration-200 text-gray-600 dark:text-gray-400"
            >
              <span class="flex items-center justify-center gap-2">
                <span class="material-icons">cloud_upload</span>
                اختر صورة من الجهاز
              </span>
            </button>
          </div>

          <!-- معلومات الصورة -->
          <div v-if="selectedImage" class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <span class="font-medium">الحجم:</span> {{ (selectedImage.size / 1024 / 1024).toFixed(2) }} MB
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span class="font-medium">النوع:</span> {{ selectedImage.type }}
            </p>
          </div>

          <!-- أزرار التحكم -->
          <div class="flex items-center gap-3 pt-4">
            <button
              @click="showImageUpload = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              إلغاء
            </button>
            <button
              @click="uploadProfileImage"
              :disabled="!selectedImage || uploadingImage"
              class="flex-1 px-4 py-2 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="uploadingImage" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              حفظ الصورة
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import StatisticsManager from '@/utils/statisticsManager'

export default {
  name: 'EmployeeProfile',
  setup() {
    const router = useRouter()
    const user = ref(null)
    const editMode = ref(false)
    const loading = ref(false)
    const uploadingImage = ref(false)
    const showImageUpload = ref(false)
    const selectedImage = ref(null)
    const imagePreview = ref(null)
    
    const showCurrentPassword = ref(false)
    const showNewPassword = ref(false)
    const showConfirmPassword = ref(false)

    const profileForm = ref({
      fullName: '',
      email: '',
      phone: '',
      department: '',
      bio: ''
    })

    const passwordForm = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const preferences = ref({
      darkMode: false,
      emailNotifications: true,
      pushNotifications: true
    })

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      window.addEventListener('storiesUpdated', loadData)
      window.addEventListener('interactionsUpdated', loadData)
    }

    // تحميل البيانات
    const loadData = () => {
      const userData = localStorage.getItem('userData')
      if (userData) {
        user.value = JSON.parse(userData)
        profileForm.value = {
          fullName: user.value.name || '',
          email: user.value.email || '',
          phone: user.value.phone || '',
          department: user.value.department || '',
          bio: user.value.bio || ''
        }
      }

      // تحميل التفضيلات
      const savedPreferences = localStorage.getItem('userPreferences')
      if (savedPreferences) {
        preferences.value = { ...preferences.value, ...JSON.parse(savedPreferences) }
      }
    }

    // الإحصائيات المحدثة
    const stats = computed(() => {
      const stories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
      
      // فلترة القصص الخاصة بالموظف
      const employeeStories = stories.filter(story => {
        const isAddedByUser = story.added_by === user.value?.name || 
                             story.added_by_id === user.value?.id ||
                             (story.added_by && user.value?.name && story.added_by.includes(user.value.name))
        
        return isAddedByUser
      })

      // حساب الإحصائيات باستخدام StatisticsManager
      const totalViews = employeeStories.reduce((sum, story) => {
        return sum + (StatisticsManager.getStoryStatistics(story.id)?.views || 0)
      }, 0)

      const totalLikes = employeeStories.reduce((sum, story) => {
        return sum + (StatisticsManager.getStoryStatistics(story.id)?.likes || 0)
      }, 0)

      // حساب متوسط التقييم
      const ratings = employeeStories
        .map(story => parseFloat(story.rating || 0))
        .filter(rating => !isNaN(rating) && rating > 0)
      
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0

      console.log('📊 [الملف الشخصي] إحصائيات الموظف:', {
        totalContent: employeeStories.length,
        pendingReview: employeeStories.filter(s => s.status === 'pending_review').length,
        published: employeeStories.filter(s => s.status === 'published').length,
        totalViews,
        totalLikes,
        averageRating
      })

      return {
        totalContent: employeeStories.length,
        pendingReview: employeeStories.filter(s => s.status === 'pending_review').length,
        published: employeeStories.filter(s => s.status === 'published').length,
        totalViews,
        totalLikes,
        averageRating
      }
    })

    // قوة كلمة المرور
    const passwordStrength = computed(() => {
      const password = passwordForm.value.newPassword
      if (!password) return { percentage: 0, text: '', class: '' }

      let strength = 0
      let text = ''
      let colorClass = ''

      // التحقق من طول كلمة المرور
      if (password.length >= 8) strength += 25
      if (password.length >= 12) strength += 25

      // التحقق من التعقيد
      if (/[A-Z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 15
      if (/[^A-Za-z0-9]/.test(password)) strength += 10

      // تحديد النص واللون
      if (strength < 50) {
        text = 'ضعيفة'
        colorClass = 'text-red-500 bg-red-500'
      } else if (strength < 75) {
        text = 'متوسطة'
        colorClass = 'text-yellow-500 bg-yellow-500'
      } else {
        text = 'قوية'
        colorClass = 'text-green-500 bg-green-500'
      }

      return {
        percentage: Math.min(strength, 100),
        text: text,
        class: colorClass
      }
    })

    // فتح نافذة تحميل الصورة
    const openImageUpload = () => {
      showImageUpload.value = true
      selectedImage.value = null
      imagePreview.value = null
    }

    // اختيار الصورة
    const handleImageSelect = (event) => {
      const file = event.target.files[0]
      if (file) {
        // التحقق من نوع الملف
        if (!file.type.startsWith('image/')) {
          alert('❌ يرجى اختيار ملف صورة فقط')
          return
        }

        // التحقق من حجم الملف (5MB كحد أقصى)
        if (file.size > 5 * 1024 * 1024) {
          alert('❌ حجم الصورة يجب أن يكون أقل من 5MB')
          return
        }

        selectedImage.value = file
        
        // إنشاء معاينة للصورة
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    // رفع الصورة الشخصية
    const uploadProfileImage = async () => {
      if (!selectedImage.value) return

      uploadingImage.value = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // في تطبيق حقيقي، هنا يتم رفع الصورة للخادم
        // حالياً سنحفظها في localStorage كـ base64
        user.value.profileImage = imagePreview.value
        localStorage.setItem('userData', JSON.stringify(user.value))
        
        showImageUpload.value = false
        showNotification('✅ تم تحديث الصورة الشخصية بنجاح', 'success')
        
      } catch (error) {
        showNotification('❌ حدث خطأ أثناء رفع الصورة', 'error')
      } finally {
        uploadingImage.value = false
      }
    }

    // تحديث الملف الشخصي
    const updateProfile = async () => {
      loading.value = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // تحديث بيانات المستخدم
        user.value.name = profileForm.value.fullName
        user.value.email = profileForm.value.email
        user.value.phone = profileForm.value.phone
        user.value.department = profileForm.value.department
        user.value.bio = profileForm.value.bio
        
        // حفظ التغييرات
        localStorage.setItem('userData', JSON.stringify(user.value))
        
        editMode.value = false
        showNotification('✅ تم تحديث الملف الشخصي بنجاح', 'success')
        
      } catch (error) {
        showNotification('❌ حدث خطأ أثناء تحديث الملف الشخصي', 'error')
      } finally {
        loading.value = false
      }
    }

    // تغيير كلمة المرور
    const changePassword = async () => {
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        showNotification('❌ كلمة المرور الجديدة غير متطابقة', 'error')
        return
      }

      if (passwordForm.value.newPassword.length < 6) {
        showNotification('❌ كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error')
        return
      }

      loading.value = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // في تطبيق حقيقي، هنا يتم التحقق من كلمة المرور الحالية وتغييرها
        showNotification('✅ تم تغيير كلمة المرور بنجاح', 'success')
        passwordForm.value = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
        
      } catch (error) {
        showNotification('❌ حدث خطأ أثناء تغيير كلمة المرور', 'error')
      } finally {
        loading.value = false
      }
    }

    // حفظ التفضيلات
    const savePreferences = () => {
      localStorage.setItem('userPreferences', JSON.stringify(preferences.value))
      
      // تطبيق الوضع الداكن إذا تم تغييره
      if (preferences.value.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      showNotification('✅ تم حفظ التفضيلات', 'success')
    }

    // إلغاء التعديل
    const cancelEdit = () => {
      editMode.value = false
      loadData() // إعادة تحميل البيانات الأصلية
    }

    // دوال مساعدة
    const formatDate = (dateString) => {
      if (!dateString) return 'غير محدد'
      return new Date(dateString).toLocaleDateString('ar-EG')
    }

    const formatNumber = (num) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
      return num.toString()
    }

    const showNotification = (message, type = 'info') => {
      // في التطبيق الحقيقي، استخدم مكتبة إشعارات أو مكون مخصص
      alert(message)
    }

    // دوال الإجراءات السريعة
    const exportMyData = () => {
      try {
        const employeeStories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
          .filter(story => story.added_by === user.value?.name || story.added_by_id === user.value?.id)
        
        const data = {
          user: user.value,
          stories: employeeStories,
          stats: stats.value,
          exportDate: new Date().toISOString()
        }
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `my-data-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        showNotification('✅ تم تصدير بياناتك بنجاح', 'success')
      } catch (error) {
        console.error('❌ خطأ في تصدير البيانات:', error)
        showNotification('❌ حدث خطأ أثناء تصدير البيانات', 'error')
      }
    }

    const viewActivityLog = () => {
      showNotification('فتح سجل النشاط', 'info')
    }

    const openPrivacySettings = () => {
      showNotification('فتح إعدادات الخصوصية', 'info')
    }

    onMounted(() => {
      console.log('🚀 [الملف الشخصي] تم تحميل مكون الملف الشخصي')
      loadData()
      setupRealTimeUpdates()
    })

    // تنظيف event listener
    onUnmounted(() => {
      console.log('🧹 [الملف الشخصي] تنظيف المكون')
      window.removeEventListener('storiesUpdated', loadData)
      window.removeEventListener('interactionsUpdated', loadData)
    })

    return {
      user,
      editMode,
      loading,
      uploadingImage,
      showImageUpload,
      selectedImage,
      imagePreview,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      profileForm,
      passwordForm,
      preferences,
      stats,
      passwordStrength,
      openImageUpload,
      handleImageSelect,
      uploadProfileImage,
      updateProfile,
      changePassword,
      savePreferences,
      cancelEdit,
      formatDate,
      formatNumber,
      exportMyData,
      viewActivityLog,
      openPrivacySettings
    }
  }
}
</script>