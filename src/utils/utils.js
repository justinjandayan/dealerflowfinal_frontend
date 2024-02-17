// axiosUtils.js
const getAxiosConfig = () => {
  // Set up a common headers configuration for Axios
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export default getAxiosConfig;
