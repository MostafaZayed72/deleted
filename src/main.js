import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import StatisticsManager from '@/utils/statisticsManager'

const app = createApp(App)

// تهيئة نظام الإحصائيات
StatisticsManager.initialize();

app.use(router)
app.mount('#app')

console.log('🚀 تم تحميل التطبيق بنجاح!')