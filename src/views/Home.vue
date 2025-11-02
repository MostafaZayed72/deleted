<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-purple-900 dark:to-pink-900 transition-colors duration-300">
    
    <!-- الهيدر -->
    <AppHeader />

    <!-- القسم الرئيسي -->
    <main class="flex-1">
      
      <!-- الهيرو مع خلفية احترافية -->
      <section class="relative py-20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 overflow-hidden">
        <!-- خلفية ديكورية متحركة -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl custom-pulse-slow"></div>
          <div class="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl custom-bounce-slow"></div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300 rounded-full blur-3xl custom-ping-slow"></div>
        </div>

        <!-- بالونات متحركة -->
        <div class="absolute top-20 right-20 w-16 h-16 bg-yellow-300 rounded-full opacity-70 custom-float"></div>
        <div class="absolute bottom-40 left-40 w-12 h-12 bg-green-300 rounded-full opacity-70 custom-float-delayed"></div>
        <div class="absolute top-60 left-20 w-10 h-10 bg-red-300 rounded-full opacity-70 custom-float-slow"></div>

        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center max-w-6xl mx-auto">
            
            <!-- العنوان الرئيسي -->
            <div class="mb-12 custom-fade-in-down">
              <h1 class="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white leading-tight">
                مكتبة
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-300 dark:to-purple-400 custom-text-pulse">
                  الطفل الرقمية
                </span>
              </h1>
              <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                رحلة استكشاف معرفية تفتح أبواب الإبداع والخيال للأطفال
              </p>
            </div>

            <!-- مربع البحث المتقدم -->
            <div class="max-w-4xl mx-auto mb-16 custom-fade-in-up">
              <div class="relative">
                <div class="relative group">
                  <input 
                    type="text" 
                    v-model="searchQuery"
                    placeholder="ابحث بالموضوع، أوالمؤلف، أو العنوان..."
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
                      :class="{ 'bg-red-200 text-red-600': isListening }"
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
                <div v-if="isListening" class="mt-4 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-xl border border-yellow-300 dark:border-yellow-600">
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
                          <option value="3-6 سنوات">3-6 سنوات</option>
                          <option value="7-9 سنوات">7-9 سنوات</option>
                          <option value="10-12 سنة">10-12 سنة</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">نوع المحتوى</label>
                        <select v-model="advancedFilters.contentType" class="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-300">
                          <option value="">جميع الأنواع</option>
                          <option value="صوت">صوت</option>
                          <option value="صورة">صورة</option>
                          <option value="فيديو">فيديو</option>
                          <option value="pdf">PDF</option>
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
                              {{ suggestion.type }} • {{ suggestion.category }}
                            </p>
                          </div>
                        </div>
                        <span class="material-icons text-gray-400 group-hover:text-purple-600 transform group-hover:-translate-x-1 transition-all">chevron_left</span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
              
              <!-- الموضوعات في صفين -->
              <div class="mt-12">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">اكتشف حسب الموضوع</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div 
                    v-for="(category, index) in featuredCategories" 
                    :key="category.id"
                    @click="searchByCategory(category.name)"
                    class="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    :style="`animation-delay: ${index * 0.1}s`"
                  >
                    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 h-full flex flex-col items-center text-center group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-purple-50 dark:group-hover:from-gray-800 dark:group-hover:to-purple-900">
                      <div class="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12 shadow-lg">
                        <span class="material-icons text-white text-2xl">{{ category.icon }}</span>
                      </div>
                      <h4 class="font-bold text-gray-800 dark:text-white mb-2 text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400">{{ category.name }}</h4>
                      <p class="text-gray-600 dark:text-gray-400 text-sm flex-grow">{{ category.description }}</p>
                      <div class="mt-3 text-xs text-purple-600 dark:text-purple-400 font-medium bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">
                        {{ category.count }} محتوى
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- الإحصائيات -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div 
                v-for="(stat, index) in stats" 
                :key="stat.label" 
                class="text-center transform hover:scale-110 transition-all duration-300"
                :style="`animation-delay: ${0.5 + index * 0.1}s`"
              >
                <div class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {{ stat.value }}
                </div>
                <div class="text-gray-700 dark:text-gray-300 text-sm">{{ stat.label }}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- قسم "أنت بطل القصة" -->
      <section class="py-20 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900 dark:via-orange-900 dark:to-red-900 relative overflow-hidden">
        <!-- عناصر ديكورية متحركة -->
        <div class="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-30 custom-ping-slow"></div>
        <div class="absolute bottom-20 right-20 w-16 h-16 bg-red-300 rounded-full opacity-40 custom-bounce-slow"></div>
        <div class="absolute top-1/3 left-1/4 w-20 h-20 bg-orange-300 rounded-full opacity-30 custom-pulse-slow"></div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              أنت <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 custom-text-pulse">بطل القصة</span>
            </h2>
            <p class="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              اختر بطلًا خارقًا، أضف صورتك واسمك، وكن النجم في مغامرتك الخاصة!
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            
            <!-- المعرض التفاعلي -->
            <div class="relative">
              <div class="grid grid-cols-2 gap-4">
                <div 
                  v-for="(hero, index) in featuredHeroes" 
                  :key="hero.id"
                  class="group cursor-pointer transform hover:scale-105 transition-all duration-500"
                  :style="`animation-delay: ${index * 0.2}s`"
                >
                  <div class="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-orange-400 transition-all duration-300 h-full group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-orange-50 dark:group-hover:from-gray-800 dark:group-hover:to-orange-900">
                    <!-- صورة البطل -->
                    <div class="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-700 dark:to-red-700 rounded-xl overflow-hidden">
                      <div class="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-600 dark:to-red-600 flex items-center justify-center">
                        <span class="material-icons text-orange-500 text-6xl">person</span>
                      </div>
                      <!-- تأثير Hover -->
                      <div class="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span class="material-icons text-white text-4xl opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                          play_arrow
                        </span>
                      </div>
                    </div>
                    
                    <!-- معلومات البطل -->
                    <div class="mt-4 text-center">
                      <h4 class="font-bold text-gray-800 dark:text-white text-lg group-hover:text-orange-600">{{ hero.name }}</h4>
                      <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">{{ hero.description }}</p>
                    </div>
                    
                    <!-- شارة البطل -->
                    <div class="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      {{ hero.category }}
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- العناصر الديكورية -->
              <div class="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl custom-pulse"></div>
              <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-red-400 rounded-full opacity-20 blur-xl custom-ping-slow"></div>
            </div>
            
            <!-- المحتوى التوضيحي -->
            <div class="text-right">
              <div class="space-y-6">
                <div class="flex items-start gap-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span class="material-icons text-white text-2xl">photo_camera</span>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">التقط صورتك</h4>
                    <p class="text-gray-700 dark:text-gray-300">استخدم الكاميرا أو ارفع صورتك المفضلة لتصبح بطل القصة</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span class="material-icons text-white text-2xl">supervisor_account</span>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">اختر بطلك</h4>
                    <p class="text-gray-700 dark:text-gray-300">اختر من مجموعة متنوعة من الأبطال الخارقين المناسبين لأعمار الأطفال</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span class="material-icons text-white text-2xl">auto_stories</span>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-800 dark:text-white mb-2">عش المغامرة</h4>
                    <p class="text-gray-700 dark:text-gray-300">استمتع بقصة تفاعلية حيث تكون أنت النجم الرئيسي في أحداثها</p>
                  </div>
                </div>
              </div>
              
              <!-- زر الدخول -->
              <button 
                @click="goToCustomStory"
                class="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span class="text-lg">ابدأ مغامرتك</span>
                <span class="material-icons transform rotate-180">arrow_forward</span>
              </button>
              
              <!-- إحصائيات القسم -->
              <div class="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-orange-200 dark:border-orange-700">
                <div class="text-center transform hover:scale-110 transition-transform duration-300">
                  <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">15+</div>
                  <div class="text-gray-700 dark:text-gray-300 text-sm">أبطال خارقين</div>
                </div>
                <div class="text-center transform hover:scale-110 transition-transform duration-300">
                  <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">50+</div>
                  <div class="text-gray-700 dark:text-gray-300 text-sm">قصة تفاعلية</div>
                </div>
                <div class="text-center transform hover:scale-110 transition-transform duration-300">
                  <div class="text-2xl font-bold text-red-600 dark:text-red-400">10K+</div>
                  <div class="text-gray-700 dark:text-gray-300 text-sm">طفل مستفيد</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- قسم الميزات -->
      <section class="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900 dark:via-blue-900 dark:to-purple-900">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              لماذا تختار مكتبتنا؟
            </h2>
            <p class="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              نقدم تجربة قراءة استثنائية تجمع بين المتعة والتعليم في بيئة آمنة
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div 
              v-for="(feature, index) in features" 
              :key="feature.title" 
              class="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 hover:from-green-500 hover:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-gray-100 dark:border-gray-700"
            >
              <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                <span class="material-icons text-white text-3xl group-hover:text-green-500">{{ feature.icon }}</span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-white transition-colors duration-500">
                {{ feature.title }}
              </h3>
              
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-500">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- أحدث المحتويات -->
      <section class="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
            <div>
              <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                أحدث المحتويات المضافة
              </h2>
              <p class="text-xl text-gray-700 dark:text-gray-300">
                اكتشف أجمل المحتويات التي انضمت حديثًا إلى مكتبتنا
              </p>
            </div>
            
            <button 
              @click="goToSearch" 
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span class="font-medium">استكشف الكل</span>
              <span class="material-icons">arrow_left</span>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(content, index) in latestContents" 
              :key="content.id" 
              @click="viewContent(content.id)"
              class="group cursor-pointer transform hover:-translate-y-4 transition-all duration-500"
            >
              <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 h-full flex flex-col group-hover:border-purple-400">
                
                <!-- صورة المحتوى -->
                <div class="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 overflow-hidden">
                  <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <span class="absolute top-4 right-4 text-5xl transform group-hover:scale-110 transition-transform duration-300">{{ content.emoji }}</span>
                  
                  <!-- شارة جديدة -->
                  <div v-if="isNewContent(content.created_at)" class="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    جديد
                  </div>
                  
                  <!-- أيقونة نوع المحتوى -->
                  <div class="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-full p-2 shadow-lg">
                    <span class="material-icons text-purple-500 text-lg">{{ getContentTypeIcon(content.content_type) }}</span>
                  </div>
                  
                  <!-- تأثير hover -->
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="bg-white bg-opacity-90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <span class="material-icons text-purple-500 text-2xl">play_arrow</span>
                    </div>
                  </div>
                </div>
                
                <!-- محتوى البطاقة -->
                <div class="p-6 flex-grow">
                  <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {{ content.title }}
                  </h4>
                  
                  <p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {{ content.summary }}
                  </p>
                  
                  <div class="flex items-center justify-between mb-3">
                    <span class="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                      {{ content.age_group }}
                    </span>
                    <span class="text-gray-600 dark:text-gray-400 text-xs">{{ content.author }}</span>
                  </div>

                  <div class="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded transform group-hover:scale-105 transition-transform">{{ content.category }}</span>
                    <span>{{ formatDate(content.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- حالة عدم وجود محتويات -->
          <div v-if="latestContents.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span class="material-icons text-gray-400 text-4xl">menu_book</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-3">لا توجد محتويات حديثة</h3>
            <p class="text-gray-700 dark:text-gray-400 text-lg">سيتم إضافة محتويات جديدة قريبًا</p>
          </div>
        </div>
      </section>

      <!-- قسم إضافي: محتويات مميزة -->
      <section class="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900 dark:via-orange-900 dark:to-red-900">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              محتويات مميزة هذا الأسبوع
            </h2>
            <p class="text-xl text-gray-700 dark:text-gray-300">
              مجموعة مختارة من أفضل المحتويات التي يحبها الأطفال
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div 
              v-for="content in featuredContents" 
              :key="content.id"
              @click="viewContent(content.id)"
              class="group cursor-pointer bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-amber-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-amber-200 dark:border-amber-700 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <span class="text-4xl">{{ content.emoji }}</span>
                </div>
                <div class="flex-grow">
                  <div class="flex items-start justify-between mb-3">
                    <h4 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {{ content.title }}
                    </h4>
                    <span class="flex items-center gap-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full text-sm shadow transform group-hover:scale-110 transition-transform">
                      <span class="material-icons text-sm">star</span>
                      {{ content.rating }}
                    </span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {{ content.summary }}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span class="bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 px-2 py-1 rounded transform group-hover:scale-105 transition-transform">
                        {{ content.category }}
                      </span>
                      <span>{{ content.views }} مشاهدة</span>
                    </div>
                    <span class="material-icons text-gray-400 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-all duration-300">
                      arrow_left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')
    const showSuggestions = ref(false)
    const showAdvancedSearch = ref(false)
    const isListening = ref(false)
    const voiceTranscript = ref('')
    const searchSuggestions = ref([])
    const imageInput = ref(null)
    
    // فلاتر البحث المتقدم
    const advancedFilters = ref({
      category: '',
      ageGroup: '',
      contentType: ''
    })

    // الأبطال الخارقين لقسم "أنت بطل القصة"
    const featuredHeroes = ref([
      {
        id: 1,
        name: 'الفارس الشجاع',
        category: 'المغامرات',
        description: 'فارس شجاع يدافع عن المظلومين'
      },
      {
        id: 2,
        name: 'المستكشف العظيم',
        category: 'الاستكشاف',
        description: 'يستكشف عوالم جديدة وغريبة'
      },
      {
        id: 3,
        name: 'حارس الطبيعة',
        category: 'البيئة',
        description: 'يحمي الحيوانات والطبيعة'
      },
      {
        id: 4,
        name: 'بطل العلم',
        category: 'العلم',
        description: 'يحل المشكلات باستخدام العلم'
      }
    ])

    // التعرف على الكلام
    let recognition = null

    // الموضوعات المميزة
    const featuredCategories = [
      {
        id: 1,
        name: 'المغامرات',
        icon: 'explore',
        description: 'رحلات مثيرة لاكتشاف عوالم جديدة',
        count: 156
      },
      {
        id: 2,
        name: 'الحيوانات',
        icon: 'pets',
        description: 'عالم الحيوان بأسلوب شيق وممتع',
        count: 89
      },
      {
        id: 3,
        name: 'التعليمية',
        icon: 'school',
        description: 'تعلم مع المتعة في كل محتوى',
        count: 203
      },
      {
        id: 4,
        name: 'الدينية',
        icon: 'mosque',
        description: 'قيم إسلامية بأسلوب مبسط',
        count: 134
      },
      {
        id: 5,
        name: 'الخيال',
        icon: 'auto_awesome',
        description: 'عوالم سحرية وخيالية رائعة',
        count: 78
      },
      {
        id: 6,
        name: 'التاريخية',
        icon: 'history',
        description: 'رحلة عبر الزمن إلى الماضي',
        count: 67
      },
      {
        id: 7,
        name: 'العلمية',
        icon: 'science',
        description: 'اكتشافات علمية مبسطة',
        count: 92
      },
      {
        id: 8,
        name: 'الاجتماعية',
        icon: 'diversity_3',
        description: 'تعزيز القيم والسلوكيات',
        count: 145
      }
    ]

    const stats = [
      { value: '1,250+', label: 'محتوى مميز' },
      { value: '50,000+', label: 'مستفيد نشط' },
      { value: '25+', label: 'موضوع متنوع' },
      { value: '4.8/5', label: 'تقييم المستخدمين' }
    ]
    
    const features = [
      {
        icon: 'security',
        title: 'بيئة آمنة',
        description: 'جميع المحتويات مفحوصة ومناسبة للعمر تحت إشراف متخصصين في تربية الأطفال'
      },
      {
        icon: 'touch_app',
        title: 'تفاعل ممتع',
        description: 'تصميم تفاعلي يجذب انتباه الأطفال ويحفز خيالهم بطريقة مبتكرة'
      },
      {
        icon: 'collections_bookmark',
        title: 'مكتبة شاملة',
        description: 'آلاف المحتويات المتنوعة تغطي جميع الاهتمامات والفئات العمرية'
      }
    ]

    // تحميل المحتويات من قاعدة البيانات
    const allContents = ref([])
    const latestContents = computed(() => {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      return allContents.value
        .filter(content => new Date(content.created_at) >= oneWeekAgo && content.status === 'published')
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 8)
    })

    const featuredContents = computed(() => {
      return allContents.value
        .filter(content => content.rating >= 4.5 && content.status === 'published')
        .sort((a, b) => b.views - a.views)
        .slice(0, 4)
    })

    // الحصول على أيقونة نوع المحتوى
    const getContentTypeIcon = (type) => {
      const icons = {
        'صوت': 'audiotrack',
        'صورة': 'image',
        'فيديو': 'play_circle',
        'pdf': 'picture_as_pdf'
      }
      return icons[type] || 'menu_book'
    }

    // الانتقال إلى صفحة القصة المخصصة
    const goToCustomStory = () => {
      router.push('/custom-story')
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

        recognition.onerror = (event) => {
          console.error('خطأ في التعرف على الكلام:', event.error)
          isListening.value = false
          voiceTranscript.value = 'حدث خطأ في التعرف على الكلام'
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
        
        // محاكاة استخراج النص من الصورة
        const extractedText = 'استخراج نص من الصورة'
        
        searchQuery.value = extractedText
        performSearch()
        
        event.target.value = ''
      }
    }

    // تطبيق فلاتر البحث المتقدم
    const applyAdvancedSearch = () => {
      const query = {}
      
      if (searchQuery.value.trim()) query.q = searchQuery.value
      if (advancedFilters.value.category) query.category = advancedFilters.value.category
      if (advancedFilters.value.ageGroup) query.ageGroup = advancedFilters.value.ageGroup
      if (advancedFilters.value.contentType) query.type = advancedFilters.value.contentType

      router.push({ 
        path: '/search', 
        query: query
      })
    }

    const resetAdvancedFilters = () => {
      advancedFilters.value = {
        category: '',
        ageGroup: '',
        contentType: ''
      }
    }

    // توليد اقتراحات البحث من قاعدة البيانات
    const generateSearchSuggestions = (query) => {
      if (!query || query.length < 2) {
        searchSuggestions.value = []
        return
      }

      const suggestions = allContents.value
        .filter(content => 
          content.title.toLowerCase().includes(query.toLowerCase()) ||
          content.author.toLowerCase().includes(query.toLowerCase()) ||
          content.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(content => ({
          id: content.id,
          title: content.title,
          type: content.content_type,
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
      performSearch()
    }

    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        router.push('/search')
        return
      }

      router.push({ 
        path: '/search', 
        query: { q: searchQuery.value }
      })
    }

    const searchByCategory = (category) => {
      router.push({ 
        path: '/search', 
        query: { category: category }
      })
    }

    const viewContent = (contentId) => {
      router.push(`/content/${contentId}`)
    }

    const isNewContent = (createdAt) => {
      const threeDaysAgo = new Date()
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
      return new Date(createdAt) >= threeDaysAgo
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const goToSearch = () => {
      router.push('/search')
    }

    // محاكاة تحميل البيانات من قاعدة البيانات
    const loadContents = async () => {
      try {
        // بيانات تجريبية أكثر تفصيلاً
        allContents.value = [
          {
            id: 1,
            title: 'الأسد الشجاع',
            author: 'أحمد محمد',
            category: 'الحيوانات',
            age_group: '3-6 سنوات',
            content_type: 'صوت',
            status: 'published',
            emoji: '🦁',
            summary: 'محتوى تعليمي عن الشجاعة والصداقة في الغابة',
            rating: 4.8,
            views: 1245,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            title: 'مغامرات في الفضاء',
            author: 'سارة أحمد',
            category: 'العلمية',
            age_group: '7-9 سنوات',
            content_type: 'فيديو',
            status: 'published',
            emoji: '🚀',
            summary: 'رحلة فضائية لاكتشاف الكواكب والمجرات',
            rating: 4.9,
            views: 892,
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 3,
            title: 'الحروف العربية',
            author: 'فاطمة علي',
            category: 'التعليمية',
            age_group: '3-6 سنوات',
            content_type: 'صوت',
            status: 'published',
            emoji: '📚',
            summary: 'تعلم الحروف العربية بطريقة ممتعة',
            rating: 4.7,
            views: 1567,
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 4,
            title: 'الحديقة السحرية',
            author: 'محمد حسن',
            category: 'الخيال',
            age_group: '7-9 سنوات',
            content_type: 'فيديو',
            status: 'published',
            emoji: '🌳',
            summary: 'مغامرة في حديقة مليئة بالأسرار',
            rating: 4.9,
            views: 2034,
            created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      } catch (error) {
        console.error('خطأ في تحميل المحتويات:', error)
      }
    }

    onMounted(() => {
      loadContents()
    })

    return {
      searchQuery,
      showSuggestions,
      showAdvancedSearch,
      isListening,
      voiceTranscript,
      searchSuggestions,
      advancedFilters,
      imageInput,
      featuredHeroes,
      featuredCategories,
      stats,
      features,
      latestContents,
      featuredContents,
      getContentTypeIcon,
      goToCustomStory,
      toggleVoiceSearch,
      stopVoiceSearch,
      handleImageSearch,
      applyAdvancedSearch,
      resetAdvancedFilters,
      handleSearchInput,
      hideSuggestions,
      selectSuggestion,
      performSearch,
      searchByCategory,
      viewContent,
      isNewContent,
      formatDate,
      goToSearch
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

.custom-slide-down-enter-active,
.custom-slide-down-leave-active {
  transition: all 0.3s ease;
}

.custom-slide-down-enter-from,
.custom-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

/* حركات مخصصة - تم إصلاحها */
@keyframes custom-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes custom-float-delayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes custom-float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes custom-text-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes custom-fade-in-down {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes custom-fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes custom-fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes custom-pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.1; }
}

@keyframes custom-ping-slow {
  0% { transform: scale(1); opacity: 0.3; }
  75%, 100% { transform: scale(2); opacity: 0; }
}

@keyframes custom-bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.custom-float {
  animation: custom-float 6s ease-in-out infinite;
}

.custom-float-delayed {
  animation: custom-float-delayed 7s ease-in-out infinite;
}

.custom-float-slow {
  animation: custom-float-slow 8s ease-in-out infinite;
}

.custom-text-pulse {
  animation: custom-text-pulse 2s ease-in-out infinite;
}

.custom-fade-in-down {
  animation: custom-fade-in-down 0.8s ease-out;
}

.custom-fade-in-up {
  animation: custom-fade-in-up 0.8s ease-out;
}

.custom-fade-in {
  animation: custom-fade-in 0.5s ease-out;
}

.custom-pulse-slow {
  animation: custom-pulse-slow 3s ease-in-out infinite;
}

.custom-ping-slow {
  animation: custom-ping-slow 2s ease-in-out infinite;
}

.custom-bounce-slow {
  animation: custom-bounce-slow 4s ease-in-out infinite;
}

.custom-pulse {
  animation: custom-pulse-slow 2s ease-in-out infinite;
}
</style>