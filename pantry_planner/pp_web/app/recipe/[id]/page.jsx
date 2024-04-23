import Image from "next/image";
import "dotenv/config";
import parse from "html-react-parser";
import Link from "next/link";

const API_KEY = process.env.API_KEY;

async function getRecipe(id) {
  const recipeInfo = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
  );
  const allInfo = await recipeInfo.json();
// console.log(allInfo.nutrition.nutrients)
  return allInfo;
}
const Recipe = async ({ params }) => {
  // console.log(params.id);
  const recipe = await getRecipe(params.id);
  let url = recipe.image;
  let urlParts = url.split("-")[1].split("x");
  let width = urlParts[0]; // Width comes before 'x'
  let height = urlParts[1].split(".")[0];
  return (
    <div>
      <h2>{recipe.title}</h2>
      <Image
        src={recipe.image}
        alt="Picture of food"
        width={width}
        height={height}
      ></Image>
      <p>Number of servings: {recipe.servings}</p>
      <p>Preparation time: {recipe.readyInMinutes}</p>
      <div>{parse(recipe.summary)} </div>
      <p>{recipe.instructions}</p>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => {
          return (
            <li key={ingredient.id}>
              {ingredient.name} {ingredient.amount}{" "}
              {ingredient.measures.us.unitLong}
              <Image
                src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
                alt="Picture of food"
                width={50}
                height={50}
              ></Image>
            </li>
          );
        })}
      </ul>
      <ul>{recipe.nutrition.nutrients.map((nutrient) => {
          return (
            <li key={nutrient.name}>
              {nutrient.name} {nutrient.amount}{" "}
              {nutrient.unit}

            </li>
          );
        })}</ul>
    </div>
  );
};

export default Recipe;
