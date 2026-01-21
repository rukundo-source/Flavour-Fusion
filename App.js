import React, { useState } from 'react';
import { 
  Plus, X, Utensils, ShoppingCart, ChefHat, 
  Clock, Flame, Check, Search, Loader2,
  ArrowLeft, BookOpen, Heart, Share2
} from 'lucide-react';

const FlavourFusion = () => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(['chicken', 'rice', 'broccoli', 'garlic']); 
  const [shoppingList, setShoppingList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [aiRecipe, setAiRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Sample recipes for demonstration
  const sampleRecipes = [
    {
      id: 1,
      name: "Garlic Chicken Stir Fry",
      description: "A quick and healthy chicken stir fry with rice and vegetables",
      time: 30,
      difficulty: "Easy",
      serves: 4,
      ingredients: [
        "500g chicken breast, sliced",
        "2 cups white rice",
        "1 head of broccoli, chopped",
        "4 cloves garlic, minced",
        "2 tbsp soy sauce",
        "1 tbsp olive oil",
        "1 onion, sliced"
      ],
      steps: [
        "Cook rice according to package instructions",
        "Heat olive oil in a large pan over medium heat",
        "Add chicken and cook until golden brown (5-6 minutes)",
        "Add onion and garlic, cook for 2 minutes",
        "Add broccoli and cook for 3 more minutes",
        "Stir in soy sauce and serve over rice"
      ],
      tips: "Add a pinch of ginger for extra flavor",
      category: "Dinner"
    },
    {
      id: 2,
      name: "Simple Pasta Dinner",
      description: "Easy pasta with tomato sauce and garlic bread",
      time: 25,
      difficulty: "Very Easy",
      serves: 3,
      ingredients: [
        "250g pasta",
        "1 can crushed tomatoes",
        "3 cloves garlic, chopped",
        "Fresh basil leaves",
        "Grated cheese",
        "2 tbsp olive oil"
      ],
      steps: [
        "Boil water and cook pasta until tender",
        "Chop garlic and sauté in olive oil",
        "Add crushed tomatoes and simmer for 10 minutes",
        "Drain pasta and mix with sauce",
        "Top with cheese and basil"
      ],
      tips: "Save some pasta water to thicken the sauce",
      category: "Italian"
    },
    {
      id: 3,
      name: "Quick Veggie Omelette",
      description: "Healthy breakfast omelette with vegetables",
      time: 15,
      difficulty: "Easy",
      serves: 2,
      ingredients: [
        "4 eggs",
        "1 bell pepper, diced",
        "1 onion, chopped",
        "Handful of spinach",
        "2 tbsp milk",
        "Salt and pepper",
        "1 tbsp butter"
      ],
      steps: [
        "Beat eggs with milk, salt and pepper",
        "Melt butter in a non-stick pan",
        "Sauté onion and bell pepper for 3 minutes",
        "Add spinach and cook until wilted",
        "Pour egg mixture over vegetables",
        "Cook until set, fold and serve"
      ],
      tips: "Add cheese for extra creaminess",
      category: "Breakfast"
    }
  ];

  // Simulate AI recipe generation
  const createRecipe = () => {
    if (ingredients.length === 0) {
      alert("Please add some ingredients first!");
      return;
    }
    
    setIsCreating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Find a recipe that matches some ingredients
      const userIngredients = ingredients.map(i => i.toLowerCase());
      const matchingRecipes = sampleRecipes.filter(recipe => 
        recipe.ingredients.some(ing => 
          userIngredients.some(userIng => 
            ing.toLowerCase().includes(userIng)
          )
        )
      );
      
      const selectedRecipe = matchingRecipes.length > 0 
        ? matchingRecipes[0]
        : sampleRecipes[Math.floor(Math.random() * sampleRecipes.length)];
      
      setAiRecipe(selectedRecipe);
      setIsCreating(false);
    }, 1500);
  };

  const addIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.toLowerCase()]);
      setInputValue('');
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const addToShoppingList = (item) => {
    if (!shoppingList.includes(item)) {
      setShoppingList([...shoppingList, item]);
      alert(`Added "${item}" to shopping list`);
    }
  };

  const removeFromShoppingList = (item) => {
    setShoppingList(shoppingList.filter(i => i !== item));
  };

  const toggleFavorite = (recipeId) => {
    if (favorites.includes(recipeId)) {
      setFavorites(favorites.filter(id => id !== recipeId));
    } else {
      setFavorites([...favorites, recipeId]);
    }
  };

  const clearAllIngredients = () => {
    setIngredients([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl overflow-hidden">
        
        {/* Header */}
        <header className="px-6 pt-8 pb-6 bg-white border-b border-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                <ChefHat size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Flavour Fusion</h1>
                <p className="text-sm text-gray-500">Create recipes from what you have</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('cart')}
              className="relative p-2"
            >
              <ShoppingCart size={24} className="text-gray-600" />
              {shoppingList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {shoppingList.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="px-6 pb-24 overflow-y-auto max-h-[calc(100vh-180px)]">
          {/* Home Tab */}
          {activeTab === 'home' && !selectedRecipe && (
            <div className="space-y-8 pt-6">
              
              {/* Ingredients Section */}
              <section className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Search size={20} className="text-orange-500" />
                    Your Ingredients
                  </h2>
                  {ingredients.length > 0 && (
                    <button 
                      onClick={clearAllIngredients}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                <div className="flex gap-2 mb-6">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                    placeholder="Type an ingredient (e.g., chicken, rice, tomato)" 
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                  <button 
                    onClick={addIngredient} 
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 rounded-xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    You have {ingredients.length} ingredients
                  </span>
                  {ingredients.length > 0 && (
                    <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-red-400 transition-all duration-300"
                        style={{ width: `${Math.min(ingredients.length * 10, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 min-h-[60px]">
                  {ingredients.length === 0 ? (
                    <p className="text-gray-400 text-center py-4 w-full">
                      No ingredients yet. Start by adding some above!
                    </p>
                  ) : (
                    ingredients.map((ing, idx) => (
                      <div 
                        key={idx} 
                        className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-gray-800 px-4 py-3 rounded-xl flex items-center gap-2 shadow-sm"
                      >
                        <span className="capitalize font-medium">{ing}</span>
                        <button 
                          onClick={() => removeIngredient(ing)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Create Recipe Button */}
              <button 
                onClick={createRecipe}
                disabled={isCreating || ingredients.length === 0}
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all flex justify-center items-center gap-3 shadow-lg
                  ${isCreating || ingredients.length === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl active:scale-95'}
                `}
              >
                {isCreating ? (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    Creating Your Recipe...
                  </>
                ) : (
                  <>
                    <ChefHat size={22} />
                    {ingredients.length === 0 ? 'Add Ingredients First' : 'Create Recipe'}
                  </>
                )}
              </button>

              {/* Recipe Suggestions */}
              {aiRecipe && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow cursor-pointer animate-fadeIn"
                     onClick={() => setSelectedRecipe(aiRecipe)}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-2">
                        {aiRecipe.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">{aiRecipe.name}</h3>
                      <p className="text-gray-600 mt-1">{aiRecipe.description}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(aiRecipe.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Heart 
                        size={22} 
                        className={favorites.includes(aiRecipe.id) ? "fill-red-500 text-red-500" : "text-gray-300"}
                      />
                    </button>
                  </div>
                  
                  <div className="flex gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{aiRecipe.time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={16} />
                      <span>{aiRecipe.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Utensils size={16} />
                      <span>Serves {aiRecipe.serves}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-400">Made with your ingredients: </span>
                      <span className="font-medium text-orange-600">
                        {ingredients.slice(0, 3).join(', ')}
                        {ingredients.length > 3 && '...'}
                      </span>
                    </div>
                    <button className="text-orange-500 font-semibold text-sm hover:text-orange-600">
                      View Recipe →
                    </button>
                  </div>
                </div>
              )}

              {/* More Recipe Suggestions */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Try These Recipes
                </h3>
                <div className="space-y-4">
                  {sampleRecipes.map(recipe => (
                    <div 
                      key={recipe.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors cursor-pointer"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{recipe.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(recipe.id);
                          }}
                        >
                          <Heart 
                            size={18} 
                            className={favorites.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-300"}
                          />
                        </button>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-500 mt-3">
                        <span>{recipe.time} min</span>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shopping List Tab */}
          {activeTab === 'cart' && !selectedRecipe && (
            <div className="pt-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Shopping List</h2>
                {shoppingList.length > 0 && (
                  <button 
                    onClick={clearShoppingList}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {shoppingList.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">Your shopping list is empty</p>
                  <p className="text-gray-400 text-sm mt-1">Add ingredients from recipes</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shoppingList.map((item, i) => (
                    <div 
                      key={i} 
                      className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center">
                          <Check size={14} className="text-gray-300" />
                        </div>
                        <span className="font-medium text-gray-800">{item}</span>
                      </div>
                      <button 
                        onClick={() => removeFromShoppingList(item)} 
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recipe Detail View */}
          {selectedRecipe && (
            <div className="pt-6 pb-8">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setSelectedRecipe(null)} 
                  className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleFavorite(selectedRecipe.id)}
                    className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200"
                  >
                    <Heart 
                      size={20} 
                      className={favorites.includes(selectedRecipe.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                    />
                  </button>
                  <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Recipe Header */}
              <div className="mb-8">
                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-3">
                  {selectedRecipe.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">{selectedRecipe.name}</h2>
                <p className="text-gray-600 text-lg">{selectedRecipe.description}</p>
                
                <div className="flex gap-6 mt-6">
                  <div className="text-center">
                    <Clock size={24} className="text-orange-500 mx-auto mb-2" />
                    <div className="font-bold text-gray-800">{selectedRecipe.time} min</div>
                    <div className="text-sm text-gray-500">Prep & Cook</div>
                  </div>
                  <div className="text-center">
                    <Flame size={24} className="text-orange-500 mx-auto mb-2" />
                    <div className="font-bold text-gray-800">{selectedRecipe.difficulty}</div>
                    <div className="text-sm text-gray-500">Difficulty</div>
                  </div>
                  <div className="text-center">
                    <Utensils size={24} className="text-orange-500 mx-auto mb-2" />
                    <div className="font-bold text-gray-800">{selectedRecipe.serves}</div>
                    <div className="text-sm text-gray-500">Servings</div>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
                <div className="space-y-3">
                  {selectedRecipe.ingredients.map((ingredient, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-800">{ingredient}</span>
                      </div>
                      <button 
                        onClick={() => addToShoppingList(ingredient)}
                        className="p-2 text-gray-400 hover:text-orange-500"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
                <div className="space-y-4">
                  {selectedRecipe.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-none">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef's Tip */}
              <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat size={18} className="text-orange-500" />
                  <span className="font-bold text-orange-600">Chef's Tip</span>
                </div>
                <p className="text-gray-700 italic">{selectedRecipe.tips}</p>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-8 py-4 flex justify-around items-center">
          <button 
            onClick={() => {
              setActiveTab('home');
              setSelectedRecipe(null);
            }} 
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              activeTab === 'home' && !selectedRecipe 
                ? 'text-orange-500 bg-orange-50' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Utensils size={24} />
            <span className="text-xs mt-1">Recipes</span>
          </button>
          
          <button 
            onClick={() => {
              setActiveTab('cart');
              setSelectedRecipe(null);
            }} 
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${
              activeTab === 'cart' 
                ? 'text-orange-500 bg-orange-50' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">Shopping</span>
          </button>
          
          <button 
            onClick={() => {
              // Favorites section (you can expand this)
              alert('Favorites feature coming soon!');
            }}
            className="flex flex-col items-center p-3 rounded-xl text-gray-500 hover:text-gray-700"
          >
            <Heart size={24} />
            <span className="text-xs mt-1">Favorites</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default FlavourFusion;
