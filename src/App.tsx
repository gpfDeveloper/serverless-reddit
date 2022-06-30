import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  let route = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );

  return route;
}

export default App;
