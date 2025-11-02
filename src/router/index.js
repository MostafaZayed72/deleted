import { createRouter, createWebHistory } from 'vue-router'

// استيراد المكونات الرئيسية
const Home = () => import('../views/Home.vue')
const Search = () => import('../views/Search.vue')
const Story = () => import('../views/Story.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Admin = () => import('../views/Admin.vue')
const Employee = () => import('../views/Employee.vue')

// استيراد المكونات الجديدة لقسم "أنت بطل القصة"
const CustomStory = () => import('../views/CustomStory.vue')
const StoryViewer = () => import('../views/StoryViewer.vue')

// استيراد مكونات الادمن
const StoriesManagement = () => import('../views/admin/StoriesManagement.vue')
const AddStory = () => import('../views/admin/AddStory.vue')
const UsersManagement = () => import('../views/admin/UsersManagement.vue')
const Analytics = () => import('../views/admin/Analytics.vue')
const Settings = () => import('../views/admin/Settings.vue')
const AdminDashboard = () => import('../views/admin/Dashboard.vue')
const AdminMessages = () => import('../views/admin/Messages.vue')
const AdminNotifications = () => import('../views/Notifications.vue')
const EmployeeNotifications = () => import('../views/Notifications.vue')
const UserNotifications = () => import('../views/Notifications.vue')

// استيراد مكونات الموظفين - تم التحديث
const EmployeeStoriesManagement = () => import('../views/employee/StoriesManagement.vue')
const AddUser = () => import('../views/employee/AddUser.vue')
const EmployeeProfile = () => import('../views/employee/Profile.vue')
const EmployeeMessages = () => import('../views/employee/Messages.vue')

// استيراد مكونات المستفيدين - تم التحديث
const UserProfile = () => import('../views/user/Profile.vue')
const UserDashboard = () => import('../views/user/UserDashboard.vue')
const UserMessages = () => import('../views/user/Messages.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'مركز صالح بن صالح - مكتبة القصص' }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { title: 'بحث القصص' }
  },
  {
    path: '/story/:id',
    name: 'Story',
    component: Story,
    props: true,
    meta: { title: 'قصة' }
  },
  // المسارات الجديدة لقسم "أنت بطل القصة"
  {
    path: '/custom-story',
    name: 'CustomStory',
    component: CustomStory,
    meta: { title: 'أنت بطل القصة - اصنع مغامرتك' }
  },
  {
    path: '/story-viewer',
    name: 'StoryViewer',
    component: StoryViewer,
    props: (route) => ({
      hero: route.query.hero,
      name: route.query.name,
      story: route.query.story,
      image: route.query.image
    }),
    meta: { title: 'مغامرتك الخاصة' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      title: 'تسجيل الدخول',
      requiresGuest: true 
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { 
      title: 'إنشاء حساب',
      requiresGuest: true 
    }
  },
  
  // مسارات المستفيدين - تم التحديث
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { 
      title: 'لوحة النشاط',
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: UserMessages,
    meta: {
      title: 'الرسائل',
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/messages/:conversationId',
    name: 'UserMessageDetails',
    component: UserMessages,
    props: true,
    meta: {
      title: 'المحادثة',
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/notifications',
    name: 'UserNotifications',
    component: UserNotifications,
    meta: {
      title: 'الإشعارات',
      requiresAuth: true,
      requiresUser: true
    }
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/dashboard', // التوجيه التلقائي إلى لوحة النشاط
    meta: { 
      requiresAuth: true,
      requiresUser: true
    },
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: { 
          title: 'الملف الشخصي',
          requiresAuth: true,
          requiresUser: true
        }
      }
    ]
  },
  
  // مسارات الموظفين - تم التحديث (تم إزالة Dashboard)
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
    redirect: '/employee/stories', // التوجيه التلقائي إلى إدارة المحتوى
    meta: { 
      title: 'لوحة الموظف',
      requiresAuth: true,
      requiresEmployee: true 
    },
    children: [
      {
        path: 'stories',
        name: 'EmployeeStories',
        component: EmployeeStoriesManagement,
        meta: { 
          title: 'لوحة الموظف - إدارة المحتوى',
          requiresAuth: true,
          requiresEmployee: true 
        }
      },
      {
        path: 'stories/new',
        name: 'EmployeeAddStory',
        component: AddStory,
        meta: { 
          title: 'لوحة الموظف - إضافة قصة',
          requiresAuth: true,
          requiresEmployee: true 
        }
      },
      {
        path: 'stories/edit/:id',
        name: 'EmployeeEditStory',
        component: AddStory,
        props: true,
        meta: { 
          title: 'لوحة الموظف - تعديل قصة',
          requiresAuth: true,
          requiresEmployee: true 
        }
      },
      {
        path: 'users/new',
        name: 'AddUser',
        component: AddUser,
        meta: { 
          title: 'لوحة الموظف - إضافة مستفيد',
          requiresAuth: true,
          requiresEmployee: true 
        }
      },
      {
        path: 'messages',
        name: 'EmployeeMessages',
        component: EmployeeMessages,
        meta: {
          title: 'لوحة الموظف - الرسائل',
          requiresAuth: true,
          requiresEmployee: true
        }
      },
      {
        path: 'messages/:conversationId',
        name: 'EmployeeMessageDetails',
        component: EmployeeMessages,
        props: true,
        meta: {
          title: 'لوحة الموظف - المحادثة',
          requiresAuth: true,
          requiresEmployee: true
        }
      },
      {
        path: 'notifications',
        name: 'EmployeeNotifications',
        component: EmployeeNotifications,
        meta: {
          title: 'لوحة الموظف - الإشعارات',
          requiresAuth: true,
          requiresEmployee: true
        }
      },
      {
        path: 'profile',
        name: 'EmployeeProfile',
        component: EmployeeProfile,
        meta: { 
          title: 'الملف الشخصي - الموظف',
          requiresAuth: true,
          requiresEmployee: true 
        }
      }
    ]
  },
  
  // مسارات الأدمن
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { 
      title: 'لوحة التحكم',
      requiresAuth: true,
      requiresAdmin: true 
    },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { 
          title: 'لوحة التحكم - الإحصائيات',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'stories',
        name: 'AdminStories',
        component: StoriesManagement,
        meta: { 
          title: 'لوحة التحكم - إدارة القصص',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'stories/new',
        name: 'AddStory',
        component: AddStory,
        meta: { 
          title: 'لوحة التحكم - إضافة قصة',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'stories/edit/:id',
        name: 'EditStory',
        component: AddStory,
        props: true,
        meta: { 
          title: 'لوحة التحكم - تعديل قصة',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: UsersManagement,
        meta: { 
          title: 'لوحة التحكم - إدارة المستخدمين',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'analytics',
        name: 'AdminAnalytics',
        component: Analytics,
        meta: { 
          title: 'لوحة التحكم - التقارير',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: Settings,
        meta: { 
          title: 'لوحة التحكم - الإعدادات',
          requiresAuth: true,
          requiresAdmin: true 
        }
      },
      {
        path: 'messages',
        name: 'AdminMessages',
        component: AdminMessages,
        meta: {
          title: 'لوحة التحكم - الرسائل',
          requiresAuth: true,
          requiresAdmin: true
        }
      },
      {
        path: 'notifications',
        name: 'AdminNotifications',
        component: AdminNotifications,
        meta: {
          title: 'لوحة التحكم - الإشعارات',
          requiresAuth: true,
          requiresAdmin: true
        }
      }
    ]
  },
  
  // إعادة التوجيه لصفحات غير موجودة
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return { top: 0 }
  }
})

// دالة التحقق من المصادقة
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken')
  return token !== null && token !== undefined && token !== ''
}

