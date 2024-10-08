module.exports = {
  singleQuote: true,
  plugins: [ "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"],
    importOrder : 
    [
      "^next$|^react$|^react/(.*)|^next/(.*)",
      "<THIRD_PARTY_MODULES>",
      "@/(.*)|^[./]"
    ],
    importOrderSeparation: true,
};
