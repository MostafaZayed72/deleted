<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-8">
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          {{ isEditing ? 'تعديل المحتوى' : 'إضافة محتوى جديد' }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          {{ isEditing ? 'قم بتعديل محتوى المكتبة الرقمية' : 'أضف محتوى جديداً إلى المكتبة الرقمية' }}
        </p>
      </div>

      <!-- شريط التقدم المبسط -->
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-lg font-bold text-gray-800 dark:text-white">تقدم تعبئة النموذج</h2>
            <span class="text-xl font-bold text-[#1B3C53] dark:text-blue-400">{{ progressPercentage }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              class="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] h-2.5 rounded-full transition-all duration-500 ease-out"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- النموذج الرئيسي -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        
        <!-- رأس النموذج -->
        <div class="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] p-6 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="material-icons text-3xl">library_add</span>
              <div>
                <h2 class="text-xl font-bold">{{ isEditing ? 'تعديل المحتوى' : 'محتوى جديد' }}</h2>
                <p class="text-blue-100 text-sm">رقم الوعاء: {{ form.vessel_number }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-1">
              <span class="material-icons text-sm">auto_awesome</span>
              <span class="font-medium text-sm">مكتبة الطفل الرقمية</span>
            </div>
          </div>
        </div>

        <!-- جسم النموذج -->
        <form @submit.prevent="submitForm" class="p-6 space-y-6">
          
          <!-- الصف الأول: المعلومات الأساسية -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- عنوان المحتوى -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                عنوان المحتوى *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="أدخل عنوان المحتوى"
                @input="updateProgress"
              >
            </div>

            <!-- المؤلف -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                المؤلف *
              </label>
              <input
                v-model="form.author"
                type="text"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="اسم المؤلف"
                @input="updateProgress"
              >
            </div>
          </div>

          <!-- الصف الثاني: التصنيفات -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- سنة النشر -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                سنة النشر *
              </label>
              <select
                v-model="form.publication_year"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                @change="updateProgress"
              >
                <option value="">اختر السنة</option>
                <option v-for="year in publicationYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <!-- فئة المحتوى -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                فئة المحتوى *
              </label>
              <select
                v-model="form.category"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                @change="updateProgress"
              >
                <option value="">اختر الفئة</option>
                <option value="واقعية">🌍 واقعية</option>
                <option value="خيال">✨ خيال</option>
                <option value="ديني">🕌 ديني</option>
                <option value="تعليمي">📚 تعليمي</option>
                <option value="ترفيهي">🎭 ترفيهي</option>
                <option value="تاريخي">🏛️ تاريخي</option>
                <option value="علمي">🔬 علمي</option>
                <option value="اجتماعي">👥 اجتماعي</option>
              </select>
            </div>

            <!-- الفئة العمرية -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                الفئة العمرية *
              </label>
              <select
                v-model="form.age_group"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                @change="updateProgress"
              >
                <option value="">اختر الفئة</option>
                <option value="3-6 سنوات">👶 3-6 سنوات</option>
                <option value="7-9 سنوات">🧒 7-9 سنوات</option>
                <option value="10-12 سنة">👦 10-12 سنة</option>
              </select>
            </div>
          </div>

          <!-- الصف الثالث: نوع المحتوى والحالة -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- نوع الملف -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                نوع الملف *
              </label>
              <select
                v-model="form.story_type"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                @change="updateProgress"
              >
                <option value="">اختر النوع</option>
                <option value="image">📷 صورة</option>
                <option value="video">🎬 فيديو</option>
                <option value="audio">🎵 صوت</option>
                <option value="pdf">📄 PDF</option>
              </select>
            </div>

            <!-- حالة المحتوى -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                حالة المحتوى *
              </label>
              <select
                v-model="form.status"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
              >
                <option value="published">🌐 منشور</option>
                <option value="draft">📝 مسودة</option>
                <option value="archived">📁 مؤرشف</option>
              </select>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {{ getStatusDescription(form.status) }}
              </p>
            </div>
          </div>

          <!-- الملخص -->
          <div>
            <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              ملخص المحتوى *
            </label>
            <textarea
              v-model="form.summary"
              rows="3"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] bg-white dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
              placeholder="أدخل ملخصاً مختصراً للمحتوى..."
              @input="updateProgress"
            ></textarea>
          </div>

          <!-- رفع الملفات -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <!-- صورة الغلاف -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                صورة الغلاف
                <span v-if="!isEditing" class="text-red-500">*</span>
              </label>
              
              <div 
                @click="handleCoverImageClick"
                class="border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-[#1B3C53] hover:bg-blue-50 dark:hover:bg-gray-700 h-40 flex flex-col items-center justify-center"
                :class="{ 'border-green-500 bg-green-50 dark:bg-green-900/20': form.cover_image }"
              >
                <template v-if="!form.cover_image">
                  <span class="material-icons text-4xl text-gray-400 mb-2">image</span>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">انقر لرفع صورة الغلاف</p>
                  <p class="text-xs text-gray-500 mt-1">PNG, JPG, JPEG</p>
                </template>
                <template v-else>
                  <div class="relative w-full h-full">
                    <img :src="form.cover_image" alt="صورة الغلاف" class="w-full h-full object-cover rounded-lg">
                    <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button 
                        type="button" 
                        @click.stop="removeCoverImage"
                        class="bg-red-500 text-white p-2 rounded-full"
                      >
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </template>
                <input
                  ref="coverInput"
                  type="file"
                  accept="image/*"
                  @change="handleCoverImageUpload"
                  class="hidden"
                >
              </div>
            </div>

            <!-- ملف المحتوى -->
            <div>
              <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                ملف المحتوى
                <span v-if="!isEditing" class="text-red-500">*</span>
              </label>
              
              <div 
                @click="handleStoryFileClick"
                class="border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-[#1B3C53] hover:bg-blue-50 dark:hover:bg-gray-700 h-40 flex flex-col items-center justify-center"
                :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900/20': form.story_file }"
              >
                <template v-if="!form.story_file">
                  <span class="material-icons text-4xl text-gray-400 mb-2">attach_file</span>
                  <p class="text-sm font-medium text-gray-600 dark:text-gray-400">انقر لرفع ملف المحتوى</p>
                  <p class="text-xs text-gray-500 mt-1">{{ getFileAcceptDescription() }}</p>
                </template>
                <template v-else>
                  <div class="w-full">
                    <div class="flex items-center gap-3 mb-2">
                      <span class="material-icons text-3xl text-blue-600">description</span>
                      <div class="flex-1 text-right">
                        <p class="font-medium text-gray-800 dark:text-white text-sm">{{ getFileName(form.story_file) }}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">{{ getFileSize(form.story_file) }}</p>
                      </div>
                    </div>
                    <div class="flex gap-2 justify-center">
                      <button 
                        type="button" 
                        @click.stop="removeStoryFile"
                        class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg flex items-center gap-1"
                      >
                        <span class="material-icons text-xs">delete</span>
                        حذف
                      </button>
                      <button 
                        type="button" 
                        @click.stop="previewFile"
                        class="px-3 py-1 bg-green-500 text-white text-xs rounded-lg flex items-center gap-1"
                        v-if="canPreview"
                      >
                        <span class="material-icons text-xs">visibility</span>
                        معاينة
                      </button>
                    </div>
                  </div>
                </template>
                <input
                  ref="storyFileInput"
                  type="file"
                  :accept="getFileAcceptTypes()"
                  @change="handleStoryFileUpload"
                  class="hidden"
                >
              </div>

              <!-- معاينة الملف -->
              <div v-if="showPreview && previewUrl" class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex justify-between items-center mb-3">
                  <h4 class="font-medium text-gray-800 dark:text-white">معاينة الملف</h4>
                  <button @click="closePreview" class="text-red-500">
                    <span class="material-icons">close</span>
                  </button>
                </div>
                
                <div v-if="form.story_type === 'image'" class="flex justify-center">
                  <img :src="previewUrl" class="max-h-60 rounded-lg" />
                </div>
                
                <div v-else-if="form.story_type === 'video'" class="flex justify-center">
                  <video controls class="max-h-60 rounded-lg">
                    <source :src="previewUrl" :type="form.story_file?.type" />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
                
                <div v-else-if="form.story_type === 'audio'" class="flex justify-center">
                  <audio controls class="w-full">
                    <source :src="previewUrl" :type="form.story_file?.type" />
                    متصفحك لا يدعم تشغيل الصوت
                  </audio>
                </div>
                
                <div v-else-if="form.story_type === 'pdf'" class="text-center py-4">
                  <span class="material-icons text-6xl text-red-500">picture_as_pdf</span>
                  <p class="mt-2 text-gray-600 dark:text-gray-400">ملف PDF - يمكن معاينته بعد التحميل</p>
                </div>
              </div>
            </div>
          </div>

          <!-- الأزرار -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              @click="goBack"
              class="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              <span class="material-icons">arrow_back</span>
              رجوع
            </button>
            
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="saveAsDraft"
                class="flex items-center gap-2 px-6 py-3 border-2 border-[#1B3C53] text-[#1B3C53] dark:text-white rounded-xl hover:bg-[#1B3C53] hover:text-white transition-all duration-200 font-medium"
              >
                <span class="material-icons">save</span>
                حفظ مسودة
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
              >
                <span class="material-icons">{{ loading ? 'autorenew' : 'publish' }}</span>
                {{ loading ? 'جاري الحفظ...' : (isEditing ? 'تحديث' : 'نشر') }}
              </button>
            </div>
          </div>
        </form>
      </div>

    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AddStory',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    if (!route.name) {
      console.error('Route name is missing')
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
      const redirectPath = currentUser.role === 'admin' ? '/admin/stories' : '/employee/stories'
      router.push(redirectPath)
      return {}
    }
    
    const form = ref({
      vessel_number: '',
      title: '',
      publication_year: '',
      author: '',
      story_type: '',
      category: '',
      age_group: '',
      status: 'draft',
      summary: '',
      cover_image: null,
      story_file: null,
      rating: 0,
      views: 0
    })
    
    const loading = ref(false)
    const coverInput = ref(null)
    const storyFileInput = ref(null)
    const showPreview = ref(false)
    const previewUrl = ref('')
    
    const publicationYears = ref([])

    // التحقق إذا كنا في وضع التعديل
    const isEditing = computed(() => {
      return (route.name === 'EditStory' || route.name === 'EmployeeEditStory') && route.params.id
    })

    // حساب نسبة التقدم
    const progressPercentage = computed(() => {
      const fields = [
        'title', 'publication_year', 'author', 'story_type', 
        'category', 'age_group', 'summary'
      ]
      
      const filledFields = fields.filter(field => {
        const value = form.value[field]
        return value && value.toString().trim().length > 0
      }).length

      return Math.min(100, Math.round((filledFields / fields.length) * 100))
    })

    // التحقق من إمكانية المعاينة
    const canPreview = computed(() => {
      return form.value.story_type && form.value.story_file && 
             ['image', 'video', 'audio'].includes(form.value.story_type)
    })

    // تحميل بيانات المحتوى من المسودة أو التعديل
    const loadStoryData = (storyId) => {
      try {
        if (storyId) {
          // تحميل القصة للتعديل
          const stories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
          const story = stories.find(s => s.id === parseInt(storyId))

          if (story) {
            form.value = { ...story }
          } else {
            alert('لم يتم العثور على المحتوى المطلوب')
            router.push('/admin/stories')
            return
          }
        } else {
          // محاولة استعادة المسودة
          const savedDraft = localStorage.getItem('story_draft')
          if (savedDraft) {
            try {
              const draftData = JSON.parse(savedDraft)
              form.value = { ...draftData }
              alert('تم استعادة آخر مسودة محفوظة')
            } catch (draftError) {
              console.error('خطأ في استعادة المسودة:', draftError)
              // لا نظهر رسالة خطأ للمستخدم في حالة فشل استعادة المسودة
            }
          }
        }
      } catch (error) {
        console.error('خطأ في تحميل بيانات المحتوى:', error)
        alert('حدث خطأ في تحميل بيانات المحتوى')
      }
    }

    // توليد السنوات
    const generateYears = () => {
      const currentYear = new Date().getFullYear()
      for (let year = currentYear; year >= 1900; year--) {
        publicationYears.value.push(year)
      }
    }

    // توليد رقم وعاء تلقائي
    const generateVesselNumber = () => {
      const prefix = 'VSL'
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      return `${prefix}-${timestamp}-${random}`
    }

    // وصف حالة المحتوى
    const getStatusDescription = (status) => {
      const descriptions = {
        'published': 'سيظهر المحتوى للجمهور',
        'draft': 'المحتوى محفوظ كمسودة للمراجعة',
        'archived': 'المحتوى مخفي عن الجمهور'
      }
      return descriptions[status] || ''
    }

    // عند تحميل المكون
    onMounted(() => {
      generateYears()
      
      if (isEditing.value) {
        // تحميل بيانات القصة للتعديل
        loadStoryData(route.params.id)
      } else {
        // إنشاء رقم وعاء جديد
        form.value.vessel_number = generateVesselNumber()
        
        // محاولة استعادة المسودة
        loadStoryData()
      }
    })

    // تحديث شريط التقدم
    const updateProgress = () => {
      // يتم تحديثه تلقائياً عبر computed property
    }

    // دالة الرجوع للخلف
    const goBack = () => {
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
      const redirectPath = currentUser.role === 'admin' ? '/admin/stories' : '/employee/stories'
      router.push(redirectPath)
    }

    // دوال رفع الملفات
    const handleCoverImageClick = () => {
      coverInput.value?.click()
    }

    const handleStoryFileClick = () => {
      storyFileInput.value?.click()
    }

    const handleCoverImageUpload = async (event) => {
      const file = event.target.files[0]
      if (file) {
        // التحقق من أن الملف صورة
        if (!file.type.startsWith('image/')) {
          alert('يرجى اختيار ملف صورة فقط')
          return
        }
        
        try {
          // التحقق من حجم الصورة
          const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 ميجابايت
          if (file.size > MAX_IMAGE_SIZE) {
            alert('حجم الصورة يتجاوز الحد الأقصى المسموح به (5 ميجابايت)')
            return
          }

          const base64 = await fileToBase64(file)
          if (!base64) {
            throw new Error('فشل تحويل الصورة')
          }
          
          // تخزين معلومات الصورة
          form.value.cover_image = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: base64
          }
          
          // إظهار معاينة الصورة
          previewUrl.value = base64
        } catch (error) {
          console.error('خطأ في تحميل صورة الغلاف:', error)
          alert('حدث خطأ في تحميل صورة الغلاف')
        }
      }
    }

    const handleStoryFileUpload = async (event) => {
      const file = event.target.files[0]
      if (file) {
        // التحقق من نوع الملف مع النوع المحدد
        if (!isValidFileType(file, form.value.story_type)) {
          alert(`نوع الملف غير متوافق. يرجى اختيار ملف ${getFileTypeText(form.value.story_type)}`)
          return
        }
        
        try {
          // التحقق من حجم الملف
          const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 ميجابايت
          if (file.size > MAX_FILE_SIZE) {
            alert('حجم الملف يتجاوز الحد الأقصى المسموح به (50 ميجابايت)')
            return
          }

          const base64 = await fileToBase64(file)
          if (!base64) {
            throw new Error('فشل تحويل الملف')
          }

          // إنشاء كائن Blob للمعاينة
          const blob = new Blob([file], { type: file.type })
          const url = URL.createObjectURL(blob)
          previewUrl.value = url

          // تخزين معلومات الملف
          form.value.story_file = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: base64
          }

          // عرض المعاينة تلقائياً إذا كان الملف قابل للمعاينة
          if (canPreview.value) {
            showPreview.value = true
          }
        } catch (error) {
          console.error('خطأ في تحميل ملف المحتوى:', error)
          alert('حدث خطأ في تحميل ملف المحتوى')
        }
      }
    }

    // دالة لتحويل الملف إلى Base64
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    // التحقق من نوع الملف
    const isValidFileType = (file, storyType) => {
      if (!storyType) return true
      
      const typeMappings = {
        'image': ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        'video': ['video/mp4', 'video/mpeg', 'video/ogg', 'video/webm', 'video/quicktime'],
        'audio': ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/webm'],
        'pdf': ['application/pdf']
      }
      
      const allowedTypes = typeMappings[storyType] || []
      return allowedTypes.some(type => file.type.includes(type))
    }

    const removeCoverImage = () => {
      form.value.cover_image = null
    }

    const removeStoryFile = () => {
      form.value.story_file = null
      showPreview.value = false
      previewUrl.value = ''
    }

    const getFileName = (file) => {
      return file?.name || 'ملف مرفوع'
    }

    const getFileSize = (file) => {
      if (!file?.size) return ''
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)
      return `${sizeInMB} MB`
    }

    const getFileTypeText = (type) => {
      const types = {
        'image': 'صورة',
        'video': 'فيديو',
        'audio': 'صوت',
        'pdf': 'PDF'
      }
      return types[type] || 'ملف'
    }

    const getFileAcceptTypes = () => {
      const types = {
        'image': 'image/*',
        'video': 'video/*',
        'audio': 'audio/*',
        'pdf': '.pdf'
      }
      return types[form.value.story_type] || '*/*'
    }

    const getFileAcceptDescription = () => {
      const descriptions = {
        'image': 'JPEG, PNG, GIF',
        'video': 'MP4, MPEG, WebM',
        'audio': 'MP3, WAV, OGG',
        'pdf': 'PDF'
      }
      return descriptions[form.value.story_type] || 'جميع الملفات'
    }

    // معاينة الملف
    const previewFile = () => {
      if (form.value.story_file?.data) {
        try {
          // تحديد نوع المحتوى
          const fileType = form.value.story_file.type || ''
          let url = form.value.story_file.data

          // إذا كان التنسيق ليس data URL، قم بإنشائه
          if (!url.startsWith('data:')) {
            url = `data:${fileType};base64,${url}`
          }

          previewUrl.value = url
          showPreview.value = true
        } catch (error) {
          console.error('خطأ في معاينة الملف:', error)
          alert('حدث خطأ في معاينة الملف')
        }
      }
    }

    const closePreview = () => {
      showPreview.value = false
      previewUrl.value = ''
    }

    // دوال الحفظ
    const saveAsDraft = () => {
      form.value.status = 'draft'
      submitForm()
    }

    // معالجة وتحقق من حجم الملف
    const processFile = async (file) => {
      if (!file) return null;
      
      // حد أقصى 10 ميجابايت
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('حجم الملف يتجاوز الحد الأقصى المسموح به (10 ميجابايت)');
      }
      
      try {
        // تحويل الملف إلى Base64 مع التحقق
        const base64 = await fileToBase64(file);
        if (!base64) throw new Error('فشل تحويل الملف');
        
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64
        };
      } catch (error) {
        console.error('خطأ في معالجة الملف:', error);
        throw new Error('فشل معالجة الملف');
      }
    };

    const submitForm = async () => {
      // التحقق من الحقول المطلوبة
      const requiredFields = [
        'vessel_number', 'title', 'publication_year', 'author',
        'story_type', 'category', 'age_group', 'summary'
      ]

      const missingFields = requiredFields.filter(field => !form.value[field])
      if (missingFields.length > 0) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }

      // التحقق من الملفات المطلوبة للمحتوى الجديد
      if (!isEditing.value) {
        if (!form.value.cover_image) {
          alert('يرجى رفع صورة الغلاف')
          return
        }
        
        if (!form.value.story_file) {
          alert('يرجى رفع ملف المحتوى')
          return
        }
      }

      // تحقق من نوع الملف إذا تم رفعه
      if (form.value.story_file) {
        try {
          const fileObj = form.value.story_file
          const ok = isValidFileType({ type: fileObj.type || '' }, form.value.story_type)
          if (!ok) {
            alert('نوع الملف المرفوع لا يتوافق مع نوع المحتوى المحدد')
            return
          }
        } catch (error) {
          console.error('خطأ في التحقق من نوع الملف:', error)
          alert('حدث خطأ في التحقق من نوع الملف')
          return
        }
      }

      loading.value = true

      try {
        await new Promise(resolve => setTimeout(resolve, 800))

        // الحصول على بيانات المستخدم الحالي
        const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')

        // تحميل القصص الحالية من localStorage (المفتاح الموحد)
        const existingStories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
        const now = new Date().toISOString()

        if (isEditing.value) {
          const storyId = parseInt(route.params.id)
          const index = existingStories.findIndex(s => s.id === storyId)

          if (index !== -1) {
            existingStories[index] = {
              ...existingStories[index],
              ...form.value,
              updated_at: now,
              reviewed_by: currentUser.role === 'admin' ? currentUser.name : existingStories[index].reviewed_by
            }

            localStorage.setItem('libraryStories', JSON.stringify(existingStories))
            alert(`تم تحديث المحتوى "${form.value.title}" بنجاح!`)
          }
        } else {
          const newStory = {
            id: Date.now(),
            ...form.value,
            rating: 0,
            views: 0,
            created_at: now,
            updated_at: now,
            added_by: currentUser.name || 'موظف',
            added_by_id: currentUser.id,
            // تحديد الحالة بناءً على دور المستخدم
            status: currentUser.role === 'admin' ? 'published' : (form.value.status || 'draft'),
            submitted_at: currentUser.role === 'employee' && form.value.status === 'pending_review' ? now : null,
            reviewed_by: currentUser.role === 'admin' ? currentUser.name : null,
            review_notes: null
          }

          existingStories.unshift(newStory)
          localStorage.setItem('libraryStories', JSON.stringify(existingStories))

          // إعلام الصفحات الأخرى بتحديث البيانات
          try { window.dispatchEvent(new Event('libraryStoriesUpdated')) } catch (e) { /* ignore */ }

          // إرسال إشعار للمدير إذا كان الموظف أرسل المحتوى للمراجعة
          if (currentUser.role === 'employee' && form.value.status === 'pending_review') {
            sendAdminNotification('content_submitted', newStory)
          }

          const message = form.value.status === 'published' ?
            'تم نشر المحتوى بنجاح!' :
            currentUser.role === 'employee' ?
            'تم حفظ المحتوى كمسودة بنجاح! يمكنك إرساله للمراجعة عندما تكون جاهزاً.' :
            'تم حفظ المحتوى بنجاح!'

          alert(message)
        }

  // التوجيه بناءً على دور المستخدم
  const userRole = currentUser.role || 'employee'
  const redirectPath = userRole === 'admin' ? '/admin/stories' : '/employee/stories'
  router.push(redirectPath)
  
  // أرسل حدث تحديث القصص
  try { window.dispatchEvent(new Event('libraryStoriesUpdated')) } catch (e) { /* ignore */ }

      } catch (error) {
        console.error('Error saving story:', error)
        alert('حدث خطأ أثناء حفظ المحتوى')
      } finally {
        loading.value = false
      }
    }

