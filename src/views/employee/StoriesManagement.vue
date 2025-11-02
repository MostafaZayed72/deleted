<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#1B3C53] dark:text-white mb-3">
          إدارة المحتوى
        </h1>
        <p class="text-lg text-[#456882] dark:text-gray-300">
          عرض وتعديل المحتوى الذي أضفته
        </p>
      </div>

      <!-- الإحصائيات السريعة -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">إجمالي المحتوى</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-blue-400">{{ employeeStats.totalContent }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-blue-600 dark:text-blue-400">library_books</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">قيد المراجعة</p>
              <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ employeeStats.pendingReview }}</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-amber-600 dark:text-amber-400">pending</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">مقبولة</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ employeeStats.approved }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-green-600 dark:text-green-400">check_circle</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">إجمالي المشاهدات</p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ employeeStats.totalViews }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-purple-600 dark:text-purple-400">visibility</span>
            </div>
          </div>
        </div>
      </div>

      <!-- الفلترة والبحث -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- بحث -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">بحث</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">search</span>
              <input
                v-model="filters.search"
                type="text"
                placeholder="ابحث في المحتوى..."
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
            </div>
          </div>

          <!-- النوع -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">نوع الملف</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">category</span>
              <select
                v-model="filters.type"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="">جميع الأنواع</option>
                <option value="image">صورة</option>
                <option value="video">فيديو</option>
                <option value="audio">صوت</option>
                <option value="pdf">PDF</option>
                <option value="document">مستند نصي</option>
                <option value="interactive">تفاعلي</option>
              </select>
            </div>
          </div>

          <!-- الحالة -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الحالة</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">flag</span>
              <select
                v-model="filters.status"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="">جميع الحالات</option>
                <option value="published">منشور</option>
                <option value="pending_review">بانتظار المراجعة</option>
                <option value="draft">مسودة</option>
                <option value="rejected">مرفوض</option>
                <option value="needs_revision">يحتاج تعديل</option>
              </select>
            </div>
          </div>

          <!-- الفئة -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الفئة</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">class</span>
              <select
                v-model="filters.category"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="">جميع الفئات</option>
                <option value="واقعية">واقعية</option>
                <option value="خيال">خيال</option>
                <option value="ديني">ديني</option>
                <option value="تعليمي">تعليمي</option>
                <option value="ترفيهي">ترفيهي</option>
                <option value="تاريخي">تاريخي</option>
                <option value="علمي">علمي</option>
                <option value="اجتماعي">اجتماعي</option>
              </select>
            </div>
          </div>
        </div>

        <!-- فلتر المحتوى الخاص بي -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-[#1B3C53] dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                v-model="filters.myContentOnly"
                class="rounded border-gray-300 focus:ring-[#1B3C53]"
              >
              <span class="material-icons text-base">person</span>
              عرض المحتوى الذي أضفته فقط
            </label>
            
            <div class="flex items-center gap-4">
              <span class="text-sm text-[#456882] dark:text-gray-400">
                عرض {{ filteredStories.length }} من {{ employeeStories.length }}
              </span>
              <button
                @click="resetFilters"
                class="flex items-center gap-2 text-sm text-[#1B3C53] dark:text-blue-400 hover:underline transition-colors duration-200"
              >
                <span class="material-icons text-base">refresh</span>
                إعادة التعيين
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- قائمة المحتوى -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">المحتوى المضاف</h3>
            <button
              @click="navigateToAddStory"
              class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 text-sm font-medium shadow-lg"
            >
              <span class="material-icons text-sm">add</span>
              إضافة محتوى جديد
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">المحتوى</th>
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">المعلومات</th>
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">الحالة</th>
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">الإحصائيات</th>
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">التاريخ</th>
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="story in filteredStories" 
                :key="story.id"
                class="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <!-- معلومات المحتوى -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-[#1B3C53] to-[#234C6A] rounded-xl flex items-center justify-center text-white text-lg">
                      <span class="material-icons">{{ getTypeIcon(story.story_type) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-[#1B3C53] dark:text-white mb-1 truncate">{{ story.title }}</h4>
                      <p class="text-sm text-[#456882] dark:text-gray-400 line-clamp-2 mb-2">{{ story.summary }}</p>
                      <div class="flex items-center gap-2">
                        <span class="text-xs bg-gray-100 dark:bg-gray-600 text-[#456882] dark:text-gray-300 px-2 py-1 rounded">
                          {{ story.vessel_number }}
                        </span>
                        <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                          {{ getTypeText(story.story_type) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <!-- المعلومات -->
                <td class="py-4 px-6">
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-[#456882] dark:text-gray-400 text-base">person</span>
                      <span class="text-[#456882] dark:text-gray-400">{{ story.author }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-[#456882] dark:text-gray-400 text-base">category</span>
                      <span class="text-[#456882] dark:text-gray-400">{{ story.category }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-[#456882] dark:text-gray-400 text-base">child_care</span>
                      <span class="text-[#456882] dark:text-gray-400">{{ story.age_group }}</span>
                    </div>
                  </div>
                </td>

                <!-- الحالة -->
                <td class="py-4 px-6">
                  <div class="space-y-2">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(story.status)">
                      <span class="material-icons text-xs mr-1">{{ getStatusIcon(story.status) }}</span>
                      {{ getStatusText(story.status) }}
                    </span>
                    <div v-if="story.review_notes" class="text-xs text-[#456882] dark:text-gray-400 bg-gray-50 dark:bg-gray-600 p-2 rounded-lg">
                      {{ story.review_notes }}
                    </div>
                    <div v-if="story.reviewed_by" class="text-xs text-[#456882] dark:text-gray-400">
                      تمت المراجعة بواسطة: {{ story.reviewed_by }}
                    </div>
                  </div>
                </td>

                <!-- الإحصائيات -->
                <td class="py-4 px-6">
                  <div class="space-y-2 text-sm">
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-[#456882] dark:text-gray-400 text-base">visibility</span>
                      <span class="text-[#456882] dark:text-gray-400">{{ story.stats?.views || 0 }} مشاهدة</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-[#456882] dark:text-gray-400 text-base">thumb_up</span>
                      <span class="text-[#456882] dark:text-gray-400">{{ story.stats?.likes || 0 }} إعجاب</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="material-icons text-[#456882] dark:text-gray-400 text-base">download</span>
                      <span class="text-[#456882] dark:text-gray-400">{{ story.stats?.downloads || 0 }} تحميل</span>
                    </div>
                  </div>
                </td>

                <!-- التاريخ -->
                <td class="py-4 px-6">
                  <div class="space-y-1 text-sm">
                    <div class="text-[#456882] dark:text-gray-400">{{ formatDate(story.created_at) }}</div>
                    <div v-if="story.submitted_at" class="text-[#456882] dark:text-gray-400 text-xs">
                      أرسلت: {{ formatDate(story.submitted_at) }}
                    </div>
                  </div>
                </td>

                <!-- الإجراءات -->
                <td class="py-4 px-6">
                  <div class="flex items-center gap-1 justify-end">
                    <!-- معاينة -->
                    <button
                      @click="previewStory(story)"
                      class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                      title="معاينة"
                    >
                      <span class="material-icons text-sm">visibility</span>
                    </button>

                    <!-- تعديل -->
                    <router-link
                      :to="`/employee/stories/edit/${story.id}`"
                      class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      title="تعديل"
                    >
                      <span class="material-icons text-sm">edit</span>
                    </router-link>

                    <!-- إرسال للمراجعة -->
                    <button
                      v-if="story.status === 'draft' || story.status === 'needs_revision'"
                      @click="submitForReview(story)"
                      class="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors duration-200"
                      title="إرسال للمراجعة"
                    >
                      <span class="material-icons text-sm">send</span>
                    </button>

                    <!-- نسخ الرابط -->
                    <button
                      v-if="story.status === 'published'"
                      @click="copyStoryLink(story)"
                      class="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-200"
                      title="نسخ الرابط"
                    >
                      <span class="material-icons text-sm">link</span>
                    </button>

                    <!-- حذف -->
                    <button
                      v-if="story.status === 'draft' || story.status === 'rejected'"
                      @click="deleteStory(story)"
                      class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                      title="حذف"
                    >
                      <span class="material-icons text-sm">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- حالة عدم وجود محتوى -->
          <div v-if="filteredStories.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-gray-400 text-2xl">collections_bookmark</span>
            </div>
            <h3 class="text-lg font-medium text-[#1B3C53] dark:text-white mb-2">لا توجد محتويات</h3>
            <p class="text-[#456882] dark:text-gray-400 mb-6">لم يتم العثور على محتوى يطابق معايير البحث</p>
            <button
              @click="navigateToAddStory"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 font-medium shadow-lg"
            >
              <span class="material-icons">add</span>
              إضافة أول محتوى
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import StatisticsManager from '@/utils/statisticsManager'

export default {
  name: 'EmployeeStoriesManagement',
  setup() {
    const router = useRouter()
    const stories = ref([])
    const user = ref(null)
    const filters = ref({
      search: '',
      type: '',
      status: '',
      category: '',
      myContentOnly: true
    })

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      window.addEventListener('storiesUpdated', loadData)
      window.addEventListener('interactionsUpdated', loadData)
    }

    // دالة التنقل إلى صفحة إضافة محتوى جديد
    const navigateToAddStory = () => {
      console.log('🔄 [الموظف] جاري التوجيه إلى صفحة إضافة محتوى جديد...')
      router.push('/employee/stories/new')
        .then(() => {
          console.log('✅ [الموظف] تم التوجيه بنجاح إلى صفحة إضافة محتوى جديد')
        })
        .catch(error => {
          console.error('❌ [الموظف] فشل في التوجيه إلى صفحة إضافة محتوى جديد:', error)
          window.location.href = '/employee/stories/new'
        })
    }

    // تحميل البيانات
    const loadData = () => {
      try {
        console.log('🔄 [الموظف] جاري تحميل البيانات...')
        
        const userData = localStorage.getItem('userData')
        if (userData) {
          user.value = JSON.parse(userData)
          console.log('👤 [الموظف] بيانات المستخدم:', user.value)
        } else {
          console.warn('⚠️ [الموظف] لم يتم العثور على بيانات المستخدم')
        }

        // تحميل القصص من localStorage
        const savedStories = localStorage.getItem('libraryStories')
        console.log('📁 [الموظف] البيانات المحملة من localStorage:', savedStories)
        
        if (savedStories) {
          const parsedStories = JSON.parse(savedStories)
          // إضافة الإحصائيات لكل قصة باستخدام StatisticsManager
          stories.value = parsedStories.map(story => ({
            ...story,
            stats: StatisticsManager.getStoryStatistics(story.id)
          }))
          console.log('✅ [الموظف] عدد القصص المحملة:', stories.value.length)
        } else {
          stories.value = []
          console.log('⚠️ [الموظف] لا توجد قصص في التخزين المحلي')
        }
      } catch (error) {
        console.error('❌ [الموظف] خطأ في تحميل البيانات:', error)
        stories.value = []
      }
    }

    // المحتوى الخاص بالموظف
    const employeeStories = computed(() => {
      if (!user.value) {
        console.log('👤 [الموظف] لا يوجد مستخدم مسجل')
        return []
      }
      
      const employeeContent = stories.value.filter(story => {
        const isAddedByUser = story.added_by === user.value.name || 
                             story.added_by_id === user.value.id ||
                             (story.added_by && user.value.name && story.added_by.includes(user.value.name))
        
        console.log(`🔍 [الموظف] التحقق من القصة "${story.title}":`, {
          added_by: story.added_by,
          added_by_id: story.added_by_id,
          user_name: user.value.name,
          user_id: user.value.id,
          matches: isAddedByUser
        })
        
        return isAddedByUser
      })
      
      console.log('👤 [الموظف] القصص الخاصة بالموظف:', employeeContent)
      return employeeContent
    })

    // إحصائيات الموظف المحدثة
    const employeeStats = computed(() => {
      const employeeContent = employeeStories.value
      
      // حساب إجمالي المشاهدات من نظام الإحصائيات
      const totalViews = employeeContent.reduce((total, story) => {
        return total + (story.stats?.views || 0)
      }, 0)
      
      console.log('📈 [الموظف] إحصائيات الموظف:', {
        total: employeeContent.length,
        pending: employeeContent.filter(s => s.status === 'pending_review').length,
        approved: employeeContent.filter(s => s.status === 'published').length,
        rejected: employeeContent.filter(s => s.status === 'rejected').length,
        totalViews: totalViews
      })
      
      return {
        totalContent: employeeContent.length,
        pendingReview: employeeContent.filter(s => s.status === 'pending_review').length,
        approved: employeeContent.filter(s => s.status === 'published').length,
        rejected: employeeContent.filter(s => s.status === 'rejected').length,
        totalViews: totalViews
      }
    })

    // المحتوى المصفى
    const filteredStories = computed(() => {
      let filtered = employeeStories.value

      if (filters.value.myContentOnly) {
        filtered = filtered.filter(story => 
          story.added_by === user.value?.name || 
          story.added_by_id === user.value?.id
        )
      }

      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(story => 
          (story.title && story.title.toLowerCase().includes(search)) ||
          (story.summary && story.summary.toLowerCase().includes(search)) ||
          (story.author && story.author.toLowerCase().includes(search)) ||
          (story.vessel_number && story.vessel_number.toLowerCase().includes(search))
        )
      }

      if (filters.value.type) {
        filtered = filtered.filter(story => story.story_type === filters.value.type)
      }

      if (filters.value.status) {
        filtered = filtered.filter(story => story.status === filters.value.status)
      }

      if (filters.value.category) {
        filtered = filtered.filter(story => story.category === filters.value.category)
      }

      return filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    })

    // دوال مساعدة
    const getTypeIcon = (type) => {
      const icons = {
        image: 'image',
        video: 'play_circle',
        audio: 'music_note',
        pdf: 'picture_as_pdf',
        document: 'description',
        interactive: 'interactive'
      }
      return icons[type] || 'description'
    }

    const getTypeText = (type) => {
      const types = {
        image: 'صورة',
        video: 'فيديو',
        audio: 'صوت',
        pdf: 'PDF',
        document: 'مستند نصي',
        interactive: 'تفاعلي'
      }
      return types[type] || type
    }

    const getStatusText = (status) => {
      const statusMap = {
        published: 'منشور',
        pending_review: 'بانتظار المراجعة',
        draft: 'مسودة',
        rejected: 'مرفوض',
        needs_revision: 'يحتاج تعديل'
      }
      return statusMap[status] || status
    }

    const getStatusIcon = (status) => {
      const icons = {
        published: 'check_circle',
        pending_review: 'pending',
        draft: 'draft',
        rejected: 'cancel',
        needs_revision: 'edit_note'
      }
      return icons[status] || 'draft'
    }

    const getStatusClass = (status) => {
      const classes = {
        published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        pending_review: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
        draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        needs_revision: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      }
      return classes[status] || classes.draft
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'غير محدد'
      try {
        return new Date(dateString).toLocaleDateString('ar-EG')
      } catch (error) {
        return 'تاريخ غير صحيح'
      }
    }

    // الإجراءات
    const previewStory = (story) => {
      console.log('👁️ [الموظف] معاينة القصة:', story)
      window.open(`/story/${story.id}`, '_blank')
    }

    const submitForReview = (story) => {
      if (confirm('هل تريد إرسال هذا المحتوى للمراجعة؟')) {
        try {
          story.status = 'pending_review'
          story.submitted_at = new Date().toISOString()
          
          // حفظ التغييرات في localStorage
          localStorage.setItem('libraryStories', JSON.stringify(stories.value))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('storiesUpdated'))
          
          // إرسال إشعار للمدير
          sendAdminNotification('content_submitted', story)
          
          console.log('✅ [الموظف] تم إرسال المحتوى للمراجعة:', story)
          alert('تم إرسال المحتوى للمراجعة بنجاح')
        } catch (error) {
          console.error('❌ [الموظف] خطأ في إرسال المحتوى:', error)
          alert('حدث خطأ أثناء إرسال المحتوى للمراجعة')
        }
      }
    }

    const copyStoryLink = (story) => {
      const link = `${window.location.origin}/story/${story.id}`
      navigator.clipboard.writeText(link).then(() => {
        alert('تم نسخ رابط المحتوى')
      }).catch(() => {
        alert('تعذر نسخ الرابط')
      })
    }

    const deleteStory = (story) => {
      if (confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
        try {
          const index = stories.value.findIndex(s => s.id === story.id)
          if (index !== -1) {
            stories.value.splice(index, 1)
            localStorage.setItem('libraryStories', JSON.stringify(stories.value))
            
            // إطلاق حدث التحديث
            window.dispatchEvent(new CustomEvent('storiesUpdated'))
            
            console.log('🗑️ [الموظف] تم حذف المحتوى:', story)
            alert('تم حذف المحتوى بنجاح')
          }
        } catch (error) {
          console.error('❌ [الموظف] خطأ في حذف المحتوى:', error)
          alert('حدث خطأ أثناء حذف المحتوى')
        }
      }
    }

    const resetFilters = () => {
      filters.value = {
        search: '',
        type: '',
        status: '',
        category: '',
        myContentOnly: true
      }
    }

    const sendAdminNotification = (type, data) => {
      try {
        const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
        notifications.unshift({
          id: Date.now(),
          type,
          data,
          employee_id: user.value?.id,
          employee_name: user.value?.name,
          timestamp: new Date().toISOString(),
          read: false
        })
        localStorage.setItem('adminNotifications', JSON.stringify(notifications))
        console.log('📢 [الموظف] تم إرسال إشعار للمدير')
      } catch (error) {
        console.error('❌ [الموظف] خطأ في إرسال الإشعار:', error)
      }
    }

    onMounted(() => {
      console.log('🚀 [الموظف] تم تحميل مكون إدارة محتوى الموظف')
      loadData()
      setupRealTimeUpdates()
      
      // تحديث البيانات عند العودة للصفحة
      window.addEventListener('focus', loadData)
    })

    // تنظيف event listener
    onUnmounted(() => {
      console.log('🧹 [الموظف] تنظيف مكون إدارة محتوى الموظف')
      window.removeEventListener('focus', loadData)
      window.removeEventListener('storiesUpdated', loadData)
      window.removeEventListener('interactionsUpdated', loadData)
    })

    return {
      stories,
      employeeStats,
      employeeStories,
      filteredStories,
      filters,
      getTypeIcon,
      getTypeText,
      getStatusText,
      getStatusIcon,
      getStatusClass,
      formatDate,
      previewStory,
      submitForReview,
      copyStoryLink,
      deleteStory,
      resetFilters,
      navigateToAddStory
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

/* تحسينات للجدول على الشاشات الصغيرة */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  table {
    font-size: 0.875rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
}
</style>