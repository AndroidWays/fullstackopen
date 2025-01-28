import { createRoot } from "react-dom/client"; // Use named import for createRoot
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
