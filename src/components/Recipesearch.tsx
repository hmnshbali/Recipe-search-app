import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../store/recipeSlice";
import NotFound from "./NotFound";

const RecipeSearch = () => {
  const dispatch = useDispatch();
  const { recipes = [], isLoading, error } = useSelector(
    (state) => state.recipes || {}
  );

  const [selectedRecipe, setSelectedRecipe] = useState(null); // stores clicked recipe

  useEffect(() => {
    dispatch(fetchRecipes(""));
  }, [dispatch]);

  useEffect(() => {
    if (!!selectedRecipe) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [selectedRecipe]);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen w-full">
          <div className="flex justify-center items-end h-[100px] w-[300px]">
             <div className="bg-[#3498db] rounded-[5px] w-[20px] h-[10px] mx-[5px] animate-[loading-wave-animation_1s_ease-in-out_infinite]"></div>
            <div className="bg-[#3498db] rounded-[5px] w-[20px] h-[10px] mx-[5px] animate-[loading-wave-animation_1s_ease-in-out_infinite] animate-delay-[0.1s]"></div>
            <div className="bg-[#3498db] rounded-[5px] w-[20px] h-[10px] mx-[5px] animate-[loading-wave-animation_1s_ease-in-out_infinite] animate-delay-[0.2s]"></div>
            <div className="bg-[#3498db] rounded-[5px] w-[20px] h-[10px] mx-[5px] animate-[loading-wave-animation_1s_ease-in-out_infinite] animate-delay-[0.3s]"></div>
          </div>
        </div>
      )}

      {!isLoading && error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && Array.isArray(recipes) && recipes.length >= 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-5">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {recipe.image && (
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{recipe.name}</h3>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600 mb-4">
                    {recipe.ingredients.length} ingredients
                  </p>
                  <p className="text-gray-600 mb-4">
                    {recipe.cookTimeMinutes} minutes
                  </p>
                </div>
                <button
  onClick={() => setSelectedRecipe(recipe)}
  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
>
  Learn More
</button>
              </div>
            </div>
          ))}
        </div>
      )}

      { (!Array.isArray(recipes) || recipes.length === 0) && (
        <div className="flex justify-center items-center h-screen w-full">
          <NotFound />
        </div>
      )}

      {/* Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur ">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">{selectedRecipe.name}</h3>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-60 object-cover rounded"
              />
              <p className="mt-4 text-gray-600">
                Ingredients: {selectedRecipe.ingredients.join(", ")}
              </p>
              {selectedRecipe.instructions && (
                <div className="mt-4">
                  <h4 className="font-bold mb-2">Instructions:</h4>
                  {Array.isArray(selectedRecipe.instructions) ? (
                    <ol className="list-decimal list-inside text-gray-700">
                      {selectedRecipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <ol className="list-decimal list-inside text-gray-700">
                      {selectedRecipe.instructions.split(/\r?\n|\.\s*/).filter(Boolean).map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-end border-t p-4">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeSearch;
