<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 transition-colors duration-300">
    
    <!-- الهيدر -->
    <AppHeader />

    <!-- القسم الرئيسي -->
    <main class="container mx-auto px-4 py-8" :class="containerWidth">
      
      <!-- شريط البحث الرئيسي -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="relative">
          <div class="relative group">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="ابحث في المحتوى، المؤلفين، أو المواضيع..."
              class="w-full px-6 py-5 text-lg border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 dark:focus:border-purple-400 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 dark:text-white pr-48 transform group-hover:scale-[1.02]"
              @keyup.enter="performSearch"
              @input="handleSearchInput"
              @focus="showSuggestions = true"
              @blur="hideSuggestions"
            >
            
            <!-- الخط الرأسي -->
            <div class="absolute right-40 top-1/2 transform -translate-y-1/2 w-px h-6 bg-purple-300 dark:bg-purple-600"></div>
            
            <!-- أيقونة البحث -->
            <div class="absolute left-6 top-1/2 transform -translate-y-1/2">
              <span class="material-icons text-purple-500 text-2xl">search</span>
            </div>
            
            <!-- أدوات البحث المتقدم -->
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
              <!-- بحث متقدم -->
              <button 
                @click="showAdvancedSearch = !showAdvancedSearch"
                class="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors duration-200 flex flex-col items-center transform hover:scale-110"
                title="بحث متقدم"
              >
                <span class="material-icons text-purple-600 text-xl">tune</span>
                <span class="text-xs text-purple-600 mt-1">فلتر</span>
              </button>
              
              <!-- البحث بالصورة -->
              <div class="relative">
                <input 
                  type="file" 
                  ref="imageInput"
                  accept="image/*"
                  @change="handleImageSearch"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                <button class="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200 flex flex-col items-center transform hover:scale-110" title="بحث بالصورة">
                  <span class="material-icons text-green-600 text-xl">image</span>
                  <span class="text-xs text-green-600 mt-1">صورة</span>
                </button>
              </div>
              
              <!-- البحث بالصوت -->
              <button 
                @click="toggleVoiceSearch"
                class="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-200 relative flex flex-col items-center transform hover:scale-110"
                :class="{ 'bg-red-200 text-red-600 animate-pulse': isListening }"
                title="بحث بالصوت"
              >
                <span class="material-icons text-xl">mic</span>
                <span class="text-xs text-red-600 mt-1">صوت</span>
                <!-- مؤشر التسجيل -->
                <div v-if="isListening" class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </button>
            </div>
          </div>

          <!-- حالة البحث الصوتي -->
          <div v-if="isListening" class="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl border border-yellow-300 dark:border-yellow-600 animate-pulse">
            <div class="flex items-center justify-center gap-3">
              <span class="material-icons text-red-500 animate-pulse">mic</span>
              <p class="text-yellow-800 dark:text-yellow-200 font-medium">جاري الاستماع... تحدث الآن</p>
              <button @click="stopVoiceSearch" class="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transform hover:scale-105 transition-all">
                إيقاف
              </button>
            </div>
            <p class="text-center text-yellow-700 dark:text-yellow-300 text-sm mt-2">{{ voiceTranscript }}</p>
          </div>

          <!-- البحث المتقدم -->
          <transition name="custom-slide-down">
            <div v-if="showAdvancedSearch" class="mt-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-200 dark:border-purple-700 custom-fade-in">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الموضوعات</label>
                  <select v-model="advancedFilters.category" class="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-300">
                    <option value="">جميع الموضوعات</option>
                    <option v-for="category in featuredCategories" :key="category.id" :value="category.name">{{ category.name }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الفئة العمرية</label>
                  <select v-model="advancedFilters.ageGroup" class="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-300">
                    <option value="">جميع الأعمار</option>
                    <option value="3-5 سنوات">3-5 سنوات</option>
                    <option value="4-6 سنوات">4-6 سنوات</option>
                    <option value="6-8 سنوات">6-8 سنوات</option>
                    <option value="8-10 سنوات">8-10 سنوات</option>
                    <option value="10-12 سنة">10-12 سنة</option>
                    <option value="12+ سنة">12+ سنة</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نوع المحتوى</label>
                  <select v-model="advancedFilters.contentType" class="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-300">
                    <option value="">جميع الأنواع</option>
                    <option value="image">صورة</option>
                    <option value="video">فيديو</option>
                    <option value="audio">صوت</option>
                    <option value="pdf">PDF</option>
                    <option value="text">نص</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-end gap-3 mt-4">
                <button @click="resetAdvancedFilters" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-105">
                  إعادة تعيين
                </button>
                <button @click="applyAdvancedSearch" class="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  تطبيق البحث
                </button>
              </div>
            </div>
          </transition>

          <!-- الاقتراحات التلقائية -->
          <transition name="custom-slide-down">
            <div 
              v-if="showSuggestions && searchSuggestions.length > 0" 
              class="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-2xl shadow-2xl max-h-80 overflow-y-auto custom-fade-in"
            >
              <div 
                v-for="suggestion in searchSuggestions" 
                :key="suggestion.id"
                @mousedown="selectSuggestion(suggestion)"
                class="px-6 py-4 hover:bg-purple-50 dark:hover:bg-purple-900 cursor-pointer border-b border-purple-100 dark:border-purple-800 last:border-b-0 transition-all duration-200 group transform hover:translate-x-2"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <span class="material-icons text-purple-500 text-xl group-hover:scale-110 transition-transform">search</span>
                    <div class="text-right">
                      <p class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {{ suggestion.title }}
                      </p>
                      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {{ suggestion.author }} • {{ suggestion.category }}
                      </p>
                    </div>
                  </div>
                  <span class="material-icons text-gray-400 group-hover:text-purple-600 transform group-hover:-translate-x-1 transition-all">chevron_left</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- إحصائيات النتائج -->
      <div class="max-w-6xl mx-auto mb-8">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-6 border border-purple-200 dark:border-purple-700 shadow-lg">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-purple-800 dark:text-white mb-2">
                نتائج البحث
                <span class="text-lg font-normal opacity-70">
                  ({{ totalResults }} نتيجة)
                </span>
              </h2>
              
              <!-- وقت الاسترجاع -->
              <div class="flex items-center gap-4 text-sm text-purple-600 dark:text-purple-300">
                <span class="flex items-center gap-2">
                  <span class="material-icons text-lg text-green-500">schedule</span>
                  <span>الوقت المستغرق: {{ searchTime }} ثانية</span>
                </span>
                
                <!-- توزيع النتائج حسب النوع -->
                <div class="flex items-center gap-3">
                  <span v-for="type in contentTypes" :key="type.name" 
                        class="flex items-center gap-1 px-2 py-1 rounded-full text-xs shadow-sm"
                        :class="getTypeBadgeClass(type.name)">
                    <span class="material-icons text-xs">{{ type.icon }}</span>
                    <span>{{ type.name }} ({{ type.count }})</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- فلاتر العرض -->
            <div class="flex items-center gap-4">
              <!-- طريقة العرض -->
              <div class="flex items-center gap-2 bg-purple-100 dark:bg-purple-800 rounded-xl p-1 shadow-inner">
                <button 
                  v-for="view in viewModes" 
                  :key="view.id"
                  @click="changeViewMode(view.id)"
                  class="p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                  :class="viewMode === view.id ? 'bg-white dark:bg-purple-600 text-purple-600 dark:text-white shadow-sm' : 'text-purple-500 dark:text-purple-400'"
                >
                  <span class="material-icons text-lg">{{ view.icon }}</span>
                </button>
              </div>

              <!-- ترتيب النتائج -->
              <select v-model="sortBy" @change="applySorting" 
                      class="border border-purple-300 dark:border-purple-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-purple-700 text-purple-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200">
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="popular">الأكثر شيوعاً</option>
                <option value="alphabetical">الأبجدية</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- النتائج -->
      <div class="max-w-6xl mx-auto">
        <!-- حالة التحميل -->
        <div v-if="loading" class="text-center py-16">
          <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
          <p class="text-purple-600 dark:text-purple-300 text-lg">جاري البحث في المكتبة...</p>
          <p class="text-purple-500 dark:text-purple-400 text-sm mt-2">يرجى الانتظار قليلاً</p>
        </div>

        <!-- لا توجد نتائج -->
        <div v-else-if="searchResults.length === 0 && (searchQuery || hasActiveFilters) && !loading" 
             class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-purple-200 dark:border-purple-700 shadow-lg custom-fade-in">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <span class="material-icons text-purple-400 text-4xl">search_off</span>
          </div>
          <h3 class="text-2xl font-bold text-purple-800 dark:text-white mb-3">لا توجد نتائج</h3>
          <p class="text-purple-600 dark:text-purple-400 mb-6 max-w-md mx-auto">
            {{ searchQuery ? `لم نعثر على أي محتوى يطابق بحثك "${searchQuery}"` : 'لم نعثر على أي محتوى يطابق الفلاتر المحددة' }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="clearSearch" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
              مسح البحث والفلاتر
            </button>
            <button @click="showAllContents" class="px-6 py-3 border-2 border-purple-500 text-purple-600 dark:text-white rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105">
              عرض جميع المحتويات
            </button>
          </div>
        </div>

        <!-- البحث الأولي -->
        <div v-else-if="searchResults.length === 0 && !searchQuery && !hasActiveFilters && !loading" 
             class="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-purple-200 dark:border-purple-700 shadow-lg custom-fade-in">
          <div class="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
            <span class="material-icons text-purple-400 text-4xl">search</span>
          </div>
          <h3 class="text-2xl font-bold text-purple-800 dark:text-white mb-3">ابدأ البحث الآن</h3>
          <p class="text-purple-600 dark:text-purple-400">استخدم شريط البحث أعلاه للعثور على المحتويات والتعليمات</p>
        </div>

        <!-- عرض النتائج -->
        <div v-else class="custom-fade-in">
          <!-- العرض الشبكي -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="content in searchResults" 
              :key="content.id"
              @click="viewContent(content.id)"
              class="group cursor-pointer transform hover:-translate-y-4 transition-all duration-500"
            >
              <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-purple-200 dark:border-purple-700 h-full flex flex-col group-hover:border-purple-400">
                
                <!-- صورة المحتوى -->
                <div class="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 overflow-hidden">
                  <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <span class="absolute top-4 right-4 text-5xl transform group-hover:scale-110 transition-transform duration-300">{{ content.emoji || '📖' }}</span>
                  
                  <!-- شارة جديدة -->
                  <div v-if="isNewContent(content.created_at)" class="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                    جديد
                  </div>
                  
                  <!-- أيقونة نوع المحتوى -->
                  <div class="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-full p-2 shadow-md">
                    <span class="material-icons text-purple-500 text-lg">{{ getContentTypeIcon(content.story_type) }}</span>
                  </div>
                  
                  <!-- تأثير hover -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="bg-white bg-opacity-90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <span class="material-icons text-purple-500 text-2xl">play_arrow</span>
                    </div>
                  </div>
                </div>
                
                <!-- محتوى البطاقة -->
                <div class="p-4 flex-grow">
                  <h4 class="text-base font-bold text-purple-800 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {{ content.title }}
                  </h4>
                  
                  <p class="text-purple-600 dark:text-purple-300 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {{ content.summary }}
                  </p>
                  
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                      {{ content.age_group }}
                    </span>
                    <span class="text-purple-500 dark:text-purple-400 text-xs">{{ content.author }}</span>
                  </div>

                  <div class="flex items-center justify-between text-xs text-purple-500 dark:text-purple-400">
                    <span class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded transform group-hover:scale-105 transition-transform">{{ content.category }}</span>
                    <span>{{ formatDate(content.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- العرض الرأسي -->
          <div v-else-if="viewMode === 'list'" class="space-y-4">
            <div 
              v-for="content in searchResults" 
              :key="content.id"
              @click="viewContent(content.id)"
              class="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl border border-purple-200 dark:border-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:border-purple-400"
            >
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                  <span class="text-3xl">{{ content.emoji || '📖' }}</span>
                </div>
                <div class="flex-grow">
                  <div class="flex items-start justify-between mb-2">
                    <h4 class="text-lg font-bold text-purple-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {{ content.title }}
                    </h4>
                    <div class="flex items-center gap-2">
                      <span v-if="isNewContent(content.created_at)" class="bg-gradient-to-r from-pink-500 to-red-500 text-white px-2 py-1 rounded-full text-xs shadow-sm">
                        جديد
                      </span>
                      <span class="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs shadow-sm transform group-hover:scale-110 transition-transform">
                        <span class="material-icons text-xs">star</span>
                        {{ content.rating || '0.0' }}
                      </span>
                    </div>
                  </div>
                  <p class="text-purple-600 dark:text-purple-300 text-sm mb-3 line-clamp-2">
                    {{ content.summary }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 text-xs text-purple-500 dark:text-purple-400">
                      <span class="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-1 rounded transform group-hover:scale-105 transition-transform">
                        {{ content.category }}
                      </span>
                      <span class="flex items-center gap-1">
                        <span class="material-icons text-xs">person</span>
                        {{ content.author }}
                      </span>
                      <span>{{ content.views || 0 }} مشاهدة</span>
                    </div>
                    <span class="material-icons text-purple-400 group-hover:text-purple-600 transform group-hover:translate-x-1 transition-all duration-300">
                      arrow_left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- تحميل المزيد -->
          <div v-if="searchResults.length > 0 && hasMore && !loading" class="text-center mt-8">
            <button 
              @click="loadMore"
              class="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
            >
              تحميل المزيد من النتائج
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Search',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const searchQuery = ref('')
    const searchResults = ref([])
    const loading = ref(false)
    const showSuggestions = ref(false)
    const showAdvancedSearch = ref(false)
    const isListening = ref(false)
    const voiceTranscript = ref('')
    const searchSuggestions = ref([])
    const sortBy = ref('newest')
    const viewMode = ref('grid')
    const hasMore = ref(true)
    const searchTime = ref(0)
    
    const advancedFilters = ref({
      category: '',
      ageGroup: '',
      contentType: ''
    })

    // التعرف على الكلام
    let recognition = null

    // الموضوعات المميزة
    const featuredCategories = [
      {
        id: 1,
        name: 'واقعية',
        icon: 'explore'
      },
      {
        id: 2,
        name: 'خيال',
        icon: 'auto_awesome'
      },
      {
        id: 3,
        name: 'ديني',
        icon: 'mosque'
      },
      {
        id: 4,
        name: 'تعليمي',
        icon: 'school'
      },
      {
        id: 5,
        name: 'ترفيهي',
        icon: 'celebration'
      },
      {
        id: 6,
        name: 'تاريخي',
        icon: 'history'
      },
      {
        id: 7,
        name: 'علمي',
        icon: 'science'
      },
      {
        id: 8,
        name: 'اجتماعي',
        icon: 'diversity_3'
      }
    ]

    // طرق العرض
    const viewModes = [
      { id: 'grid', icon: 'grid_view', name: 'شبكة' },
      { id: 'list', icon: 'view_list', name: 'قائمة' }
    ]

    // جميع المحتويات من localStorage
    const allContents = ref([])

    // إحصائيات النتائج
    const totalResults = computed(() => searchResults.value.length)

    const contentTypes = computed(() => {
      const types = {
        'image': { name: 'صورة', count: 0, icon: 'image', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
        'video': { name: 'فيديو', count: 0, icon: 'play_circle', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
        'audio': { name: 'صوت', count: 0, icon: 'audiotrack', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
        'pdf': { name: 'PDF', count: 0, icon: 'picture_as_pdf', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
        'text': { name: 'نص', count: 0, icon: 'article', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' }
      }

      // إعادة تعيين العد
      Object.keys(types).forEach(key => {
        types[key].count = 0
      })

      // حساب العدد حسب النوع
      searchResults.value.forEach(content => {
        if (types[content.story_type]) {
          types[content.story_type].count++
        }
      })

      return Object.entries(types).map(([key, data]) => ({ key, ...data }))
    })

    const getTypeBadgeClass = (typeKey) => {
      const type = contentTypes.value.find(t => t.key === typeKey)
      return type ? type.color : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }

    // الحصول على أيقونة نوع المحتوى
    const getContentTypeIcon = (type) => {
      const icons = {
        'image': 'image',
        'video': 'play_circle',
        'audio': 'audiotrack',
        'pdf': 'picture_as_pdf',
        'text': 'article'
      }
      return icons[type] || 'menu_book'
    }

    // البحث بالصوت
    const toggleVoiceSearch = () => {
      if (!isListening.value) {
        startVoiceSearch()
      } else {
        stopVoiceSearch()
      }
    }

    const startVoiceSearch = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        recognition = new SpeechRecognition()
        
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = 'ar-SA'

        recognition.onstart = () => {
          isListening.value = true
          voiceTranscript.value = 'جاري الاستماع...'
        }

        recognition.onresult = (event) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          voiceTranscript.value = finalTranscript || interimTranscript
          searchQuery.value = finalTranscript || interimTranscript
        }

        recognition.onend = () => {
          isListening.value = false
          if (searchQuery.value.trim()) {
            performSearch()
          }
        }

        recognition.start()
      } else {
        alert('متصفحك لا يدعم التعرف على الكلام. يرجى استخدام Chrome أو Edge.')
      }
    }

    const stopVoiceSearch = () => {
      if (recognition) {
        recognition.stop()
      }
      isListening.value = false
    }

    // البحث بالصورة
    const handleImageSearch = (event) => {
      const file = event.target.files[0]
      if (file) {
        console.log('تم اختيار صورة للبحث:', file.name)
        const extractedText = 'استخراج نص من الصورة'
        searchQuery.value = extractedText
        performSearch()
        event.target.value = ''
      }
    }

    // تطبيق فلاتر البحث المتقدم
    const applyAdvancedSearch = () => {
      performSearch()
    }

    const resetAdvancedFilters = () => {
      advancedFilters.value = {
        category: '',
        ageGroup: '',
        contentType: ''
      }
    }

    // تغيير طريقة العرض
    const changeViewMode = (mode) => {
      viewMode.value = mode
    }

    // تحميل المحتويات من localStorage
    const loadContents = () => {
      const savedContents = localStorage.getItem('adminStories')
      if (savedContents) {
        allContents.value = JSON.parse(savedContents)
      } else {
        // بيانات تجريبية متوافقة مع نموذج إضافة القصة
        allContents.value = [
          {
            id: 1,
            vessel_number: 'VSL-123456-001',
            title: 'الأسد الشجاع',
            author: 'أحمد محمد',
            publication_year: '2024',
            story_type: 'image',
            category: 'خيال',
            age_group: '4-6 سنوات',
            status: 'published',
            emoji: '🦁',
            summary: 'قصة تعليمية عن الشجاعة والصداقة في الغابة',
            rating: 4.8,
            views: 1245,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            vessel_number: 'VSL-123456-002',
            title: 'مغامرات الأرنب',
            author: 'فاطمة علي',
            publication_year: '2024',
            story_type: 'video',
            category: 'ترفيهي',
            age_group: '3-5 سنوات',
            status: 'published',
            emoji: '🐰',
            summary: 'رحلة اكتشاف ممتعة مع أرنب صغير شجاع',
            rating: 4.5,
            views: 892,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 3,
            vessel_number: 'VSL-123456-003',
            title: 'أناشيد الأطفال',
            author: 'محمد السيد',
            publication_year: '2024',
            story_type: 'audio',
            category: 'تعليمي',
            age_group: '3-5 سنوات',
            status: 'published',
            emoji: '🎵',
            summary: 'مجموعة من الأناشيد التعليمية الممتعة للأطفال',
            rating: 4.7,
            views: 567,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
      }
    }

    // توليد اقتراحات البحث
    const generateSearchSuggestions = (query) => {
      if (!query || query.length < 2) {
        searchSuggestions.value = []
        return
      }

      const suggestions = allContents.value
        .filter(content => 
          content.title.toLowerCase().includes(query.toLowerCase()) ||
          content.author.toLowerCase().includes(query.toLowerCase()) ||
          content.summary.toLowerCase().includes(query.toLowerCase()) ||
          content.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(content => ({
          id: content.id,
          title: content.title,
          author: content.author,
          category: content.category
        }))
        .slice(0, 6)

      searchSuggestions.value = suggestions
    }

    const handleSearchInput = () => {
      generateSearchSuggestions(searchQuery.value)
    }

    const hideSuggestions = () => {
      setTimeout(() => {
        showSuggestions.value = false
      }, 200)
    }

    const selectSuggestion = (suggestion) => {
      searchQuery.value = suggestion.title
      showSuggestions.value = false
      viewContent(suggestion.id)
    }

    // التحقق إذا كان هناك فلاتر نشطة
    const hasActiveFilters = computed(() => {
      return Object.values(advancedFilters.value).some(value => value !== '')
    })

    // جلب query من URL عند تحميل الصفحة
    onMounted(() => {
      loadContents()
      
      if (route.query.q) {
        searchQuery.value = route.query.q
        performSearch()
      } else if (route.query.category) {
        advancedFilters.value.category = route.query.category
        performSearch()
      } else {
        showAllContents()
      }
    })

    const performSearch = () => {
      if (!searchQuery.value.trim() && !hasActiveFilters.value) {
        showAllContents()
        return
      }
      
      showSuggestions.value = false
      loading.value = true
      const startTime = Date.now()

      // تحديث URL
      const queryParams = {}
      if (searchQuery.value) queryParams.q = searchQuery.value
      if (advancedFilters.value.category) queryParams.category = advancedFilters.value.category
      
      router.push({ 
        path: '/search', 
        query: queryParams 
      })

      // محاكاة البحث مع تأخير
      setTimeout(() => {
        const results = allContents.value.filter(content => {
          // البحث في العنوان والمؤلف والملخص
          const matchesSearch = !searchQuery.value || 
            content.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            content.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            content.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
          
          // تطبيق الفلاتر المتقدمة
          const matchesCategory = !advancedFilters.value.category || content.category === advancedFilters.value.category
          const matchesAge = !advancedFilters.value.ageGroup || content.age_group === advancedFilters.value.ageGroup
          const matchesType = !advancedFilters.value.contentType || content.story_type === advancedFilters.value.contentType
          
          // عرض المحتويات المنشورة فقط
          const isPublished = content.status === 'published'
          
          return matchesSearch && matchesCategory && matchesAge && matchesType && isPublished
        })

        applySortingToResults(results)
        searchResults.value = results
        loading.value = false
        hasMore.value = results.length >= 8
        searchTime.value = ((Date.now() - startTime) / 1000).toFixed(2)
      }, 800)
    }

    const applySortingToResults = (results) => {
      switch(sortBy.value) {
        case 'newest':
          results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          break
        case 'oldest':
          results.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          break
        case 'rating':
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'popular':
          results.sort((a, b) => (b.views || 0) - (a.views || 0))
          break
        case 'alphabetical':
          results.sort((a, b) => a.title.localeCompare(b.title))
          break
      }
    }

    const applySorting = () => {
      if (searchResults.value.length > 0) {
        const results = [...searchResults.value]
        applySortingToResults(results)
        searchResults.value = results
      }
    }

    const clearSearch = () => {
      searchQuery.value = ''
      advancedFilters.value = {
        category: '',
        ageGroup: '',
        contentType: ''
      }
      router.push({ path: '/search' })
      showAllContents()
    }

    const showAllContents = () => {
      const publishedContents = allContents.value.filter(content => content.status === 'published')
      applySortingToResults(publishedContents)
      searchResults.value = publishedContents
      hasMore.value = publishedContents.length >= 8
      searchTime.value = 0.5
    }

    // إصلاح: الانتقال إلى صفحة المحتوى بدلاً من الرئيسية
    const viewContent = (contentId) => {
      router.push(`/story/${contentId}`)
    }

    const loadMore = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        hasMore.value = false
      }, 1000)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const isNewContent = (createdAt) => {
      const threeDaysAgo = new Date()
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
      return new Date(createdAt) >= threeDaysAgo
    }

    return {
      searchQuery,
      searchResults,
      loading,
      showSuggestions,
      showAdvancedSearch,
      isListening,
      voiceTranscript,
      searchSuggestions,
      sortBy,
      viewMode,
      hasMore,
      searchTime,
      totalResults,
      contentTypes,
      advancedFilters,
      featuredCategories,
      viewModes,
      hasActiveFilters,
      performSearch,
      applyAdvancedSearch,
      resetAdvancedFilters,
      changeViewMode,
      searchByCategory: (category) => {
        advancedFilters.value.category = category
        performSearch()
      },
      selectSuggestion,
      clearSearch,
      showAllContents,
      viewContent,
      loadMore,
      handleSearchInput,
      hideSuggestions,
      applySorting,
      toggleVoiceSearch,
      stopVoiceSearch,
      handleImageSearch,
      getContentTypeIcon,
      getTypeBadgeClass,
      formatDate,
      isNewContent
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* حركات مخصصة */
@keyframes custom-fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.custom-slide-down-enter-active,
.custom-slide-down-leave-active {
  transition: all 0.3s ease;
}

.custom-slide-down-enter-from,
.custom-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.custom-fade-in {
  animation: custom-fade-in 0.5s ease-out;
}

/* تحسينات Material Icons */
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

/* تحسينات التدرج اللوني */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* تحسينات للظلال */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}

/* تحسينات للاستجابة */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .space-y-4 > * {
    margin-bottom: 1rem;
  }
  
  .pr-48 {
    padding-right: 6rem;
  }
}
</style>