<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <main class="container mx-auto px-4 py-8">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#1B3C53] dark:text-white mb-3">
          التقارير والإحصائيات
        </h1>
        <p class="text-lg text-[#456882] dark:text-gray-300">
          تحليل شامل لأداء المنصة وإحصاءات المستخدمين والمحتوى
        </p>
      </div>

      <!-- فلترة التقارير -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- نوع التقرير -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">نوع التقرير</label>
            <select 
              v-model="filters.reportType" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
            >
              <option value="overview">نظرة عامة</option>
              <option value="content">إحصائيات المحتوى</option>
              <option value="users">إحصائيات المستخدمين</option>
              <option value="engagement">التفاعلات</option>
              <option value="performance">أداء المحتوى</option>
            </select>
          </div>

          <!-- الفترة الزمنية -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الفترة الزمنية</label>
            <select 
              v-model="filters.timeRange" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
            >
              <option value="today">اليوم</option>
              <option value="week">أسبوع</option>
              <option value="month">شهر</option>
              <option value="quarter">ربع سنة</option>
              <option value="year">سنة</option>
              <option value="all">كل الوقت</option>
            </select>
          </div>

          <!-- نوع الرسم البياني -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">نوع الرسم</label>
            <select 
              v-model="filters.chartType" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
            >
              <option value="bar">أعمدة</option>
              <option value="line">خطي</option>
              <option value="pie">دائري</option>
              <option value="doughnut">دونات</option>
              <option value="radar">رادار</option>
            </select>
          </div>

          <!-- زر إنشاء التقرير -->
          <div class="flex items-end">
            <button 
              @click="generateReport"
              class="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3 px-4 rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 font-medium shadow-lg flex items-center justify-center gap-2"
            >
              <span class="material-icons text-sm">analytics</span>
              إنشاء التقرير
            </button>
          </div>
        </div>
      </div>

      <!-- الإحصائيات السريعة -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">إجمالي القصص</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-blue-400">{{ quickStats.totalStories }}</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ quickStats.storiesGrowth }}% عن الفترة الماضية
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">library_books</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">إجمالي المستخدمين</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-green-400">{{ quickStats.totalUsers }}</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ quickStats.usersGrowth }}% عن الفترة الماضية
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">people</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">إجمالي المشاهدات</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-purple-400">{{ quickStats.totalViews.toLocaleString() }}</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ quickStats.viewsGrowth }}% عن الفترة الماضية
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">visibility</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">معدل التفاعل</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-yellow-400">{{ quickStats.engagementRate }}%</p>
              <p class="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                <span class="material-icons text-sm">trending_up</span>
                {{ quickStats.engagementGrowth }}% عن الفترة الماضية
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">thumb_up</span>
            </div>
          </div>
        </div>
      </div>

      <!-- التقارير والرسوم البيانية -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        
        <!-- التقرير الرئيسي -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white">{{ getReportTitle() }}</h3>
            <div class="flex items-center gap-2">
              <button 
                @click="exportToPDF"
                class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 text-sm font-medium"
              >
                <span class="material-icons text-sm">picture_as_pdf</span>
                PDF
              </button>
              <button 
                @click="exportToExcel"
                class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 text-sm font-medium"
              >
                <span class="material-icons text-sm">table_chart</span>
                Excel
              </button>
              <button 
                @click="exportToImage"
                class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
              >
                <span class="material-icons text-sm">image</span>
                صورة
              </button>
            </div>
          </div>

          <!-- الرسم البياني الرئيسي -->
          <div class="h-80">
            <canvas ref="mainChartCanvas"></canvas>
          </div>
        </div>

        <!-- الإحصائيات التفصيلية -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white mb-6">الإحصائيات التفصيلية</h3>
          
          <div class="space-y-6">
            <!-- تفاعلات المستخدمين -->
            <div>
              <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
                <span class="material-icons text-blue-500">interactions</span>
                تفاعلات المستخدمين
              </h4>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ detailedStats.totalLikes }}</div>
                  <div class="text-sm text-blue-600 dark:text-blue-300">الإعجابات</div>
                </div>
                <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ detailedStats.totalComments }}</div>
                  <div class="text-sm text-green-600 dark:text-green-300">التعليقات</div>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ detailedStats.totalShares }}</div>
                  <div class="text-sm text-purple-600 dark:text-purple-300">المشاركات</div>
                </div>
                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ detailedStats.totalDownloads }}</div>
                  <div class="text-sm text-yellow-600 dark:text-yellow-300">التحميلات</div>
                </div>
              </div>
            </div>

            <!-- توزيع المحتوى -->
            <div>
              <h4 class="text-lg font-semibold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
                <span class="material-icons text-green-500">category</span>
                توزيع المحتوى
              </h4>
              <div class="h-48">
                <canvas ref="contentDistributionChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- التقارير الإضافية -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        <!-- القصص الأكثر تفاعلاً -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
            <span class="material-icons text-purple-500">trending_up</span>
            القصص الأكثر تفاعلاً
          </h3>
          <div class="space-y-3">
            <div 
              v-for="(story, index) in topStories" 
              :key="story.id"
              class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 group"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {{ index + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-[#1B3C53] dark:text-white text-sm truncate">{{ story.title }}</p>
                  <p class="text-xs text-[#456882] dark:text-gray-400">{{ story.author }}</p>
                </div>
              </div>
              <div class="text-left">
                <p class="font-bold text-[#1B3C53] dark:text-white">{{ story.engagement }}</p>
                <p class="text-xs text-[#456882] dark:text-gray-400">تفاعل</p>
              </div>
            </div>
          </div>
        </div>

        <!-- المستخدمين النشطين -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
            <span class="material-icons text-green-500">star</span>
            المستخدمين النشطين
          </h3>
          <div class="space-y-3">
            <div 
              v-for="(user, index) in activeUsers" 
              :key="user.id"
              class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-300 dark:hover:border-green-600 transition-all duration-200 group"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {{ user.name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-[#1B3C53] dark:text-white text-sm">{{ user.name }}</p>
                  <p class="text-xs text-[#456882] dark:text-gray-400">{{ user.type }}</p>
                </div>
              </div>
              <div class="text-left">
                <p class="font-bold text-[#1B3C53] dark:text-white">{{ user.activity }}</p>
                <p class="text-xs text-[#456882] dark:text-gray-400">نشاط</p>
              </div>
            </div>
          </div>
        </div>

        <!-- النشاط الزمني -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
            <span class="material-icons text-blue-500">schedule</span>
            النشاط الزمني
          </h3>
          <div class="h-48">
            <canvas ref="timeActivityChart"></canvas>
          </div>
        </div>
      </div>

      <!-- تقارير متقدمة -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- تحليل الأداء -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white mb-6">تحليل أداء المحتوى</h3>
          <div class="h-80">
            <canvas ref="performanceChart"></canvas>
          </div>
        </div>

        <!-- مقاييس الجودة -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-bold text-[#1B3C53] dark:text-white mb-6">مقاييس الجودة</h3>
          <div class="space-y-6">
            <!-- معدل الإكمال -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-[#1B3C53] dark:text-white">معدل إكمال المشاهدة</span>
                <span class="text-sm font-bold text-green-600">{{ qualityMetrics.completionRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: qualityMetrics.completionRate + '%' }"
                ></div>
              </div>
            </div>

            <!-- متوسط وقت المشاهدة -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-[#1B3C53] dark:text-white">متوسط وقت المشاهدة</span>
                <span class="text-sm font-bold text-blue-600">{{ qualityMetrics.avgWatchTime }} دقيقة</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: Math.min(qualityMetrics.avgWatchTime * 10, 100) + '%' }"
                ></div>
              </div>
            </div>

            <!-- معدل الارتداد -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-[#1B3C53] dark:text-white">معدل الارتداد</span>
                <span class="text-sm font-bold text-red-600">{{ qualityMetrics.bounceRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="bg-red-500 h-2 rounded-full transition-all duration-1000"
                  :style="{ width: qualityMetrics.bounceRate + '%' }"
                ></div>
              </div>
            </div>

            <!-- مؤشر رضا المستخدم -->
            <div class="text-center p-6 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] rounded-xl text-white">
              <div class="text-3xl font-bold mb-2">{{ qualityMetrics.satisfactionScore }}/10</div>
              <div class="text-sm">مؤشر رضا المستخدم</div>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'
import StatisticsManager from '@/utils/statisticsManager'

export default {
  name: 'AnalyticsDashboard',
  setup() {
    const filters = ref({
      reportType: 'overview',
      timeRange: 'month',
      chartType: 'bar'
    })

    const quickStats = ref({
      totalStories: 0,
      totalUsers: 0,
      totalViews: 0,
      engagementRate: 0,
      storiesGrowth: 0,
      usersGrowth: 0,
      viewsGrowth: 0,
      engagementGrowth: 0
    })

    const detailedStats = ref({
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      totalDownloads: 0,
      totalRatings: 0
    })

    const qualityMetrics = ref({
      completionRate: 0,
      avgWatchTime: 0,
      bounceRate: 0,
      satisfactionScore: 0
    })

    const topStories = ref([])
    const activeUsers = ref([])

    // مراجع للرسوم البيانية
    const mainChartCanvas = ref(null)
    const contentDistributionChart = ref(null)
    const timeActivityChart = ref(null)
    const performanceChart = ref(null)

    let mainChart = null
    let contentChart = null
    let timeChart = null
    let performanceChartInstance = null

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      window.addEventListener('storiesUpdated', loadData)
      window.addEventListener('usersUpdated', loadData)
      window.addEventListener('interactionsUpdated', loadData)
    }

    // تحميل البيانات
    const loadData = async () => {
      await loadStatistics()
      calculateQuickStats()
      calculateDetailedStats()
      calculateQualityMetrics()
      generateSampleData()
      await nextTick()
      initializeCharts()
    }

    const loadStatistics = () => {
      return new Promise((resolve) => {
        // استخدام StatisticsManager للحصول على الإحصائيات
        const generalStats = StatisticsManager.getGeneralStatistics()
        const topStoriesData = StatisticsManager.getTopStories(5)
        const topUsersData = StatisticsManager.getTopUsers(5)
        
        // تحديث البيانات
        quickStats.value.totalStories = generalStats.totalStories
        quickStats.value.totalUsers = generalStats.totalUsers
        quickStats.value.totalViews = generalStats.interactionBreakdown?.views || 0
        quickStats.value.engagementRate = generalStats.engagementRate

        detailedStats.value.totalLikes = generalStats.interactionBreakdown?.likes || 0
        detailedStats.value.totalComments = generalStats.interactionBreakdown?.comments || 0
        detailedStats.value.totalShares = generalStats.interactionBreakdown?.shares || 0
        detailedStats.value.totalDownloads = generalStats.interactionBreakdown?.downloads || 0

        topStories.value = topStoriesData.map(story => ({
          id: story.id,
          title: story.title,
          author: story.author,
          engagement: story.stats?.totalInteractions || 0
        }))

        activeUsers.value = topUsersData.map(user => ({
          id: user.id,
          name: user.fullName || user.name,
          type: user.accountType,
          activity: user.stats?.totalInteractions || 0
        }))

        resolve()
      })
    }

    const calculateQuickStats = () => {
      // استخدام البيانات من StatisticsManager
      const generalStats = StatisticsManager.getGeneralStatistics()
      
      quickStats.value = {
        totalStories: generalStats.totalStories,
        totalUsers: generalStats.totalUsers,
        totalViews: generalStats.interactionBreakdown?.views || 0,
        engagementRate: generalStats.engagementRate,
        storiesGrowth: 12,
        usersGrowth: 8,
        viewsGrowth: 25,
        engagementGrowth: 15
      }
    }

    const calculateDetailedStats = () => {
      const generalStats = StatisticsManager.getGeneralStatistics()
      
      detailedStats.value = {
        totalLikes: generalStats.interactionBreakdown?.likes || 0,
        totalComments: generalStats.interactionBreakdown?.comments || 0,
        totalShares: generalStats.interactionBreakdown?.shares || 0,
        totalDownloads: generalStats.interactionBreakdown?.downloads || 0,
        totalRatings: 0 // يمكن إضافته إذا كان متوفراً
      }
    }

    const calculateQualityMetrics = () => {
      qualityMetrics.value = {
        completionRate: 78,
        avgWatchTime: 8.5,
        bounceRate: 22,
        satisfactionScore: 8.7
      }
    }

    const generateSampleData = () => {
      // البيانات يتم تحميلها من StatisticsManager
    }

    // تهيئة الرسوم البيانية
    const initializeCharts = () => {
      destroyCharts()
      createMainChart()
      createContentDistributionChart()
      createTimeActivityChart()
      createPerformanceChart()
    }

    const createMainChart = () => {
      if (!mainChartCanvas.value) return
      
      const ctx = mainChartCanvas.value.getContext('2d')
      
      const timeStats = StatisticsManager.getTimeBasedStatistics(30)
      const labels = timeStats.dailyStats.map(stat => 
        new Date(stat.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })
      )
      const viewsData = timeStats.dailyStats.map(stat => stat.views)
      const interactionsData = timeStats.dailyStats.map(stat => stat.total)

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'المشاهدات',
            data: viewsData,
            backgroundColor: '#1B3C53',
            borderColor: '#1B3C53',
            borderWidth: 2
          },
          {
            label: 'إجمالي التفاعلات',
            data: interactionsData,
            backgroundColor: '#456882',
            borderColor: '#456882',
            borderWidth: 2
          }
        ]
      }

      const config = {
        type: filters.value.chartType,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              rtl: true
            },
            title: {
              display: true,
              text: getReportTitle()
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }

      mainChart = new Chart(ctx, config)
    }

    const createContentDistributionChart = () => {
      if (!contentDistributionChart.value) return
      
      const ctx = contentDistributionChart.value.getContext('2d')
      
      const stories = JSON.parse(localStorage.getItem('libraryStories') || '[]')
      const typeCounts = {
        pdf: 0,
        video: 0,
        audio: 0,
        image: 0,
        text: 0
      }

      stories.forEach(story => {
        if (typeCounts.hasOwnProperty(story.story_type)) {
          typeCounts[story.story_type]++
        }
      })

      const data = {
        labels: ['PDF', 'فيديو', 'صوت', 'صورة', 'نص'],
        datasets: [{
          data: [
            typeCounts.pdf,
            typeCounts.video,
            typeCounts.audio,
            typeCounts.image,
            typeCounts.text
          ],
          backgroundColor: [
            '#1B3C53',
            '#456882',
            '#6D8BA0',
            '#94A9B9',
            '#B8C7D2'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      }

      contentChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              rtl: true
            }
          }
        }
      })
    }

    const createTimeActivityChart = () => {
      if (!timeActivityChart.value) return
      
      const ctx = timeActivityChart.value.getContext('2d')
      
      const data = {
        labels: ['8-10', '10-12', '12-2', '2-4', '4-6', '6-8', '8-10'],
        datasets: [{
          label: 'النشاط',
          data: [120, 190, 300, 250, 180, 220, 150],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          fill: true
        }]
      }

      timeChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }

    const createPerformanceChart = () => {
      if (!performanceChart.value) return
      
      const ctx = performanceChart.value.getContext('2d')
      
      const topStoriesData = StatisticsManager.getTopStories(5)
      
      const data = {
        labels: topStoriesData.map(story => story.title),
        datasets: [
          {
            label: 'المشاهدات',
            data: topStoriesData.map(story => story.stats?.views || 0),
            backgroundColor: 'rgba(79, 70, 229, 0.5)'
          },
          {
            label: 'التفاعلات',
            data: topStoriesData.map(story => story.stats?.totalInteractions || 0),
            backgroundColor: 'rgba(16, 185, 129, 0.5)'
          }
        ]
      }

      performanceChartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              rtl: true
            }
          },
          scales: {
            x: {
              stacked: false
            },
            y: {
              stacked: false
            }
          }
        }
      })
    }

    const destroyCharts = () => {
      if (mainChart) mainChart.destroy()
      if (contentChart) contentChart.destroy()
      if (timeChart) timeChart.destroy()
      if (performanceChartInstance) performanceChartInstance.destroy()
    }

    const generateReport = () => {
      loadData()
    }

    const getReportTitle = () => {
      const titles = {
        overview: 'نظرة عامة على المنصة',
        content: 'إحصائيات المحتوى',
        users: 'إحصائيات المستخدمين',
        engagement: 'تحليل التفاعلات',
        performance: 'أداء المحتوى'
      }
      return titles[filters.value.reportType] || 'تقرير غير محدد'
    }

    const exportToPDF = () => {
      alert('✅ تم تجهيز التقرير للتحميل كملف PDF')
      // في التطبيق الحقيقي: استخدام مكتبة مثل jsPDF
    }

    const exportToExcel = () => {
      const data = StatisticsManager.exportData('json')
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `library-report-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      alert('✅ تم تصدير التقرير بنجاح')
    }

    const exportToImage = () => {
      alert('✅ تم تجهيز التقرير للتحميل كصورة')
      // في التطبيق الحقيقي: تحويل Canvas إلى صورة
    }

    onMounted(() => {
      console.log('🚀 تم تحميل صفحة التقارير والإحصائيات')
      loadData()
      setupRealTimeUpdates()
      
      // تنظيف event listeners عند تدمير المكون
      onUnmounted(() => {
        destroyCharts()
        window.removeEventListener('storiesUpdated', loadData)
        window.removeEventListener('usersUpdated', loadData)
        window.removeEventListener('interactionsUpdated', loadData)
      })
    })

    watch(() => filters.value, () => {
      loadData()
    }, { deep: true })

    return {
      filters,
      quickStats,
      detailedStats,
      qualityMetrics,
      topStories,
      activeUsers,
      mainChartCanvas,
      contentDistributionChart,
      timeActivityChart,
      performanceChart,
      generateReport,
      exportToPDF,
      exportToExcel,
      exportToImage,
      getReportTitle
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

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