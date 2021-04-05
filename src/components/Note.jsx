import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { blue, green, pink, yellow } from '@material-ui/core/colors'
import { DeleteOutlined } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: note => {
      if (note.category === 'money') {
        return green[500]
      } else if (note.category === 'todos') {
        return pink[500]
      } else if (note.category === 'reminders') {
        return blue[500]
      } else {
        return yellow[700]
      }
    },
  },
  test: {
    border: note => {
      if (note.category === 'todos') {
        return '1px solid red'
      }
    },
  },
})

export default function Note({ note, handleDelete }) {
  const classes = useStyles(note)

  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          title={note.title}
          subheader={note.category}
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent>
      </Card>
      {/* <p>{note.title}</p> */}
    </div>
  )
}
