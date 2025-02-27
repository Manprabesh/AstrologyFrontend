
import { render } from 'solid-js/web'
import './index.css'
import Blogs from './components/blogs.jsx'
import WriteBlog from './components/WriteBlog.jsx'
import { Router, Route } from "@solidjs/router";
import Rmore from './components/ReadMore.jsx';
import signup from './components/signup.jsx'
import Login from './components/Login.jsx'


import NotFound from './components/NotFound.jsx'



const root = document.getElementById('root')


render(() =>   <Router>
  <Route path="/" component={Blogs} />
  <Route path="/Rmore" component={Rmore} />
  <Route path="/WriteBlog" component={WriteBlog} />
  <Route path="*paramName" component={NotFound} />
  <Route path="/signup" component={signup}/>
  <Route path="/login" component={Login}/>

{/* </Route> */}
</Router>, root)
