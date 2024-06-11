import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { AskQuestion } from "./pages/AskQuestion";
import { ContestCalender } from "./pages/ContestCalender";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { UsersQuestion } from "./pages/UsersQuestion";
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path = "/signup" element = {<Signup />}/>
        <Route path = "/signin" element = {<Signin />}/>
        <Route path = "/home" element = {<Home />} />
        <Route path = "/post" element = {<Post />} />
        <Route path = "/askquestion" element = { <AskQuestion />} />
        <Route path = "/contestcalender" element = {<ContestCalender />} />
        <Route path = "/profilepage" element = {<Profile />} />
        <Route path = "/editprofile" element = {<EditProfile />} />
        <Route path = "/usersquestion" element={<UsersQuestion />} />

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
