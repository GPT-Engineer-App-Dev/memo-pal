import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Archive, Home, Trash2, Bell } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar";
import Notes from "./pages/Notes";
import Reminders from "./pages/Reminders";
import ArchivedNotes from "./pages/ArchivedNotes";
import TrashNotes from "./pages/TrashNotes";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Notes",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Reminders",
    to: "/reminders",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    title: "Archive",
    to: "/archive",
    icon: <Archive className="h-4 w-4" />,
  },
  {
    title: "Trash",
    to: "/trash",
    icon: <Trash2 className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Notes />} />
              <Route path="reminders" element={<Reminders />} />
              <Route path="archive" element={<ArchivedNotes />} />
              <Route path="trash" element={<TrashNotes />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;