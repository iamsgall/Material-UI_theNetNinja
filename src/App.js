import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Create from './pages/Create'
import Notes from './pages/Notes'
import { teal } from '@material-ui/core/colors'
import Layout from './components/Layout'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: {
      main: teal[400],
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Notes} />
            <Route exact path='/create' component={Create} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
