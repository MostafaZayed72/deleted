<template>
  <div dir="rtl" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">سجل نشاطك التفصيلي</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">مرحباً بك في مكتبة الطفل الرقمية</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <!-- بطاقات الإحصائيات -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">المشاهدات</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ userStats.totalViews || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-blue-600 dark:text-blue-400">visibility</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">الإعجابات</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ userStats.totalLikes || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-green-600 dark:text-green-400">favorite</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">التعليقات</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ userStats.totalComments || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-purple-600 dark:text-purple-400">comment</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">التحميلات</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ userStats.totalDownloads || 0 }}</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
              <span class="material-icons text-orange-600 dark:text-orange-400">download</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- النشاط الأخير -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white">النشاط الأخير</h2>
              <button 
                @click="refreshData"
                class="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors duration-200"
              >
                <span class="material-icons text-base">refresh</span>
                تحديث
              </button>
            </div>
            
            <div v-if="recentInteractions.length > 0" class="space-y-4">
              <div v-for="interaction in recentInteractions" :key="interaction.id" 
                   class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-white"
                     :class="getInteractionColor(interaction.interactionType)">
                  <span class="material-icons text-sm">{{ getInteractionIcon(interaction.interactionType) }}</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800 dark:text-white">
                    {{ getInteractionText(interaction.interactionType) }}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ formatDate(interaction.timestamp) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-800 dark:text-white">
                    {{ interaction.metadata?.storyTitle || 'قصة' }}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400">
                    {{ getMediaTypeArabic(interaction.metadata?.storyType) }}
                  </p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="material-icons text-gray-400 text-2xl">history</span>
              </div>
              <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">لا توجد أنشطة حديثة</h3>
              <p class="text-gray-600 dark:text-gray-400">ابدأ بتصفح المكتبة لتظهر أنشطتك هنا</p>
            </div>
          </div>
        </div>

        <!-- الإحصائيات التفصيلية -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6">إحصائيات مفصلة</h2>
            <div class="space-y-4">
              <div v-for="stat in detailedStats" :key="stat.label" 
                   class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</span>
                <span class="font-bold text-gray-800 dark:text-white">{{ stat.value }}</span>
              </div>
            </div>

            <!-- التفضيلات -->
            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">تفضيلاتك</h3>
              <div class="space-y-3">
                <div v-for="pref in userPreferences" :key="pref.category" 
                     class="flex justify-between items-center p-2">
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ pref.category }}</span>
                  <span class="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">
                    {{ pref.count }} قصة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- القصص التي أعجبتك -->
      <div class="mt-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-6">القصص التي أعجبتك</h2>
          <div v-if="likedStories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="story in likedStories" :key="story.id" 
                 class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  <span class="material-icons">{{ getTypeIcon(story.storyType) }}</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-800 dark:text-white text-sm line-clamp-1">{{ story.title }}</h4>
                  <p class="text-xs text-gray-600 dark:text-gray-400">{{ story.category }}</p>
                </div>
              </div>
              <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{{ formatDate(story.likedAt) }}</span>
                <button 
                  @click="viewStory(story.id)"
                  class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  عرض القصة
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="material-icons text-gray-400 text-2xl">favorite_border</span>
            </div>
            <h3 class="text-lg font-medium text-gray-800 dark:text-white mb-2">لا توجد قصص معجبة</h3>
            <p class="text-gray-600 dark:text-gray-400">اضغط على زر الإعجاب في القصص لتظهر هنا</p>
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
  name: 'UserDashboard',
  setup() {
    const router = useRouter()
    const userStats = ref({})
    const recentInteractions = ref([])
    const userInteractions = ref([])

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      window.addEventListener('interactionsUpdated', loadUserData)
    }

    // تحميل بيانات المستخدم
    const loadUserData = () => {
      console.log('🔄 [المستخدم] جاري تحميل بيانات المستخدم...')
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      
      if (userData && userData.id) {
        // تحميل إحصائيات المستخدم من StatisticsManager
        userStats.value = StatisticsManager.getUserStatistics(userData.id)
        console.log('📊 [المستخدم] إحصائيات المستخدم:', userStats.value)
        
        // تحميل تفاعلات المستخدم
        loadUserInteractions(userData.id)
      } else {
        console.warn('⚠️ [المستخدم] لا توجد بيانات مستخدم')
        userStats.value = {}
        recentInteractions.value = []
      }
    }

    // تحميل تفاعلات المستخدم
    const loadUserInteractions = (userId) => {
      try {
        // الحصول على جميع التفاعلات من StatisticsManager
        const allInteractions = StatisticsManager.getUserInteractions(userId)
        
        userInteractions.value = allInteractions
        recentInteractions.value = allInteractions
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 10)
        
        console.log('📝 [المستخدم] عدد التفاعلات:', allInteractions.length)
      } catch (error) {
        console.error('❌ [المستخدم] خطأ في تحميل التفاعلات:', error)
        userInteractions.value = []
        recentInteractions.value = []
      }
    }

    // تحديث البيانات
    const refreshData = () => {
      console.log('🔄 [المستخدم] جاري تحديث البيانات...')
      loadUserData()
    }

    // دوال المساعدة
    const getInteractionIcon = (type) => {
      const icons = {
        view: 'visibility',
        like: 'favorite',
        download: 'download',
        share: 'share',
        comment: 'comment',
        rating: 'star'
      }
      return icons[type] || 'info'
    }

    const getInteractionColor = (type) => {
      const colors = {
        view: 'bg-blue-500',
        like: 'bg-red-500',
        download: 'bg-green-500',
        share: 'bg-purple-500',
        comment: 'bg-orange-500',
        rating: 'bg-yellow-500'
      }
      return colors[type] || 'bg-gray-500'
    }

    const getInteractionText = (type) => {
      const texts = {
        view: 'عرضت قصة',
        like: 'أعجبت بقصة',
        download: 'حمّلت قصة',
        share: 'شاركت قصة',
        comment: 'علقت على قصة',
        rating: 'قيمت قصة'
      }
      return texts[type] || 'تفاعل مع قصة'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'غير محدد'
      try {
        return new Date(dateString).toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        return 'تاريخ غير صحيح'
      }
    }

    const getMediaTypeArabic = (storyType) => {
      const types = {
        image: 'صورة',
        video: 'فيديو',
        audio: 'صوت',
        pdf: 'كتاب PDF',
        document: 'مستند',
        interactive: 'تفاعلي',
        text: 'نص'
      }
      return types[storyType] || 'محتوى'
    }

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

    // الإحصائيات التفصيلية
    const detailedStats = computed(() => {
      const stats = userStats.value || {}
      
      return [
        { 
          label: 'إجمالي وقت المشاهدة', 
          value: stats.totalReadingTime ? `${Math.round(stats.totalReadingTime / 60)} دقيقة` : '0 دقيقة' 
        },
        { 
          label: 'متوسط التقييم', 
          value: stats.averageRating ? stats.averageRating.toFixed(1) : '0.0' 
        },
        { 
          label: 'آخر نشاط', 
          value: stats.lastActivity ? formatDate(stats.lastActivity) : 'لا يوجد' 
        },
        { 
          label: 'القصص المفضلة', 
          value: stats.likedStoriesCount || 0 
        }
      ]
    })

    // تفضيلات المستخدم
    const userPreferences = computed(() => {
      const interactions = userInteractions.value
      const categoryCount = {}
      
      interactions.forEach(interaction => {
        const category = interaction.metadata?.category
        if (category) {
          categoryCount[category] = (categoryCount[category] || 0) + 1
        }
      })
      
      return Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([category, count]) => ({
          category: getCategoryArabic(category),
          count
        }))
    })

    const getCategoryArabic = (category) => {
      const categories = {
        'واقعية': 'واقعية',
        'خيال': 'خيال',
        'ديني': 'ديني',
        'تعليمي': 'تعليمي',
        'ترفيهي': 'ترفيهي',
        'تاريخي': 'تاريخي',
        'علمي': 'علمي',
        'اجتماعي': 'اجتماعي'
      }
      return categories[category] || category
    }

    // القصص التي أعجبتك
    const likedStories = computed(() => {
      const likes = userInteractions.value.filter(i => i.interactionType === 'like')
      const stories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
      
      return likes.map(like => {
        const story = stories.find(s => s.id === like.storyId)
        return story ? {
          ...story,
          likedAt: like.timestamp
        } : null
      }).filter(Boolean)
        .sort((a, b) => new Date(b.likedAt) - new Date(a.likedAt))
        .slice(0, 6)
    })

    // عرض القصة
    const viewStory = (storyId) => {
      router.push(`/story/${storyId}`)
    }

    onMounted(() => {
      console.log('🚀 [المستخدم] تم تحميل لوحة تحكم المستخدم')
      loadUserData()
      setupRealTimeUpdates()
    })

    // تنظيف event listener
    onUnmounted(() => {
      console.log('🧹 [المستخدم] تنظيف المكون')
      window.removeEventListener('interactionsUpdated', loadUserData)
    })

    return {
      userStats,
      recentInteractions,
      detailedStats,
      userPreferences,
      likedStories,
      refreshData,
      getInteractionIcon,
      getInteractionColor,
      getInteractionText,
      formatDate,
      getMediaTypeArabic,
      getTypeIcon,
      viewStory
    }
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>