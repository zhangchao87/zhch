import { Typography, Divider, Container, Stack } from '@mui/material'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'
import { CardList } from '@/views/home/CardList'
import { Filter } from '@/views/home/Filter'

dayjs.extend(relativeTime)
dayjs.locale('ja')

function Home() {
  return (
    <Container key={'body'} sx={{ padding: 0 }}>
      <Stack direction={'row'} justifyContent='end' paddingBottom={'10px'}>
        <Filter></Filter>
      </Stack>

      <Typography variant='h3'>NextJs - Sample</Typography>
      <Divider sx={{ mb: '10px' }}></Divider>
      <CardList></CardList>
    </Container>
  )
}

export default Home
