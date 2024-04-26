const PIXABAY_API_KEY = "26045983-52a8c766db230dc3bb499f26c";

type ParamsType = {
   category: string;
   searchQuery: string;
   page?: number;
   order?: "popular" | "latest";
   perPage?: number;
   append?: boolean;
};

export const fetchImages = async ({
   category = "",
   searchQuery = "",
   page = 1,
   order = "popular",
   perPage = 25,
}: ParamsType) => {
   try {
      const queryParam = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
      const response = await fetch(
         `https://pixabay.com/api/?key=${PIXABAY_API_KEY}${queryParam}&page=${page}&order=${order}&per_page=${perPage}&safesearch=true`
      );
      if (!response.ok) {
         throw new Error(response.statusText);
      }
      console.log(response.url);
      const data = await response.json();
      return {
         success: true,
         data,
      };
   } catch (error) {
      if (error instanceof Error) {
         console.log(error.message);
         return { success: false, error: error.message };
      }
   }
};

// &category=${encodeURIComponent(
// category
// )}
