import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuth } from './context/auth-context';
import SignupConfirm from './pages/SignupConfirm';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const { user } = useAuth();
  let route = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup-confirm" element={<SignupConfirm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
  if (user) {
    route = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }

  return route;
}

export default App;
