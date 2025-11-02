<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- رأس الصفحة -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          الإشعارات
        </h1>
        <div class="flex items-center gap-3">
          <button
            @click="markAllAsRead"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1B3C53] dark:hover:text-white"
          >
            تحديد الكل كمقروء
          </button>
          <button
            @click="clearAll"
            class="text-sm text-red-500 hover:text-red-600"
          >
            حذف الكل
          </button>
        </div>
      </div>

      <!-- تصفية الإشعارات -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="filter in filters"
            :key="filter.type"
            @click="currentFilter = filter.type"
            class="px-4 py-2 rounded-full text-sm transition-colors"
            :class="currentFilter === filter.type ? 
              'bg-[#1B3C53] text-white' : 
              'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'"
          >
            <span class="material-icons text-sm ml-1 align-middle">
              {{ filter.icon }}
            </span>
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- قائمة الإشعارات -->
      <div class="space-y-4">
        <template v-if="filteredNotifications.length > 0">
          <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-all hover:shadow-md"
            :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.read }"
          >
            <div class="flex items-start gap-4">
              <!-- أيقونة الإشعار -->
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="getNotificationStyle(notification.type).bgClass"
              >
                <span 
                  class="material-icons text-xl"
                  :class="getNotificationStyle(notification.type).textClass"
                >
                  {{ getNotificationStyle(notification.type).icon }}
                </span>
              </div>

              <!-- محتوى الإشعار -->
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium text-gray-800 dark:text-white">
                      {{ notification.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mt-1">
                      {{ notification.message }}
                    </p>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-xs text-gray-400 dark:text-gray-500">
                      {{ formatDate(notification.timestamp) }}
                    </span>
                    <button 
                      @click.stop="deleteNotification(notification.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <span class="material-icons text-sm">delete</span>
                    </button>
                  </div>
                </div>

                <!-- أزرار الإجراءات -->
                <div class="mt-4 flex items-center gap-3">
                  <button
                    @click="handleNotificationAction(notification)"
                    class="text-sm text-white bg-[#1B3C53] hover:bg-[#234C6A] px-4 py-2 rounded-lg transition-colors"
                  >
                    {{ getActionButtonText(notification.type) }}
                  </button>
                  <button
                    v-if="!notification.read"
                    @click.stop="markAsRead(notification.id)"
                    class="text-sm text-gray-600 dark:text-gray-400 hover:text-[#1B3C53] dark:hover:text-white"
                  >
                    تحديد كمقروء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div
          v-else
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center"
        >
          <span class="material-icons text-6xl text-gray-400 dark:text-gray-500 mb-4">
            notifications_off
          </span>
          <h3 class="text-xl font-medium text-gray-800 dark:text-white mb-2">
            لا توجد إشعارات
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            ستظهر هنا كل الإشعارات الجديدة
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
  name: 'AdminNotifications',
  setup() {
    const router = useRouter()
    const notifications = ref([])
    const currentFilter = ref('all')

    // تعريف أنواع التصفية
    const filters = [
      { type: 'all', label: 'الكل', icon: 'notifications' },
      { type: 'content_submitted', label: 'محتوى للمراجعة', icon: 'rate_review' },
      { type: 'content_reviewed', label: 'تم المراجعة', icon: 'assignment_turned_in' },
      { type: 'new_content', label: 'محتوى جديد', icon: 'auto_stories' },
      { type: 'comment_reply', label: 'الردود', icon: 'chat' },
      { type: 'comment_like', label: 'الإعجابات', icon: 'favorite' },
      { type: 'message', label: 'الرسائل', icon: 'mail' }
    ]

    // تصفية الإشعارات
    const filteredNotifications = computed(() => {
      if (currentFilter.value === 'all') {
        return notifications.value
      }
      return notifications.value.filter(n => n.type === currentFilter.value)
    })

    // تحميل الإشعارات
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

    // تنسيق التاريخ
    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      return date.toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    }

    // الحصول على نمط الإشعار
    const getNotificationStyle = (type) => {
      const styles = {
        content_submitted: {
          icon: 'rate_review',
          bgClass: 'bg-purple-100 dark:bg-purple-900/20',
          textClass: 'text-purple-500'
        },
        content_reviewed: {
          icon: 'assignment_turned_in',
          bgClass: 'bg-green-100 dark:bg-green-900/20',
          textClass: 'text-green-500'
        },
        new_content: {
          icon: 'auto_stories',
          bgClass: 'bg-blue-100 dark:bg-blue-900/20',
          textClass: 'text-blue-500'
        },
        comment_reply: {
          icon: 'chat',
          bgClass: 'bg-orange-100 dark:bg-orange-900/20',
          textClass: 'text-orange-500'
        },
        comment_like: {
          icon: 'favorite',
          bgClass: 'bg-red-100 dark:bg-red-900/20',
          textClass: 'text-red-500'
        },
        message: {
          icon: 'mail',
          bgClass: 'bg-indigo-100 dark:bg-indigo-900/20',
          textClass: 'text-indigo-500'
        }
      }
      return styles[type] || {
        icon: 'notifications',
        bgClass: 'bg-gray-100 dark:bg-gray-900/20',
        textClass: 'text-gray-500'
      }
    }

    // الحصول على نص زر الإجراء
    const getActionButtonText = (type) => {
      const texts = {
        content_submitted: 'مراجعة المحتوى',
        content_reviewed: 'عرض التعليقات',
        new_content: 'عرض المحتوى',
        comment_reply: 'عرض الرد',
        comment_like: 'عرض التعليق',
        message: 'عرض الرسالة'
      }
      return texts[type] || 'عرض التفاصيل'
    }

    // التعامل مع إجراء الإشعار
    const handleNotificationAction = (notification) => {
      const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')
      
      // تحديث حالة القراءة
      notification.read = true
      saveNotifications()

      // التوجيه حسب نوع الإشعار
      switch (notification.type) {
        case 'content_submitted':
          if (currentUser.role === 'admin') {
            router.push(`/admin/stories/review/${notification.data.id}`)
          }
          break
        case 'content_reviewed':
          if (currentUser.role === 'employee') {
            router.push(`/employee/stories/edit/${notification.data.id}`)
          }
          break
        case 'new_content':
          router.push(`/story/${notification.data.id}`)
          break
        case 'comment_reply':
        case 'comment_like':
          router.push(`/story/${notification.data.storyId}#comment-${notification.data.commentId}`)
          break
        case 'message':
          const messagePath = currentUser.role === 'admin' ? '/admin/messages' :
                            currentUser.role === 'employee' ? '/employee/messages' :
                            '/user/messages'
          router.push(`${messagePath}/${notification.data.messageId}`)
          break
      }
    }

    // تحديد إشعار كمقروء
    const markAsRead = (id) => {
      const notification = notifications.value.find(n => n.id === id)
      if (notification) {
        notification.read = true
        saveNotifications()
      }
    }

    // تحديد كل الإشعارات كمقروءة
    const markAllAsRead = () => {
      notifications.value.forEach(n => n.read = true)
      saveNotifications()
    }

    // حذف إشعار
    const deleteNotification = (id) => {
      notifications.value = notifications.value.filter(n => n.id !== id)
      saveNotifications()
    }

    // حذف كل الإشعارات
    const clearAll = () => {
      if (confirm('هل أنت متأكد من حذف جميع الإشعارات؟')) {
        notifications.value = []
        saveNotifications()
      }
    }

    // تحميل البيانات عند تحميل المكون
    onMounted(() => {
      loadNotifications()
    })

    return {
      notifications,
      currentFilter,
      filters,
      filteredNotifications,
      formatDate,
      getNotificationStyle,
      getActionButtonText,
      handleNotificationAction,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll
    }
  }
}
</script>