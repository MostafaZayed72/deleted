<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#1B3C53] dark:text-white mb-3">
          لوحة تحكم المدير
        </h1>
        <p class="text-lg text-[#456882] dark:text-gray-300">
          نظرة عامة على إحصائيات وأداء المنصة
        </p>
      </div>

      <!-- الإحصائيات السريعة -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">إجمالي القصص</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-blue-400">{{ statistics.totalStories }}</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ statistics.storiesGrowth }}% عن الشهر الماضي
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">library_books</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">المستخدمين النشطين</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-green-400">{{ statistics.totalUsers }}</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ statistics.usersGrowth }}% عن الأسبوع الماضي
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">people</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">المشاهدات اليوم</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-purple-400">{{ statistics.todayViews }}</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ statistics.viewsGrowth }}% عن اليوم السابق
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">visibility</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">متوسط التقييم</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-yellow-400">{{ statistics.averageRating }}/5</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ statistics.ratingGrowth }} عن الشهر الماضي
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">star</span>
            </div>
          </div>
        </div>
      </div>

      <!-- المحتوى الرئيسي -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- العمليات السريعة -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">العمليات السريعة</h3>
              <span class="text-sm text-[#456882] dark:text-gray-400">إدارة سريعة للنظام</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <router-link 
                to="/admin/stories/new"
                class="group p-4 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 text-[#1B3C53] dark:text-white block hover:shadow-lg hover:scale-105"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span class="material-icons text-white text-lg">add</span>
                  </div>
                  <div>
                    <p class="font-semibold text-sm">إضافة قصة جديدة</p>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">أضف محتوى جديد للمكتبة</p>
                  </div>
                </div>
              </router-link>

              <router-link 
                to="/admin/users"
                class="group p-4 border-2 border-dashed border-green-200 dark:border-green-800 rounded-xl hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 text-[#1B3C53] dark:text-white block hover:shadow-lg hover:scale-105"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span class="material-icons text-white text-lg">people</span>
                  </div>
                  <div>
                    <p class="font-semibold text-sm">إدارة المستخدمين</p>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">عرض وتعديل المستخدمين</p>
                  </div>
                </div>
              </router-link>

              <router-link 
                to="/admin/stories"
                class="group p-4 border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-xl hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 text-[#1B3C53] dark:text-white block hover:shadow-lg hover:scale-105"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span class="material-icons text-white text-lg">collections_bookmark</span>
                  </div>
                  <div>
                    <p class="font-semibold text-sm">إدارة المحتوى</p>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">عرض وتعديل جميع القصص</p>
                  </div>
                </div>
              </router-link>

              <router-link 
                to="/admin/analytics"
                class="group p-4 border-2 border-dashed border-orange-200 dark:border-orange-800 rounded-xl hover:border-orange-500 dark:hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 text-[#1B3C53] dark:text-white block hover:shadow-lg hover:scale-105"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span class="material-icons text-white text-lg">analytics</span>
                  </div>
                  <div>
                    <p class="font-semibold text-sm">التقارير والإحصائيات</p>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">عرض تحليلات الاستخدام</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>

          <!-- الشبكة المدمجة: القصص + المستخدمين -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- أحدث القصص المضافة -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">أحدث القصص المضافة</h3>
                <router-link 
                  to="/admin/stories" 
                  class="flex items-center gap-1 text-sm text-[#1B3C53] dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  عرض الكل
                  <span class="material-icons text-base">arrow_left</span>
                </router-link>
              </div>
              <div class="space-y-4">
                <div 
                  v-for="story in recentStories" 
                  :key="story.id"
                  class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                >
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span class="material-icons text-white">{{ getTypeIcon(story.story_type) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-[#1B3C53] dark:text-white text-sm mb-1 truncate">{{ story.title }}</h4>
                    <div class="flex items-center gap-3 text-xs text-[#456882] dark:text-gray-400">
                      <span class="flex items-center gap-1">
                        <span class="material-icons text-xs">child_care</span>
                        {{ story.age_group }}
                      </span>
                      <span class="flex items-center gap-1">
                        <span class="material-icons text-xs">visibility</span>
                        {{ story.stats?.views || 0 }} مشاهدة
                      </span>
                      <span class="flex items-center gap-1">
                        <span class="material-icons text-xs">star</span>
                        {{ story.rating || 0 }}/5
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <router-link 
                      :to="`/admin/stories/edit/${story.id}`"
                      class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      title="تعديل القصة"
                    >
                      <span class="material-icons text-sm">edit</span>
                    </router-link>
                    <button 
                      @click="deleteStory(story.id)"
                      class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                      title="حذف القصة"
                    >
                      <span class="material-icons text-sm">delete</span>
                    </button>
                  </div>
                </div>
                
                <!-- حالة عدم وجود قصص -->
                <div 
                  v-if="recentStories.length === 0"
                  class="text-center py-8 text-[#456882] dark:text-gray-400"
                >
                  <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="material-icons text-gray-400">library_books</span>
                  </div>
                  <p class="text-sm">لا توجد قصص مضافة حديثاً</p>
                </div>
              </div>
            </div>

            <!-- المستخدمون النشطون -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">المستخدمون النشطون</h3>
                <router-link 
                  to="/admin/users" 
                  class="flex items-center gap-1 text-sm text-[#1B3C53] dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-medium transition-colors duration-200"
                >
                  عرض الكل
                  <span class="material-icons text-base">arrow_left</span>
                </router-link>
              </div>
              <div class="space-y-4">
                <div 
                  v-for="user in activeUsers" 
                  :key="user.id"
                  class="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 group"
                >
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span class="text-sm font-bold">{{ user.fullName?.charAt(0) || user.name?.charAt(0) || 'م' }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-[#1B3C53] dark:text-white text-sm mb-1">{{ user.fullName || user.name || 'مستخدم' }}</h4>
                    <p class="text-xs text-[#456882] dark:text-gray-400 mb-2">{{ user.email || 'لا يوجد بريد' }}</p>
                    <div class="flex items-center gap-3 text-xs text-[#456882] dark:text-gray-400">
                      <span class="flex items-center gap-1">
                        <span class="material-icons text-xs">category</span>
                        {{ getAccountTypeArabic(user.accountType) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <span class="material-icons text-xs">schedule</span>
                        {{ formatLastActivity(user.lastActivity) }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      @click="viewUserInteractions(user)"
                      class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                      title="التفاعلات"
                    >
                      <span class="material-icons text-sm">insights</span>
                    </button>
                    <button 
                      @click="toggleUserStatus(user)"
                      class="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors duration-200"
                      :title="user.status === 'banned' ? 'فك الحظر' : 'حظر'"
                    >
                      <span class="material-icons text-sm">{{ user.status === 'banned' ? 'lock_open' : 'block' }}</span>
                    </button>
                  </div>
                </div>
                
                <!-- حالة عدم وجود مستخدمين -->
                <div 
                  v-if="activeUsers.length === 0"
                  class="text-center py-8 text-[#456882] dark:text-gray-400"
                >
                  <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="material-icons text-gray-400">people</span>
                  </div>
                  <p class="text-sm">لا توجد مستخدمين نشطين</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- الشريط الجانبي -->
        <div class="space-y-6">
          
          <!-- نشاط النظام -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white mb-4">نشاط النظام</h3>
            <div class="space-y-4">
              <div 
                v-for="activity in systemActivities" 
                :key="activity.id"
                class="flex items-start gap-3 group"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span class="material-icons text-white text-sm">{{ activity.icon }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-[#1B3C53] dark:text-white leading-relaxed">{{ activity.message }}</p>
                  <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- إحصائيات سريعة -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white mb-4">إحصائيات سريعة</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <span class="text-sm text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-blue-500 text-sm">add_circle</span>
                  القصص الجديدة اليوم:
                </span>
                <span class="font-bold text-[#1B3C53] dark:text-blue-400">{{ statistics.newStoriesToday }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <span class="text-sm text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-green-500 text-sm">person_add</span>
                  المستخدمين الجدد:
                </span>
                <span class="font-bold text-[#1B3C53] dark:text-green-400">{{ statistics.newUsersToday }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <span class="text-sm text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-purple-500 text-sm">chat</span>
                  التعليقات الجديدة:
                </span>
                <span class="font-bold text-[#1B3C53] dark:text-purple-400">{{ statistics.newCommentsToday }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <span class="text-sm text-[#1B3C53] dark:text-white flex items-center gap-2">
                  <span class="material-icons text-yellow-500 text-sm">trending_up</span>
                  معدل التفاعل:
                </span>
                <span class="font-bold text-green-600 dark:text-green-400">{{ statistics.engagementRate }}%</span>
              </div>
            </div>
          </div>

          <!-- إحصائيات التفاعلات -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white mb-4">إحصائيات التفاعلات</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="interaction in interactionStats" :key="interaction.type" 
                   class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <div class="w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center text-white"
                     :class="getInteractionColor(interaction.type)">
                  <span class="material-icons text-sm">{{ getInteractionIcon(interaction.type) }}</span>
                </div>
                <p class="text-lg font-bold text-[#1B3C53] dark:text-white">{{ interaction.count }}</p>
                <p class="text-xs text-[#456882] dark:text-gray-400">{{ interaction.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import StatisticsManager from '@/utils/statisticsManager';
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter()

    const statistics = ref({
      totalStories: 0,
      totalUsers: 0,
      todayViews: 0,
      averageRating: 0,
      newStoriesToday: 0,
      newUsersToday: 0,
      newCommentsToday: 0,
      engagementRate: 0,
      storiesGrowth: 12,
      usersGrowth: 8,
      viewsGrowth: 15,
      ratingGrowth: 0.2
    })

    const recentStories = ref([])
    const activeUsers = ref([])
    const systemActivities = ref([])

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      // الاشتراك في أحداث التحديث
      window.addEventListener('interactionsUpdated', loadStatistics);
      window.addEventListener('storiesUpdated', loadStatistics);
      window.addEventListener('usersUpdated', loadStatistics);
      window.addEventListener('statisticsUpdated', loadStatistics);
    }

    // الحصول على أيقونة النوع
    const getTypeIcon = (type) => {
      const icons = {
        image: 'image',
        video: 'play_circle',
        audio: 'music_note',
        pdf: 'picture_as_pdf',
        document: 'description',
        interactive: 'interactive'
      }
      return icons[type] || 'library_books'
    }

    // الحصول على نوع الحساب بالعربية
    const getAccountTypeArabic = (type) => {
      const types = {
        parent: 'ولي أمر',
        teacher: 'معلم',
        student: 'طالب',
        employee: 'موظف',
        admin: 'أدمن'
      }
      return types[type] || type
    }

    

    // تحميل الإحصائيات من نظام الإحصائيات
    const loadStatistics = async () => {
      try {
        console.log('🔄 جاري تحميل إحصائيات لوحة التحكم...');

        // استخدام StatisticsManager للحصول على الإحصائيات
        const generalStats = StatisticsManager.getGeneralStatistics();
        const topStories = StatisticsManager.getTopStories(5);
        const topUsers = StatisticsManager.getTopUsers(5);
        
        // تحديث البيانات المحلية
        statistics.value.totalStories = generalStats.totalStories;
        statistics.value.totalUsers = generalStats.totalUsers;
        statistics.value.todayViews = generalStats.todayViews;
        statistics.value.averageRating = generalStats.averageRating || 0;
        statistics.value.newStoriesToday = generalStats.newStoriesToday;
        statistics.value.newUsersToday = generalStats.newUsersToday;
        statistics.value.newCommentsToday = generalStats.newCommentsToday;
        statistics.value.engagementRate = generalStats.engagementRate;

        // تحديث القصص الأخيرة
        recentStories.value = topStories.map(story => ({
          ...story,
          age_group: story.age_group || 'غير محدد',
          views: story.stats?.views || 0,
          rating: story.rating || 0
        }));

        // تحديث المستخدمين النشطين
        activeUsers.value = topUsers.map(user => ({
          ...user,
          fullName: user.fullName || user.name || 'مستخدم',
          email: user.email || 'لا يوجد بريد',
          accountType: user.accountType || 'user',
          lastActivity: user.stats?.lastActivity || user.lastActivity,
          status: user.status || 'active'
        }));

        // تحميل نشاط النظام
        loadSystemActivities();

      } catch (error) {
        console.error('❌ خطأ في تحميل الإحصائيات:', error);
      }
    }

    const loadSystemActivities = () => {
      const generalStats = StatisticsManager.getGeneralStatistics();
      
      systemActivities.value = [
        {
          id: 1,
          icon: 'library_books',
          message: `تمت إضافة ${generalStats.newStoriesToday} قصص جديدة`,
          time: 'اليوم'
        },
        {
          id: 2,
          icon: 'person_add',
          message: `انضم ${generalStats.newUsersToday} مستخدم جديد`,
          time: 'اليوم'
        },
        {
          id: 3,
          icon: 'chat',
          message: `تمت إضافة ${generalStats.newCommentsToday} تعليق جديد`,
          time: 'منذ ساعة'
        },
        {
          id: 4,
          icon: 'trending_up',
          message: `${generalStats.todayInteractions} تفاعل جديد اليوم`,
          time: 'منذ ساعتين'
        }
      ]
    }

    // إحصائيات التفاعلات
    const interactionStats = computed(() => {
      const generalStats = StatisticsManager.getGeneralStatistics();
      
      return [
        { type: 'view', count: generalStats.interactionBreakdown?.views || 0, label: 'مشاهدات' },
        { type: 'like', count: generalStats.interactionBreakdown?.likes || 0, label: 'إعجابات' },
        { type: 'download', count: generalStats.interactionBreakdown?.downloads || 0, label: 'تحميلات' },
        { type: 'share', count: generalStats.interactionBreakdown?.shares || 0, label: 'مشاركات' }
      ]
    })

    // دوال المساعدة للتفاعلات
    const getInteractionIcon = (type) => {
      const icons = {
        view: 'visibility',
        like: 'favorite',
        download: 'download',
        share: 'share',
        comment: 'comment'
      }
      return icons[type] || 'info'
    }

    const getInteractionColor = (type) => {
      const colors = {
        view: 'bg-blue-500',
        like: 'bg-red-500',
        download: 'bg-green-500',
        share: 'bg-purple-500',
        comment: 'bg-orange-500'
      }
      return colors[type] || 'bg-gray-500'
    }

    // تنسيق آخر نشاط
    const formatLastActivity = (dateString) => {
      if (!dateString) return 'غير معروف'
      const now = new Date()
      const activityDate = new Date(dateString)
      const diffMinutes = Math.floor((now - activityDate) / (1000 * 60))
      
      if (diffMinutes < 60) return `${diffMinutes} دقيقة`
      if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ساعة`
      return `${Math.floor(diffMinutes / 1440)} يوم`
    }

    // الإجراءات
    const deleteStory = async (storyId) => {
      if (confirm('هل أنت متأكد من حذف هذه القصة؟')) {
        try {
          const stories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
          const updatedStories = stories.filter(story => story.id !== storyId)
          localStorage.setItem('libraryStories', JSON.stringify(updatedStories))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('storiesUpdated'))
          
          alert('تم حذف القصة بنجاح')
          await loadStatistics() // إعادة تحميل الإحصائيات
        } catch (error) {
          console.error('❌ خطأ في حذف القصة:', error)
          alert('حدث خطأ في حذف القصة')
        }
      }
    }

    const toggleUserStatus = async (user) => {
      try {
        const users = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
        const userIndex = users.findIndex(u => u.id === user.id)
        
        if (userIndex !== -1) {
          users[userIndex].status = user.status === 'banned' ? 'active' : 'banned'
          localStorage.setItem('libraryUsers', JSON.stringify(users))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('usersUpdated'))
          
          await loadStatistics() // إعادة تحميل الإحصائيات
        }
      } catch (error) {
        console.error('❌ خطأ في تغيير حالة المستخدم:', error)
        alert('حدث خطأ في تغيير حالة المستخدم')
      }
    }

    const viewUserInteractions = (user) => {
      router.push(`/admin/users?view=interactions&userId=${user.id}`)
    }

    onMounted(() => {
      console.log('🚀 تم تحميل لوحة تحكم المدير')
      loadStatistics()
      setupRealTimeUpdates()
      
      // تحديث البيانات كل 30 ثانية
      const interval = setInterval(loadStatistics, 30000)
      
      // تنظيف الـ interval عند تدمير المكون
      onUnmounted(() => {
        clearInterval(interval)
        window.removeEventListener('interactionsUpdated', loadStatistics)
        window.removeEventListener('storiesUpdated', loadStatistics)
        window.removeEventListener('usersUpdated', loadStatistics)
        window.removeEventListener('statisticsUpdated', loadStatistics)
      })
    })

    return {
      statistics,
      recentStories,
      activeUsers,
      systemActivities,
      interactionStats,
      getTypeIcon,
      getAccountTypeArabic,
      formatLastActivity,
      getInteractionIcon,
      getInteractionColor,
      deleteStory,
      toggleUserStatus,
      viewUserInteractions
    }
  }
}
</script>

<style scoped>
/* تحسينات للرسوم المتحركة */
.hover-lift:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease-in-out;
}

/* تحسينات التمرير */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
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
</style>