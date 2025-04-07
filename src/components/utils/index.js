export const sortData = (arr) => {
  return arr.sort((a, b) => {
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
      return -1;
    }
  });
};

const isDuplicate = (array, data) => {
  if (!array) return true;
  return array.every((node) => {
    if (
      node.name.toLowerCase().trim() === data.name.toLowerCase().trim() &&
      node.type.toLowerCase().trim() === data.type.toLowerCase().trim()
    ) {
      alert(
        `A file or folder ${data.name} already exits at this location. please select different name`
      );
      return false;
    }
    return true;
  });
};

export const addNode = (tree, targetPath, newNode, currentPath = "") => {
  if (!targetPath) {
    if (isDuplicate(tree, newNode)) {
      return sortData([...tree, newNode]);
    }
    return tree;
  }
  return sortData(
    tree.map((node) => {
      const nodePath = `${currentPath}/${node.name}`;
      if (nodePath === targetPath && node.type === "folder") {
        if (isDuplicate(node.children, newNode)) {
          return {
            ...node,
            children: [...(node.children || []), newNode],
          };
        }
        return node;
      }
      if (node.type === "folder" && node.children) {
        return {
          ...node,
          children: addNode(node.children, targetPath, newNode, nodePath),
        };
      }
      return node;
    })
  );
};

export const updateNodeName = (tree, targetPath, newName, currentPath = "") => {
  return sortData(
    tree.map((node) => {
      const nodePath = `${currentPath}/${node.name}`;
      if (nodePath === targetPath) {
        return { ...node, name: newName };
      }
      if (node.type === "folder" && node.children) {
        return {
          ...node,
          children: updateNodeName(
            node.children,
            targetPath,
            newName,
            nodePath
          ),
        };
      }
      return node;
    })
  );
};

export const deleteNode = (tree, targetPath, currentPath = "") => {
  return tree
    .map((node) => {
      const nodePath = `${currentPath}/${node.name}`;
      if (nodePath === targetPath) {
        return null;
      }
      if (node.type === "folder" && node.children) {
        return {
          ...node,
          children: deleteNode(node.children, targetPath, nodePath),
        };
      }
      return node;
    })
    .filter(Boolean);
};
