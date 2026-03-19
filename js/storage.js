// ==================== 存储服务 ====================

const StorageService = {
  get: function(key) {
    try {
      var data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },
  
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },
  
  remove: function(key) {
    localStorage.removeItem(key);
  }
};

const KEYS = {
  USERS: 'km_users',
  CURRENT_USER: 'km_current_user',
  NOTEBOOKS: 'km_notebooks',
  NOTES: 'km_notes',
  SETTINGS: 'km_settings'
};

// 默认用户
const DEFAULT_USER = {
  id: 'default_user',
  email: 'user@example.com',
  name: '用户',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// 用户服务
const UserService = {
  getAll: function() {
    return StorageService.get(KEYS.USERS) || [];
  },
  
  initDefaultUser: function() {
    var users = UserService.getAll();
    if (users.length === 0) {
      users.push(DEFAULT_USER);
      StorageService.set(KEYS.USERS, users);
    }
    return DEFAULT_USER;
  },
  
  getCurrentUser: function() {
    var user = StorageService.get(KEYS.CURRENT_USER);
    if (!user) {
      return UserService.initDefaultUser();
    }
    return user;
  }
};

// 笔记本服务
const NotebookService = {
  getAll: function() {
    return StorageService.get(KEYS.NOTEBOOKS) || [];
  },
  
  getByUserId: function(userId) {
    var notebooks = NotebookService.getAll();
    return notebooks.filter(function(n) { return n.userId === userId; });
  },
  
  create: function(data) {
    var notebooks = NotebookService.getAll();
    var notebook = {
      id: generateId(),
      userId: data.userId,
      name: data.name,
      description: data.description || '',
      color: data.color || '#6366f1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    notebooks.push(notebook);
    StorageService.set(KEYS.NOTEBOOKS, notebooks);
    return notebook;
  }
};

// 笔记服务
const NoteService = {
  getAll: function() {
    return StorageService.get(KEYS.NOTES) || [];
  },
  
  getByUserId: function(userId) {
    var notes = NoteService.getAll();
    return notes.filter(function(n) {
      return n.userId === userId && !n.isDeleted;
    }).sort(function(a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  },
  
  getByDimension: function(userId, dimensionId) {
    var notes = NoteService.getByUserId(userId);
    return notes.filter(function(n) {
      return n.dimensions && n.dimensions.includes(dimensionId);
    });
  },
  
  create: function(data) {
    var notes = NoteService.getAll();
    var note = {
      id: generateId(),
      userId: data.userId,
      title: data.title || '',
      content: data.content || '',
      dimensions: data.dimensions || [],
      summary: generateSummary(data.content),
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    notes.push(note);
    StorageService.set(KEYS.NOTES, notes);
    return note;
  },
  
  update: function(id, updates) {
    var notes = NoteService.getAll();
    var index = notes.findIndex(function(n) { return n.id === id; });
    if (index !== -1) {
      notes[index] = Object.assign({}, notes[index], updates, { 
        updatedAt: new Date().toISOString()
      });
      if (updates.content) {
        notes[index].summary = generateSummary(updates.content);
      }
      StorageService.set(KEYS.NOTES, notes);
      return notes[index];
    }
    return null;
  },
  
  delete: function(id) {
    return NoteService.update(id, { isDeleted: true });
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    StorageService: StorageService,
    UserService: UserService,
    NotebookService: NotebookService,
    NoteService: NoteService
  };
}
