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
  {
    type: "folder",
    name: "public",
    children: [],
  },
  { type: "file", name: ".gitignore" },
];

const filter = initialData.sort((a, b) => {
    console.log(a.type,b.type)
  if (a.type === "folder" && b.type === "file") {
    return -1;
  } else if (a.type === "file" && b.type === "folder") {
    return 1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return -1;
  }
});

console.log(filter);
