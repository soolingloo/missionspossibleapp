import React, { useState, useEffect } from 'react';
import { Plus, Target, LogOut, User } from 'lucide-react';
import { CategoryCard } from './components/CategoryCard';
import { AddCategoryModal } from './components/AddCategoryModal';
import { AuthModal } from './components/AuthModal';
import { SuccessPopup } from './components/SuccessPopup';
import { Category } from './types';
import { loadCategories, saveCategories } from './utils/storage';
import { supabase } from './lib/supabase';

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setCategories(loadCategories());
    }
  }, [user]);

  useEffect(() => {
    if (categories.length > 0 && user) {
      saveCategories(categories);
    }
  }, [categories, user]);

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(cat =>
      cat.id === updatedCategory.id ? updatedCategory : cat
    ));
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleAddCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      tasks: [],
      color,
    };
    setCategories([...categories, newCategory]);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCategories([]);
  };

  const handleSignUpSuccess = () => {
    setShowAuthModal(false);
    setShowSuccessPopup(true);
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    setShowAuthModal(true);
  };

  const totalTasks = categories.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const completedTasks = categories.reduce(
    (sum, cat) => sum + cat.tasks.filter(t => t.completed).length,
    0
  );

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#adc8f7' }}>
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#adc8f7' }}>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')] bg-cover bg-center opacity-5" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="rounded-2xl p-12 max-w-2xl w-full shadow-2xl text-center" style={{ backgroundColor: '#e8f0ff' }}>
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg inline-block mb-6">
              <Target className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Missions Possible
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your productivity command center
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Get Started
            </button>
          </div>
        </div>

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleSignUpSuccess}
          />
        )}

        {showSuccessPopup && (
          <SuccessPopup onClose={handleSuccessPopupClose} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#adc8f7' }}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80')] bg-cover bg-center opacity-5" />
      
      <div className="relative z-10">
        <header className="glass-strong shadow-lg sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Missions Possible
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Your productivity command center
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="glass-light rounded-xl px-4 py-2">
                  <div className="text-sm text-gray-600">Total Progress</div>
                  <div className="text-lg font-bold text-gray-800">
                    {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
                  </div>
                </div>

                <div className="glass-light rounded-xl px-4 py-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{userName}</span>
                </div>
                
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Add Category
                </button>

                <button
                  onClick={handleSignOut}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {categories.length === 0 ? (
            <div className="rounded-2xl p-12 text-center shadow-lg" style={{ backgroundColor: '#e8f0ff' }}>
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                No Categories Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start by adding your first category to organize your tasks
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 inline-flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Your First Category
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onUpdateCategory={handleUpdateCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              ))}
            </div>
          )}
        </main>

        <footer className="glass-light mt-12 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
            <p>Built with ChatAndBuild • Make every mission possible</p>
          </div>
        </footer>
      </div>

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCategory}
        />
      )}
    </div>
  );
}

export default App;
