export const handleError = (error: any) => {
    console.error("Error:", error);
    throw new Error(error.response?.data?.message || "An error occurred");
  };