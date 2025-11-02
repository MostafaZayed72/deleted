<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300 overflow-hidden">
    
    <!-- خلفية متحركة -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- فقاعات متحركة -->
      <div class="absolute top-1/4 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-float-1"></div>
      <div class="absolute top-1/3 right-1/4 w-8 h-8 bg-blue-300 rounded-full opacity-30 animate-float-2"></div>
      <div class="absolute bottom-1/4 left-1/3 w-16 h-16 bg-pink-300 rounded-full opacity-25 animate-float-3"></div>
      <div class="absolute bottom-1/3 right-1/3 w-10 h-10 bg-yellow-300 rounded-full opacity-20 animate-float-4"></div>
      
      <!-- نجوم متلألئة -->
      <div class="absolute top-1/2 left-1/5 w-2 h-2 bg-white rounded-full opacity-70 animate-twinkle"></div>
      <div class="absolute top-1/5 right-1/5 w-1 h-1 bg-white rounded-full opacity-50 animate-twinkle-delay"></div>
      <div class="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-twinkle"></div>
      
      <!-- خطوط متحركة -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-sweep"></div>
      <div class="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-sweep-delay"></div>
    </div>

    <!-- الهيدر المبسط -->
    <header class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 z-40">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- شعار العودة -->
          <button 
            @click="goBack"
            class="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-105 group"
          >
            <span class="material-icons text-2xl group-hover:animate-bounce">arrow_forward</span>
            <span class="font-medium">العودة</span>
          </button>

          <!-- عنوان القصة -->
          <div class="text-center flex-1 mx-4">
            <h1 class="text-xl font-bold text-gray-800 dark:text-white animate-pulse">
              مغامرة {{ childName }}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ selectedHero?.name }}</p>
          </div>

          <!-- إجراءات -->
          <div class="flex items-center gap-3">
            <!-- مشاركة -->
            <button 
              @click="shareStory"
              class="p-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
              title="مشاركة القصة"
            >
              <span class="material-icons text-xl">share</span>
            </button>
            
            <!-- صوت -->
            <button 
              @click="toggleAudio"
              class="p-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110"
              :class="{ 'text-purple-600 dark:text-purple-400': isAudioPlaying }"
              title="تشغيل/إيقاف المؤثرات الصوتية"
            >
              <span class="material-icons text-xl animate-pulse" v-if="isAudioPlaying">
                volume_up
              </span>
              <span class="material-icons text-xl" v-else>
                volume_off
              </span>
            </button>

            <!-- إعدادات -->
            <button 
              @click="showSettings = !showSettings"
              class="p-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
            >
              <span class="material-icons text-xl">settings</span>
            </button>
          </div>
        </div>

        <!-- إعدادات سريعة -->
        <transition name="slide-down">
          <div v-if="showSettings" class="mt-4 p-4 bg-white/90 dark:bg-gray-800/90 rounded-2xl backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
            <div class="grid grid-cols-2 gap-4">
              <button 
                @click="toggleTheme"
                class="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span class="material-icons">{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
                <span>{{ isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن' }}</span>
              </button>
              <button 
                @click="toggleAnimations"
                class="flex items-center gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span class="material-icons">{{ animationsEnabled ? 'animation' : 'pause' }}</span>
                <span>{{ animationsEnabled ? 'إيقاف الحركات' : 'تشغيل الحركات' }}</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </header>

    <!-- القسم الرئيسي -->
    <main class="relative flex-1 py-8 z-30">
      <div class="container mx-auto px-4">
        
        <!-- مؤشر التقدم -->
        <div class="max-w-4xl mx-auto mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600 dark:text-gray-400">الصفحة {{ currentPage }} من {{ totalPages }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ Math.round((currentPage / totalPages) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
            <div 
              class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
              :style="{ width: `${(currentPage / totalPages) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- محتوى القصة -->
        <div class="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transform hover:shadow-3xl transition-all duration-500">
          
          <!-- رأس القصة -->
          <div class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 text-white text-center relative overflow-hidden">
            <!-- تأثيرات خلفية متحركة -->
            <div class="absolute inset-0">
              <div class="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping-slow"></div>
              <div class="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
            </div>
            
            <div class="relative z-10">
              <!-- صورة البطل مع وجه الطفل -->
              <div class="relative w-32 h-32 mx-auto mb-4 transform hover:scale-110 transition-transform duration-500">
                <div class="relative w-full h-full">
                  <!-- صورة البطل -->
                  <img 
                    :src="selectedHero?.image" 
                    :alt="selectedHero?.name"
                    class="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl animate-bounce-slow"
                  >
                  <!-- وجه الطفل -->
                  <img 
                    v-if="childImage"
                    :src="childImage" 
                    alt="وجه الطفل"
                    class="absolute top-0 left-0 w-full h-full object-cover rounded-full child-face-mask animate-pulse-gentle"
                  >
                  <!-- تأثير لامع -->
                  <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                </div>
              </div>
              
              <h2 class="text-3xl font-bold mb-2 animate-fade-in-up">مغامرة {{ childName }}</h2>
              <p class="text-purple-100 text-lg animate-fade-in-up-delay">{{ selectedHero?.name }}</p>
            </div>
          </div>

          <!-- محتوى الصفحة -->
          <div class="p-8 min-h-96 flex items-center justify-center relative">
            <!-- تأثيرات جانبية -->
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-purple-300 animate-bounce">
              <span class="material-icons">auto_awesome</span>
            </div>
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl text-pink-300 animate-bounce-delay">
              <span class="material-icons">auto_awesome</span>
            </div>

            <transition 
              :name="pageTransition" 
              mode="out-in"
              @enter="onPageEnter"
              @leave="onPageLeave"
            >
              <div :key="currentPage" class="text-center w-full">
                <!-- صورة الصفحة -->
                <div class="mb-6 transform hover:scale-105 transition-transform duration-500">
                  <div class="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl overflow-hidden mx-auto max-w-md shadow-2xl">
                    <!-- صورة افتراضية مع نص بديل -->
                    <div v-if="!currentPageData.image" class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
                      <span class="text-6xl animate-bounce">{{ getPageEmoji(currentPage) }}</span>
                    </div>
                    <img 
                      v-else
                      :src="currentPageData.image" 
                      :alt="currentPageData.title"
                      class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    >
                    <!-- تأثير سحابي -->
                    <div class="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
                    <!-- إطار متحرك -->
                    <div class="absolute inset-0 border-2 border-white/50 rounded-2xl animate-pulse-border"></div>
                  </div>
                </div>

                <!-- نص القصة -->
                <div class="mb-8">
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in-up">
                    {{ currentPageData.title }}
                  </h3>
                  <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto animate-fade-in-up-delay" v-html="formatStoryText(currentPageData.content)">
                  </p>
                </div>

                <!-- تأثيرات صوتية -->
                <div v-if="currentPageData.soundEffect && isAudioPlaying" class="mb-6 animate-bounce-in">
                  <button 
                    @click="playSoundEffect(currentPageData.soundEffect)"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                  >
                    <span class="material-icons text-xl group-hover:animate-spin">play_circle</span>
                    <span class="font-medium">تشغيل المؤثر الصوتي</span>
                  </button>
                </div>

                <!-- تفاعلات الصفحة -->
                <div v-if="currentPageData.interactions" class="mt-6 animate-fade-in">
                  <div class="flex justify-center gap-4">
                    <button 
                      v-for="interaction in currentPageData.interactions"
                      :key="interaction.id"
                      @click="triggerInteraction(interaction)"
                      class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:rotate-3"
                    >
                      {{ interaction.label }}
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- عناصر التحكم -->
          <div class="border-t border-gray-200/50 dark:border-gray-700/50 p-6 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
            <div class="flex items-center justify-between">
              <!-- زر السابق -->
              <button 
                @click="previousPage"
                :disabled="currentPage === 1"
                :class="[
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform',
                  currentPage === 1
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-105 hover:shadow-lg group'
                ]"
              >
                <span class="material-icons text-xl group-hover:animate-bounce">arrow_forward</span>
                <span>السابق</span>
              </button>

              <!-- مؤشر الصفحات -->
              <div class="flex items-center gap-2">
                <span 
                  v-for="page in totalPages" 
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    'w-3 h-3 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-150',
                    page === currentPage
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-300'
                  ]"
                  :title="`الصفحة ${page}`"
                ></span>
              </div>

              <!-- زر التالي -->
              <button 
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform',
                  currentPage === totalPages
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white hover:scale-105 hover:shadow-lg group'
                ]"
              >
                <span>التالي</span>
                <span class="material-icons text-xl group-hover:animate-bounce">arrow_back</span>
              </button>
            </div>
          </div>
        </div>

        <!-- إحصائيات القصة -->
        <div class="max-w-4xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            v-for="(stat, index) in storyStats"
            :key="stat.label"
            class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
            :style="`animation-delay: ${index * 0.1}s`"
          >
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stat.value }}</div>
            <div class="text-gray-600 dark:text-gray-400 text-sm">{{ stat.label }}</div>
          </div>
        </div>

        <!-- اقتراحات قصص أخرى -->
        <div class="max-w-4xl mx-auto mt-16 animate-fade-in-up">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">قصص أخرى قد تعجبك</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(suggestion, index) in storySuggestions" 
              :key="suggestion.id"
              @click="viewSuggestion(suggestion)"
              class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 group"
              :style="`animation-delay: ${index * 0.2}s`"
            >
              <div class="relative h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl mb-3 overflow-hidden">
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 group-hover:scale-110 transition-transform duration-500">
                  <span class="text-4xl transform group-hover:scale-125 transition-transform duration-300">{{ getSuggestionEmoji(suggestion.id) }}</span>
                </div>
                <!-- تأثير hover -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 class="font-bold text-gray-800 dark:text-white text-center mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{{ suggestion.title }}</h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm text-center">{{ suggestion.heroName }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- نهاية القصة -->
    <transition name="zoom">
      <div 
        v-if="showCompletion"
        class="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-white/20 animate-bounce-in">
          <div class="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span class="material-icons text-white text-4xl animate-spin-slow">celebration</span>
          </div>
          
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in-up">أحسنت!</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6 animate-fade-in-up-delay">
            لقد أكملت مغامرة {{ childName }} بنجاح. أنت بطل حقيقي!
          </p>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="text-center animate-fade-in-up" style="animation-delay: 0.2s">
              <div class="text-lg font-bold text-purple-600 dark:text-purple-400">{{ totalPages }}</div>
              <div class="text-gray-500 dark:text-gray-400 text-sm">صفحة</div>
            </div>
            <div class="text-center animate-fade-in-up" style="animation-delay: 0.3s">
              <div class="text-lg font-bold text-blue-600 dark:text-blue-400">{{ readingTime }}</div>
              <div class="text-gray-500 dark:text-gray-400 text-sm">دقيقة</div>
            </div>
          </div>

          <div class="flex gap-3">
            <button 
              @click="restartStory"
              class="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style="animation-delay: 0.4s"
            >
              إعادة
            </button>
            <button 
              @click="createNewStory"
              class="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style="animation-delay: 0.5s"
            >
              قصة جديدة
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- مؤشر التحميل -->
    <transition name="fade">
      <div 
        v-if="isLoading"
        class="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
      >
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white text-lg">جاري التحميل...</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'StoryViewer',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // البيانات الأساسية
    const childName = ref(route.query.name || 'البطل')
    const childImage = ref(route.query.image || '')
    const selectedHero = ref(null)
    const selectedStory = ref(null)
    
    // حالة القصة
    const currentPage = ref(1)
    const isAudioPlaying = ref(false)
    const showCompletion = ref(false)
    const showSettings = ref(false)
    const isLoading = ref(false)
    const startTime = ref(null)
    const isDarkMode = ref(false)
    const animationsEnabled = ref(true)
    const pageTransition = ref('slide-left')
    
    // بيانات الأبطال
    const availableHeroes = ref([
      {
        id: 1,
        name: 'سوبر فارس',
        category: 'المغامرات',
        image: 'https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_640.png',
        description: 'فارس شجاع بسوبر قوى'
      },
      {
        id: 2,
        name: 'بطل الفضاء',
        category: 'الفضاء',
        image: 'https://cdn.pixabay.com/photo/2017/01/31/23/43/astronaut-2028259_640.png',
        description: 'يحمي المجرة من الأشرار'
      },
      {
        id: 3,
        name: 'المخترع العبقري',
        category: 'العلم',
        image: 'https://cdn.pixabay.com/photo/2017/01/31/23/43/robot-2028260_640.png',
        description: 'يبتكر اختراعات مذهلة'
      },
      {
        id: 4,
        name: 'حارس الغابة',
        category: 'الطبيعة',
        image: 'https://cdn.pixabay.com/photo/2017/01/31/23/43/superhero-2028261_640.png',
        description: 'يحمي الحيوانات والطبيعة'
      }
    ])

    // بيانات القصص
    const storyTemplates = ref([
      {
        id: 1,
        title: 'مغامرة في الغابة السحرية',
        pages: [
          {
            title: 'بداية المغامرة',
            content: `في صباح جميل، استيقظ ${childName.value} وهو يشعر بالحماس لمغامرة جديدة. قرر ${selectedHero.value?.name} أن يذهب في رحلة إلى الغابة السحرية حيث تنتظره مفاجآت رائعة.`,
            image: 'https://cdn.pixabay.com/photo/2017/06/15/15/50/fantasy-2405639_640.jpg',
            soundEffect: 'forest-birds',
            interactions: [
              { id: 1, label: 'استكشاف الغابة', action: 'explore' },
              { id: 2, label: 'التحدث مع الحيوانات', action: 'talk' }
            ]
          },
          {
            title: 'لقاء الأصدقاء',
            content: `بينما كان ${childName.value} يمشي في الغابة، قابل أرنبًا صغيرًا يحتاج للمساعدة. قال الأرنب: "أحتاج مساعدتك يا ${childName.value} لأجد طريقي إلى المنزل".`,
            image: 'https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_640.jpg',
            soundEffect: 'rabbit-hop',
            interactions: [
              { id: 1, label: 'مساعدة الأرنب', action: 'help' },
              { id: 2, label: 'البحث عن الطعام', action: 'search' }
            ]
          },
          {
            title: 'التحدي الكبير',
            content: `واجه ${childName.value} نهرًا عريضًا يجب عبوره. باستخدام ذكائه وشجاعته، استطاع ${selectedHero.value?.name} بناء جسر صغير لمساعدة جميع الحيوانات على العبور.`,
            image: 'https://cdn.pixabay.com/photo/2016/08/24/16/20/books-1617327_640.jpg',
            soundEffect: 'river-flow',
            interactions: [
              { id: 1, label: 'بناء الجسر', action: 'build' },
              { id: 2, label: 'مساعدة الحيوانات', action: 'helpAnimals' }
            ]
          },
          {
            title: 'النصر',
            content: `بعد يوم حافل بالمغامرات، عاد ${childName.value} إلى المنزل وهو يشعر بالفخر. الجميع في القرية احتفلوا بشجاعة ${selectedHero.value?.name} ومساعدته للآخرين.`,
            image: 'https://cdn.pixabay.com/photo/2017/06/15/15/50/fantasy-2405639_640.jpg',
            soundEffect: 'celebration',
            interactions: [
              { id: 1, label: 'الاحتفال', action: 'celebrate' },
              { id: 2, label: 'مشاركة القصة', action: 'share' }
            ]
          }
        ]
      }
    ])

    // اقتراحات قصص أخرى
    const storySuggestions = ref([
      {
        id: 3,
        title: 'إنقاذ الحيوانات',
        heroName: 'حارس الغابة',
        image: ''
      },
      {
        id: 4,
        title: 'لغز المدينة المفقودة',
        heroName: 'المخترع العبقري',
        image: ''
      },
      {
        id: 5,
        title: 'معركة الروبوتات',
        heroName: 'بطل الفضاء',
        image: ''
      }
    ])

    // الحسابات
    const totalPages = computed(() => {
      return selectedStory.value?.pages?.length || 0
    })

    const currentPageData = computed(() => {
      if (selectedStory.value?.pages?.[currentPage.value - 1]) {
        const pageData = { ...selectedStory.value.pages[currentPage.value - 1] }
        // تحديث المحتوى ليشمل اسم الطفل والبطل الحالي
        if (pageData.content) {
          pageData.content = pageData.content
            .replace(/\${childName}/g, childName.value)
            .replace(/\${selectedHero\.name}/g, selectedHero.value?.name || 'البطل')
        }
        return pageData
      }
      return {}
    })

    const wordCount = computed(() => {
      const content = currentPageData.value.content || ''
      return content.split(' ').length
    })

    const readingTime = computed(() => {
      return Math.ceil(wordCount.value / 200) // افتراض 200 كلمة في الدقيقة
    })

    const completedPercentage = computed(() => {
      return Math.round((currentPage.value / totalPages.value) * 100)
    })

    const storyStats = computed(() => [
      { value: currentPage.value, label: 'الصفحة الحالية' },
      { value: readingTime.value, label: 'دقيقة قراءة' },
      { value: wordCount.value, label: 'كلمة' },
      { value: `${completedPercentage.value}%`, label: 'مكتمل' }
    ])

    // الدوال
    const formatStoryText = (text) => {
      if (!text) return ''
      return text.replace(/\n/g, '<br>')
    }

    const getPageEmoji = (page) => {
      const emojis = ['🌳', '🐰', '🌊', '🎉', '🚀', '👽', '🕳️', '🏆']
      return emojis[page - 1] || '📖'
    }

    const getSuggestionEmoji = (id) => {
      const emojis = {
        3: '🐾',
        4: '🏰',
        5: '🤖'
      }
      return emojis[id] || '📚'
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        pageTransition.value = 'slide-left'
        currentPage.value++
      } else {
        completeStory()
      }
    }

    const previousPage = () => {
      if (currentPage.value > 1) {
        pageTransition.value = 'slide-right'
        currentPage.value--
      }
    }

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        pageTransition.value = page > currentPage.value ? 'slide-left' : 'slide-right'
        currentPage.value = page
      }
    }

    const toggleAudio = () => {
      isAudioPlaying.value = !isAudioPlaying.value
    }

    const playSoundEffect = (effect) => {
      if (!isAudioPlaying.value) return
      
      // محاكاة تشغيل المؤثرات الصوتية باستخدام Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        // أنواع مختلفة من المؤثرات الصوتية
        switch(effect) {
          case 'forest-birds':
            oscillator.type = 'sine'
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            break
          case 'rocket-launch':
            oscillator.type = 'sawtooth'
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 1)
            break
          case 'celebration':
            oscillator.type = 'square'
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
            break
          default:
            oscillator.type = 'sine'
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 1)
      } catch (error) {
        console.log('المؤثرات الصوتية غير مدعومة في هذا المتصفح')
      }
    }

    const triggerInteraction = (interaction) => {
      // تأثيرات بصرية للتفاعل
      console.log('تفاعل:', interaction.action)
      
      // يمكن إضافة تأثيرات إضافية حسب نوع التفاعل
      if (interaction.action === 'celebrate') {
        // تأثير احتفالي
      }
    }

    const shareStory = () => {
      if (navigator.share) {
        navigator.share({
          title: `مغامرة ${childName.value}`,
          text: `شاهد مغامرة ${childName.value} كبطل خارق!`,
          url: window.location.href
        })
      } else {
        // نسخ الرابط
        navigator.clipboard.writeText(window.location.href)
        alert('تم نسخ رابط القصة!')
      }
    }

    const completeStory = () => {
      showCompletion.value = true
      // حفظ إحصائيات القصة
      const endTime = new Date()
      const duration = Math.round((endTime - startTime.value) / 1000 / 60) // بالدقائق
      console.log('مدة القراءة:', duration, 'دقيقة')
    }

    const restartStory = () => {
      currentPage.value = 1
      showCompletion.value = false
      startTime.value = new Date()
    }

    const createNewStory = () => {
      router.push('/custom-story')
    }

    const goBack = () => {
      router.back()
    }

    const viewSuggestion = (suggestion) => {
      router.push({
        path: '/custom-story',
        query: {
          story: suggestion.id
        }
      })
    }

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value
      document.documentElement.classList.toggle('dark')
    }

    const toggleAnimations = () => {
      animationsEnabled.value = !animationsEnabled.value
    }

    const onPageEnter = (el) => {
      if (animationsEnabled.value) {
        el.style.animation = 'none'
        setTimeout(() => {
          el.style.animation = ''
        }, 10)
      }
    }

    const onPageLeave = (el) => {
      // تنظيف أي تأثيرات عند ترك الصفحة
    }

    // تهيئة القصة
    const initializeStory = () => {
      const heroId = parseInt(route.query.hero) || 1
      const storyId = parseInt(route.query.story) || 1
      
      selectedHero.value = availableHeroes.value.find(h => h.id === heroId) || availableHeroes.value[0]
      selectedStory.value = storyTemplates.value.find(s => s.id === storyId) || storyTemplates.value[0]
      
      startTime.value = new Date()
    }

    // دورة الحياة
    onMounted(() => {
      initializeStory()
      
      // التحقق من الوضع الداكن
      isDarkMode.value = document.documentElement.classList.contains('dark')
    })

    onUnmounted(() => {
      // تنظيف المؤثرات الصوتية إذا كانت تعمل
    })

    // مراقبة تغيير الصفحة
    watch(currentPage, (newPage, oldPage) => {
      if (animationsEnabled.value) {
        // إضافة تأثيرات إضافية عند تغيير الصفحة
      }
    })

    return {
      // البيانات
      childName,
      childImage,
      selectedHero,
      currentPage,
      isAudioPlaying,
      showCompletion,
      showSettings,
      isLoading,
      isDarkMode,
      animationsEnabled,
      pageTransition,
      
      // الحسابات
      totalPages,
      currentPageData,
      wordCount,
      readingTime,
      completedPercentage,
      storyStats,
      storySuggestions,
      
      // الدوال
      formatStoryText,
      getPageEmoji,
      getSuggestionEmoji,
      nextPage,
      previousPage,
      goToPage,
      toggleAudio,
      playSoundEffect,
      triggerInteraction,
      shareStory,
      completeStory,
      restartStory,
      createNewStory,
      goBack,
      viewSuggestion,
      toggleTheme,
      toggleAnimations,
      onPageEnter,
      onPageLeave
    }
  }
}
</script>

