import { Fraction } from 'fractional';
import {DOMElements} from './base';


export const highlightSelector = (id) => {
    
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
 
  resultsArr.forEach(res => {
    res.classList.remove("results__link--active");
  });
 
  const item = document.querySelector(`.results__link[href*="${id}"]`);
 
  if (item) {
    item.classList.add("results__link--active");
  }
}


const formatCount = (count) => {
    if(count) {
        // исправляем баг с большим кол-вом знаков после запятой
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));
        if(!dec) return newCount;
        if (int === 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`
        } else {
            let fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
        return '?';
    }
}

export const clearRecepie = () => {
   DOMElements.recipe.innerHTML = ''; 
}


const createIngredient = (recepie) => `      
<li class="recipe__item">
   <svg class="recipe__icon">
      <use href="img/icons.svg#icon-check"></use>
   </svg>
   <div class="recipe__count">${formatCount(recepie.count)}</div>
   <div class="recipe__ingredient">
      <span class="recipe__unit">${recepie.unit}</span>
      ${recepie.ingredient}
   </div>
</li>
`


export const renderRecepie = (recepie, isLiked) => {
let markup = `
<figure class="recipe__fig">
   <img src="${recepie.img}" alt="${recepie.title}" class="recipe__img">
   <h1 class="recipe__title">
      <span>${recepie.title}</span>
   </h1>
</figure>
<div class="recipe__details">
   <div class="recipe__info">
      <svg class="recipe__info-icon">
         <use href="img/icons.svg#icon-stopwatch"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recepie.time}</span>
      <span class="recipe__info-text"> minutes</span>
   </div>
   <div class="recipe__info">
      <svg class="recipe__info-icon">
         <use href="img/icons.svg#icon-man"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recepie.servings}</span>
      <span class="recipe__info-text"> servings</span>
      <div class="recipe__info-buttons">
         <button class="btn-tiny btn-decrease">
            <svg>
               <use href="img/icons.svg#icon-circle-with-minus"></use>
            </svg>
         </button>
         <button class="btn-tiny btn-increase">
            <svg>
               <use href="img/icons.svg#icon-circle-with-plus"></use>
            </svg>
         </button>
      </div>
   </div>
   <button class="recipe__love">
      <svg class="header__likes">
         <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
      </svg>
   </button>
</div>
<div class="recipe__ingredients">
   <ul class="recipe__ingredient-list">
      ${recepie.ingredients.map(ing => createIngredient(ing)).join('')}
   </ul>
   <button class="btn-small recipe__btn recipe_btn--add">
      <svg class="search__icon">
         <use href="img/icons.svg#icon-shopping-cart"></use>
      </svg>
      <span>Add to shopping list</span>
   </button>
</div>
<div class="recipe__directions">
   <h2 class="heading-2">How to cook it</h2>
   <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
   </p>
   <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
      <span>Directions</span>
      <svg class="search__icon">
         <use href="img/icons.svg#icon-triangle-right"></use>
      </svg>
   </a>
</div>`;
    
DOMElements.recipe.insertAdjacentHTML('beforeend', markup);
}


export const updateServingsIngredients = recepie => {
    // Update servings
    document.querySelector('.recipe__info-data--people').textContent = recepie.servings;
    // Update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recepie.ingredients[i].count)
    });
}