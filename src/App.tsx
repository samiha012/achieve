import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Branches from "./pages/Branches";
import Courses from "./pages/Courses";
import Layout from './components/Layout';
import About from "./pages/About";
import Notice from "./pages/Notice";
import Spinner from "./components/ui/Spinner";
import RequireSuperAdmin from "./components/RequireSuperAdmin";

// import FacebookPosts from "./pages/FacebookPosts";

//admin routes
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminCourses from "./pages/AdminCourses";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import AdminNotice from "./pages/AdminNotice";
import FBpost from "./pages/AdminFBpost";
import FacebookPostPage from "./pages/AdminFacebookPostPage";
import AdminManagement from "./pages/AdminManagement";

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<About />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Regular admin routes */}
            <Route path="/admin/testimonials" element={<RequireAuth><AdminTestimonials /></RequireAuth>} />
            <Route path="/admin/notice" element={<RequireAuth><AdminNotice /></RequireAuth>} />
            <Route path="/admin/courses" element={<RequireAuth><AdminCourses /></RequireAuth>} />
            <Route path="/admin/fbpost" element={<RequireAuth><FBpost /></RequireAuth>} />
            <Route path="/admin/fb" element={<RequireAuth><FacebookPostPage /></RequireAuth>} />

            {/* Superadmin only routes */}
            <Route path="/admin" element={
              <RequireSuperAdmin>
                <AdminManagement />
              </RequireSuperAdmin>
            } />

            <Route path="*" element={<NotFound />} />

            {/* <Route path="/facebook-posts" element={<FacebookPosts />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
