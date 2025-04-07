import CreateNewFolderSharpIcon from "@mui/icons-material/CreateNewFolderSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RefreshIcon from "@mui/icons-material/Refresh";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import "./css/sidebar.css";
const newData = [
  { icon: "folder", name: "public" },
  { icon: "folder", name: "src" },
  { icon: "file", name: ".gitignore" },
  { icon: "file", name: "eslint.config.js" },
  { icon: "file", name: "package-lock.json" },
  { icon: "file", name: "package.json" },
  { icon: "file", name: "README.md" },
  { icon: "file", name: "vite.config.js" },
];

const Sidebar = () => {
  return (
    <>
      <div className="sidebar-root">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "250px",
              }}
            >
              <span>FOLDER-STRUCTURE</span>
              <span>
                <CreateNewFolderSharpIcon />
                <RefreshIcon sx={{ color: "black" }} />
                <MoreHorizIcon />
              </span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {newData.map((item) => (
              <Accordion key={item.name}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.icon === "folder" ? (
                      <FolderIcon />
                    ) : (
                      <InsertDriveFileIcon />
                    )}
                    {item.name}
                  </span>
                </AccordionSummary>
                <AccordionDetails>node modules</AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Sidebar;
