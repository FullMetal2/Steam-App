import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authprovider from "./features/auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./page/Home";
import LoginSuccess from "./features/hooks/LoginSuccess";
import Dashboard from "./page/dashboard";
import SignupPage from "./page/SignupPage";
import LoginPage from "./page/LoginPage";
import ForgotPassworPage from "./features/auth/playtrack/ForgotPassword";
import ResetPasswordPage from "./features/auth/playtrack/RestPassword";

function App() {
  return (
    <Authprovider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signupPage" element={<SignupPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/ForgotPasswordPage" element={<ForgotPassworPage />} />
          <Route
            path="/ResetPasswordPage/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/login-success" element={<LoginSuccess />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Authprovider>
  );
}

export default App;
