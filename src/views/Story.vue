<template>
  <div dir="rtl" class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
    
    <!-- الهيدر -->
    <AppHeader />

    <!-- محتوى القصة -->
    <main class="container mx-auto px-4 py-6" v-if="story">
      
      <!-- مسار التنقل -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 space-x-reverse text-sm text-purple-600 dark:text-purple-400">
          <li>
            <router-link to="/" class="hover:text-purple-800 transition-colors">الرئيسية</router-link>
          </li>
          <li class="flex items-center space-x-2 space-x-reverse">
            <span class="material-icons text-xs">chevron_left</span>
            <router-link to="/stories" class="hover:text-purple-800 transition-colors">المكتبة</router-link>
          </li>
          <li class="flex items-center space-x-2 space-x-reverse">
            <span class="material-icons text-xs">chevron_left</span>
            <span class="text-purple-700 font-medium">{{ story.category }}</span>
          </li>
          <li class="flex items-center space-x-2 space-x-reverse">
            <span class="material-icons text-xs">chevron_left</span>
            <span class="text-purple-800 dark:text-white font-medium truncate max-w-40">{{ story.title }}</span>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <!-- المحتوى الرئيسي -->
        <div class="lg:col-span-3 space-y-6">
          
          <!-- مشغل الوسائط الرئيسي -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 overflow-hidden transform hover:shadow-3xl transition-all duration-500">
            
            <!-- شريط التحكم العلوي -->
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <span class="material-icons text-2xl">{{ getMediaIcon(story.story_type) }}</span>
                  </div>
                  <div>
                    <h1 class="text-xl font-bold custom-text-pulse">{{ story.title }}</h1>
                    <p class="text-purple-200 text-sm">{{ story.author }}</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-2">
                  <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium transform hover:scale-105 transition-all">
                    {{ getMediaTypeArabic(story.story_type) }}
                  </span>
                  <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium transform hover:scale-105 transition-all">
                    {{ story.age_group }}
                  </span>
                </div>
              </div>
            </div>

            <!-- منطقة العرض -->
            <div class="p-6">
              
              <!-- مشغل PDF محسن -->
              <div v-if="story.story_type === 'pdf' && story.story_file" class="space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 class="text-lg font-bold text-purple-800 dark:text-white">قارئ الكتاب التفاعلي</h3>
                  <div class="flex items-center gap-2 flex-wrap">
                    <button 
                      @click="toggleFullscreen"
                      class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 text-sm shadow-lg"
                    >
                      <span class="material-icons text-sm">{{ isFullscreen ? 'fullscreen_exit' : 'fullscreen' }}</span>
                      {{ isFullscreen ? 'خروج من العرض الكامل' : 'عرض كامل' }}
                    </button>
                    <button 
                      @click="downloadFile"
                      class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 text-sm shadow-lg"
                    >
                      <span class="material-icons text-sm">download</span>
                      تحميل
                    </button>
                  </div>
                </div>
                
                <!-- مشغل PDF -->
                <div class="border-2 border-purple-300 dark:border-purple-600 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 shadow-inner">
                  <div class="h-96 sm:h-[500px] lg:h-[600px] transform hover:scale-[1.02] transition-transform duration-500">
                    <iframe 
                      :src="story.story_file" 
                      class="w-full h-full"
                      frameborder="0"
                    ></iframe>
                  </div>
                </div>
              </div>

              <!-- مشغل الفيديو -->
              <div v-else-if="story.story_type === 'video' && story.story_file" class="space-y-4">
                <h3 class="text-lg font-bold text-purple-800 dark:text-white">مشغل الفيديو</h3>
                <div class="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
                  <video 
                    :src="story.story_file" 
                    controls
                    class="w-full aspect-video"
                    @play="onVideoPlay"
                    @pause="onVideoPause"
                  >
                    متصفحك لا يدعم تشغيل الفيديو.
                  </video>
                </div>
                
              </div>

              <!-- مشغل الصوت -->
              <div v-else-if="story.story_type === 'audio' && story.story_file" class="space-y-6">
                <h3 class="text-lg font-bold text-purple-800 dark:text-white">مشغل الصوت</h3>
                
                <div class="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-8 shadow-lg transform hover:scale-[1.02] transition-all duration-500">
                  <div class="text-center">
                    <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:rotate-12 transition-transform duration-500">
                      <span class="material-icons text-white text-4xl">music_note</span>
                    </div>
                    
                    <h4 class="text-xl font-bold text-purple-800 dark:text-white mb-2">استمع إلى القصة</h4>
                    <p class="text-purple-600 dark:text-purple-300 mb-6">بصوت راوي محترف مع مؤثرات صوتية</p>
                    
                    <audio 
                      :src="story.story_file" 
                      controls
                      class="w-full max-w-md mx-auto transform hover:scale-105 transition-all duration-300"
                      @play="onAudioPlay"
                    >
                      متصفحك لا يدعم تشغيل الصوت.
                    </audio>
                  </div>
                </div>
                
              </div>

              <!-- عارض الصور -->
              <div v-else-if="story.story_type === 'image' && story.story_file" class="space-y-4">
                <h3 class="text-lg font-bold text-purple-800 dark:text-white">عارض الصور</h3>
                
                <div class="border-2 border-purple-300 dark:border-purple-600 rounded-2xl p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 shadow-lg transform hover:scale-[1.02] transition-all duration-500">
                  <div class="flex justify-center">
                    <img 
                      :src="story.story_file" 
                      :alt="story.title"
                      class="max-w-full max-h-96 object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                      @load="onImageLoad"
                    />
                  </div>
                </div>
                
              </div>

              <!-- حالة عدم وجود ملف -->
              <div v-else class="text-center py-12">
                <div class="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span class="material-icons text-white text-4xl">error_outline</span>
                </div>
                <h3 class="text-xl font-bold text-purple-800 dark:text-white mb-2">لا يوجد ملف معروض</h3>
                <p class="text-purple-600 dark:text-purple-400">لم يتم رفع ملف لهذه القصة بعد</p>
              </div>
            </div>
          </div>

          <!-- تفاعلات المستخدم -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 p-6 transform hover:shadow-3xl transition-all duration-500">
            <div class="flex flex-wrap items-center justify-between gap-4">
              
              <!-- الإعجابات والمفضلة -->
              <div class="flex items-center gap-4">
                <button 
                  @click="toggleLike"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110"
                  :class="isLiked ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200 dark:from-purple-800 dark:to-pink-800 dark:text-purple-300 dark:hover:from-purple-700 dark:hover:to-pink-700'"
                >
                  <span class="material-icons text-lg">{{ isLiked ? 'favorite' : 'favorite_border' }}</span>
                  <span class="font-medium">{{ storyStats.likes || 0 }}</span>
                </button>
                
                <button 
                  @click="toggleFavorite"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-110"
                  :class="isFavorite ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 hover:from-purple-200 hover:to-pink-200 dark:from-purple-800 dark:to-pink-800 dark:text-purple-300 dark:hover:from-purple-700 dark:hover:to-pink-700'"
                >
                  <span class="material-icons text-lg">{{ isFavorite ? 'bookmark' : 'bookmark_border' }}</span>
                  <span class="font-medium">المفضلة</span>
                </button>
              </div>

              <!-- المشاركة والتحميل -->
              <div class="flex items-center gap-3">
                <button 
                  @click="shareStory"
                  class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span class="material-icons text-lg">share</span>
                  <span class="font-medium">مشاركة</span>
                </button>
                
                <button 
                  @click="downloadFile"
                  class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span class="material-icons text-lg">download</span>
                  <span class="font-medium">تحميل</span>
                </button>
              </div>
            </div>

            <!-- إحصائيات التفاعل -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-200 dark:border-purple-600">
              <div class="text-center transform hover:scale-110 transition-transform duration-300">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ storyStats.views || 0 }}</div>
                <div class="text-sm text-purple-600 dark:text-purple-400">المشاهدات</div>
              </div>
              <div class="text-center transform hover:scale-110 transition-transform duration-300">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ storyStats.downloads || 0 }}</div>
                <div class="text-sm text-purple-600 dark:text-purple-400">التحميلات</div>
              </div>
              <div class="text-center transform hover:scale-110 transition-transform duration-300">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ storyStats.shares || 0 }}</div>
                <div class="text-sm text-purple-600 dark:text-purple-400">المشاركات</div>
              </div>
              <div class="text-center transform hover:scale-110 transition-transform duration-300">
                <div class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ formatRating(story.rating) }}</div>
                <div class="text-sm text-purple-600 dark:text-purple-400">التقييم</div>
              </div>
            </div>
          </div>

          <!-- معلومات القصة -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 p-6 transform hover:shadow-3xl transition-all duration-500">
            <h3 class="text-xl font-bold text-purple-800 dark:text-white mb-4">عن القصة</h3>
            
            <div class="prose prose-lg max-w-none dark:prose-invert">
              <p class="text-purple-700 dark:text-purple-300 leading-relaxed text-lg">{{ story.summary }}</p>
            </div>
            
            <!-- الكلمات المفتاحية -->
            <div class="mt-6 pt-6 border-t border-purple-200 dark:border-purple-600">
              <h4 class="text-lg font-bold text-purple-800 dark:text-white mb-3">الكلمات المفتاحية</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="keyword in storyKeywords" 
                  :key="keyword"
                  class="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-800 dark:to-pink-800 dark:text-purple-300 rounded-full text-sm font-medium hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-sm"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>

          <!-- التعليقات والتقييمات -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 p-6 transform hover:shadow-3xl transition-all duration-500">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-purple-800 dark:text-white">التعليقات والتقييمات</h3>
              <div class="flex items-center gap-2 text-yellow-500 transform hover:scale-105 transition-transform">
                <span class="material-icons">star</span>
                <span class="font-bold">{{ formatRating(story.rating) }}</span>
                <span class="text-purple-600 dark:text-purple-400 text-sm">({{ comments.length }} تعليق)</span>
              </div>
            </div>

            <!-- إضافة تعليق -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-6 mb-6 shadow-lg">
              <h4 class="text-lg font-bold text-purple-800 dark:text-white mb-4">أضف تعليقك</h4>
              
              <textarea 
                v-model="newComment"
                placeholder="اكتب تعليقك عن القصة..."
                rows="4"
                class="w-full border-2 border-purple-200 dark:border-purple-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-purple-800 dark:text-white resize-none transition-all duration-300"
              ></textarea>
              
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                <div class="flex items-center gap-3">
                  <span class="text-sm font-medium text-purple-800 dark:text-white">تقييمك:</span>
                  <div class="flex gap-1">
                    <span 
                      v-for="star in 5" 
                      :key="star"
                      @click="userRating = star"
                      class="cursor-pointer text-2xl transition-all duration-300 hover:scale-125 transform"
                      :class="star <= userRating ? 'text-yellow-400 animate-pulse' : 'text-purple-300'"
                    >
                      ★
                    </span>
                  </div>
                </div>
                
                <button 
                  @click="addComment"
                  :disabled="!newComment.trim()"
                  class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 font-medium shadow-lg"
                >
                  نشر التعليق
                </button>
              </div>
            </div>

            <!-- قائمة التعليقات -->
            <div class="space-y-4">
              <div 
                v-for="comment in comments" 
                :key="comment.id"
                class="border-2 border-purple-200 dark:border-purple-600 rounded-2xl p-6 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transform hover:rotate-12 transition-transform duration-500">
                      {{ comment.user.charAt(0) }}
                    </div>
                    <div>
                      <span class="font-bold text-purple-800 dark:text-white block">{{ comment.user }}</span>
                      <span class="text-xs text-purple-500 dark:text-purple-400">{{ comment.date }}</span>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-1 text-yellow-400 transform hover:scale-110 transition-transform">
                    <span v-for="star in 5" :key="star" class="text-lg">
                      {{ star <= comment.rating ? '★' : '☆' }}
                    </span>
                  </div>
                </div>
                
                <p class="text-purple-700 dark:text-purple-300 leading-relaxed">{{ comment.text }}</p>
                
                <div class="flex items-center gap-4 mt-4 pt-4 border-t border-purple-100 dark:border-purple-700">
                  <button 
                    @click="checkAuthThen(() => toggleCommentLike(comment.id))"
                    class="flex items-center gap-1 text-sm hover:text-purple-600 transition-all duration-300 text-purple-600 dark:text-purple-400 transform hover:scale-110"
                  >
                    <span class="material-icons text-sm">thumb_up</span>
                    <span>{{ comment.likes || 0 }}</span>
                  </button>
                  <button 
                    @click="checkAuthThen(() => toggleReply(comment.id))"
                    class="flex items-center gap-1 text-sm hover:text-purple-600 transition-all duration-300 text-purple-600 dark:text-purple-400 transform hover:scale-110"
                  >
                    <span class="material-icons text-sm">reply</span>
                    <span>رد</span>
                  </button>
                </div>

                <!-- منطقة الرد -->
                <div v-if="comment.showReply" class="mt-4 pl-6 border-l-2 border-purple-300 dark:border-purple-500 custom-fade-in">
                  <textarea 
                    v-model="comment.replyText"
                    placeholder="اكتب ردك هنا..."
                    rows="2"
                    class="w-full border-2 border-purple-200 dark:border-purple-600 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-purple-800 dark:text-white resize-none transition-all duration-300"
                  ></textarea>
                  <div class="flex justify-end gap-2 mt-2">
                    <button 
                      @click="cancelReply(comment.id)"
                      class="px-4 py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      إلغاء
                    </button>
                    <button 
                      @click="submitReply(comment.id)"
                      :disabled="!comment.replyText?.trim()"
                      class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 text-sm font-medium shadow-md"
                    >
                      نشر الرد
                    </button>
                  </div>
                </div>

                <!-- عرض الردود -->
                <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 space-y-3">
                  <div 
                    v-for="reply in comment.replies" 
                    :key="reply.id"
                    class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {{ reply.user.charAt(0) }}
                        </div>
                        <span class="font-bold text-sm text-purple-800 dark:text-white">{{ reply.user }}</span>
                      </div>
                      <span class="text-xs text-purple-500 dark:text-purple-400">{{ reply.date }}</span>
                    </div>
                    <p class="text-sm text-purple-700 dark:text-purple-300">{{ reply.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- الشريط الجانبي -->
        <div class="lg:col-span-1 space-y-6">
          
          <!-- معلومات القصة -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 p-6 transform hover:shadow-3xl transition-all duration-500">
            <h3 class="text-lg font-bold text-purple-800 dark:text-white mb-4">تفاصيل القصة</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">رقم الوعاء:</span>
                <span class="font-bold text-sm text-purple-800 dark:text-white">{{ story.vessel_number }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">المؤلف:</span>
                <span class="font-bold text-sm text-purple-800 dark:text-white">{{ story.author }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">سنة النشر:</span>
                <span class="font-bold text-sm text-purple-800 dark:text-white">{{ story.publication_year }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">الفئة:</span>
                <span class="font-bold text-sm text-purple-800 dark:text-white">{{ story.category }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">الحالة:</span>
                <span class="font-bold text-sm text-green-600">{{ getStatusArabic(story.status) }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">أضيفت في:</span>
                <span class="font-bold text-sm text-purple-800 dark:text-white">{{ formatDate(story.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- قصص مشابهة -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 p-6 transform hover:shadow-3xl transition-all duration-500">
            <h3 class="text-lg font-bold text-purple-800 dark:text-white mb-4">قصص مشابهة</h3>
            <div class="space-y-4">
              <div 
                v-for="related in relatedStories" 
                :key="related.id"
                class="flex items-center gap-3 p-4 border-2 border-purple-200 dark:border-purple-600 rounded-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
                @click="viewRelatedStory(related.id)"
              >
                <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <span class="material-icons">{{ getMediaIcon(related.story_type) }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-sm text-purple-800 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
                    {{ related.title }}
                  </h4>
                  <p class="text-xs text-purple-600 dark:text-purple-400 mt-1">{{ related.author }}</p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-800 dark:to-pink-800 dark:text-purple-300 rounded transform group-hover:scale-105 transition-all">
                      {{ related.age_group }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- إحصائيات المستخدم -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-700 p-6 transform hover:shadow-3xl transition-all duration-500">
            <h3 class="text-lg font-bold text-purple-800 dark:text-white mb-4">نشاطك</h3>
            
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">وقت المشاهدة:</span>
                <span class="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userActivity.watchTime }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">القصص المكتملة:</span>
                <span class="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userActivity.completedStories }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">التعليقات:</span>
                <span class="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userActivity.comments }}</span>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl transform hover:scale-[1.02] transition-all duration-300">
                <span class="text-sm text-purple-600 dark:text-purple-400">التقييمات:</span>
                <span class="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{{ userActivity.ratings }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- حالة التحميل -->
    <div v-else class="container mx-auto px-4 py-8">
      <div class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mb-4"></div>
        <p class="text-purple-600 dark:text-purple-400">جاري تحميل القصة...</p>
      </div>
    </div>

    <!-- نافذة منبثقة للمصادقة -->
    <transition name="custom-modal">
      <div v-if="showAuthModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100 custom-fade-in-up">
          <div class="p-6 text-center">
            <!-- أيقونة -->
            <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-white text-2xl">lock</span>
            </div>
            
            <h3 class="text-xl font-bold text-purple-800 dark:text-white mb-2">
              يلزم تسجيل الدخول
            </h3>
            <p class="text-purple-600 dark:text-purple-400 mb-6">
              للاستفادة من جميع الميزات التفاعلية، يرجى تسجيل الدخول إلى حسابك
            </p>
            
            <div class="flex flex-col gap-3">
              <button 
                @click="redirectToLogin"
                class="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2 shadow-lg"
              >
                <span class="material-icons text-lg">login</span>
                تسجيل الدخول
              </button>
              
              <button 
                @click="redirectToRegister"
                class="w-full py-3 border-2 border-purple-500 text-purple-600 dark:text-white dark:border-white rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2"
              >
                <span class="material-icons text-lg">person_add</span>
                إنشاء حساب جديد
              </button>
              
              <button 
                @click="closeAuthModal"
                class="w-full py-3 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-white transition-colors duration-300 font-medium transform hover:scale-105"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import StatisticsManager from '@/utils/statisticsManager'

export default {
  name: 'StoryView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    const story = ref(null)
    const isFavorite = ref(false)
    const isLiked = ref(false)
    const newComment = ref('')
    const userRating = ref(5)
    const comments = ref([])
    const relatedStories = ref([])
    const isFullscreen = ref(false)
    const userActivity = ref({
      watchTime: '0 دقيقة',
      completedStories: 0,
      comments: 0,
      ratings: 0
    })
    
    // متغيرات جديدة
    const showAuthModal = ref(false)
    const pendingAction = ref(null)
    const isAuthenticated = ref(false)
    const storyStats = ref({
      views: 0,
      likes: 0,
      downloads: 0,
      shares: 0
    })

    // تحميل القصص من localStorage
    const allStories = ref([])

    // التحقق من حالة المصادقة
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken')
      const userData = localStorage.getItem('userData')
      isAuthenticated.value = !!(token && userData)
      return isAuthenticated.value
    }

    // الحصول على معرف المستخدم الحالي
    const getCurrentUserId = () => {
      try {
        const userData = localStorage.getItem('userData')
        if (userData) {
          const user = JSON.parse(userData)
          return user.id || user.userId || 'anonymous'
        }
      } catch (error) {
        console.error('Error getting user ID:', error)
      }
      return 'anonymous'
    }

    // مراقبة تغيرات localStorage
    const setupAuthListener = () => {
      window.addEventListener('storage', (event) => {
        if (event.key === 'authToken' || event.key === 'userData') {
          checkAuthStatus()
          // إذا تم تسجيل الدخول وأغلقنا النافذة المنبثقة
          if (checkAuthStatus() && showAuthModal.value) {
            showAuthModal.value = false
            // تنفيذ الإجراء المعلّق إذا كان موجوداً
            if (pendingAction.value) {
              pendingAction.value()
              pendingAction.value = null
            }
          }
        }
      })
    }

    const loadStories = () => {
      try {
        const savedStories = localStorage.getItem('adminStories') || localStorage.getItem('libraryStories')
        if (savedStories) {
          allStories.value = JSON.parse(savedStories)
        }
      } catch (error) {
        console.error('Error loading stories:', error)
        allStories.value = []
      }
    }

    // توليد كلمات مفتاحية
    const storyKeywords = computed(() => {
      if (!story.value) return []
      const text = `${story.value.title} ${story.value.summary}`
      const words = text.split(/\s+/).filter(word => word.length > 3)
      return [...new Set(words)].slice(0, 6)
    })

    // نظام المصادقة المحسن
    const checkAuthThen = (action) => {
      if (checkAuthStatus()) {
        action()
      } else {
        pendingAction.value = action
        showAuthModal.value = true
      }
    }

    const closeAuthModal = () => {
      showAuthModal.value = false
      pendingAction.value = null
    }

    // دوال المصادقة المحسنة
    const redirectToLogin = () => {
      // حفظ الصفحة الحالية قبل التوجيه
      const currentRoute = route.fullPath
      localStorage.setItem('redirectAfterLogin', currentRoute)
      goToLogin()
    }

    const redirectToRegister = () => {
      // حفظ الصفحة الحالية قبل التوجيه
      const currentRoute = route.fullPath
      localStorage.setItem('redirectAfterLogin', currentRoute)
      goToRegister()
    }

    const goToLogin = () => {
      router.push('/login')
      closeAuthModal()
    }

    const goToRegister = () => {
      router.push('/register')
      closeAuthModal()
    }

    // دالة للتحقق من وجود صفحة للعودة إليها بعد المصادقة
    const checkRedirectAfterAuth = () => {
      const redirectTo = localStorage.getItem('redirectAfterLogin')
      if (redirectTo && isAuthenticated.value) {
        localStorage.removeItem('redirectAfterLogin')
        router.replace(redirectTo)
      }
    }

    // دوال التحكم في العرض
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
      if (isFullscreen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }

    const downloadFile = () => {
      checkAuthThen(() => {
        if (story.value?.story_file) {
          const link = document.createElement('a')
          link.href = story.value.story_file
          link.download = `${story.value.title}.${getFileExtension(story.value.story_type)}`
          link.click()
          
          // تسجيل التحميل في الإحصائيات
          StatisticsManager.recordStoryDownload(story.value.id, getCurrentUserId())
          
          // تحديث الإحصائيات المحلية
          storyStats.value.downloads++
          updateLocalStoryStats()
        }
      })
    }

    const toggleFavorite = () => {
      checkAuthThen(() => {
        isFavorite.value = !isFavorite.value
        // حفظ في localStorage
        const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]')
        if (isFavorite.value) {
          favorites.push(story.value.id)
        } else {
          const index = favorites.indexOf(story.value.id)
          if (index > -1) favorites.splice(index, 1)
        }
        localStorage.setItem('userFavorites', JSON.stringify(favorites))
      })
    }

    const toggleLike = () => {
      checkAuthThen(() => {
        isLiked.value = !isLiked.value
        if (story.value) {
          // تسجيل الإعجاب في الإحصائيات
          StatisticsManager.recordStoryLike(story.value.id, getCurrentUserId())
          
          // تحديث الإحصائيات المحلية
          if (isLiked.value) {
            storyStats.value.likes++
          } else {
            storyStats.value.likes = Math.max(0, storyStats.value.likes - 1)
          }
          updateLocalStoryStats()
        }
      })
    }

    const shareStory = () => {
      checkAuthThen(() => {
        if (navigator.share) {
          navigator.share({
            title: story.value.title,
            text: story.value.summary,
            url: window.location.href
          }).then(() => {
            // تسجيل المشاركة في الإحصائيات
            StatisticsManager.recordStoryShare(story.value.id, getCurrentUserId(), 'web')
            
            // تحديث الإحصائيات المحلية
            storyStats.value.shares++
            updateLocalStoryStats()
          })
        } else {
          navigator.clipboard.writeText(window.location.href)
          alert('تم نسخ رابط القصة إلى الحافظة')
          
          // تسجيل المشاركة في الإحصائيات
          StatisticsManager.recordStoryShare(story.value.id, getCurrentUserId(), 'copy')
          
          // تحديث الإحصائيات المحلية
          storyStats.value.shares++
          updateLocalStoryStats()
        }
      })
    }

    const addComment = () => {
      checkAuthThen(() => {
        if (newComment.value.trim()) {
          const comment = {
            id: Date.now(),
            user: 'المستخدم',
            text: newComment.value,
            rating: userRating.value,
            date: 'الآن',
            likes: 0,
            replies: [],
            showReply: false,
            replyText: ''
          }
          
          comments.value.unshift(comment)
          
          // تسجيل التعليق في الإحصائيات
          StatisticsManager.recordStoryComment(story.value.id, getCurrentUserId(), comment.id)
          
          newComment.value = ''
          userRating.value = 5
          
          // تحديث إحصائيات المستخدم
          userActivity.value.comments++
          
          // تحديث تقييم القصة
          if (story.value) {
            const totalRating = comments.value.reduce((sum, comment) => sum + comment.rating, 0)
            story.value.rating = totalRating / comments.value.length
            updateStoryInStorage()
          }
          
          alert('شكراً لك! تم إضافة تعليقك بنجاح.')
        }
      })
    }

    const toggleCommentLike = (commentId) => {
      const comment = comments.value.find(c => c.id === commentId)
      if (comment) {
        comment.likes = (comment.likes || 0) + 1
      }
    }

    // دوال الرد على التعليقات
    const toggleReply = (commentId) => {
      const comment = comments.value.find(c => c.id === commentId)
      if (comment) {
        comment.showReply = !comment.showReply
        if (!comment.replyText) {
          comment.replyText = ''
        }
      }
    }

    const cancelReply = (commentId) => {
      const comment = comments.value.find(c => c.id === commentId)
      if (comment) {
        comment.showReply = false
        comment.replyText = ''
      }
    }

    const submitReply = (commentId) => {
      const comment = comments.value.find(c => c.id === commentId)
      if (comment && comment.replyText?.trim()) {
        const reply = {
          id: Date.now(),
          user: 'المستخدم',
          text: comment.replyText,
          date: 'الآن'
        }
        
        if (!comment.replies) {
          comment.replies = []
        }
        
        comment.replies.push(reply)
        comment.showReply = false
        comment.replyText = ''
        
        alert('تم إضافة ردك بنجاح.')
      }
    }

    const updateStoryInStorage = () => {
      if (story.value) {
        const index = allStories.value.findIndex(s => s.id === story.value.id)
        if (index !== -1) {
          allStories.value[index] = { ...story.value }
          localStorage.setItem('adminStories', JSON.stringify(allStories.value))
        }
      }
    }

    const updateLocalStoryStats = () => {
      if (story.value) {
        story.value.views = storyStats.value.views
        story.value.likes = storyStats.value.likes
        story.value.downloads = storyStats.value.downloads
        story.value.shares = storyStats.value.shares
        updateStoryInStorage()
      }
    }

    // دوال المساعدة
    const getMediaIcon = (storyType) => {
      const icons = {
        image: 'image',
        video: 'play_circle',
        audio: 'music_note',
        pdf: 'picture_as_pdf',
        text: 'article'
      }
      return icons[storyType] || 'description'
    }

    const getMediaTypeArabic = (storyType) => {
      const types = {
        image: 'صورة',
        video: 'فيديو',
        audio: 'صوت',
        pdf: 'كتاب PDF',
        text: 'نص'
      }
      return types[storyType] || 'محتوى'
    }

    const getStatusArabic = (status) => {
      const statusMap = {
        published: 'منشورة',
        draft: 'مسودة',
        archived: 'مؤرشفة'
      }
      return statusMap[status] || status
    }

    const formatRating = (rating) => {
      return rating ? rating.toFixed(1) : '0.0'
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const getFileExtension = (storyType) => {
      const extensions = {
        image: 'jpg',
        video: 'mp4',
        audio: 'mp3',
        pdf: 'pdf',
        text: 'txt'
      }
      return extensions[storyType] || 'file'
    }

    const viewStory = (storyId) => {
      router.push(`/story/${storyId}`)
    }

    // دالة جديدة للقصص المشابهة
    const viewRelatedStory = (storyId) => {
      router.push(`/story/${storyId}`)
      setTimeout(() => {
        fetchStory()
        fetchComments()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }

    // دوال تفاعل الوسائط
    const onVideoPlay = () => {
      // تسجيل مشاهدة الفيديو
      StatisticsManager.recordStoryView(story.value.id, getCurrentUserId())
      storyStats.value.views++
      updateLocalStoryStats()
    }

    const onVideoPause = () => {
      // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
    }

    const onAudioPlay = () => {
      // تسجيل مشاهدة الصوت
      StatisticsManager.recordStoryView(story.value.id, getCurrentUserId())
      storyStats.value.views++
      updateLocalStoryStats()
    }

    const onImageLoad = () => {
      // تسجيل مشاهدة الصورة
      StatisticsManager.recordStoryView(story.value.id, getCurrentUserId())
      storyStats.value.views++
      updateLocalStoryStats()
    }

    // تحميل البيانات
    onMounted(() => {
      checkAuthStatus() // التحقق من حالة المصادقة أولاً
      loadStories()
      fetchStory()
      fetchComments()
      fetchRelatedStories()
      loadUserActivity()
      
      // إعداد مستمع للمصادقة
      setupAuthListener()
      
      // التحقق من العودة بعد المصادقة
      checkRedirectAfterAuth()
      
      // تسجيل مشاهدة الصفحة
      StatisticsManager.recordStoryView(parseInt(route.params.id), getCurrentUserId())
      
      // تحميل إحصائيات القصة
      loadStoryStats()

      // إضافة مستمع للخروج من العرض الكامل
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && isFullscreen.value) {
          toggleFullscreen()
        }
      })

      // الاستماع لتغيرات حالة المصادقة
      window.addEventListener('storage', () => {
        const wasAuthenticated = isAuthenticated.value
        const nowAuthenticated = checkAuthStatus()
        
        if (!wasAuthenticated && nowAuthenticated) {
          checkRedirectAfterAuth()
          if (showAuthModal.value) {
            showAuthModal.value = false
            if (pendingAction.value) {
              pendingAction.value()
              pendingAction.value = null
            }
          }
        }
      })

      // الاستماع لرسائل postMessage من النوافذ الأخرى
      window.addEventListener('message', (event) => {
        if (event.data.type === 'AUTH_CHANGE' && event.data.authenticated) {
          checkAuthStatus()
          if (showAuthModal.value) {
            showAuthModal.value = false
            if (pendingAction.value) {
              pendingAction.value()
              pendingAction.value = null
            }
          }
        }
      })
    })

    const fetchStory = () => {
      const storyId = parseInt(route.params.id)
      const foundStory = allStories.value.find(s => s.id === storyId)
      
      if (foundStory) {
        story.value = foundStory
        
        // تحميل حالة المفضلة والإعجاب
        const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]')
        isFavorite.value = favorites.includes(storyId)
        
        // تحميل حالة الإعجاب
        const likes = JSON.parse(localStorage.getItem('userLikes') || '[]')
        isLiked.value = likes.includes(storyId)
      } else {
        // استخدام بيانات افتراضية للعرض
        story.value = {
          id: storyId,
          vessel_number: 'VSL-' + Date.now().toString().slice(-6),
          title: 'عينة من القصة',
          author: 'مؤلف غير معروف',
          publication_year: '2024',
          story_type: 'pdf',
          category: 'تعليمي',
          age_group: '7-9 سنوات',
          status: 'published',
          summary: 'هذه قصة تعليمية مفيدة للأطفال تحتوي على قيم تربوية هامة.',
          rating: 4.5,
          views: 0,
          likes: 0,
          downloads: 0,
          shares: 0,
          created_at: new Date().toISOString(),
          story_file: null
        }
      }
    }

    const loadStoryStats = () => {
      const storyId = parseInt(route.params.id)
      const stats = StatisticsManager.getStoryStatistics(storyId)
      storyStats.value = {
        views: stats.views,
        likes: stats.likes,
        downloads: stats.downloads,
        shares: stats.shares
      }
    }

    const fetchComments = () => {
      // محاكاة بيانات التعليقات مع ردود
      comments.value = [
        {
          id: 1,
          user: 'أم محمد',
          text: 'قصة رائعة! أحبها أطفالي كثيراً وتعلموا منها قيم الشجاعة والتعاون.',
          rating: 5,
          date: 'منذ يومين',
          likes: 3,
          replies: [
            {
              id: 101,
              user: 'مدير الموقع',
              text: 'شكراً لك على التعليق الجميل! نحن سعداء لأن القصة نالت إعجاب أطفالك.',
              date: 'منذ يوم'
            }
          ],
          showReply: false,
          replyText: ''
        },
        {
          id: 2,
          user: 'والد أحمد',
          text: 'مفيدة وتعليمية للأطفال، المحتوى هادف والرسومات جميلة.',
          rating: 4,
          date: 'منذ أسبوع',
          likes: 1,
          replies: [],
          showReply: false,
          replyText: ''
        }
      ]
    }

    const fetchRelatedStories = () => {
      if (!story.value) return
      
      relatedStories.value = allStories.value
        .filter(s => s.id !== story.value.id && s.category === story.value.category)
        .slice(0, 4)
      
      // إذا لم توجد قصص مشابهة، استخدام بيانات افتراضية
      if (relatedStories.value.length === 0) {
        relatedStories.value = [
          {
            id: 2,
            title: 'مغامرات في الغابة',
            author: 'فاطمة علي',
            story_type: 'video',
            age_group: '7-9 سنوات',
            category: 'تعليمي'
          },
          {
            id: 3,
            title: 'رحلة إلى النجوم',
            author: 'محمد عبدالله',
            story_type: 'pdf',
            age_group: '7-9 سنوات',
            category: 'تعليمي'
          }
        ]
      }
    }

    const loadUserActivity = () => {
      // محاكاة بيانات نشاط المستخدم
      userActivity.value = {
        watchTime: '45 دقيقة',
        completedStories: 12,
        comments: 8,
        ratings: 15
      }
    }

    return {
      story,
      isFavorite,
      isLiked,
      newComment,
      userRating,
      comments,
      relatedStories,
      storyKeywords,
      isFullscreen,
      userActivity,
      showAuthModal,
      storyStats,
      checkAuthThen,
      closeAuthModal,
      redirectToLogin,
      redirectToRegister,
      toggleFullscreen,
      downloadFile,
      toggleFavorite,
      toggleLike,
      shareStory,
      addComment,
      toggleCommentLike,
      toggleReply,
      cancelReply,
      submitReply,
      getMediaIcon,
      getMediaTypeArabic,
      getStatusArabic,
      formatRating,
      formatDate,
      viewStory,
      viewRelatedStory,
      onVideoPlay,
      onVideoPause,
      onAudioPlay,
      onImageLoad
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
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  color: inherit;
}

.prose p {
  color: inherit;
  margin-bottom: 1rem;
}

/* حركات مخصصة */
@keyframes custom-text-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes custom-fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes custom-fade-in-up {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

.custom-text-pulse {
  animation: custom-text-pulse 3s ease-in-out infinite;
}

.custom-fade-in {
  animation: custom-fade-in 0.5s ease-out;
}

.custom-fade-in-up {
  animation: custom-fade-in-up 0.6s ease-out;
}

.custom-modal-enter-active,
.custom-modal-leave-active {
  transition: all 0.4s ease;
}

.custom-modal-enter-from,
.custom-modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.custom-modal-enter-to,
.custom-modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* تحسينات للظلال */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}

.shadow-3xl {
  box-shadow: 0 35px 60px -15px rgb(0 0 0 / 0.3);
}

/* تحسينات التدرج اللوني */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* تخصيص شريط التمرير */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #a855f7, #ec4899);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #9333ea, #db2777);
}

/* تحسينات للعرض الكامل */
.fullscreen-mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 1000;
}

/* تحسينات للاستجابة */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  
  .space-y-6 > * {
    margin-bottom: 1.5rem;
  }
  
  .max-w-40 {
    max-width: 10rem;
  }
}

/* تحسينات للتفاعل */
.transform {
  transition-property: transform, opacity, background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* تحسينات للخطوط */
.font-bold {
  font-weight: 700;
}

.font-medium {
  font-weight: 500;
}

/* تحسينات للصور */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>