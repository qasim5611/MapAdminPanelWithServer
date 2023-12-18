const API =
  process.env.NODE_ENV == "development"
    ? "https://mapserverdec2023-production.up.railway.app"
    : "";
export default API;

// export const API = "https://mapserverdec2023-production.up.railway.app";
// export API;
