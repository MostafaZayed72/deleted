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
          إدارة وعرض جميع المحتويات في المكتبة
        </p>
      </div>

      <!-- الإحصائيات السريعة -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">إجمالي المحتوى</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-blue-400">{{ totalStories }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-blue-600 dark:text-blue-400">library_books</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">بانتظار المراجعة</p>
              <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ pendingReviewStories }}</p>
            </div>
            <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-amber-600 dark:text-amber-400">pending</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">منشور</p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ publishedStories }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-green-600 dark:text-green-400">check_circle</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">الأكثر مشاهدة</p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ mostViewedStory?.stats?.views || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-purple-600 dark:text-purple-400">visibility</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400">متوسط التقييم</p>
              <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ averageRating.toFixed(1) }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-yellow-600 dark:text-yellow-400">star</span>
            </div>
          </div>
        </div>
      </div>

      <!-- تبويبات المحتوى -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="tab in contentTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm min-w-[120px] justify-center"
            :class="activeTab === tab.id 
              ? 'bg-[#1B3C53] text-white shadow-sm' 
              : 'text-[#456882] dark:text-gray-400 hover:text-[#1B3C53] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'"
          >
            <span class="material-icons text-base">{{ tab.icon }}</span>
            <span>{{ tab.name }}</span>
            <span v-if="tab.count" class="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- الفلترة والبحث -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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

          <!-- الفئة العمرية -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الفئة العمرية</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">child_care</span>
              <select
                v-model="filters.age_group"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="">جميع الفئات</option>
                <option value="3-6 سنوات">3-6 سنوات</option>
                <option value="7-9 سنوات">7-9 سنوات</option>
                <option value="10-12 سنة">10-12 سنة</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- السنة -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">سنة النشر</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">calendar_today</span>
              <select
                v-model="filters.publication_year"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="">جميع السنوات</option>
                <option v-for="year in publicationYears" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>

          <!-- الترتيب -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">ترتيب العرض</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">sort</span>
              <select
                v-model="filters.sort"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="oldest">الأقدم أولاً</option>
                <option value="views">الأكثر مشاهدة</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="title">حسب العنوان</option>
              </select>
            </div>
          </div>

          <!-- الموظف المضيف -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الموظف المضيف</label>
            <div class="relative">
              <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">person</span>
              <select
                v-model="filters.added_by"
                class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="">جميع الموظفين</option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.name">
                  {{ employee.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <span class="text-sm text-[#456882] dark:text-gray-400">
            عرض {{ filteredStories.length }} من {{ totalStories }}
          </span>
          <div class="flex items-center gap-4">
            <button
              @click="exportData"
              class="flex items-center gap-2 px-4 py-2 text-[#1B3C53] dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200 text-sm"
            >
              <span class="material-icons text-base">download</span>
              تصدير البيانات
            </button>
            <button
              @click="resetFilters"
              class="flex items-center gap-2 px-4 py-2 text-[#1B3C53] dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200 text-sm"
            >
              <span class="material-icons text-base">refresh</span>
              إعادة التعيين
            </button>
          </div>
        </div>
      </div>

      <!-- قائمة المحتوى -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-gray-600">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">
              {{ getActiveTabTitle() }}
            </h3>
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
                <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">المضيف</th>
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
                    <div v-if="story.submitted_at" class="text-xs text-[#456882] dark:text-gray-400">
                      أرسلت: {{ formatDate(story.submitted_at) }}
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

                <!-- المضيف -->
                <td class="py-4 px-6">
                  <div class="space-y-1 text-sm">
                    <div class="text-[#456882] dark:text-gray-400">{{ story.added_by || 'غير محدد' }}</div>
                    <div class="text-[#456882] dark:text-gray-400 text-xs">
                      {{ formatDate(story.created_at) }}
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
                      :to="`/admin/stories/edit/${story.id}`"
                      class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      title="تعديل"
                    >
                      <span class="material-icons text-sm">edit</span>
                    </router-link>

                    <!-- نشر -->
                    <button
                      v-if="story.status === 'pending_review'"
                      @click="approveStory(story)"
                      class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      title="نشر"
                    >
                      <span class="material-icons text-sm">publish</span>
                    </button>

                    <!-- طلب تعديل -->
                    <button
                      v-if="story.status === 'pending_review'"
                      @click="requestRevision(story)"
                      class="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors duration-200"
                      title="طلب تعديل"
                    >
                      <span class="material-icons text-sm">edit_note</span>
                    </button>

                    <!-- رفض -->
                    <button
                      v-if="story.status === 'pending_review'"
                      @click="rejectStory(story)"
                      class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                      title="رفض"
                    >
                      <span class="material-icons text-sm">cancel</span>
                    </button>

                    <!-- أرشفة -->
                    <button
                      v-if="story.status === 'published'"
                      @click="archiveStory(story)"
                      class="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-200"
                      title="أرشفة"
                    >
                      <span class="material-icons text-sm">archive</span>
                    </button>

                    <!-- حذف -->
                    <button
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
  name: 'AdminStoriesManagement',
  setup() {
    const router = useRouter()
    const stories = ref([])
    const employees = ref([])
    const activeTab = ref('all')
    const filters = ref({
      search: '',
      type: '',
      category: '',
      age_group: '',
      publication_year: '',
      sort: 'newest',
      added_by: ''
    })

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      window.addEventListener('storiesUpdated', loadData)
      window.addEventListener('interactionsUpdated', loadData)
    }

    // تحميل البيانات
    const loadData = () => {
      try {
        console.log('🔄 [المدير] جاري تحميل البيانات...')
        
        // تحميل القصص من localStorage
        const savedStories = localStorage.getItem('libraryStories')
        
        if (savedStories) {
          const parsedStories = JSON.parse(savedStories)
          // إضافة الإحصائيات لكل قصة
          stories.value = parsedStories.map(story => ({
            ...story,
            stats: StatisticsManager.getStoryStatistics(story.id)
          }))
          console.log('✅ [المدير] عدد القصص المحملة:', stories.value.length)
        } else {
          stories.value = []
          console.log('⚠️ [المدير] لا توجد قصص في التخزين المحلي')
        }

        // تحميل بيانات الموظفين
        const savedEmployees = localStorage.getItem('libraryEmployees') || '[]'
        employees.value = JSON.parse(savedEmployees)
        
      } catch (error) {
        console.error('❌ [المدير] خطأ في تحميل البيانات:', error)
        stories.value = []
        employees.value = []
      }
    }

    // دالة التنقل إلى صفحة إضافة محتوى جديد
    const navigateToAddStory = () => {
      router.push('/admin/stories/new')
    }

    // تبويبات المحتوى
    const contentTabs = computed(() => [
      { id: 'all', name: 'جميع المحتويات', icon: 'dashboard', count: totalStories.value },
      { id: 'pending', name: 'بانتظار المراجعة', icon: 'pending', count: pendingReviewStories.value },
      { id: 'published', name: 'منشور', icon: 'check_circle', count: publishedStories.value },
      { id: 'draft', name: 'مسودة', icon: 'draft', count: draftStories.value },
      { id: 'rejected', name: 'مرفوض', icon: 'cancel', count: rejectedStories.value },
      { id: 'needs_revision', name: 'يحتاج تعديل', icon: 'edit_note', count: needsRevisionStories.value },
      { id: 'archived', name: 'مؤرشف', icon: 'archive', count: archivedStories.value }
    ])

    // الإحصائيات
    const totalStories = computed(() => {
      return stories.value.length
    })

    const pendingReviewStories = computed(() => {
      return stories.value.filter(s => s.status === 'pending_review').length
    })

    const publishedStories = computed(() => {
      return stories.value.filter(s => s.status === 'published').length
    })

    const draftStories = computed(() => {
      return stories.value.filter(s => s.status === 'draft').length
    })

    const rejectedStories = computed(() => {
      return stories.value.filter(s => s.status === 'rejected').length
    })

    const needsRevisionStories = computed(() => {
      return stories.value.filter(s => s.status === 'needs_revision').length
    })

    const archivedStories = computed(() => {
      return stories.value.filter(s => s.status === 'archived').length
    })

    const mostViewedStory = computed(() => {
      if (stories.value.length === 0) return { stats: { views: 0 } }
      return stories.value.reduce((max, story) => 
        (story.stats?.views || 0) > (max.stats?.views || 0) ? story : max, { stats: { views: 0 } }
      )
    })

    const averageRating = computed(() => {
      if (stories.value.length === 0) return 0
      const ratings = stories.value
        .map(story => parseFloat(story.rating || 0))
        .filter(rating => !isNaN(rating) && rating > 0)
      
      if (ratings.length === 0) return 0
      
      const sum = ratings.reduce((total, rating) => total + rating, 0)
      return sum / ratings.length
    })

    // السنوات للنشر
    const publicationYears = computed(() => {
      const years = new Set(stories.value.map(story => story.publication_year).filter(year => year))
      return Array.from(years).sort((a, b) => b - a)
    })

    // المحتوى المصفى حسب التبويب النشط
    const filteredStories = computed(() => {
      let filtered = stories.value

      // التبويب النشط
      switch (activeTab.value) {
        case 'pending':
          filtered = filtered.filter(story => story.status === 'pending_review')
          break
        case 'published':
          filtered = filtered.filter(story => story.status === 'published')
          break
        case 'draft':
          filtered = filtered.filter(story => story.status === 'draft')
          break
        case 'rejected':
          filtered = filtered.filter(story => story.status === 'rejected')
          break
        case 'needs_revision':
          filtered = filtered.filter(story => story.status === 'needs_revision')
          break
        case 'archived':
          filtered = filtered.filter(story => story.status === 'archived')
          break
      }

      // الفلاتر
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(story => 
          (story.title && story.title.toLowerCase().includes(search)) ||
          (story.summary && story.summary.toLowerCase().includes(search)) ||
          (story.author && story.author.toLowerCase().includes(search)) ||
          (story.vessel_number && story.vessel_number.toLowerCase().includes(search)) ||
          (story.added_by && story.added_by.toLowerCase().includes(search))
        )
      }

      if (filters.value.type) {
        filtered = filtered.filter(story => story.story_type === filters.value.type)
      }

      if (filters.value.category) {
        filtered = filtered.filter(story => story.category === filters.value.category)
      }

      if (filters.value.age_group) {
        filtered = filtered.filter(story => story.age_group === filters.value.age_group)
      }

      if (filters.value.publication_year) {
        filtered = filtered.filter(story => story.publication_year == filters.value.publication_year)
      }

      if (filters.value.added_by) {
        filtered = filtered.filter(story => story.added_by === filters.value.added_by)
      }

      // الترتيب
      switch (filters.value.sort) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0))
          break
        case 'views':
          filtered.sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
          break
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'title':
          filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
          break
      }

      return filtered
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
        needs_revision: 'يحتاج تعديل',
        archived: 'مؤرشف'
      }
      return statusMap[status] || status
    }

    const getStatusIcon = (status) => {
      const icons = {
        published: 'check_circle',
        pending_review: 'pending',
        draft: 'draft',
        rejected: 'cancel',
        needs_revision: 'edit_note',
        archived: 'archive'
      }
      return icons[status] || 'draft'
    }

    const getStatusClass = (status) => {
      const classes = {
        published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        pending_review: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
        draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        needs_revision: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
        archived: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
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

    const getActiveTabTitle = () => {
      const tab = contentTabs.value.find(t => t.id === activeTab.value)
      return tab ? tab.name : 'جميع المحتويات'
    }

    // الإجراءات
    const previewStory = (story) => {
      console.log('👁️ [المدير] معاينة القصة:', story)
      window.open(`/story/${story.id}`, '_blank')
    }

    const approveStory = (story) => {
      if (confirm('هل تريد نشر هذا المحتوى؟')) {
        try {
          story.status = 'published'
          story.published_at = new Date().toISOString()
          story.reviewed_by = 'مدير النظام'
          
          localStorage.setItem('libraryStories', JSON.stringify(stories.value))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('storiesUpdated'))
          
          alert('✅ تم نشر المحتوى بنجاح')
        } catch (error) {
          console.error('❌ [المدير] خطأ في نشر القصة:', error)
          alert('❌ حدث خطأ أثناء نشر المحتوى')
        }
      }
    }

    const requestRevision = (story) => {
      const notes = prompt('أدخل ملاحظات التعديل المطلوبة:')
      if (notes) {
        try {
          story.status = 'needs_revision'
          story.review_notes = notes
          story.reviewed_by = 'مدير النظام'
          
          localStorage.setItem('libraryStories', JSON.stringify(stories.value))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('storiesUpdated'))
          
          alert('✅ تم إرسال طلب التعديل بنجاح')
        } catch (error) {
          console.error('❌ [المدير] خطأ في طلب التعديل:', error)
          alert('❌ حدث خطأ أثناء إرسال طلب التعديل')
        }
      }
    }

    const rejectStory = (story) => {
      const reason = prompt('أدخل سبب الرفض:')
      if (reason) {
        try {
          story.status = 'rejected'
          story.review_notes = reason
          story.reviewed_by = 'مدير النظام'
          
          localStorage.setItem('libraryStories', JSON.stringify(stories.value))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('storiesUpdated'))
          
          alert('✅ تم رفض المحتوى بنجاح')
        } catch (error) {
          console.error('❌ [المدير] خطأ في رفض القصة:', error)
          alert('❌ حدث خطأ أثناء رفض المحتوى')
        }
      }
    }

    const archiveStory = (story) => {
      if (confirm('هل تريد أرشفة هذا المحتوى؟')) {
        try {
          story.status = 'archived'
          localStorage.setItem('libraryStories', JSON.stringify(stories.value))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('storiesUpdated'))
          
          alert('✅ تم أرشفة المحتوى بنجاح')
        } catch (error) {
          console.error('❌ [المدير] خطأ في أرشفة القصة:', error)
          alert('❌ حدث خطأ أثناء أرشفة المحتوى')
        }
      }
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
            
            alert('✅ تم حذف المحتوى بنجاح')
          }
        } catch (error) {
          console.error('❌ [المدير] خطأ في حذف القصة:', error)
          alert('❌ حدث خطأ أثناء حذف المحتوى')
        }
      }
    }

    const resetFilters = () => {
      filters.value = {
        search: '',
        type: '',
        category: '',
        age_group: '',
        publication_year: '',
        sort: 'newest',
        added_by: ''
      }
    }

    const exportData = () => {
      try {
        const data = {
          stories: filteredStories.value,
          exportDate: new Date().toISOString(),
          totalCount: filteredStories.value.length
        }
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `library-data-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        alert('✅ تم تصدير البيانات بنجاح')
      } catch (error) {
        console.error('❌ [المدير] خطأ في تصدير البيانات:', error)
        alert('❌ حدث خطأ أثناء تصدير البيانات')
      }
    }

    onMounted(() => {
      console.log('🚀 [المدير] تم تحميل مكون إدارة محتوى المدير')
      loadData()
      setupRealTimeUpdates()
      
      // تنظيف event listeners عند تدمير المكون
      onUnmounted(() => {
        window.removeEventListener('storiesUpdated', loadData)
        window.removeEventListener('interactionsUpdated', loadData)
      })
    })

    return {
      stories,
      employees,
      activeTab,
      contentTabs,
      filters,
      totalStories,
      pendingReviewStories,
      publishedStories,
      draftStories,
      rejectedStories,
      needsRevisionStories,
      archivedStories,
      mostViewedStory,
      averageRating,
      publicationYears,
      filteredStories,
      getTypeIcon,
      getTypeText,
      getStatusText,
      getStatusIcon,
      getStatusClass,
      formatDate,
      getActiveTabTitle,
      previewStory,
      approveStory,
      requestRevision,
      rejectStory,
      archiveStory,
      deleteStory,
      resetFilters,
      exportData,
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
  
  .grid-cols-5 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>