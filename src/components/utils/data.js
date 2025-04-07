export const initialData = [
  {
    type: "folder",
    name: "public",
    children: [],
  },
  {
    type: "folder",
    name: "src",
    children: [
      {
        type: "folder",
        name: "components",
        children: [{ type: "file", name: "App.jsx" }],
      },
    ],
  },
  { type: "file", name: ".gitignore" },
];
