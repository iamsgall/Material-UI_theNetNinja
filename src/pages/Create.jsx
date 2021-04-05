import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import { KeyboardArrowRight } from '@material-ui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})

export default function Create() {
  const classes = useStyles()

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  const [category, setCategory] = useState('todos')

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()

    setTitleError(false)
    setDetailsError(false)

    if (title === '') {
      setTitleError(true)
    } else if (details === '') {
      setDetailsError(true)
    } else {
      // (title && details)
      // console.log(title, details, category)
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          details,
          category,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success', data)
        })
        .then(history.push('/'))
        .catch(error => {
          console.log('Error', error)
        })
    }
  }

  return (
    <Container>
      <Typography variant='h6' component='h2' color='textSecondary'>
        Create a New Note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          onChange={e => setTitle(e.target.value)}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
          className={classes.field}
        />
        <TextField
          onChange={e => setDetails(e.target.value)}
          label='Details'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          className={classes.field}
        />

        <FormControl component='fieldset' className={classes.field}>
          <FormLabel component='legend'>Note Categories</FormLabel>
          <RadioGroup
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <FormControlLabel value='money' control={<Radio />} label='money' />
            <FormControlLabel value='todos' control={<Radio />} label='todos' />
            <FormControlLabel
              value='reminders'
              control={<Radio />}
              label='reminders'
            />
            <FormControlLabel value='work' control={<Radio />} label='work' />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          endIcon={<KeyboardArrowRight />}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}
