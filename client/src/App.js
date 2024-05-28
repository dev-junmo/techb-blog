// import reset from 'styled-reset';
// import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import "./App.css";
import SignIn from "./pages/SignIn";

// const GlobalStyle = createGlobalStyle`
//   ${reset}
// `;

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/" element={ <Layout /> }>
            <Route index element={<Home />} />
            <Route path='/post/:id' element={<PostPage />} />
          </Route>
          <Route path='/writePage' element={<WritePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
