import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ClickSuperHeroesPage } from './components/ClickSuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { RQParallelQueriesPage } from './components/RQParallelQueries.page'
import { RQDynamicParallelQueriesPage } from './components/RQDynamicParallelQueries.page'
import { RQDependentQueriesPage } from './components/RQDependentQueries.page'
import { RQPaginatedQueriesPage } from './components/RQPaginatedQueries.page'
import { RQInfiniteQueriesPage } from './components/RQInfiniteQueries.page'
import { RQAddSuperHeroPage } from './components/RQAddSuperHero.page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
              <li>
                <Link to='/clk-super-heroes'>Click Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-parallel'>Parallel Queries</Link>
              </li>
              <li>
                <Link to='/rq-dynamic-parallel'>Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to='/rq-dependent'>Dynamic Parallel Queries</Link>
              </li>
              <li>
                <Link to='/rq-paginated'>Pagenated Queries</Link>
              </li>
              <li>
                <Link to='/rq-infinite'>Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <Link to='/add-super-hero'>Add Super Hero</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/add-super-hero' element={<RQAddSuperHeroPage />} />
            <Route path='/rq-paginated' element={<RQPaginatedQueriesPage />} />
            <Route path='/rq-infinite' element={<RQInfiniteQueriesPage />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-parallel' element={<RQParallelQueriesPage />} />
            <Route
              path='/rq-dependent'
              element={<RQDependentQueriesPage email='vishwas@example.com' />}
            />

            <Route
              path='/rq-dynamic-parallel'
              element={<RQDynamicParallelQueriesPage heroIds={[1, 2, 3]} />}
            />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route
              path='/clk-super-heroes'
              element={<ClickSuperHeroesPage />}
            />
            <Route
              path='/rq-super-heroes/:heroId'
              element={<RQSuperHeroPage />}
            />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
