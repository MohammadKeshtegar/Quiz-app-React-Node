import { Button } from "@mui/material";
import { useMode } from "../context/Mode";

function SmallButton({ children }) {
  const { mode } = useMode();

  return (
    <Button
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        "&:hover": {
          backgroundColor: mode === "dark" ? "#3b82f6" : "#60a5fa",
          color: mode === "dark" ? "#fff" : "#60a5fa",
        },

        p: 1,
        fontSize: 12,
      }}
    >
      {children}
    </Button>
  );
}

export default SmallButton;
