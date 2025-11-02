<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- رأس الصفحة -->
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              💬 المحادثات
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              تواصل مع فريق الدعم والموظفين
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button
              @click="refreshConversations"
              class="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="material-icons text-sm">refresh</span>
              تحديث
            </button>
            <button
              @click="showNewMessageModal = true"
              class="flex items-center gap-2 px-4 py-2 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] transition-colors"
            >
              <span class="material-icons text-sm">add</span>
              محادثة جديدة
            </button>
          </div>
        </div>

        <!-- قسم الرسائل -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
            <!-- قائمة المحادثات -->
            <div class="lg:col-span-1 border-l border-gray-200 dark:border-gray-700 flex flex-col">
              <!-- شريط البحث -->
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <div class="relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="ابحث في المحادثات..."
                    class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent"
                  >
                  <span class="material-icons absolute right-3 top-3 text-gray-400 text-sm">
                    search
                  </span>
                </div>
              </div>

              <!-- قائمة المحادثات -->
              <div class="flex-1 overflow-y-auto">
                <div 
                  v-if="filteredConversations.length === 0"
                  class="p-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <span class="material-icons text-4xl mb-3 text-gray-300">inbox</span>
                  <p class="mb-2">لا توجد محادثات</p>
                  <button
                    @click="showNewMessageModal = true"
                    class="text-[#1B3C53] dark:text-blue-400 hover:underline text-sm"
                  >
                    ابدأ محادثة جديدة
                  </button>
                </div>

                <div
                  v-for="conversation in filteredConversations"
                  :key="conversation.id"
                  @click="selectConversation(conversation)"
                  class="p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-all duration-200"
                  :class="{
                    'bg-blue-50 dark:bg-blue-900/20 border-r-4 border-r-[#1B3C53]': selectedConversation?.id === conversation.id,
                    'hover:bg-gray-50 dark:hover:bg-gray-700': selectedConversation?.id !== conversation.id
                  }"
                >
                  <div class="flex items-start gap-3">
                    <!-- صورة المستخدم -->
                    <div class="relative flex-shrink-0">
                      <div 
                        class="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg"
                        :class="getUserColor(conversation.participant.role)"
                      >
                        {{ getInitials(conversation.participant.name) }}
                      </div>
                      <!-- مؤشر الحالة -->
                      <span
                        class="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full"
                        :class="conversation.online ? 'bg-green-500' : 'bg-gray-400'"
                      ></span>
                    </div>

                    <div class="flex-1 min-w-0">
                      <div class="flex justify-between items-start mb-1">
                        <div class="flex items-center gap-2">
                          <h3 class="font-semibold text-gray-800 dark:text-white truncate text-sm">
                            {{ conversation.participant.name }}
                          </h3>
                          <span class="text-xs px-2 py-1 rounded-full" :class="getRoleBadgeClass(conversation.participant.role)">
                            {{ getUserRole(conversation.participant.role) }}
                          </span>
                        </div>
                        <span class="text-xs text-gray-500 whitespace-nowrap">
                          {{ formatDate(conversation.lastMessage.timestamp) }}
                        </span>
                      </div>
                      
                      <p class="text-sm text-gray-600 dark:text-gray-300 truncate mb-2 leading-relaxed">
                        {{ conversation.lastMessage.text }}
                      </p>
                      
                      <div class="flex justify-between items-center">
                        <span
                          v-if="conversation.lastMessage.sender === currentUser.id"
                          class="text-xs flex items-center gap-1"
                          :class="conversation.lastMessage.read ? 'text-green-500' : 'text-gray-400'"
                        >
                          <span class="material-icons text-xs">done_all</span>
                          {{ conversation.lastMessage.read ? 'تم القراءة' : 'تم الإرسال' }}
                        </span>
                        <span v-else></span>
                        
                        <span
                          v-if="conversation.unreadCount > 0"
                          class="bg-[#1B3C53] text-white text-xs px-2 py-1 rounded-full min-w-5 h-5 flex items-center justify-center"
                        >
                          {{ conversation.unreadCount }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- منطقة المحادثة -->
            <div class="lg:col-span-3 flex flex-col">
              <template v-if="selectedConversation">
                <!-- رأس المحادثة -->
                <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg"
                           :class="getUserColor(selectedConversation.participant.role)">
                        {{ getInitials(selectedConversation.participant.name) }}
                      </div>
                      <span
                        class="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full"
                        :class="selectedConversation.online ? 'bg-green-500' : 'bg-gray-400'"
                      ></span>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h3 class="font-semibold text-gray-800 dark:text-white">
                          {{ selectedConversation.participant.name }}
                        </h3>
                        <span class="text-xs px-2 py-1 rounded-full" :class="getRoleBadgeClass(selectedConversation.participant.role)">
                          {{ getUserRole(selectedConversation.participant.role) }}
                        </span>
                      </div>
                      <p class="text-sm flex items-center gap-1" :class="selectedConversation.online ? 'text-green-500' : 'text-gray-500'">
                        <span class="w-2 h-2 rounded-full" :class="selectedConversation.online ? 'bg-green-500' : 'bg-gray-400'"></span>
                        {{ selectedConversation.online ? 'متصل الآن' : 'غير متصل' }}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <button
                      @click="markConversationAsRead"
                      v-if="selectedConversation.unreadCount"
                      class="p-2 text-gray-400 hover:text-green-500 transition-colors"
                      title="تعليم كمقروء"
                    >
                      <span class="material-icons">mark_email_read</span>
                    </button>
                    <button
                      @click="deleteConversation"
                      class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="حذف المحادثة"
                    >
                      <span class="material-icons">delete</span>
                    </button>
                  </div>
                </div>

                <!-- منطقة الرسائل -->
                <div 
                  ref="messagesContainer"
                  class="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50 dark:bg-gray-900"
                >
                  <!-- نهاية المحادثة -->
                  <div v-if="selectedConversation.messages.length > 0" class="text-center py-4">
                    <span class="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                      بداية المحادثة
                    </span>
                  </div>

                  <template v-for="(message, index) in selectedConversation.messages" :key="message.id">
                    <!-- فاصل التاريخ -->
                    <div
                      v-if="showDateSeparator(index)"
                      class="flex justify-center my-6"
                    >
                      <span class="bg-white dark:bg-gray-800 text-gray-500 text-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                        {{ formatMessageDate(message.timestamp) }}
                      </span>
                    </div>

                    <!-- الرسالة -->
                    <div
                      class="flex gap-3 group"
                      :class="message.sender === currentUser.id ? 'justify-end' : 'justify-start'"
                    >
                      <!-- صورة المرسل (تظهر فقط للرسائل المستلمة) -->
                      <div
                        v-if="message.sender !== currentUser.id"
                        class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                        :class="getUserColor(selectedConversation.participant.role)"
                      >
                        {{ getInitials(selectedConversation.participant.name) }}
                      </div>

                      <!-- محتوى الرسالة -->
                      <div
                        class="max-w-[70%] p-4 rounded-2xl relative transition-all duration-200 group-hover:shadow-lg"
                        :class="[
                          message.sender === currentUser.id 
                            ? 'bg-[#1B3C53] text-white rounded-br-none' 
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none'
                        ]"
                      >
                        <!-- نص الرسالة -->
                        <p class="text-sm leading-relaxed mb-2">{{ message.text }}</p>
                        
                        <!-- وقت الرسالة -->
                        <div class="flex justify-end items-center gap-2">
                          <span 
                            class="text-xs"
                            :class="message.sender === currentUser.id ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'"
                          >
                            {{ formatMessageTime(message.timestamp) }}
                          </span>
                          <span 
                            v-if="message.sender === currentUser.id" 
                            class="flex items-center gap-1 text-xs"
                            :class="message.read ? 'text-green-300' : 'text-blue-200'"
                          >
                            <span class="material-icons text-xs">done_all</span>
                            {{ message.read ? 'تم القراءة' : 'تم الإرسال' }}
                          </span>
                        </div>

                        <!-- مؤشر الاتجاه -->
                        <div
                          class="absolute w-3 h-3 transform rotate-45"
                          :class="[
                            message.sender === currentUser.id 
                              ? 'bg-[#1B3C53] -right-1 top-0' 
                              : 'bg-white dark:bg-gray-800 border-l border-b border-gray-200 dark:border-gray-700 -left-1 top-0'
                          ]"
                        ></div>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- مربع الكتابة -->
                <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <form @submit.prevent="sendMessage" class="flex gap-3">
                    <button
                      type="button"
                      @click="toggleEmojiPicker"
                      class="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <span class="material-icons">mood</span>
                    </button>
                    
                    <div class="flex-1 relative">
                      <textarea
                        ref="messageInput"
                        v-model="newMessage"
                        @keydown.enter.exact.prevent="sendMessage"
                        @keydown.enter.shift.exact.prevent="newMessage += '\n'"
                        placeholder="اكتب رسالتك هنا..."
                        rows="1"
                        class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white resize-none max-h-32 focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent"
                        @input="autoResize"
                      ></textarea>
                      
                      <!-- منتقي الإيموجي -->
                      <div
                        v-if="showEmojiPicker"
                        class="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-3 w-64 h-40 overflow-y-auto"
                      >
                        <div class="grid grid-cols-8 gap-1">
                          <button
                            v-for="emoji in emojis"
                            :key="emoji"
                            @click="addEmoji(emoji)"
                            class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-lg"
                          >
                            {{ emoji }}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      :disabled="!newMessage.trim()"
                      class="px-6 py-3 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <span class="material-icons text-sm">send</span>
                      إرسال
                    </button>
                  </form>
                </div>
              </template>

              <!-- رسالة البداية -->
              <div 
                v-else
                class="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-900"
              >
                <div class="max-w-md">
                  <span class="material-icons text-6xl text-gray-300 dark:text-gray-600 mb-4">
                    chat_bubble_outline
                  </span>
                  <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    مرحباً في المحادثات
                  </h3>
                  <p class="text-gray-500 dark:text-gray-500 mb-6">
                    اختر محادثة من القائمة أو ابدأ محادثة جديدة مع فريق الدعم أو أي موظف.
                  </p>
                  <button
                    @click="showNewMessageModal = true"
                    class="px-6 py-3 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] transition-colors flex items-center gap-2 mx-auto"
                  >
                    <span class="material-icons text-sm">add</span>
                    بدء محادثة جديدة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- نافذة المحادثة الجديدة -->
    <div
      v-if="showNewMessageModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md">
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
            بدء محادثة جديدة
          </h3>
          <button
            @click="showNewMessageModal = false"
            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="p-6">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-right">
              اختر الشخص
            </label>
            <select
              v-model="newMessageRecipient"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent"
            >
              <option value="">اختر الشخص المراد المراسلة</option>
              <optgroup label="فريق الدعم">
                <option value="support">الدعم الفني</option>
              </optgroup>
              <optgroup label="الموظفين">
                <option
                  v-for="employee in availableEmployees"
                  :key="employee.id"
                  :value="employee.id"
                >
                  {{ employee.name }} ({{ employee.department || 'موظف' }})
                </option>
              </optgroup>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-right">
              الرسالة
            </label>
            <textarea
              v-model="newMessageText"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-[#1B3C53] focus:border-transparent"
              placeholder="اكتب رسالتك هنا..."
            ></textarea>
          </div>

          <div class="text-sm text-gray-500 text-left">
            {{ newMessageText.length }}/500
          </div>
        </div>

        <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="showNewMessageModal = false"
            class="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            إلغاء
          </button>
          <button
            @click="createNewConversation"
            :disabled="!newMessageRecipient || !newMessageText.trim()"
            class="px-6 py-2 bg-[#1B3C53] text-white rounded-xl hover:bg-[#234C6A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span class="material-icons text-sm">send</span>
            بدء المحادثة
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'

export default {
  name: 'UserMessages',
  setup() {
    // حالة المكون
    const conversations = ref([])
    const selectedConversation = ref(null)
    const searchQuery = ref('')
    const newMessage = ref('')
    const showNewMessageModal = ref(false)
    const showEmojiPicker = ref(false)
    const newMessageRecipient = ref('')
    const newMessageText = ref('')
    const messagesContainer = ref(null)
    const messageInput = ref(null)
    
    // تحميل بيانات المستخدم الحالي
    const currentUser = JSON.parse(localStorage.getItem('userData') || '{}')

    // قائمة الإيموجي
    const emojis = ref(['😀', '😊', '😂', '🤔', '👍', '❤️', '🙏', '🎉', '🔥', '⭐', '💡', '❓'])

    // الموظفون المتاحون للمراسلة
    const availableEmployees = computed(() => {
      const users = JSON.parse(localStorage.getItem('libraryUsers') || '[]')
      return users.filter(user => 
        user.id !== currentUser.id && 
        (user.role === 'employee' || user.role === 'admin')
      )
    })

    // تصفية المحادثات
    const filteredConversations = computed(() => {
      if (!searchQuery.value) return conversations.value
      
      const query = searchQuery.value.toLowerCase()
      return conversations.value.filter(conversation => 
        conversation.participant.name.toLowerCase().includes(query) ||
        conversation.lastMessage.text.toLowerCase().includes(query)
      )
    })

    // تحميل المحادثات
    const loadConversations = () => {
      const storageKey = `user_conversations_${currentUser.id}`
      conversations.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    }

    // حفظ المحادثات
    const saveConversations = () => {
      const storageKey = `user_conversations_${currentUser.id}`
      localStorage.setItem(storageKey, JSON.stringify(conversations.value))
    }

    // اختيار محادثة
    const selectConversation = (conversation) => {
      selectedConversation.value = conversation
      showEmojiPicker.value = false
      
      if (conversation.unreadCount > 0) {
        conversation.unreadCount = 0
        conversation.messages.forEach(msg => {
          if (msg.sender !== currentUser.id) msg.read = true
        })
        saveConversations()
      }
      
      nextTick(() => {
        scrollToBottom()
        if (messageInput.value) {
          messageInput.value.focus()
        }
      })
    }

    // إرسال رسالة
    const sendMessage = () => {
      if (!newMessage.value.trim() || !selectedConversation.value) return

      const message = {
        id: Date.now(),
        sender: currentUser.id,
        text: newMessage.value.trim(),
        timestamp: new Date().toISOString(),
        read: false
      }

      selectedConversation.value.messages.push(message)
      selectedConversation.value.lastMessage = message
      saveConversations()
      newMessage.value = ''
      showEmojiPicker.value = false

      // إعادة ضبط ارتفاع Textarea
      if (messageInput.value) {
        messageInput.value.style.height = 'auto'
      }

      nextTick(() => {
        scrollToBottom()
      })
    }

    // إنشاء محادثة جديدة
    const createNewConversation = () => {
      if (!newMessageRecipient.value || !newMessageText.value.trim()) return

      let participant

      if (newMessageRecipient.value === 'support') {
        // محادثة مع الدعم الفني
        participant = {
          id: 'support_team',
          name: 'فريق الدعم الفني',
          role: 'employee',
          department: 'الدعم'
        }
      } else {
        // محادثة مع موظف محدد
        const employee = availableEmployees.value.find(emp => emp.id === newMessageRecipient.value)
        if (!employee) return
        participant = employee
      }

      const message = {
        id: Date.now(),
        sender: currentUser.id,
        text: newMessageText.value.trim(),
        timestamp: new Date().toISOString(),
        read: false
      }

      const conversation = {
        id: Date.now(),
        participant: participant,
        messages: [message],
        lastMessage: message,
        unreadCount: 0,
        online: true
      }

      conversations.value.unshift(conversation)
      saveConversations()
      showNewMessageModal.value = false
      newMessageRecipient.value = ''
      newMessageText.value = ''
      selectConversation(conversation)
    }

    // تمرير إلى آخر الرسائل
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

    // ضبط ارتفاع Textarea تلقائياً
    const autoResize = () => {
      if (messageInput.value) {
        messageInput.value.style.height = 'auto'
        messageInput.value.style.height = messageInput.value.scrollHeight + 'px'
      }
    }

    // تبديل منتقي الإيموجي
    const toggleEmojiPicker = () => {
      showEmojiPicker.value = !showEmojiPicker.value
    }

    // إضافة إيموجي
    const addEmoji = (emoji) => {
      newMessage.value += emoji
      showEmojiPicker.value = false
      if (messageInput.value) {
        messageInput.value.focus()
      }
    }

    // تحديث المحادثات
    const refreshConversations = () => {
      loadConversations()
    }

    // دوال مساعدة
    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date

      if (diff < 60000) return 'الآن'
      else if (diff < 3600000) return `منذ ${Math.floor(diff / 60000)} دقيقة`
      else if (diff < 86400000) return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      else if (diff < 604800000) return date.toLocaleDateString('ar-SA', { weekday: 'long' })
      else return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    const formatMessageDate = (timestamp) => {
      if (!timestamp) return 'غير محدد'
      const date = new Date(timestamp)
      return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const formatMessageTime = (timestamp) => {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }

    const showDateSeparator = (index) => {
      if (index === 0) return true
      const currentDate = new Date(selectedConversation.value.messages[index].timestamp)
      const previousDate = new Date(selectedConversation.value.messages[index - 1].timestamp)
      return currentDate.toDateString() !== previousDate.toDateString()
    }

    const getInitials = (name) => {
      return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
    }

    const getUserColor = (role) => {
      const colors = {
        'admin': 'bg-red-500',
        'employee': 'bg-blue-500',
        'user': 'bg-green-500'
      }
      return colors[role] || 'bg-gray-500'
    }

    const getRoleBadgeClass = (role) => {
      const classes = {
        'admin': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        'employee': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        'user': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      }
      return classes[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }

    const getUserRole = (role) => {
      const roles = {
        'admin': 'مدير',
        'employee': 'موظف',
        'user': 'مستفيد'
      }
      return roles[role] || role
    }

    const markConversationAsRead = () => {
      if (!selectedConversation.value) return
      selectedConversation.value.unreadCount = 0
      selectedConversation.value.messages.forEach(msg => {
        if (msg.sender !== currentUser.id) msg.read = true
      })
      saveConversations()
    }

    const deleteConversation = () => {
      if (!selectedConversation.value) return
      if (confirm('هل أنت متأكد من حذف هذه المحادثة؟ هذا الإجراء لا يمكن التراجع عنه.')) {
        conversations.value = conversations.value.filter(c => c.id !== selectedConversation.value.id)
        saveConversations()
        selectedConversation.value = null
      }
    }

    onMounted(() => {
      loadConversations()
    })

    return {
      conversations,
      selectedConversation,
      searchQuery,
      newMessage,
      showNewMessageModal,
      showEmojiPicker,
      newMessageRecipient,
      newMessageText,
      messagesContainer,
      messageInput,
      currentUser,
      emojis,
      availableEmployees,
      filteredConversations,
      selectConversation,
      sendMessage,
      createNewConversation,
      formatDate,
      formatMessageDate,
      formatMessageTime,
      showDateSeparator,
      getInitials,
      getUserColor,
      getRoleBadgeClass,
      getUserRole,
      markConversationAsRead,
      deleteConversation,
      toggleEmojiPicker,
      addEmoji,
      refreshConversations,
      autoResize,
      scrollToBottom
    }
  }
}
</script>

<style scoped>
/* تخصيص شريط التمرير */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>