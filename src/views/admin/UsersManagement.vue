<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">        
    <main class="container mx-auto px-4 py-8">
      
      <!-- العنوان الرئيسي -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#1B3C53] dark:text-white mb-3">
          إدارة المستخدمين
        </h1>
        <p class="text-lg text-[#456882] dark:text-gray-300">
          إدارة حسابات المستفيدين والموظفين وتفاعلاتهم على المنصة
        </p>
      </div>

      <!-- الإحصائيات السريعة -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">إجمالي المستخدمين</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-blue-400">{{ statistics.totalUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">people</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">مستخدمين نشطين</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-green-400">{{ statistics.activeUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">check_circle</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">محظورين</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-red-400">{{ statistics.bannedUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">block</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">جدد اليوم</p>
              <p class="text-2xl font-bold text-[#1B3C53] dark:text-purple-400">{{ statistics.newToday }}</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="material-icons text-white">person_add</span>
            </div>
          </div>
        </div>
      </div>

      <!-- أقسام الإدارة -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- القسم الأيسر: إضافة مستخدم جديد -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <div class="flex items-center gap-2 mb-6">
              <span class="material-icons text-[#1B3C53] dark:text-blue-400">person_add</span>
              <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">إضافة مستخدم جديد</h3>
            </div>
            
            <form @submit.prevent="addNewUser" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الاسم الكامل</label>
                <input 
                  v-model="newUser.fullName"
                  type="text"
                  required
                  placeholder="ادخل الاسم الكامل"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                <input 
                  v-model="newUser.email"
                  type="email"
                  required
                  placeholder="ادخل البريد الإلكتروني"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                >
              </div>

              <!-- كلمة المرور مع إظهار/إخفاء -->
              <div>
                <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">كلمة المرور</label>
                <div class="relative">
                  <input 
                    v-model="newUser.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    placeholder="اختر كلمة مرور"
                    class="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                  >
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#1B3C53] dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <span class="material-icons text-sm">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
                <p class="text-xs text-[#456882] dark:text-gray-400 mt-1">يجب أن تحتوي على 6 أحرف على الأقل</p>
              </div>

              <!-- نوع الحساب -->
              <div>
                <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">نوع الحساب</label>
                <select 
                  v-model="newUser.accountType"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 appearance-none"
                >
                  <option value="parent">ولي أمر</option>
                  <option value="teacher">معلم</option>
                  <option value="student">طالب</option>
                  <option value="employee">موظف</option>
                  <option value="admin">أدمن</option>
                </select>
              </div>

              <!-- رقم الهاتف -->
              <div>
                <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">رقم الهاتف (اختياري)</label>
                <input 
                  v-model="newUser.phone"
                  type="tel"
                  placeholder="ادخل رقم الهاتف"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                >
              </div>

              <button 
                type="submit"
                :disabled="addingUser"
                class="w-full bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3 px-4 rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="addingUser" class="flex items-center gap-2">
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإضافة...
                </span>
                <span v-else class="flex items-center gap-2">
                  <span class="material-icons text-sm">person_add</span>
                  إضافة مستخدم
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- القسم الأيمن: قائمة المستخدمين والتفاعلات -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- شريط البحث والفلاتر -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="relative">
                <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">search</span>
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="ابحث بالاسم أو البريد الإلكتروني..."
                  class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
                >
              </div>
              
              <div class="relative">
                <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">filter_alt</span>
                <select 
                  v-model="statusFilter"
                  class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="banned">محظور</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>

              <div class="relative">
                <span class="material-icons absolute right-3 top-1/2 transform -translate-y-1/2 text-[#456882] dark:text-gray-400">category</span>
                <select 
                  v-model="typeFilter"
                  class="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="parent">أولياء أمور</option>
                  <option value="teacher">معلمين</option>
                  <option value="student">طلاب</option>
                  <option value="employee">موظفين</option>
                  <option value="admin">أدمن</option>
                </select>
              </div>
            </div>
          </div>

          <!-- قائمة المستخدمين -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">قائمة المستخدمين</h3>
                <span class="text-sm text-[#456882] dark:text-gray-400">
                  عرض {{ filteredUsers.length }} من {{ statistics.totalUsers }}
                </span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">المستخدم</th>
                    <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">نوع الحساب</th>
                    <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">الحالة</th>
                    <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">التسجيل</th>
                    <th class="text-right py-4 px-6 text-sm font-medium text-[#1B3C53] dark:text-gray-300">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="user in filteredUsers" 
                    :key="user.id"
                    class="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <span class="material-icons">person</span>
                        </div>
                        <div class="flex-1 min-w-0">
                          <h4 class="font-semibold text-[#1B3C53] dark:text-white text-sm mb-1">{{ user.fullName }}</h4>
                          <p class="text-sm text-[#456882] dark:text-gray-400 mb-1">{{ user.email }}</p>
                          <p v-if="user.phone" class="text-xs text-[#456882] dark:text-gray-400">{{ user.phone }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                            :class="getAccountTypeClass(user.accountType)">
                        <span class="material-icons text-xs mr-1">{{ getAccountTypeIcon(user.accountType) }}</span>
                        {{ getAccountTypeArabic(user.accountType) }}
                      </span>
                    </td>
                    <td class="py-4 px-6">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                            :class="getStatusClass(user.status)">
                        <span class="material-icons text-xs mr-1">{{ getStatusIcon(user.status) }}</span>
                        {{ getStatusArabic(user.status) }}
                      </span>
                    </td>
                    <td class="py-4 px-6 text-sm text-[#456882] dark:text-gray-400">
                      {{ formatDate(user.createdAt) }}
                    </td>
                    <td class="py-4 px-6">
                      <div class="flex items-center gap-1 justify-end">
                        <button 
                          @click="editUser(user)"
                          class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                          title="تعديل"
                        >
                          <span class="material-icons text-sm">edit</span>
                        </button>
                        <button 
                          @click="toggleUserStatus(user)"
                          class="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors duration-200"
                          :title="user.status === 'banned' ? 'فك الحظر' : 'حظر'"
                        >
                          <span class="material-icons text-sm">{{ user.status === 'banned' ? 'lock_open' : 'block' }}</span>
                        </button>
                        <button 
                          @click="copyLoginInfo(user)"
                          class="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                          title="نسخ بيانات الدخول"
                        >
                          <span class="material-icons text-sm">content_copy</span>
                        </button>
                        <button 
                          @click="viewUserInteractions(user)"
                          class="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors duration-200"
                          title="التفاعلات"
                        >
                          <span class="material-icons text-sm">insights</span>
                        </button>
                        <button 
                          @click="deleteUser(user)"
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

              <!-- حالة عدم وجود مستخدمين -->
              <div v-if="filteredUsers.length === 0" class="text-center py-12">
                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="material-icons text-gray-400 text-2xl">search_off</span>
                </div>
                <h3 class="text-lg font-medium text-[#1B3C53] dark:text-white mb-2">لا توجد نتائج</h3>
                <p class="text-[#456882] dark:text-gray-400">لم يتم العثور على مستخدمين يطابقون بحثك</p>
              </div>
            </div>
          </div>

          <!-- تفاعلات المستخدم (عند التحديد) -->
          <div v-if="selectedUser" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">تفاعلات {{ selectedUser.fullName }}</h3>
                <button 
                  @click="selectedUser = null"
                  class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <span class="material-icons">close</span>
                </button>
              </div>
            </div>

            <div class="p-6">
              <!-- إحصائيات المستخدم -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ selectedUser.stats?.totalInteractions || 0 }}</div>
                  <div class="text-sm text-blue-600 dark:text-blue-300">إجمالي التفاعلات</div>
                </div>
                <div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ selectedUser.stats?.views || 0 }}</div>
                  <div class="text-sm text-green-600 dark:text-green-300">المشاهدات</div>
                </div>
                <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ selectedUser.stats?.comments || 0 }}</div>
                  <div class="text-sm text-purple-600 dark:text-purple-300">التعليقات</div>
                </div>
                <div class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ selectedUser.stats?.readingTime || 0 }} د</div>
                  <div class="text-sm text-yellow-600 dark:text-yellow-300">وقت القراءة</div>
                </div>
              </div>

              <!-- التعليقات -->
              <div class="mb-6">
                <h4 class="text-md font-semibold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
                  <span class="material-icons text-blue-500">chat</span>
                  التعليقات
                </h4>
                <div class="space-y-3">
                  <div 
                    v-for="comment in selectedUser.comments" 
                    :key="comment.id"
                    class="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <p class="text-sm text-[#1B3C53] dark:text-white font-medium">على: {{ comment.storyTitle }}</p>
                      <span class="text-xs text-[#456882] dark:text-gray-400">{{ formatDate(comment.date) }}</span>
                    </div>
                    <p class="text-[#1B3C53] dark:text-gray-300 text-sm mb-2">{{ comment.text }}</p>
                    <div class="flex items-center gap-2">
                      <button 
                        @click="deleteComment(comment)"
                        class="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-xs transition-colors duration-200 flex items-center gap-1"
                      >
                        <span class="material-icons text-xs">delete</span>
                        حذف التعليق
                      </button>
                      <button 
                        v-if="!comment.hidden"
                        @click="hideComment(comment)"
                        class="text-orange-600 hover:text-orange-800 dark:hover:text-orange-400 text-xs transition-colors duration-200 flex items-center gap-1"
                      >
                        <span class="material-icons text-xs">visibility_off</span>
                        إخفاء
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- التقييمات -->
              <div>
                <h4 class="text-md font-semibold text-[#1B3C53] dark:text-white mb-4 flex items-center gap-2">
                  <span class="material-icons text-yellow-500">star</span>
                  التقييمات
                </h4>
                <div class="space-y-3">
                  <div 
                    v-for="rating in selectedUser.ratings" 
                    :key="rating.id"
                    class="border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-200"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <p class="text-sm text-[#1B3C53] dark:text-white font-medium">{{ rating.storyTitle }}</p>
                      <div class="flex items-center gap-1 text-yellow-500">
                        <span v-for="star in 5" :key="star" class="text-sm">
                          {{ star <= rating.value ? '★' : '☆' }}
                        </span>
                      </div>
                    </div>
                    <p class="text-xs text-[#456882] dark:text-gray-400">{{ formatDate(rating.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- نافذة تعديل المستخدم -->
    <div v-if="editingUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-[#1B3C53] dark:text-white">تعديل بيانات المستخدم</h3>
          <button 
            @click="editingUser = null"
            class="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <form @submit.prevent="updateUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الاسم الكامل</label>
            <input 
              v-model="editingUser.fullName"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">البريد الإلكتروني</label>
            <input 
              v-model="editingUser.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
            >
          </div>

          <!-- كلمة المرور مع إظهار/إخفاء -->
          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">كلمة المرور الجديدة (اختياري)</label>
            <div class="relative">
              <input 
                v-model="editingUser.newPassword"
                :type="showEditPassword ? 'text' : 'password'"
                placeholder="اتركه فارغاً للحفاظ على كلمة المرور الحالية"
                class="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
              >
              <button 
                type="button"
                @click="showEditPassword = !showEditPassword"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#1B3C53] dark:hover:text-blue-400 transition-colors duration-200"
              >
                <span class="material-icons text-sm">{{ showEditPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">نوع الحساب</label>
            <select 
              v-model="editingUser.accountType"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 appearance-none"
            >
              <option value="parent">ولي أمر</option>
              <option value="teacher">معلم</option>
              <option value="student">طالب</option>
              <option value="employee">موظف</option>
              <option value="admin">أدمن</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">الحالة</label>
            <select 
              v-model="editingUser.status"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 appearance-none"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="banned">محظور</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1B3C53] dark:text-gray-300 mb-2">رقم الهاتف</label>
            <input 
              v-model="editingUser.phone"
              type="tel"
              placeholder="ادخل رقم الهاتف"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200"
            >
          </div>

          <div class="flex items-center gap-3 pt-4">
            <button 
              type="submit"
              class="flex-1 bg-gradient-to-r from-[#1B3C53] to-[#234C6A] text-white py-3 px-4 rounded-xl hover:from-[#234C6A] hover:to-[#1B3C53] transition-all duration-200 font-medium shadow-lg"
            >
              حفظ التعديلات
            </button>
            <button 
              type="button"
              @click="editingUser = null"
              class="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-200 font-medium"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from '@/components/Header.vue'
import StatisticsManager from '@/utils/statisticsManager'

export default {
  name: 'UsersManagement',
  components: {
    AppHeader
  },
  setup() {
    const users = ref([])
    const searchQuery = ref('')
    const statusFilter = ref('all')
    const typeFilter = ref('all')
    const selectedUser = ref(null)
    const editingUser = ref(null)
    const addingUser = ref(false)
    const showPassword = ref(false)
    const showEditPassword = ref(false)
    
    const newUser = ref({
      fullName: '',
      email: '',
      password: '',
      accountType: 'parent',
      phone: ''
    })

    const statistics = ref({
      totalUsers: 0,
      activeUsers: 0,
      bannedUsers: 0,
      newToday: 0
    })

    // نظام التحديث اللحظي
    const setupRealTimeUpdates = () => {
      window.addEventListener('usersUpdated', loadUsers)
      window.addEventListener('interactionsUpdated', loadUsers)
    }

    // تحميل المستخدمين
    const loadUsers = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
        users.value = storedUsers.map(user => ({
          ...user,
          stats: StatisticsManager.getUserStatistics(user.id)
        }))

        // حساب الإحصائيات
        const today = new Date().toDateString()
        statistics.value = {
          totalUsers: storedUsers.length,
          activeUsers: storedUsers.filter(u => u.status === 'active').length,
          bannedUsers: storedUsers.filter(u => u.status === 'banned').length,
          newToday: storedUsers.filter(u => new Date(u.createdAt).toDateString() === today).length
        }
      } catch (error) {
        console.error('❌ خطأ في تحميل المستخدمين:', error)
        users.value = []
      }
    }

    // Computed property للمستخدمين المفلترة
    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        // تطبيق البحث
        if (searchQuery.value && !user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
            !user.email.toLowerCase().includes(searchQuery.value.toLowerCase())) {
          return false
        }
        
        // تطبيق فلتر الحالة
        if (statusFilter.value !== 'all' && user.status !== statusFilter.value) {
          return false
        }
        
        // تطبيق فلتر النوع
        if (typeFilter.value !== 'all' && user.accountType !== typeFilter.value) {
          return false
        }
        
        return true
      })
    })

    // دوال المساعدة للأيقونات والتصنيفات
    const getAccountTypeIcon = (type) => {
      const icons = {
        parent: 'family_restroom',
        teacher: 'school',
        student: 'child_care',
        employee: 'badge',
        admin: 'admin_panel_settings'
      }
      return icons[type] || 'person'
    }

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

    const getAccountTypeClass = (type) => {
      const classes = {
        parent: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        teacher: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        student: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
        employee: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
        admin: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }
      return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }

    const getStatusIcon = (status) => {
      const icons = {
        active: 'check_circle',
        inactive: 'pause_circle',
        banned: 'block'
      }
      return icons[status] || 'help'
    }

    const getStatusArabic = (status) => {
      const statuses = {
        active: 'نشط',
        inactive: 'غير نشط',
        banned: 'محظور'
      }
      return statuses[status] || status
    }

    const getStatusClass = (status) => {
      const classes = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        banned: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      }
      return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }

    // تنسيق التاريخ
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    // دوال التفاعل مع المستخدمين
    const addNewUser = async () => {
      addingUser.value = true
      try {
        // إضافة المستخدم الجديد للقائمة
        const user = {
          id: Date.now().toString(),
          ...newUser.value,
          status: 'active',
          createdAt: new Date().toISOString(),
          lastActivity: new Date().toISOString()
        }
        users.value.unshift(user)
        
        // حفظ في localStorage
        const storedUsers = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
        storedUsers.unshift(user)
        localStorage.setItem('libraryUsers', JSON.stringify(storedUsers))

        // إطلاق حدث التحديث
        window.dispatchEvent(new CustomEvent('usersUpdated'))

        // إعادة تعيين النموذج
        newUser.value = {
          fullName: '',
          email: '',
          password: '',
          accountType: 'parent',
          phone: ''
        }

        alert('✅ تم إضافة المستخدم بنجاح')
      } catch (error) {
        console.error('❌ خطأ في إضافة مستخدم جديد:', error)
        alert('❌ حدث خطأ أثناء إضافة المستخدم')
      } finally {
        addingUser.value = false
      }
    }

    const editUser = (user) => {
      editingUser.value = { ...user, newPassword: '' }
    }

    const updateUser = async () => {
      try {
        const index = users.value.findIndex(u => u.id === editingUser.value.id)
        if (index !== -1) {
          // تحديث المستخدم في القائمة
          const updatedUser = { ...editingUser.value }
          if (updatedUser.newPassword) {
            updatedUser.password = updatedUser.newPassword
          }
          delete updatedUser.newPassword
          users.value[index] = updatedUser

          // تحديث في localStorage
          const storedUsers = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
          const storedIndex = storedUsers.findIndex(u => u.id === updatedUser.id)
          if (storedIndex !== -1) {
            storedUsers[storedIndex] = updatedUser
            localStorage.setItem('libraryUsers', JSON.stringify(storedUsers))
            
            // إطلاق حدث التحديث
            window.dispatchEvent(new CustomEvent('usersUpdated'))
          }
        }
        editingUser.value = null
        alert('✅ تم تحديث بيانات المستخدم بنجاح')
      } catch (error) {
        console.error('❌ خطأ في تحديث المستخدم:', error)
        alert('❌ حدث خطأ أثناء تحديث بيانات المستخدم')
      }
    }

    const deleteUser = async (user) => {
      if (confirm(`هل أنت متأكد من حذف المستخدم ${user.fullName}؟`)) {
        try {
          // حذف المستخدم من القائمة
          users.value = users.value.filter(u => u.id !== user.id)
          
          // حذف من localStorage
          const storedUsers = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
          localStorage.setItem('libraryUsers', JSON.stringify(storedUsers.filter(u => u.id !== user.id)))

          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('usersUpdated'))

          alert('✅ تم حذف المستخدم بنجاح')
        } catch (error) {
          console.error('❌ خطأ في حذف المستخدم:', error)
          alert('❌ حدث خطأ أثناء حذف المستخدم')
        }
      }
    }

    const toggleUserStatus = async (user) => {
      try {
        const newStatus = user.status === 'banned' ? 'active' : 'banned'
        user.status = newStatus
        
        // تحديث في localStorage
        const storedUsers = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
        const storedUser = storedUsers.find(u => u.id === user.id)
        if (storedUser) {
          storedUser.status = newStatus
          localStorage.setItem('libraryUsers', JSON.stringify(storedUsers))
          
          // إطلاق حدث التحديث
          window.dispatchEvent(new CustomEvent('usersUpdated'))
        }

        alert(`✅ تم ${newStatus === 'banned' ? 'حظر' : 'فك حظر'} المستخدم بنجاح`)
      } catch (error) {
        console.error('❌ خطأ في تغيير حالة المستخدم:', error)
        alert('❌ حدث خطأ أثناء تغيير حالة المستخدم')
      }
    }

    const viewUserInteractions = (user) => {
      selectedUser.value = {
        ...user,
        stats: StatisticsManager.getUserStatistics(user.id),
        comments: [], // يمكن تحميل التعليقات من قاعدة البيانات
        ratings: []   // يمكن تحميل التقييمات من قاعدة البيانات
      }
    }

    const copyLoginInfo = async (user) => {
      try {
        const info = `البريد الإلكتروني: ${user.email}\nكلمة المرور: ${user.password || '*****'}`
        await navigator.clipboard.writeText(info)
        alert('✅ تم نسخ بيانات الدخول')
      } catch (error) {
        console.error('❌ خطأ في نسخ بيانات الدخول:', error)
        alert('❌ حدث خطأ أثناء نسخ بيانات الدخول')
      }
    }

    const deleteComment = async (comment) => {
      try {
        selectedUser.value.comments = selectedUser.value.comments.filter(c => c.id !== comment.id)
        alert('✅ تم حذف التعليق بنجاح')
      } catch (error) {
        console.error('❌ خطأ في حذف التعليق:', error)
        alert('❌ حدث خطأ أثناء حذف التعليق')
      }
    }

    const hideComment = async (comment) => {
      try {
        comment.hidden = true
        alert('✅ تم إخفاء التعليق بنجاح')
      } catch (error) {
        console.error('❌ خطأ في إخفاء التعليق:', error)
        alert('❌ حدث خطأ أثناء إخفاء التعليق')
      }
    }

    // تحميل البيانات عند بدء المكون
    onMounted(() => {
      console.log('🚀 تم تحميل صفحة إدارة المستخدمين')
      loadUsers()
      setupRealTimeUpdates()
      
      // تنظيف event listeners عند تدمير المكون
      onUnmounted(() => {
        window.removeEventListener('usersUpdated', loadUsers)
        window.removeEventListener('interactionsUpdated', loadUsers)
      })
    })

    return {
      users,
      searchQuery,
      statusFilter,
      typeFilter,
      selectedUser,
      editingUser,
      addingUser,
      showPassword,
      showEditPassword,
      newUser,
      statistics,
      filteredUsers,
      addNewUser,
      editUser,
      updateUser,
      deleteUser,
      toggleUserStatus,
      viewUserInteractions,
      deleteComment,
      hideComment,
      copyLoginInfo,
      getAccountTypeArabic,
      getAccountTypeClass,
      getAccountTypeIcon,
      getStatusArabic,
      getStatusClass,
      getStatusIcon,
      formatDate
    }
  }
}
</script>

<style scoped>
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