// دالة إرسال الإشعار للمدير
const sendAdminNotification = (type, story) => {
  const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
  const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
  
  notifications.unshift({
    id: Date.now(),
    type: type,
    title: 'محتوى جديد يحتاج للمراجعة',
    message: `قام الموظف ${currentUser.name} بإرسال محتوى جديد للمراجعة: "${story.title}"`,
    data: story,
    employee_id: currentUser.id,
    employee_name: currentUser.name,
    timestamp: new Date().toISOString(),
    read: false
  })
  
  localStorage.setItem('adminNotifications', JSON.stringify(notifications))
}
    return {
      form,
      loading,
      isEditing,
      progressPercentage,
      publicationYears,
      coverInput,
      storyFileInput,
      showPreview,
      previewUrl,
      canPreview,
      handleCoverImageClick,
      handleStoryFileClick,
      handleCoverImageUpload,
      handleStoryFileUpload,
      removeCoverImage,
      removeStoryFile,
      saveAsDraft,
      submitForm,
      goBack,
      previewFile,
      closePreview,
      getFileName,
      getFileSize,
      getFileAcceptTypes,
      getFileAcceptDescription,
      getStatusDescription,
      updateProgress
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
  font-feature-settings: 'liga' 1;
  -webkit-font-feature-settings: 'liga' 1;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* تحسينات للرسوم المتحركة */
.transition-all {
  transition: all 0.3s ease;
}

/* دعم الخطوط العربية */
@font-face {
  font-family: 'Tajawal';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1nzGBC5xLhLFw4Q.woff2') format('woff2');
  unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF;
}
</style>