const isAdmin = () => {
  try {
    const userData = localStorage.getItem('userData')
    if (!userData) return false
    
    const user = JSON.parse(userData)
    return user.role === 'admin' || user.isAdmin === true || user.type === 'admin'
  } catch (error) {
    console.warn('Error checking admin role in isAdmin():', error)
    return false
  }
}

const isEmployee = () => {
  try {
    const userData = localStorage.getItem('userData')
    if (!userData) return false
    
    const user = JSON.parse(userData)
    return user.role === 'employee' || user.type === 'employee'
  } catch (error) {
    console.warn('Error checking employee role in isEmployee():', error)
    return false
  }
}

const isUser = () => {
  try {
    const userData = localStorage.getItem('userData')
    if (!userData) return false
    
    const user = JSON.parse(userData)
    const userRoles = ['user', 'parent', 'teacher', 'student']
    return userRoles.includes(user.role) || userRoles.includes(user.type) || !user.isAdmin
  } catch (error) {
    console.warn('Error checking user role in isUser():', error)
    return false
  }
}

// حفظ آخر مسار تم زيارته
const saveLastRoute = (to) => {
  if (to.name && !to.meta.requiresGuest) {
    localStorage.setItem('lastRoute', JSON.stringify({
      name: to.name,
      params: to.params,
      query: to.query,
      path: to.path
    }))
  }
}

