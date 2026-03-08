import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Header from "@/components/Layout/Header";
import Navigation from "@/components/Layout/Navigation";
import ChatBot from "@/components/Chat/ChatBot";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import LawyerSignup from "./pages/auth/LawyerSignup";
import Dashboard from "./pages/Dashboard";
import Lawyers from "./pages/Lawyers";
import Templates from "./pages/Templates";
import Documents from "./pages/Documents";
import Consultants from "./pages/Consultants";
import StateLegalSupport from "./pages/StateLegalSupport";
import MSMESupport from "./pages/MSMESupport";
import AuthorityFinder from "./pages/AuthorityFinder";
import DocumentGenerator from "./pages/DocumentGenerator";
import LawyerDashboard from "./pages/LawyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LawyerProfileEdit from "./pages/LawyerProfileEdit";
import LawyerPublicProfile from "./pages/LawyerPublicProfile";
import MyCases from "./pages/MyCases";
import CaseDetail from "./pages/CaseDetail";
import SubmitCase from "./pages/SubmitCase";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./i18n";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Navigation />
        <main className="flex-1 ml-64 pt-16">
          {children}
        </main>
      </div>
      <ChatBot />
    </div>
  );
};

// Public Route component (for auth pages)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  
  if (user) {
    const redirectPath = profile?.user_type === 'lawyer' ? '/lawyer-dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute><Signup /></PublicRoute>
            } />
            <Route path="/lawyer-signup" element={
              <PublicRoute><LawyerSignup /></PublicRoute>
            } />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/lawyers" element={
              <ProtectedRoute>
                <Lawyers />
              </ProtectedRoute>
            } />
            <Route path="/templates" element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/consultants" element={
              <ProtectedRoute>
                <Consultants />
              </ProtectedRoute>
            } />
            <Route path="/state-legal-support" element={
              <ProtectedRoute>
                <StateLegalSupport />
              </ProtectedRoute>
            } />
            <Route path="/msme-support" element={
              <ProtectedRoute>
                <MSMESupport />
              </ProtectedRoute>
            } />
            <Route path="/authority-finder" element={
              <ProtectedRoute>
                <AuthorityFinder />
              </ProtectedRoute>
            } />
            <Route path="/generate-document" element={
              <ProtectedRoute>
                <DocumentGenerator />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <div className="p-6">Chat page coming soon...</div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/lawyer-dashboard" element={
              <ProtectedRoute><LawyerDashboard /></ProtectedRoute>
            } />
            <Route path="/lawyer-profile/edit" element={
              <ProtectedRoute><LawyerProfileEdit /></ProtectedRoute>
            } />
            <Route path="/lawyer/:id" element={
              <ProtectedRoute><LawyerPublicProfile /></ProtectedRoute>
            } />
            <Route path="/my-cases" element={
              <ProtectedRoute><MyCases /></ProtectedRoute>
            } />
            <Route path="/case/:id" element={
              <ProtectedRoute><CaseDetail /></ProtectedRoute>
            } />
            <Route path="/submit-case" element={
              <ProtectedRoute><SubmitCase /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
