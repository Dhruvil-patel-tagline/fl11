import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TreeNode = ({
    node,
    path,
    onPathChange,
    activePath,
    setActivePath,
    onDelete,
    onContextMenu,
}) => {
    const currentPath = `${path}/${node.name}`;
    const isActive = currentPath === activePath;

    const handleClick = () => {
        onPathChange(currentPath);
        setActivePath(currentPath);
    };

    if (node.type === "file") {
        return (
            <div
                onClick={handleClick}
                onContextMenu={(e) => onContextMenu(e, currentPath, node.type)}
                style={{
                    paddingLeft: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    border: isActive ? "2px solid blue" : "none",
                }}
            >
                <InsertDriveFileIcon fontSize="small" />
                {node.name}
            </div>
        );
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onContextMenu={(e) => onContextMenu(e, currentPath, node.type)} // ✅ Add this
            >
                <div
                    onClick={handleClick}
                    style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                    <FolderIcon fontSize="small" />
                    {node.name}
                </div>
            </AccordionSummary>
            <AccordionDetails style={{ paddingLeft: "1rem" }}>
                {node.children?.map((child) => (
                    <TreeNode
                        key={`${currentPath}/${child.name}`}
                        node={child}
                        path={currentPath}
                        onPathChange={onPathChange}
                        activePath={activePath}
                        setActivePath={setActivePath}
                        onDelete={onDelete}
                        onContextMenu={onContextMenu}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default TreeNode;
