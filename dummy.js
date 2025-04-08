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
        children: [
          { type: "file", name: "App.jsx" },
          { type: "folder", name: "App.jsx" },
          { type: "file", name: "zzzz.jsx" },
          { type: "folder", name: "zzz.jsx" },
          { type: "file", name: "bbbb.jsx" },
          { type: "folder", name: "aaaa.jsx" },
        ],
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

export const sortData = (data) => {
  console.log(data)
  return data.sort((a, b) => {
    if (a.type === "folder" && b.type === "file") {
      if (a.children) {
        sortData(a.children);
      }
      return -1;
    } else if (a.type === "file" && b.type === "folder") {
      if (a.children) {
        sortData(a.children);
      }
      return 1;
    } else if (a.name > b.name) {
      if (a.children) {
        sortData(a.children);
      }
      return 1;
    } else {
      if (a.children) {
        sortData(a.children);
      }
      return 0;
    }
  });
};

let x = sortData(initialData);

// console.log(x[2].children[0].children);
