const PIXABAY_API_KEY = "26045983-52a8c766db230dc3bb499f26c";

type ParamsType = {
   category?: string;
   searchQuery?: string;
   page?: number;
   order?: "popular" | "latest";
   perPage?: number;
   orientation?: "all" | "horizontal" | "vertical";
   image_type?: "all" | "photo" | "illustration" | "vector";
   colors?: string;
};

export const fetchImages = async ({
   category,
   searchQuery,
   page,
   order,
   perPage = 25,
   orientation,
   image_type,
   colors,
}: ParamsType) => {
   try {
      const params = new URLSearchParams();
      params.append("key", PIXABAY_API_KEY);
      if (category) params.append("category", category);
      if (page) params.append("page", String(page));
      if (order) params.append("order", order);
      if (perPage) params.append("per_page", String(perPage));
      if (orientation) params.append("orientation", orientation);
      if (image_type) params.append("image_type", image_type);
      if (colors) params.append("colors", colors);
      params.append("safesearch", "true");
      if (searchQuery) {
         params.append("q", encodeURIComponent(searchQuery));
      }
      const response = await fetch(`https://pixabay.com/api/?${params.toString()}`);
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
