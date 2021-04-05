import { Container, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Note from '../components/Note'
import Masonry from 'react-masonry-css'

export default function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async id => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    })
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes.map(note => (
          <Note key={note.id} note={note} handleDelete={handleDelete} />
        ))}
      </Masonry>
    </Container>
  )
}
