import React, { useContext, useEffect, useState , createContext } from 'react'

type Recipe = {
    id : number ;
    title : string;
    image : string;
    [ key : string ] : any;
}; 

type FavoritesType = {
    favorites : Recipe[];
    addFavorites : ( recipe : Recipe) => void;
    removeFavorites : ( id : number ) => void;
    isFavorite : ( id : number ) => boolean;
}

type FavoritesProviderProps = {
    children: React.ReactNode;
  };

export const FavoritesContext = createContext<FavoritesType | undefined>(undefined);


export const UseFavContext = ({children}: FavoritesProviderProps) => {
    const [favorites, setFavorites] = useState<Recipe[]>(() =>  {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    });

  useEffect(() => {
    if(favorites.length > 0){
    localStorage.setItem("favorites", JSON.stringify(favorites));
    }else{
      localStorage.removeItem('favorites')
    }
  }, [favorites]);

  const addFavorites = (recipe: Recipe) => {
    if (!favorites.find((r) => r.id === recipe.id)) {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const removeFavorites = (id: number) => {
    setFavorites((prev) => prev.filter((r) => r.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((r) => r.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorites, removeFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if(!context) throw new Error("Favorites must be used within the Provider")
    return context
}
