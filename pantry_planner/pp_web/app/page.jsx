import Link from "next/link";
import "dotenv/config";
import MealList from "../components/meallist/MealList";

const API_KEY = process.env.API_KEY;

async function getRecipes(ingredients) {
    console.log(ingredients)
    try{
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&missedIngredientCount=0&apiKey=${API_KEY}`
  )
    const res = await response.json()
    const mapedRed = res.filter(recipe => recipe.missedIngredientCount < 4);
    console.log(mapedRed)
    return res
} catch (error){
    console.log(error)
}
}

const Page = async () => {
const ingredients = 'apples,+flour,+sugar'
  const recipes = await getRecipes(ingredients);

  return (
    <div>
      <h3>My Homepage</h3>
      <ul>
        {recipes && recipes.map((data, index) => {return (
            <li key={index}>
                <Link href={`/recipe/${data.id}`}>{data.title}</Link>
                </li>
        )}
    )}
      </ul>

    </div>
  );
};

export default Page;
