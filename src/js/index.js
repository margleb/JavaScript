// Global app controller

import Search from './model/Search';
import * as SearchView from './views/SearchView';
import {DOMElements, renderLoader, cleanLoader} from './views/base';

// обьект состояния
const state = {}

async function getSearch() {
   // получить query из view
   var query = SearchView.getInput();
    
   if(query) {
       
    // новый Search oбьект в state
    state.search = new Search(query);
     
    // подготовоить UI для результата
    SearchView.clearInput();
    SearchView.clearResults();
    renderLoader(DOMElements.searchRes);
     
    // ищем результат
    await state.search.getRecepie();
       
    // показываем результат в UI
    // return console.log(state.search.result);
    cleanLoader();   
    SearchView.renderResults(state.search.result);
       
   }
}


DOMElements.searchBtn.addEventListener('click', (event) => {
   event.preventDefault();
   getSearch();
});

