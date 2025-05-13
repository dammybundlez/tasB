/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/pages/Header.tsx" , "./src/pages/Home.tsx" , "./src/pages/Footer.tsx", "./src/pages/RecipeGrid.tsx" , "./src/pages/About.tsx" ,
     "./src/pages/Favorites.tsx" , "./src/pages/RecipeDetail.tsx", "./src/components/Cardboard.tsx" , "./src/components/SimilarItem.tsx",
       "./src/components/Pagination.tsx" , "./src/App.tsx" , './src/components/Search.tsx' ],
  theme: {
    extend: {
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
