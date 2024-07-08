import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'

dayjs.extend(relativeTime)
dayjs.locale('ja')

const dataList = [
  {
    code: '00020',
    user: {
      userId: '1',
      userName: 'Zenith_林',
      avatar: '林',
      avatarColor: 1
    },
    title: '開発環境-Server',
    text: `Method:

          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.

          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.

          Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don't open.)

          Set aside off of the heat to let rest for 10 minutes, and then serve.

          `,
    action: '追加',
    cardState: '処理中',
    execDateTime: dayjs().subtract(30, 's').toDate(),
    moreInfo: false
  },
  {
    code: '00021',
    user: {
      userId: '2',
      userName: 'Zenith_張',
      avatar: '張',
      avatarColor: 2
    },
    title: '通知ToDo作成バッチ 共通設計',
    text: `作り方

          鍋にスープ1/2カップを入れ、沸騰するまで加熱し、サフランを加えて10分間おく。

          パエリア鍋（14～16インチ）または深めの大きなスキレットに油を入れ、中火で熱する。鶏肉、エビ、チョリソを加え、時々混ぜながら軽く焼き色がつくまで6～8分焼く。エビを大皿に移し、鶏肉とチョリソーをフライパンに残しておく。ピメントン、ローリエ、ニンニク、トマト、タマネギ、塩、コショウを加え、とろみがついて香りが出るまでよく混ぜながら10分ほど煮る。サフランスープと残りのチキンスープ4カップ半を加え、沸騰させる。

          米を加え、全体に行き渡るように軽く混ぜる。アーティチョークとピーマンをのせ、混ぜずに汁気がなくなるまで15～18分煮る。中火にし、取っておいたエビとムール貝を米の中に入れ、ムール貝の口が開き、米が柔らかくなるまで、かき混ぜずにさらに5～7分煮る。(開かなかったムール貝は捨てる）。

          火を止めて10分間休ませ、皿に盛る。`,
    action: '更新',
    cardState: '処理中',
    execDateTime: dayjs().subtract(1, 'm').toDate(),
    moreInfo: false
  },
  {
    code: '00022',
    user: {
      userId: '3',
      userName: 'Zenith_葵',
      avatar: '葵',
      avatarColor: 3
    },
    title: 'バッチの共通化',
    text: `この印象的なパエリアはパーティー料理に最適で、ゲストと一緒に作る楽しい料理だ。お好みで、ムール貝と一緒に冷凍エンドウ豆を1カップ加えてもよい。
          この印象的なパエリアはパーティー料理に最適で、ゲストと一緒に作る楽しい料理だ。お好みで、ムール貝と一緒に冷凍エンドウ豆を1カップ加えてもよい。
          この印象的なパエリアはパーティー料理に最適で、ゲストと一緒に作る楽しい料理だ。お好みで、ムール貝と一緒に冷凍エンドウ豆を1カップ加えてもよい。
          この印象的なパエリアはパーティー料理に最適で、ゲストと一緒に作る楽しい料理だ。お好みで、ムール貝と一緒に冷凍エンドウ豆を1カップ加えてもよい。`,
    action: '更新',
    cardState: '完了',
    execDateTime: dayjs().subtract(1, 'd').toDate(),
    moreInfo: false
  },
  {
    code: '00022',
    user: {
      userId: '3',
      userName: 'Zenith_葵',
      avatar: '葵',
      avatarColor: 3
    },
    title: 'バッチの共通化',
    text: `1234567890
          abcdefghijklmnopqrstuvwxyz
          ~!@#$%^&*()_+-=*/
          []{};':",./<>?字`,
    action: '更新',
    cardState: '完了',
    execDateTime: getRandomDate(dayjs().subtract(2, 'd').toDate(), dayjs().subtract(1, 'd').toDate()),
    moreInfo: false
  }
]

function getRandomDate(start: Date, end = new Date()) {
  const startTimestamp = start.getTime()
  const endTimestamp = end.getTime()
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp)
  return new Date(randomTimestamp)
}

;[...new Array(20)].map((i, index) => {
  dataList.push({
    code: '00022',
    user: {
      userId: '3',
      userName: 'Zenith_葵',
      avatar: '葵',
      avatarColor: 3
    },
    title: 'バッチの共通化',
    text: `This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
          `,
    action: '更新',
    cardState: '完了',
    execDateTime: getRandomDate(
      dayjs()
        .subtract(index + 3, 'd')
        .toDate(),
      dayjs()
        .subtract(index + 1, 'd')
        .toDate()
    ),
    moreInfo: false
  })
})

export default function handler(_req: any, res) {
  res.status(200).json({ data: dataList })
}
