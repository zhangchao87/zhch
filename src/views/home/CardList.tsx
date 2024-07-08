'use client'
import { useEffect, useState } from 'react'

import {
  Avatar,
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Tooltip,
  Link,
  Stack,
  TooltipProps,
  styled,
  tooltipClasses,
  List,
  ListItem,
  Paper,
  ListSubheader
} from '@mui/material'
import { blue, red, yellow } from '@mui/material/colors'
import { deepCopy } from '@/@core/utils/Util'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'
import Api, { ApiMethod } from '@/mocks/Api'

dayjs.extend(relativeTime)
dayjs.locale('ja')

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
})

function dateFormat(execDateTime: Date): string {
  return dayjs(execDateTime).format('YYYY/MM/DD HH:mm:ss').toString()
}

function dateConvert(date: Date) {
  return dayjs(date).fromNow()
}

function groupingOfData(dataList: cardType[]) {
  if (dataList.length == 0 || !dataList.map) return []
  const groupList: CardListProps[] = []
  let tempList: cardType[] = []
  let firstKey = dataList[0].execDateTime
  let i = 0
  dataList.map((data: cardType) => {
    const tempDate = dayjs(data.execDateTime)
    const tempFirstDate = dayjs(firstKey)
    if (
      tempDate.year() != tempFirstDate.year() ||
      tempDate.month() != tempFirstDate.month() ||
      tempDate.day() != tempFirstDate.day()
    ) {
      groupList.push({
        groupKey: firstKey,
        groupId: ++i,
        cardList: tempList
      })
      firstKey = data.execDateTime
      tempList = [data]
    } else {
      tempList.push(data)
    }
  })
  return groupList
}

function getRandomDate(start: Date, end = new Date()) {
  const startTimestamp = start.getTime()
  const endTimestamp = end.getTime()
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp)
  return new Date(randomTimestamp)
}

export const CardList = () => {
  const [initData, setInitData] = useState<cardType[]>([])
  const [groupList, setGroupList] = useState<CardListProps[]>([])

  useEffect(() => {
    if (!groupList || groupList.length == 0) {
      Api.call<cardType[], undefined>(ApiMethod.POST, '/home/init').then(res => {
        const datas = res.data
        datas.map(item => {
          item.execDateTime = getRandomDate(
            dayjs()
              .subtract(index + 3, 'd')
              .toDate(),
            dayjs()
              .subtract(index + 1, 'd')
              .toDate()
          )
        })
        setInitData(datas)
        setGroupList(groupingOfData(datas))
      })
    }
  }, [])

  const colorList = ['', blue[200], red[700], yellow[800]]
  const [showNumber, setShowNumber] = useState(3)

  function handleMoreInfo(groupIndex: number, cardIndex: number) {
    const temp = deepCopy(groupList)
    temp[groupIndex].cardList[cardIndex].moreInfo = true
    setGroupList(temp)
  }

  function handleLoadingMore() {
    if (showNumber + 5 >= initData.length - 1) {
      setShowNumber(initData.length)
    } else {
      setShowNumber(showNumber + 5)
    }
  }

  const groupNodeList: JSX.Element[] = []
  let index = 0
  groupList.map((groupData, groupIndex) => {
    const cardNodeList: JSX.Element[] = []
    groupData.cardList.map((cardData, cardIndex) => {
      if (index < showNumber) {
        index++
        cardNodeList.push(
          <Card
            sx={{
              width: '100%',
              p: '0 10px',
              borderRadius: 0
            }}
            key={'card_' + cardIndex}
            variant='outlined'
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: colorList[cardData.user.avatarColor],
                    width: 50,
                    height: 50
                  }}
                >
                  {cardData.user.avatar}
                </Avatar>
              }
              action={
                <Tooltip title={dateFormat(cardData.execDateTime)}>
                  <Typography>約 {dateConvert(cardData.execDateTime)}</Typography>
                </Tooltip>
              }
              title={
                <Stack direction='row' spacing={2}>
                  <Typography fontWeight={'bold'}>{cardData.user.userName}さんが 課題を </Typography>
                  <Chip size='small' label={cardData.action} color='success' />
                </Stack>
              }
              subheader={
                <span>
                  <CustomWidthTooltip
                    title={
                      <Card sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{
                                bgcolor: colorList[cardData.user.avatarColor],
                                width: 50,
                                height: 50
                              }}
                            >
                              {cardData.user.avatar}
                            </Avatar>
                          }
                          title={
                            <Stack direction='row' spacing={2}>
                              <Typography fontWeight={'bold'}>{cardData.user.userName}さんが 課題を </Typography>
                              <Chip size='small' label='更新' color='success' />
                            </Stack>
                          }
                          subheader={
                            <span>
                              <Link component='button'>課題ID:{cardData.code}</Link> LarkViz {cardData.title}
                            </span>
                          }
                        />
                        <CardContent>
                          <Typography variant='body2' whiteSpace={'pre-wrap'}>
                            {cardData.text}
                          </Typography>
                        </CardContent>
                      </Card>
                    }
                  >
                    <Link component='button'>課題ID:{cardData.code}</Link>
                  </CustomWidthTooltip>{' '}
                  LarkViz {cardData.title}
                </span>
              }
            />
            {/* <CardMedia component="img" height="194" image="https://wallpapercave.com/wp/wp4202323.jpg" alt="Paella dish" /> */}
            <Divider></Divider>

            <CardContent>
              <Stack direction='row'>
                <Stack>
                  <Typography variant='body2' width={'100%'} whiteSpace={'pre-line'}>
                    {cardData.text.substring(0, 200)}
                    <span hidden={!cardData.moreInfo}>{cardData.text.substring(200)}</span>
                    <Link
                      component='button'
                      sx={{ ml: 1, textDecoration: 'none' }}
                      onClick={() => {
                        handleMoreInfo(groupIndex, cardIndex)
                      }}
                      hidden={cardData.text.length <= 200 || cardData.moreInfo}
                    >
                      <Typography variant='caption'>… もっと読む</Typography>
                    </Link>
                  </Typography>
                  {/* <Typography variant='caption' width={"100%"}>[ 状態: {cardData.cardState} ]</Typography> */}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )
      }
    })
    if (cardNodeList.length > 0) {
      const groupNode = (
        <span key={'group_' + groupIndex}>
          <ListSubheader key={'header_' + groupIndex} sx={{ p: 0 }}>
            <Paper
              variant='outlined'
              sx={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                pl: 4
              }}
            >
              <p>{dayjs(groupData.groupKey).format('YYYY/MM/DD')}</p>
            </Paper>
          </ListSubheader>
          <ListItem key={'list_' + groupIndex} sx={{ p: 0, mb: 2, flexDirection: 'column' }}>
            {cardNodeList}
          </ListItem>
        </span>
      )
      groupNodeList.push(groupNode)
    }
  })

  return (
    <>
      <List subheader={<li></li>}>{groupNodeList}</List>
      <Stack margin={5} alignItems={'center'}>
        {showNumber != initData.length ? (
          <Link
            component='button'
            textAlign={'center'}
            onClick={() => {
              handleLoadingMore()
            }}
          >
            より多くのデータをロードする...
          </Link>
        ) : (
          <Divider sx={{ width: 100 }}>
            <Typography variant='button'>End</Typography>
          </Divider>
        )}
      </Stack>
    </>
  )
}
