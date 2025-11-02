// نظام إدارة الإحصائيات والتحديث اللحظي
export const StatisticsManager = {
  // تسجيل تفاعل جديد
  recordInteraction(interactionData) {
    try {
      const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
      
      const newInteraction = {
        id: this.generateId(),
        timestamp: new Date().toISOString(),
        ...interactionData
      };
      
      interactions.push(newInteraction);
      localStorage.setItem('userInteractions', JSON.stringify(interactions));
      
      // إطلاق حدث تحديث التفاعلات
      this.emitInteractionUpdate();
      
      // تحديث إحصائيات القصة إذا كانت مرتبطة بقصة
      if (interactionData.storyId) {
        this.updateStoryStatistics(interactionData.storyId);
      }
      
      // تحديث إحصائيات المستخدم إذا كان مرتبطًا بمستخدم
      if (interactionData.userId) {
        this.updateUserStatistics(interactionData.userId);
      }
      
      console.log('✅ تم تسجيل التفاعل:', newInteraction);
      return newInteraction;
    } catch (error) {
      console.error('❌ خطأ في تسجيل التفاعل:', error);
      throw error;
    }
  },

  // تسجيل مشاهدة قصة
  recordStoryView(storyId, userId = null) {
    return this.recordInteraction({
      interactionType: 'view',
      storyId,
      userId,
      metadata: {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    });
  },

  // تسجيل إعجاب بقصة
  recordStoryLike(storyId, userId = null) {
    return this.recordInteraction({
      interactionType: 'like',
      storyId,
      userId
    });
  },

  // تسجيل تحميل قصة
  recordStoryDownload(storyId, userId = null) {
    return this.recordInteraction({
      interactionType: 'download',
      storyId,
      userId
    });
  },

  // تسجيل مشاركة قصة
  recordStoryShare(storyId, userId = null, platform = 'unknown') {
    return this.recordInteraction({
      interactionType: 'share',
      storyId,
      userId,
      metadata: { platform }
    });
  },

  // تسجيل تعليق على قصة
  recordStoryComment(storyId, userId = null, commentId) {
    return this.recordInteraction({
      interactionType: 'comment',
      storyId,
      userId,
      metadata: { commentId }
    });
  },

  // الحصول على إحصائيات القصة
  getStoryStatistics(storyId) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const storyInteractions = interactions.filter(i => i.storyId === storyId);
    
    return {
      views: storyInteractions.filter(i => i.interactionType === 'view').length,
      likes: storyInteractions.filter(i => i.interactionType === 'like').length,
      downloads: storyInteractions.filter(i => i.interactionType === 'download').length,
      shares: storyInteractions.filter(i => i.interactionType === 'share').length,
      comments: storyInteractions.filter(i => i.interactionType === 'comment').length,
      totalInteractions: storyInteractions.length,
      lastInteraction: storyInteractions.length > 0 ? 
        storyInteractions[storyInteractions.length - 1].timestamp : null
    };
  },

  // الحصول على إحصائيات المستخدم
  getUserStatistics(userId) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const userInteractions = interactions.filter(i => i.userId === userId);
    
    return {
      totalInteractions: userInteractions.length,
      views: userInteractions.filter(i => i.interactionType === 'view').length,
      likes: userInteractions.filter(i => i.interactionType === 'like').length,
      downloads: userInteractions.filter(i => i.interactionType === 'download').length,
      shares: userInteractions.filter(i => i.interactionType === 'share').length,
      comments: userInteractions.filter(i => i.interactionType === 'comment').length,
      favoriteCategories: this.getUserFavoriteCategories(userId),
      readingTime: this.calculateUserReadingTime(userId),
      lastActivity: userInteractions.length > 0 ? 
        userInteractions[userInteractions.length - 1].timestamp : null
    };
  },

  // الحصول على الإحصائيات العامة
  getGeneralStatistics() {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const stories = JSON.parse(localStorage.getItem('libraryStories') || localStorage.getItem('adminStories') || '[]');
    const users = JSON.parse(localStorage.getItem('libraryUsers') || '[]');
    
    const today = new Date().toDateString();
    const todayInteractions = interactions.filter(i => 
      new Date(i.timestamp).toDateString() === today
    );

    // حساب النمو عن الفترة السابقة
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayInteractions = interactions.filter(i => 
      new Date(i.timestamp).toDateString() === yesterday.toDateString()
    );

    // القصص الجديدة اليوم
    const newStoriesToday = stories.filter(story => 
      story.created_at && new Date(story.created_at).toDateString() === today
    ).length;

    // المستخدمين الجدد اليوم
    const newUsersToday = users.filter(user => 
      user.createdAt && new Date(user.createdAt).toDateString() === today
    ).length;

    // التعليقات الجديدة اليوم
    const newCommentsToday = interactions.filter(i => 
      i.interactionType === 'comment' && 
      new Date(i.timestamp).toDateString() === today
    ).length;

    return {
      // الإحصائيات الأساسية
      totalStories: stories.length,
      totalUsers: users.length,
      totalInteractions: interactions.length,
      
      // إحصائيات اليوم
      todayInteractions: todayInteractions.length,
      todayViews: todayInteractions.filter(i => i.interactionType === 'view').length,
      todayLikes: todayInteractions.filter(i => i.interactionType === 'like').length,
      todayComments: newCommentsToday,
      
      // إحصائيات النمو
      newStoriesToday,
      newUsersToday,
      newCommentsToday,
      
      // معدلات النمو
      interactionsGrowth: this.calculateGrowth(todayInteractions.length, yesterdayInteractions.length),
      engagementRate: this.calculateEngagementRate(users.length, interactions.length),
      
      // متوسط التقييم
      averageRating: stories.length > 0 ? 
        (stories.reduce((sum, story) => sum + parseFloat(story.rating || 0), 0) / stories.length).toFixed(1) : 0,
      
      // توزيع التفاعلات
      interactionBreakdown: {
        views: interactions.filter(i => i.interactionType === 'view').length,
        likes: interactions.filter(i => i.interactionType === 'like').length,
        downloads: interactions.filter(i => i.interactionType === 'download').length,
        shares: interactions.filter(i => i.interactionType === 'share').length,
        comments: interactions.filter(i => i.interactionType === 'comment').length
      }
    };
  },

  // الحصول على الإحصائيات الزمنية
  getTimeBasedStatistics(days = 30) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const filteredInteractions = interactions.filter(i => {
      const interactionDate = new Date(i.timestamp);
      return interactionDate >= startDate && interactionDate <= endDate;
    });

    // تجميع البيانات حسب اليوم
    const dailyStats = {};
    filteredInteractions.forEach(interaction => {
      const date = new Date(interaction.timestamp).toDateString();
      if (!dailyStats[date]) {
        dailyStats[date] = {
          views: 0,
          likes: 0,
          downloads: 0,
          shares: 0,
          comments: 0,
          total: 0
        };
      }
      
      dailyStats[date][interaction.interactionType + 's']++;
      dailyStats[date].total++;
    });

    return {
      period: `${days} يوم`,
      totalInteractions: filteredInteractions.length,
      averageDailyInteractions: (filteredInteractions.length / days).toFixed(1),
      dailyStats: Object.entries(dailyStats).map(([date, stats]) => ({
        date,
        ...stats
      })).sort((a, b) => new Date(a.date) - new Date(b.date))
    };
  },

  // الحصول على القصص الأكثر تفاعلاً
  getTopStories(limit = 10) {
    const stories = JSON.parse(localStorage.getItem('libraryStories') || localStorage.getItem('adminStories') || '[]');
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    
    const storiesWithStats = stories.map(story => {
      const storyInteractions = interactions.filter(i => i.storyId === story.id);
      const stats = this.getStoryStatistics(story.id);
      
      return {
        ...story,
        stats,
        engagementScore: this.calculateEngagementScore(stats)
      };
    });

    return storiesWithStats
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);
  },

  // الحصول على المستخدمين الأكثر نشاطاً
  getTopUsers(limit = 10) {
    const users = JSON.parse(localStorage.getItem('libraryUsers') || '[]');
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    
    const usersWithStats = users.map(user => {
      const userStats = this.getUserStatistics(user.id);
      
      return {
        ...user,
        stats: userStats,
        activityScore: userStats.totalInteractions
      };
    });

    return usersWithStats
      .sort((a, b) => b.activityScore - a.activityScore)
      .slice(0, limit);
  },

  // تحديث إحصائيات القصة في localStorage
  updateStoryStatistics(storyId) {
    const stats = this.getStoryStatistics(storyId);
    const stories = JSON.parse(localStorage.getItem('libraryStories') || localStorage.getItem('adminStories') || '[]');
    const storyIndex = stories.findIndex(s => s.id === storyId);
    
    if (storyIndex !== -1) {
      stories[storyIndex].views = stats.views;
      stories[storyIndex].likes = stats.likes;
      stories[storyIndex].downloads = stats.downloads;
      stories[storyIndex].lastInteraction = stats.lastInteraction;
      localStorage.setItem('libraryStories', JSON.stringify(stories));
      
      // إطلاق حدث تحديث القصص
      this.emitStoriesUpdate();
    }
  },

  // تحديث إحصائيات المستخدم في localStorage
  updateUserStatistics(userId) {
    const stats = this.getUserStatistics(userId);
    const users = JSON.parse(localStorage.getItem('libraryUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].lastActivity = stats.lastActivity;
      users[userIndex].totalInteractions = stats.totalInteractions;
      users[userIndex].readingTime = stats.readingTime;
      localStorage.setItem('libraryUsers', JSON.stringify(users));
      
      // إطلاق حدث تحديث المستخدمين
      this.emitUsersUpdate();
    }
  },

  // دوال مساعدة
  calculateGrowth(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous * 100).toFixed(1);
  },

  calculateEngagementRate(totalUsers, totalInteractions) {
    if (totalUsers === 0) return 0;
    return Math.min(100, (totalInteractions / totalUsers) * 100).toFixed(1);
  },

  calculateEngagementScore(stats) {
    const weights = {
      views: 1,
      likes: 3,
      downloads: 2,
      shares: 4,
      comments: 5
    };
    
    return Object.keys(weights).reduce((score, key) => {
      return score + (stats[key] || 0) * weights[key];
    }, 0);
  },

  getUserFavoriteCategories(userId) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const stories = JSON.parse(localStorage.getItem('libraryStories') || localStorage.getItem('adminStories') || '[]');
    
    const userStoryIds = interactions
      .filter(i => i.userId === userId)
      .map(i => i.storyId);
    
    const categories = {};
    userStoryIds.forEach(storyId => {
      const story = stories.find(s => s.id === storyId);
      if (story && story.category) {
        categories[story.category] = (categories[story.category] || 0) + 1;
      }
    });
    
    return Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));
  },

  calculateUserReadingTime(userId) {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const viewInteractions = interactions.filter(i => 
      i.userId === userId && i.interactionType === 'view'
    );
    
    // افتراض أن متوسط وقت القراءة 3 دقائق لكل قصة
    return viewInteractions.length * 3;
  },

  // إطلاق أحداث التحديث
  emitInteractionUpdate() {
    window.dispatchEvent(new CustomEvent('interactionsUpdated', {
      detail: { 
        timestamp: new Date().toISOString(),
        type: 'interactions'
      }
    }));
  },

  emitStoriesUpdate() {
    window.dispatchEvent(new CustomEvent('storiesUpdated', {
      detail: { 
        timestamp: new Date().toISOString(),
        type: 'stories'
      }
    }));
  },

  emitUsersUpdate() {
    window.dispatchEvent(new CustomEvent('usersUpdated', {
      detail: { 
        timestamp: new Date().toISOString(),
        type: 'users'
      }
    }));
  },

  emitStatisticsUpdate() {
    window.dispatchEvent(new CustomEvent('statisticsUpdated', {
      detail: { 
        timestamp: new Date().toISOString(),
        type: 'all',
        data: this.getGeneralStatistics()
      }
    }));
  },

  // توليد معرف فريد
  generateId() {
    return 'interaction_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // تنظيف البيانات القديمة (أكثر من 90 يوم)
  cleanupOldData(days = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    const filteredInteractions = interactions.filter(i => 
      new Date(i.timestamp) >= cutoffDate
    );
    
    localStorage.setItem('userInteractions', JSON.stringify(filteredInteractions));
    console.log(`🧹 تم تنظيف ${interactions.length - filteredInteractions.length} تفاعل قديم`);
  },

  // تصدير البيانات للإحصائيات
  exportData(format = 'json') {
    const data = {
      generalStats: this.getGeneralStatistics(),
      timeStats: this.getTimeBasedStatistics(30),
      topStories: this.getTopStories(20),
      topUsers: this.getTopUsers(20),
      exportDate: new Date().toISOString()
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }
    
    return data;
  },

  // تهيئة النظام
  initialize() {
    console.log('🚀 نظام الإحصائيات جاهز للعمل');
    
    // التأكد من وجود البيانات الأساسية في localStorage
    if (!localStorage.getItem('userInteractions')) {
      localStorage.setItem('userInteractions', JSON.stringify([]));
    }
    
    // تنظيف البيانات القديمة كل أسبوع
    setInterval(() => {
      this.cleanupOldData();
    }, 7 * 24 * 60 * 60 * 1000); // أسبوع
    
    return this;
  }
};

// تصدير نسخة مهيأة
export default StatisticsManager.initialize();