<style scoped>
/* حركات الصفحات */
.slide-left-enter-active {
  animation: slideInLeft 0.6s ease-out;
}

.slide-left-leave-active {
  animation: slideOutLeft 0.6s ease-in;
}

.slide-right-enter-active {
  animation: slideInRight 0.6s ease-out;
}

.slide-right-leave-active {
  animation: slideOutRight 0.6s ease-in;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50px);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(50px);
  }
}

/* حركات الخلفية */
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, -20px) rotate(180deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-15px, 15px) rotate(-90deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, -10px) scale(1.1); }
}

@keyframes float-4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-20px, 10px) rotate(90deg); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes twinkle-delay {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes sweep-delay {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* حركات إضافية */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce-delay {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse-gentle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes pulse-border {
  0%, 100% { border-color: rgba(255, 255, 255, 0.5); }
  50% { border-color: rgba(255, 255, 255, 0.8); }
}

@keyframes ping-slow {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up-delay {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* تطبيق الحركات */
.animate-float-1 {
  animation: float-1 6s ease-in-out infinite;
}

.animate-float-2 {
  animation: float-2 8s ease-in-out infinite;
}

.animate-float-3 {
  animation: float-3 10s ease-in-out infinite;
}

.animate-float-4 {
  animation: float-4 7s ease-in-out infinite;
}

.animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

.animate-twinkle-delay {
  animation: twinkle 4s ease-in-out infinite 1s;
}

.animate-sweep {
  animation: sweep 8s linear infinite;
}

.animate-sweep-delay {
  animation: sweep-delay 6s linear infinite 2s;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.animate-bounce-delay {
  animation: bounce-delay 2s ease-in-out infinite 0.5s;
}

.animate-pulse-gentle {
  animation: pulse-gentle 2s ease-in-out infinite;
}

.animate-pulse-border {
  animation: pulse-border 2s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 3s ease-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animate-fade-in-up-delay {
  animation: fade-in-up 0.6s ease-out 0.2s both;
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

/* انتقالات */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.child-face-mask {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='25'/%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}

/* تأثيرات الظل المحسنة */
.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* تحسينات التمرير */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* تأثيرات التفاعل */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* دعم backdrop-blur للجميع */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>