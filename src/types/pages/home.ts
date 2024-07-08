type CardListProps = {
  groupKey: Date
  groupId: number
  cardList: cardType[]
}

type cardType = {
  code: string
  user: {
    userId: string
    userName: string
    avatar: string
    avatarColor: number
  }
  title: string
  text: string
  action: string
  cardState: string
  execDateTime: Date
  moreInfo: boolean
}
