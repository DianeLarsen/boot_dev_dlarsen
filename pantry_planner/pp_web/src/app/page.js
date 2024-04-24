import Link from "next/link";
import "dotenv/config";


const API_KEY = process.env.API_KEY;

async function getRecipes(ingredients) {
    console.log(ingredients)
    try{
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&missedIngredientCount=0&apiKey=${API_KEY}`
  )
    const res = await response.json()
    const mapedRed = res.filter(recipe => recipe.missedIngredientCount < 4);
    // console.log(mapedRed)
    return mapedRed
} catch (error){
    console.log(error)
}
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
    </main>
  );
}
