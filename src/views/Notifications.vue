<template>
  <div class="container mx-auto px-4 py-8">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="max-w-4xl mx-auto">
      <!-- رأس الصفحة -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          الإشعارات
        </h1>
        <div class="flex items-center gap-2">
          <button
            @click="markAllAsRead"
            v-if="hasUnread"
            class="flex items-center gap-2 px-4 py-2 text-[#1B3C53] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span class="material-icons">mark_email_read</span>
            تحديد الكل كمقروء
          </button>
          <button
            @click="clearAll"
            v-if="notifications.length > 0"
            class="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <span class="material-icons">delete_sweep</span>
            حذف الكل
          </button>
        </div>
      </div>

      <!-- فلتر الإشعارات -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          @click="currentFilter = 'all'"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="currentFilter === 'all' ? 
            'bg-[#1B3C53] text-white' : 
            'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          الكل ({{ notifications.length }})
        </button>
        <button
          @click="currentFilter = 'unread'"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="currentFilter === 'unread' ? 
            'bg-[#1B3C53] text-white' : 
            'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          غير مقروء ({{ unreadCount }})
        </button>
        <button
          @click="currentFilter = 'read'"
          class="px-4 py-2 rounded-lg transition-colors"
          :class="currentFilter === 'read' ? 
            'bg-[#1B3C53] text-white' : 
            'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          مقروء ({{ readCount }})
        </button>
      </div>

      <!-- قائمة الإشعارات -->
      <div class="space-y-4">
        <template v-if="filteredNotifications.length > 0">
          <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            class="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-200"
            :class="!notification.read ? 'shadow-md' : ''"
          >
            <div class="flex items-start gap-4">
              <!-- أيقونة الإشعار -->
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="getNotificationIcon(notification.type).bgClass"
              >
                <i class="material-icons text-white">
                  {{ getNotificationIcon(notification.type).icon }}
                </i>
              </div>

              <!-- محتوى الإشعار -->
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white text-lg">
                  {{ notification.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 mt-1">
                  {{ notification.message }}
                </p>
                <div class="flex items-center gap-4 mt-3">
                  <span class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(notification.timestamp) }}
                  </span>
                  <div class="flex items-center gap-2">
                    <button
                      v-if="!notification.read"
                      @click="markAsRead(notification)"
                      class="text-[#1B3C53] dark:text-blue-400 hover:underline text-sm"
                    >
                      تحديد كمقروء
                    </button>
                    <button
                      @click="deleteNotification(notification)"
                      class="text-red-500 hover:underline text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- رسالة عند عدم وجود إشعارات -->
        <div 
          v-else
          class="p-8 text-center"
        >
          <span class="material-icons text-gray-400 dark:text-gray-600 text-6xl mb-4">
            notifications_off
          </span>
          <h3 class="text-xl font-medium text-gray-800 dark:text-white mb-2">
            لا توجد إشعارات {{ currentFilter === 'unread' ? 'غير مقروءة' : currentFilter === 'read' ? 'مقروءة' : '' }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            ستظهر هنا جميع التحديثات والإشعارات المهمة
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Notifications',
  setup() {
    const router = useRouter()
    const notifications = ref([])
    const currentFilter = ref('all')

    // الحصول على الإشعارات حسب نوع المستخدم
    const loadNotifications = () => {
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
      const storageKey = currentUser.role === 'admin' ? 'adminNotifications' :
                        currentUser.role === 'employee' ? 'employeeNotifications' :
                        'userNotifications'
      
      notifications.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    }

    // حفظ الإشعارات
    const saveNotifications = () => {
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
      const storageKey = currentUser.role === 'admin' ? 'adminNotifications' :
                        currentUser.role === 'employee' ? 'employeeNotifications' :
                        'userNotifications'
      
      localStorage.setItem(storageKey, JSON.stringify(notifications.value))
    }

    // تصفية الإشعارات
    const filteredNotifications = computed(() => {
      switch (currentFilter.value) {
        case 'unread':
          return notifications.value.filter(n => !n.read)
        case 'read':
          return notifications.value.filter(n => n.read)
        default:
          return notifications.value
      }
    })

    // عدد الإشعارات غير المقروءة
    const unreadCount = computed(() => {
      return notifications.value.filter(n => !n.read).length
    })

    // عدد الإشعارات المقروءة
    const readCount = computed(() => {
      return notifications.value.filter(n => n.read).length
    })

    // التحقق من وجود إشعارات غير مقروءة
    const hasUnread = computed(() => {
      return unreadCount.value > 0
    })

    // الحصول على أيقونة الإشعار وتصنيفها
    const getNotificationIcon = (type) => {
      const icons = {
        content_submitted: { 
          icon: 'rate_review',
          bgClass: 'bg-purple-500'
        },
        content_reviewed: {
          icon: 'assignment_turned_in',
          bgClass: 'bg-green-500'
        },
        new_content: {
          icon: 'auto_stories',
          bgClass: 'bg-blue-500'
        },
        comment_reply: {
          icon: 'chat',
          bgClass: 'bg-orange-500'
        },
        comment_like: {
          icon: 'favorite',
          bgClass: 'bg-red-500'
        },
        message: {
          icon: 'mail',
          bgClass: 'bg-indigo-500'
        }
      }
      return icons[type] || { icon: 'notifications', bgClass: 'bg-gray-500' }
    }

    // تنسيق التاريخ
    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      
      if (diff < 86400000) { // أقل من يوم
        if (diff < 3600000) { // أقل من ساعة
          const minutes = Math.floor(diff / 60000)
          return 'منذ ' + minutes + ' دقيقة'
        } else {
          const hours = Math.floor(diff / 3600000)
          return 'منذ ' + hours + ' ساعة'
        }
      } else if (diff < 604800000) { // أقل من أسبوع
        const days = Math.floor(diff / 86400000)
        return 'منذ ' + days + ' يوم'
      } else {
        return date.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    }

    // تحديد إشعار كمقروء
    const markAsRead = (notification) => {
      notification.read = true
      saveNotifications()
    }

    // تحديد كل الإشعارات كمقروءة
    const markAllAsRead = () => {
      notifications.value.forEach(notification => {
        notification.read = true
      })
      saveNotifications()
    }

    // حذف إشعار
    const deleteNotification = (notification) => {
      const index = notifications.value.findIndex(n => n.id === notification.id)
      if (index !== -1) {
        notifications.value.splice(index, 1)
        saveNotifications()
      }
    }

    // حذف كل الإشعارات
    const clearAll = () => {
      if (confirm('هل أنت متأكد من حذف جميع الإشعارات؟')) {
        notifications.value = []
        saveNotifications()
      }
    }

    // تحميل الإشعارات عند تحميل المكون
    onMounted(() => {
      loadNotifications()
    })

    return {
      notifications,
      currentFilter,
      filteredNotifications,
      unreadCount,
      readCount,
      hasUnread,
      getNotificationIcon,
      formatDate,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll
    }
  }
}
</script>

<style>
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
  direction: rtl;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
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
  direction: rtl;
  -webkit-font-smoothing: antialiased;
}
</style>