import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export function TaskCard({
  title = 'Test',
  description = 'Test',
  onClick,
  onEditClick,
  getId: string
}) {
  return (
    <Card
      style={{
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column'
      }}
      sx={{ width: 250 }}
    >
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions onClick={onEditClick} style={{ justifyContent: 'flex-end' }}>
        <Button size='small'>Редактировать</Button>
      </CardActions>
      <CardActions onClick={onClick} style={{ justifyContent: 'flex-end' }}>
        <Button size='small'>Пройти тест</Button>
      </CardActions>
    </Card>
  )
}