// حماية المسارات
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // استعادة آخر مسار عند تحديث الصفحة
  if (from.name === undefined && to.name === 'Home') {
    const lastRoute = localStorage.getItem('lastRoute')
    if (lastRoute) {
      try {
        const route = JSON.parse(lastRoute)
        if (isAuthenticated()) {
          return next(route)
        }
      } catch (error) {
        console.warn('Error parsing last route:', error)
      }
    }
  }

  if (to.meta.requiresAuth) {
    if (!isAuthenticated()) {
      next('/login')
    } 
    else if (to.meta.requiresAdmin && !isAdmin()) {
      if (isEmployee()) {
        next('/employee')
      } else if (isUser()) {
        next('/favorites') // تحديث: التوجيه إلى المفضلة بدلاً من المكتبة
      } else {
        next('/')
      }
    }
    else if (to.meta.requiresEmployee && !isEmployee()) {
      if (isAdmin()) {
        next('/admin')
      } else if (isUser()) {
        next('/favorites') // تحديث: التوجيه إلى المفضلة بدلاً من المكتبة
      } else {
        next('/')
      }
    }
    else if (to.meta.requiresUser && !isUser()) {
      if (isAdmin()) {
        next('/admin')
      } else if (isEmployee()) {
        next('/employee')
      } else {
        next('/')
      }
    }
    else {
      next()
      saveLastRoute(to)
    }
  } 
  else if (to.meta.requiresGuest && isAuthenticated()) {
    if (isAdmin()) {
      next('/admin')
    } else if (isEmployee()) {
      next('/employee')
    } else if (isUser()) {
      next('/dashboard') // التوجيه إلى لوحة النشاط
    } else {
      next('/')
    }
  } 
  else {
    next()
  }
})

// دالة مساعدة للتسجيل السريع (للتطوير)
const quickLogin = (type = 'user') => {
  let userData
  
  switch (type) {
    case 'admin':
      userData = {
        id: 1,
        name: 'أحمد محمد',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'أ',
        isAdmin: true,
        type: 'admin'
      }
      break
    case 'employee':
      userData = {
        id: 3,
        name: 'محمد علي',
        email: 'employee@example.com',
        role: 'employee',
        avatar: 'م',
        isAdmin: false,
        type: 'employee'
      }
      break
    case 'user':
    default:
      userData = {
        id: 2,
        name: 'مستفيد جديد',
        email: 'user@example.com',
        role: 'user',
        avatar: 'م',
        isAdmin: false,
        type: 'user'
      }
      break
  }
  
  localStorage.setItem('authToken', `${type}-demo-token-${Date.now()}`)
  localStorage.setItem('userData', JSON.stringify(userData))
  
  console.log('🚀 تم التسجيل السريع:', userData)
  
  if (type === 'admin') {
    router.push('/admin')
  } else if (type === 'employee') {
    router.push('/employee')
  } else {
    router.push('/dashboard') // التوجيه إلى لوحة النشاط
  }
  
  return userData
}

// جعل الدالة متاحة globally للتطوير
if (process.env.NODE_ENV === 'development') {
  window.quickLogin = quickLogin
  window.getUserInfo = () => {
    return {
      token: localStorage.getItem('authToken'),
      userData: localStorage.getItem('userData'),
      isAdmin: isAdmin(),
      isEmployee: isEmployee(),
      isUser: isUser()
    }
  }
  
  window.clearAuth = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    console.log('🧹 تم مسح بيانات المصادقة')
    router.push('/')
  }
  
  window.debugRoutes = () => {
    console.log('🔍 مسارات التطبيق:')
    routes.forEach(route => {
      console.log(`- ${route.path} (${route.name})`)
    })
  }

  window.goToAdminDashboard = () => {
    router.push('/admin')
  }
  
  window.goToEmployeeDashboard = () => {
    router.push('/employee')
  }
  
  window.goToUserDashboard = () => {
    router.push('/dashboard')
  }
  
  window.goToStoriesManagement = () => {
    if (isAdmin()) {
      router.push('/admin/stories')
    } else if (isEmployee()) {
      router.push('/employee/stories')
    }
  }
  
  window.goToAddStory = () => {
    if (isAdmin()) {
      router.push('/admin/stories/new')
    } else if (isEmployee()) {
      router.push('/employee/stories/new')
    }
  }
  
  window.goToEditStory = (id) => {
    if (isAdmin()) {
      router.push(`/admin/stories/edit/${id}`)
    } else if (isEmployee()) {
      router.push(`/employee/stories/edit/${id}`)
    }
  }
  
  window.goToAddUser = () => {
    router.push('/employee/users/new')
  }

  // دوال جديدة للمسارات الجديدة
  window.goToCustomStory = () => {
    router.push('/custom-story')
  }
  
  window.goToStoryViewer = (params = {}) => {
    router.push({
      path: '/story-viewer',
      query: params
    })
  }
}

export default router