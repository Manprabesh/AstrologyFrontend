import { render } from 'solid-js/web'
import { lazy } from 'solid-js'
import { Router, Route } from "@solidjs/router";
import './index.css'

const root = document.getElementById('root')

const route = [
  {
    path: '/',
    component: lazy(() => import('./components/blogs.jsx'))
  },
  {
    path: '/Rmore',
    component: lazy(() => import('./components/ReadMore.jsx'))
  },
  {
    path: '/WriteBlog',
    component: lazy(() => import('./components/WriteBlog.jsx'))
  },
  {
    path: '/signup',
    component: lazy(() => import('./components/signup.jsx'))
  },
  {
    path: '/login',
    component: lazy(() => import('./components/Login.jsx'))
  },
  {
    path:'*paramName',
    component:lazy(()=>import('./components/NotFound.jsx'))
  }

]


render(() => <Router>

  {route}

</Router>, root)
