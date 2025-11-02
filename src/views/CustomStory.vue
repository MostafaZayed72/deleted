<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
    
    <!-- الهيدر -->
    <AppHeader />

    <!-- القسم الرئيسي -->
    <main class="flex-1 py-8">
      <div class="container mx-auto px-4">
        
        <!-- رأس الصفحة -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-gray-800 dark:text-white mb-6">
            أنت <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">بطل القصة</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            اختر بطلك، أضف صورتك، وكن النجم في مغامرتك الخاصة!
          </p>
        </div>

        <!-- محرر القصة -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          <!-- لوحة التحكم -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">صمم بطلك</h2>
            
            <!-- اختيار البطل -->
            <div class="mb-8">
              <label class="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">اختر بطلك الخارق</label>
              <div class="grid grid-cols-2 gap-4">
                <div 
                  v-for="hero in availableHeroes" 
                  :key="hero.id"
                  @click="selectHero(hero)"
                  :class="[
                    'cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 transform hover:scale-105',
                    selectedHero?.id === hero.id 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  ]"
                >
                  <div class="relative h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-3">
                    <img 
                      :src="hero.image" 
                      :alt="hero.name"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <h4 class="font-bold text-gray-800 dark:text-white text-center">{{ hero.name }}</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-xs text-center mt-1">{{ hero.category }}</p>
                </div>
              </div>
            </div>

            <!-- إضافة صورة الطفل -->
            <div class="mb-8">
              <label class="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">أضف صورتك</label>
              
              <div class="flex gap-4 mb-4">
                <!-- رفع صورة -->
                <div class="flex-1">
                  <input 
                    type="file" 
                    ref="fileInput"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                  >
                  <button 
                    @click="$refs.fileInput.click()"
                    class="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <span class="material-icons">cloud_upload</span>
                    رفع صورة
                  </button>
                </div>
                
                <!-- التقاط صورة -->
                <div class="flex-1">
                  <button 
                    @click="startCamera"
                    :class="[
                      'w-full py-3 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2',
                      isCameraActive 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    ]"
                  >
                    <span class="material-icons">{{ isCameraActive ? 'camera_off' : 'camera_alt' }}</span>
                    {{ isCameraActive ? 'إيقاف الكاميرا' : 'التقاط صورة' }}
                  </button>
                </div>
              </div>

              <!-- معاينة الصورة -->
              <div v-if="childImage" class="mt-4">
                <div class="relative w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden border-2 border-purple-500">
                  <img 
                    :src="childImage" 
                    alt="صورة الطفل"
                    class="w-full h-full object-cover"
                  >
                  <button 
                    @click="removeImage"
                    class="absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <span class="material-icons text-sm">close</span>
                  </button>
                </div>
              </div>

              <!-- الكاميرا -->
              <div v-if="isCameraActive" class="mt-4">
                <div class="relative bg-black rounded-2xl overflow-hidden">
                  <video 
                    ref="cameraVideo"
                    autoplay
                    playsinline
                    muted
                    class="w-full h-64 object-cover"
                  ></video>
                  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <button 
                      @click="switchCamera"
                      class="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                    >
                      <span class="material-icons text-gray-800">flip_camera_android</span>
                    </button>
                    <button 
                      @click="capturePhoto"
                      class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <span class="material-icons text-3xl text-gray-800">camera</span>
                    </button>
                  </div>
                </div>
                <p class="text-center text-gray-600 dark:text-gray-400 mt-2 text-sm">
                  اضغط على زر الكاميرا لالتقاط الصورة
                </p>
              </div>
            </div>

            <!-- إدخال الاسم -->
            <div class="mb-8">
              <label class="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">اكتب اسم البطل</label>
              <input 
                type="text" 
                v-model="childName"
                placeholder="اكتب اسمك هنا..."
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white text-center"
                maxlength="20"
              >
              <div class="text-right text-sm text-gray-500 dark:text-gray-400 mt-2">
                {{ childName.length }}/20
              </div>
            </div>

            <!-- اختيار طريقة إنشاء القصة -->
            <div class="mb-8">
              <label class="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">كيف تريد إنشاء قصتك؟</label>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <button 
                  @click="storyCreationMode = 'template'"
                  :class="[
                    'py-3 rounded-xl border-2 transition-all duration-300',
                    storyCreationMode === 'template'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-purple-300'
                  ]"
                >
                  قصص جاهزة
                </button>
                <button 
                  @click="storyCreationMode = 'ai'"
                  :class="[
                    'py-3 rounded-xl border-2 transition-all duration-300',
                    storyCreationMode === 'ai'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-green-300'
                  ]"
                >
                  الذكاء الاصطناعي
                </button>
              </div>
            </div>

            <!-- اختيار القصة الجاهزة -->
            <div v-if="storyCreationMode === 'template'" class="mb-8">
              <label class="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">اختر قصتك</label>
              <select 
                v-model="selectedStory"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">اختر قصة...</option>
                <option v-for="story in availableStories" :key="story.id" :value="story">
                  {{ story.title }} - {{ story.ageGroup }}
                </option>
              </select>
            </div>

            <!-- توليد القصة بالذكاء الاصطناعي -->
            <div v-if="storyCreationMode === 'ai'" class="mb-8">
              <label class="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">صِف قصتك</label>
              <textarea 
                v-model="aiStoryPrompt"
                placeholder="اكتب وصفًا لقصتك... مثال: أريد قصة عن مغامرة في الفضاء حيث أكون رائد فضاء شجاع..."
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:text-white"
                rows="3"
                maxlength="500"
              ></textarea>
              <div class="flex justify-between items-center mt-2">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ aiStoryPrompt.length }}/500
                </div>
                <button 
                  @click="generateAIStory"
                  :disabled="!aiStoryPrompt.trim() || isGeneratingAI"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    aiStoryPrompt.trim() && !isGeneratingAI
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transform hover:scale-105'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  ]"
                >
                  <span v-if="!isGeneratingAI">توليد القصة</span>
                  <span v-else class="flex items-center gap-2">
                    <span class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    جاري التوليد...
                  </span>
                </button>
              </div>

              <!-- خيارات سريعة للذكاء الاصطناعي -->
              <div class="mt-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">اقتراحات سريعة:</p>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="suggestion in aiSuggestions" 
                    :key="suggestion"
                    @click="aiStoryPrompt = suggestion"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {{ suggestion }}
                  </button>
                </div>
              </div>
            </div>

            <!-- زر إنشاء القصة -->
            <button 
              @click="createStory"
              :disabled="!isFormValid"
              :class="[
                'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300',
                isFormValid
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              ]"
            >
              <span v-if="!isGenerating">ابدأ مغامرتك 🚀</span>
              <span v-else class="flex items-center justify-center gap-2">
                <span class="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></span>
                جاري إنشاء قصتك...
              </span>
            </button>
          </div>

          <!-- معاينة القصة -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">معاينة قصتك</h2>
            
            <div class="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-6 min-h-96 flex flex-col items-center justify-center">
              
              <div v-if="!selectedHero || !childName" class="text-center text-gray-500 dark:text-gray-400">
                <span class="material-icons text-6xl mb-4">auto_stories</span>
                <p class="text-lg">اختر بطلك واكتب اسمك لترى معاينة قصتك</p>
              </div>

              <div v-else class="text-center w-full">
                <!-- غلاف القصة -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-lg mb-6">
                  <div class="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-4 overflow-hidden">
                    <!-- صورة البطل مع وجه الطفل -->
                    <div class="absolute inset-0 flex items-center justify-center">
                      <div class="relative w-32 h-32">
                        <!-- صورة البطل -->
                        <img 
                          :src="selectedHero.image" 
                          :alt="selectedHero.name"
                          class="w-full h-full object-cover rounded-full border-4 border-white"
                        >
                        <!-- وجه الطفل -->
                        <img 
                          v-if="childImage"
                          :src="childImage" 
                          alt="وجه الطفل"
                          class="absolute top-0 left-0 w-full h-full object-cover rounded-full child-face-mask"
                        >
                      </div>
                    </div>
                  </div>
                  
                  <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    مغامرة {{ childName }} {{ selectedHero.name }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ selectedStory?.description || aiGeneratedStory?.description || 'قصة مغامرة مثيرة مليئة بالتحديات والإنجازات' }}
                  </p>
                  
                  <div class="flex justify-center gap-2 mt-4">
                    <span 
                      v-for="tag in selectedStory?.tags || aiGeneratedStory?.tags || ['مغامرة', 'تشويق', 'تعلم']" 
                      :key="tag"
                      class="bg-purple-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- معلومات القصة -->
                <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div class="text-center">
                    <span class="material-icons text-purple-500">schedule</span>
                    <div>{{ selectedStory?.duration || aiGeneratedStory?.duration || '10-15 دقيقة' }}</div>
                  </div>
                  <div class="text-center">
                    <span class="material-icons text-blue-500">group</span>
                    <div>{{ selectedStory?.ageGroup || aiGeneratedStory?.ageGroup || 'مناسب للأطفال' }}</div>
                  </div>
                </div>

                <!-- معاينة القصة المولدة بالذكاء الاصطناعي -->
                <div v-if="aiGeneratedStory && storyCreationMode === 'ai'" class="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-xl">
                  <h4 class="font-bold text-green-800 dark:text-green-200 mb-2">القصة المولدة:</h4>
                  <p class="text-green-700 dark:text-green-300 text-sm text-right leading-relaxed">
                    {{ aiGeneratedStory.preview }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- قصص منشورة حديثا -->
        <div class="mt-16">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">قصص منشورة حديثًا</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div 
              v-for="story in recentStories" 
              :key="story.id"
              class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center gap-4 mb-4">
                <div class="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
                  <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span class="text-white text-lg font-bold">{{ story.childName.charAt(0) }}</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-gray-800 dark:text-white">{{ story.childName }}</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">{{ story.heroName }}</p>
                </div>
              </div>
              <p class="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{{ story.storyPreview }}</p>
              <div class="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{{ story.createdAt }}</span>
                <span class="flex items-center gap-1">
                  <span class="material-icons text-yellow-500 text-sm">star</span>
                  {{ story.rating }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'CustomStory',
  setup() {
    const router = useRouter()
    
    // البيانات والمتغيرات
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
      },
      {
        id: 5,
        name: 'بطل الأعماق',
        category: 'المحيط',
        image: 'https://cdn.pixabay.com/photo/2017/01/31/23/43/diver-2028262_640.png',
        description: 'يكتشف أسرار المحيط'
      },
      {
        id: 6,
        name: 'الفارس النينجا',
        category: 'المغامرات',
        image: 'https://cdn.pixabay.com/photo/2017/01/31/23/43/ninja-2028263_640.png',
        description: 'أسرار وحركات خارقة'
      }
    ])

    const availableStories = ref([
      {
        id: 1,
        title: 'مغامرة في الغابة السحرية',
        ageGroup: '3-6 سنوات',
        description: 'رحلة مثيرة في غابة سحرية مليئة بالمخلوقات الرائعة',
        tags: ['سحر', 'حيوانات', 'مغامرة'],
        duration: '10 دقائق',
        image: 'https://cdn.pixabay.com/photo/2017/06/15/15/50/fantasy-2405639_640.jpg'
      },
      {
        id: 2,
        title: 'رحلة إلى الفضاء',
        ageGroup: '7-9 سنوات',
        description: 'استكشاف الكواكب والنجوم في رحلة فضائية مثيرة',
        tags: ['فضاء', 'علوم', 'استكشاف'],
        duration: '15 دقائق',
        image: 'https://cdn.pixabay.com/photo/2016/08/24/16/20/books-1617327_640.jpg'
      },
      {
        id: 3,
        title: 'إنقاذ الحيوانات',
        ageGroup: '4-7 سنوات',
        description: 'مساعدة الحيوانات في الغابة وحل مشاكلهم',
        tags: ['حيوانات', 'مساعدة', 'طبيعة'],
        duration: '12 دقائق',
        image: 'https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_640.jpg'
      }
    ])

    const recentStories = ref([
      {
        id: 1,
        childName: 'يوسف',
        childImage: '',
        heroName: 'سوبر فارس',
        storyPreview: 'في يوم من الأيام، انطلق يوسف في مغامرة رائعة لإنقاذ الأميرة...',
        createdAt: 'منذ ساعتين',
        rating: '4.8'
      },
      {
        id: 2,
        childName: 'سارة',
        childImage: '',
        heroName: 'حارس الغابة',
        storyPreview: 'سارة البطلة ساعدت جميع الحيوانات في الغابة وأصلحت بيت الأرنب...',
        createdAt: 'منذ يوم',
        rating: '4.9'
      },
      {
        id: 3,
        childName: 'عمر',
        childImage: '',
        heroName: 'المخترع العبقري',
        storyPreview: 'باستخدام عقله المبدع، استطاع عمر حل لغز المدينة المفقودة...',
        createdAt: 'منذ 3 أيام',
        rating: '4.7'
      }
    ])

    const aiSuggestions = ref([
      'مغامرة في الغابة مع الحيوانات',
      'رحلة إلى الفضاء لاكتشاف الكواكب',
      'إنقاذ المدينة من وحش شرير',
      'بحث عن كنز قديم مخفي',
      'مساعدة الأصدقاء في المدرسة'
    ])

    // حالة التطبيق
    const selectedHero = ref(null)
    const childName = ref('')
    const childImage = ref('')
    const selectedStory = ref(null)
    const storyCreationMode = ref('template') // 'template' or 'ai'
    const aiStoryPrompt = ref('')
    const aiGeneratedStory = ref(null)
    const isGenerating = ref(false)
    const isGeneratingAI = ref(false)
    const isCameraActive = ref(false)
    const cameraStream = ref(null)
    const cameraVideo = ref(null)
    const fileInput = ref(null)
    const currentFacingMode = ref('user') // 'user' for front camera, 'environment' for back camera

    // الحسابات
    const isFormValid = computed(() => {
      const hasHeroAndName = selectedHero.value && childName.value.trim().length > 0
      
      if (storyCreationMode.value === 'template') {
        return hasHeroAndName && selectedStory.value
      } else {
        return hasHeroAndName && aiGeneratedStory.value
      }
    })

    // الدوال
    const selectHero = (hero) => {
      selectedHero.value = hero
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          childImage.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const startCamera = async () => {
      if (isCameraActive.value) {
        stopCamera()
        return
      }

      try {
        const constraints = { 
          video: { 
            facingMode: currentFacingMode.value,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        }
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        
        cameraStream.value = stream
        isCameraActive.value = true
        
        if (cameraVideo.value) {
          cameraVideo.value.srcObject = stream
        }
      } catch (error) {
        console.error('خطأ في تشغيل الكاميرا:', error)
        
        // محاولة بديلة مع قيود أقل
        try {
          const fallbackConstraints = { video: true }
          const stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints)
          
          cameraStream.value = stream
          isCameraActive.value = true
          
          if (cameraVideo.value) {
            cameraVideo.value.srcObject = stream
          }
        } catch (fallbackError) {
          console.error('خطأ في التشغيل الاحتياطي:', fallbackError)
          alert('تعذر الوصول إلى الكاميرا. يرجى التأكد من السماح باستخدام الكاميرا في إعدادات المتصفح أو استخدام خاصية رفع الصورة بدلاً من ذلك.')
        }
      }
    }

    const switchCamera = async () => {
      if (!isCameraActive.value) return
      
      // تبديل وضع الكاميرا
      currentFacingMode.value = currentFacingMode.value === 'user' ? 'environment' : 'user'
      
      // إعادة تشغيل الكاميرا بالوضع الجديد
      stopCamera()
      setTimeout(() => {
        startCamera()
      }, 100)
    }

    const stopCamera = () => {
      if (cameraStream.value) {
        cameraStream.value.getTracks().forEach(track => {
          track.stop()
        })
        cameraStream.value = null
      }
      isCameraActive.value = false
    }

    const capturePhoto = () => {
      if (cameraVideo.value && cameraVideo.value.readyState === cameraVideo.value.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        canvas.width = cameraVideo.value.videoWidth
        canvas.height = cameraVideo.value.videoHeight
        
        // قلب الصورة إذا كانت الكاميرا أمامية
        if (currentFacingMode.value === 'user') {
          context.translate(canvas.width, 0)
          context.scale(-1, 1)
        }
        
        context.drawImage(cameraVideo.value, 0, 0, canvas.width, canvas.height)
        
        childImage.value = canvas.toDataURL('image/png')
        stopCamera()
        
        // إظهار رسالة نجاح
        alert('تم التقاط الصورة بنجاح!')
      } else {
        alert('الكاميرا غير جاهزة بعد. يرجى الانتظار قليلاً.')
      }
    }

    const removeImage = () => {
      childImage.value = ''
    }

    const generateAIStory = async () => {
      if (!aiStoryPrompt.value.trim()) return
      
      isGeneratingAI.value = true
      
      try {
        // محاكاة استدعاء API الذكاء الاصطناعي
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // في التطبيق الحقيقي، هنا سيتم استدعاء API الذكاء الاصطناعي
        // مثل OpenAI GPT أو أي خدمة أخرى
        
        aiGeneratedStory.value = {
          id: Date.now(),
          title: `مغامرة ${childName.value || 'البطل'} في ${aiStoryPrompt.value.split(' ').slice(0, 3).join(' ')}`,
          description: `قصة مغامرة شيقة تدور حول ${aiStoryPrompt.value}`,
          ageGroup: 'مناسب لجميع الأعمار',
          duration: '10-15 دقيقة',
          tags: ['مغامرة', 'إثارة', 'تعلم'],
          preview: `هذه قصة مخصصة لـ${childName.value} كـ${selectedHero.value?.name}، حيث ${aiStoryPrompt.value}. القصة مليئة بالمغامرات والتحديات المثيرة التي تناسب الأطفال.`,
          pages: [
            {
              title: 'بداية المغامرة',
              content: `بدأت المغامرة عندما قرر ${childName.value} أن ${aiStoryPrompt.value}. بمساعدة ${selectedHero.value?.name}، انطلق في رحلة لا تنسى.`,
              image: 'https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_640.jpg'
            },
            {
              title: 'مواجهة التحدي',
              content: `واجه ${childName.value} تحديًا كبيرًا أثناء الرحلة. لكن بشجاعة ${selectedHero.value?.name}، استطاعوا التغلب على الصعاب.`,
              image: 'https://cdn.pixabay.com/photo/2016/08/24/16/20/books-1617327_640.jpg'
            },
            {
              title: 'تحقيق النصر',
              content: `بعد مغامرة رائعة، عاد ${childName.value} منتصرًا ومحملًا بالذكريات الجميلة والخبرات الجديدة.`,
              image: 'https://cdn.pixabay.com/photo/2017/06/15/15/50/fantasy-2405639_640.jpg'
            }
          ]
        }
      } catch (error) {
        console.error('خطأ في توليد القصة:', error)
        alert('حدث خطأ أثناء توليد القصة. يرجى المحاولة مرة أخرى.')
      } finally {
        isGeneratingAI.value = false
      }
    }

    const createStory = async () => {
      if (!isFormValid.value) return
      
      isGenerating.value = true
      
      try {
        // محاكاة إنشاء القصة
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        let storyData = {}
        
        if (storyCreationMode.value === 'template') {
          storyData = {
            hero: selectedHero.value.id,
            name: childName.value,
            story: selectedStory.value.id,
            image: childImage.value,
            type: 'template'
          }
        } else {
          storyData = {
            hero: selectedHero.value.id,
            name: childName.value,
            story: aiGeneratedStory.value.id,
            image: childImage.value,
            type: 'ai',
            aiStory: aiGeneratedStory.value
          }
        }
        
        // الانتقال إلى صفحة القصة
        router.push({
          path: '/story-viewer',
          query: storyData
        })
      } catch (error) {
        console.error('خطأ في إنشاء القصة:', error)
        alert('حدث خطأ أثناء إنشاء القصة. يرجى المحاولة مرة أخرى.')
      } finally {
        isGenerating.value = false
      }
    }

    // دورة الحياة
    onMounted(() => {
      // يمكن تحميل بيانات إضافية هنا
    })

    onUnmounted(() => {
      stopCamera()
    })

    return {
      availableHeroes,
      availableStories,
      recentStories,
      aiSuggestions,
      selectedHero,
      childName,
      childImage,
      selectedStory,
      storyCreationMode,
      aiStoryPrompt,
      aiGeneratedStory,
      isGenerating,
      isGeneratingAI,
      isCameraActive,
      cameraVideo,
      fileInput,
      isFormValid,
      selectHero,
      handleImageUpload,
      startCamera,
      switchCamera,
      capturePhoto,
      removeImage,
      generateAIStory,
      createStory
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* تحسينات للكاميرا */
video {
  transform: scaleX(-1); /* عكس الصورة للمستخدم للكاميرا الأمامية */
}

.child-face-mask {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='25'/%3E%3C/svg%3E");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
}
</style>