
  const initialState = JSON.parse(localStorage.getItem("bookmarks")) || [];

  const bookmakesReducer =(state = initialState,action)=>{
    switch(action,type){
        case:"bookmakes/toggle":
        const isBookmarked = state.some(u) => u.id ===action.payload.id);
        const newBookmakes = isBookmarked ? state.filter((u) => u.id!==action.payload.id):
        [...state ,action.payload];

        localStorage.setItem("bookmakrs",JSON.stringify(newBookmakes));
        return newBookmakes ;

        default:
            return state;


     }
  };
export default bookmakesReducer ;
