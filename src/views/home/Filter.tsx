'use client'
import MFilterTooltip from '@/@core/components/mui/MFilterTooltip'
import { useState } from 'react'

export const Filter = () => {
  const filterList = [
    { name: '課題', value: new Date() },
    { name: 'Wiki', value: 'Wiki' },
    { name: 'ファイル', value: 'ファイル' },
    { name: 'Subversion', value: 'Subversion' },
    { name: 'Git', value: 1 },
    { name: 'プロジェクト', value: 2 }
  ]
  const [filterValues, setFilterValues] = useState<unknown[]>([])

  return (
    <MFilterTooltip<unknown>
      label='表示設定1'
      list={filterList}
      value={filterValues}
      enterCallback={checkedList => setFilterValues(checkedList)}
      MDialog
      TooltipParam={{ placement: 'bottom-end' }}
    />
  )
}
