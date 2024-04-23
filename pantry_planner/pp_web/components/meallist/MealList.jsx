import React from 'react'
import Meal from '../meal/Meal';

const MealList = (recipes) => {
  return (
    <div>
       <section className="meals">
        {recipes.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </div>
  )
}

export default MealList
