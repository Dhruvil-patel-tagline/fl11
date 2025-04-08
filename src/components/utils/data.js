export const initialData = [
  {
    type: "folder",
    name: "public",
    id: 1,
    children: [],
  },
  {
    type: "folder",
    id: 2,
    name: "src",
    children: [
      {
        type: "folder",
        id: 4,
        name: "components",
        children: [{ type: "file", name: "App.jsx", id: 2.1 }],
      },
    ],
  },
  { type: "file", name: ".gitignore", id: 5 },
];
