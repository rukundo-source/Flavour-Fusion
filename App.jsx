import React, { useState, useEffect } from 'react';
import { 
  Plus, X, Utensils, Sparkles, ChevronLeft, 
  ShoppingCart, Trash2, ChefHat, Stars, Package, 
  ArrowUpRight, Award, Flame, Clock, Loader2
} from 'lucide-react';

/**
 * PRODUCTION NOTE: 
 * For GitHub/Vercel deployment, use process.env.REACT_APP_GEMINI_API_KEY
 * For local testing, you can paste your key directly into the string below.
 */
const apiKey = "AIzaSyAY3p7QtDckms2JctB6YYe5jZ1vAdDHi1U"; 

const App = () => {
  const [activeTab, setActiveTab] = useState('home'); 
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(['garlic', 'rosemary', 'olive oil']); 
  const [shoppingList, setShoppingList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isFusing, setIsFusing] = useState(false);
  const [aiRecipe, setAiRecipe] = useState(null);

  const model = "gemini-2.5-flash-preview-09-2025";

  const generateAiRecipe = async () => {
    if (ingredients.length === 0) return;
    setIsFusing(true);
    setAiRecipe(null);

    const systemPrompt = `You are a world-renowned 3-Michelin Star Executive Chef. 
    Turn humble pantry items into a gourmet signature dish.
    
    Return ONLY a JSON object:
    {
      "name": "Dish Name",
      "description": "Sensory description",
      "ingredients": ["1 tbsp Olive Oil", "2 cloves Garlic"],
      "steps": ["Step 1", "Step 2"],
      "time": 25,
      "difficulty": "Advanced",
      "chefSecret": "One professional pro-tip"
    }`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Chef, create a masterpiece using: ${ingredients.join(", ")}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const result = await response.json();
      const recipeData = JSON.parse(result.candidates[0].content.parts[0].text);
      setAiRecipe(recipeData);
    } catch (error) {
      console.error("Chef's Table Error:", error);
    } finally {
      setIsFusing(false);
    }
  };

  const addIngredient = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.toLowerCase()]);
      setInputValue('');
    }
  };

  return (
    <div className="flex justify-center bg-zinc-950 min-h-screen font-sans selection:bg-amber-200 selection:text-amber-900">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-2xl overflow-hidden border-x border-zinc-200">
        
        {/* HEADER - Executive Styling */}
        <header className="px-8 pt-14 pb-6 sticky top-0 bg-white/80 backdrop-blur-xl z-30 flex justify-between items-center border-b border-zinc-100 transition-all duration-300">
          <div className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-zinc-900 rounded-2xl flex items-center justify-center text-amber-400 shadow-xl group-hover:rotate-12 transition-transform duration-500">
              <ChefHat size={24} />
            </div>
            <div>
              <h1 className="text-xl font-serif font-black text-zinc-900 tracking-tight uppercase">Flavour Fusion</h1>
              <p className="text-[9px] font-bold text-amber-600 uppercase tracking-[0.3em] flex items-center gap-1 animate-pulse">
                <Stars size={8} fill="currentColor"/> Executive Suite
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 pb-32 overflow-y-auto no-scrollbar scroll-smooth">
          {activeTab === 'home' && (
            <div className="space-y-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* PANTRY SECTION - Dark Executive Theme */}
              <section className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/20 transition-colors duration-700"></div>
                <h2 className="text-2xl font-serif font-bold mb-6 tracking-tight">The Larder</h2>
                
                <div className="flex gap-2 mb-6">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                    placeholder="Add ingredient..." 
                    className="flex-1 bg-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 border border-white/10 focus:border-amber-500/50 focus:bg-white/10 outline-none transition-all duration-300"
                  />
                  <button 
                    onClick={addIngredient} 
                    className="bg-amber-500 text-zinc-900 px-5 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 active:scale-90 transition-all duration-300 hover:bg-amber-400"
                  >
                    <Plus size={20} strokeWidth={3} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {ingredients.map((ing, idx) => (
                    <span 
                      key={ing} 
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className="bg-white/10 text-zinc-200 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-white/5 hover:bg-white/20 transition-colors animate-in zoom-in-95"
                    >
                      {ing} 
                      <X 
                        size={12} 
                        className="cursor-pointer text-zinc-500 hover:text-amber-400 transition-colors" 
                        onClick={() => setIngredients(ingredients.filter(i => i !== ing))} 
                      />
                    </span>
                  ))}
                </div>
              </section>

              {/* ACTION BUTTON - High Transition Feedback */}
              <button 
                onClick={generateAiRecipe}
                disabled={isFusing || ingredients.length === 0}
                className={`w-full py-6 rounded-[2rem] text-xs font-black tracking-[0.2em] shadow-2xl transition-all duration-500 flex justify-center items-center gap-3 border-2 group
                  ${isFusing 
                    ? 'bg-zinc-50 border-zinc-100 text-zinc-400' 
                    : 'bg-zinc-900 border-zinc-900 text-white hover:bg-zinc-800 active:scale-95 hover:shadow-amber-500/10'}
                `}
              >
                {isFusing ? (
                  <div className="flex items-center gap-3">
                    <Loader2 size={20} className="animate-spin text-amber-500" />
                    CURATING GASTRONOMY...
                  </div>
                ) : (
                  <>
                    <Sparkles size={18} className="text-amber-400 group-hover:animate-spin" /> 
                    CREATE MASTERPIECE
                  </>
                )}
              </button>

              {/* GENERATED RESULT CARD - Premium Layout */}
              {aiRecipe && (
                <div 
                  onClick={() => setSelectedRecipe(aiRecipe)}
                  className="bg-white border border-zinc-100 p-8 rounded-[3rem] hover:border-amber-300 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl relative group animate-in slide-in-from-bottom-8 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8">
                    <ArrowUpRight className="text-zinc-200 group-hover:text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                  </div>
                  
                  <div className="flex gap-1 mb-6">
                    {[1,2,3].map(i => <Stars key={i} size={10} className="text-amber-500" fill="currentColor"/>)}
                  </div>
                  
                  <h4 className="text-2xl font-serif font-black text-zinc-900 mb-3 leading-tight tracking-tight">{aiRecipe.name}</h4>
                  <p className="text-zinc-500 text-sm mb-8 leading-relaxed italic font-medium">"{aiRecipe.description}"</p>
                  
                  <div className="flex gap-6 border-t border-zinc-50 pt-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      <Clock size={14} className="text-amber-500/50"/> {aiRecipe.time}m
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      <Flame size={14} className="text-amber-500/50"/> {aiRecipe.difficulty}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SHOPPING CART TAB */}
          {activeTab === 'cart' && (
            <div className="pt-6 space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-serif font-bold text-zinc-900">Provision List</h2>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{shoppingList.length} Items</span>
              </div>
              
              {shoppingList.length === 0 ? (
                 <div className="text-center py-24 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Package size={32} className="text-zinc-200" />
                    </div>
                    <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Larder is Optimal</p>
                 </div>
              ) : (
                <div className="space-y-3">
                  {shoppingList.map((item, i) => (
                    <div 
                      key={i} 
                      className="group bg-white p-6 rounded-3xl border border-zinc-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in"
                    >
                      <span className="font-bold text-zinc-800 capitalize flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-zinc-200 rounded-lg group-hover:border-amber-400 transition-colors"></div>
                        {item}
                      </span>
                      <button 
                        onClick={() => setShoppingList(shoppingList.filter(s => s !== item))} 
                        className="text-zinc-200 hover:text-zinc-900 transition-colors"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* RECIPE DETAIL OVERLAY - Immersive Transitions */}
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom-full duration-700 no-scrollbar pb-32">
            <div className="max-w-md mx-auto relative">
              
              {/* Overlay Header */}
              <div className="sticky top-0 p-8 bg-white/90 backdrop-blur-xl flex justify-between items-center z-10 border-b border-zinc-50">
                <button 
                  onClick={() => setSelectedRecipe(null)} 
                  className="p-4 bg-zinc-900 text-white rounded-2xl shadow-xl active:scale-90 transition-transform"
                >
                  <ChevronLeft size={20} strokeWidth={3}/>
                </button>
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
                   <Award size={14} />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Signature Selection</span>
                </div>
              </div>

              <div className="px-10 pt-8 pb-20">
                {/* Chef Tip Box */}
                <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white mb-12 relative overflow-hidden shadow-2xl group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <ChefHat size={80} />
                  </div>
                  <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-3">Chef's Secret</p>
                  <p className="text-sm font-medium text-zinc-300 leading-relaxed italic">"{selectedRecipe.chefSecret}"</p>
                </div>

                <h1 className="text-5xl font-serif font-black text-zinc-900 mb-6 tracking-tighter leading-none">{selectedRecipe.name}</h1>
                <p className="text-zinc-500 text-xl mb-12 leading-relaxed italic font-serif">"{selectedRecipe.description}"</p>

                {/* Ingredients Grid */}
                <div className="mb-16">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase mb-6 tracking-[0.3em]">Mise en Place</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:border-amber-200 transition-colors">
                        <span className="font-bold text-zinc-800 text-sm">{ing}</span>
                        <button 
                          onClick={() => setShoppingList([...shoppingList, ing])}
                          className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-zinc-300 group-hover:text-amber-600 group-hover:shadow-md transition-all"
                        >
                          <Plus size={18} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps Section */}
                <div className="space-y-12">
                  <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">The Execution</h4>
                  {selectedRecipe.steps.map((step, i) => (
                    <div key={i} className="flex gap-8 group">
                       <div className="flex-none">
                        <div className="w-10 h-10 rounded-2xl border-2 border-zinc-900 flex items-center justify-center font-black text-xs group-hover:bg-zinc-900 group-hover:text-amber-400 transition-all duration-300 shadow-lg">
                          {i + 1}
                        </div>
                       </div>
                       <p className="text-zinc-600 font-medium leading-relaxed text-base pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION - Floating Tab Bar */}
        <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-2xl border-t border-zinc-100 px-10 py-8 flex justify-around items-center z-40 rounded-t-[3.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`p-5 rounded-[1.8rem] transition-all duration-500 relative group
              ${activeTab === 'home' ? "bg-zinc-900 text-amber-400 shadow-2xl scale-110 -translate-y-2" : "text-zinc-300 hover:text-zinc-500"}
            `}
          >
            <Utensils size={26} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            {activeTab === 'home' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab('cart')} 
            className={`p-5 rounded-[1.8rem] transition-all duration-500 relative group
              ${activeTab === 'cart' ? "bg-zinc-900 text-amber-400 shadow-2xl scale-110 -translate-y-2" : "text-zinc-300 hover:text-zinc-500"}
            `}
          >
            <ShoppingCart size={26} strokeWidth={activeTab === 'cart' ? 2.5 : 2} />
            {shoppingList.length > 0 && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-amber-500 rounded-full border-[3px] border-white text-[9px] font-black flex items-center justify-center text-zinc-900 animate-bounce">
                {shoppingList.length}
              </div>
            )}
            {activeTab === 'cart' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;
