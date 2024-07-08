'use client'
import { useEffect, useState } from 'react'
import {
  styled,
  TooltipProps,
  Tooltip,
  tooltipClasses,
  ClickAwayListener,
  Stack,
  Paper,
  ListSubheader,
  ListItem,
  ListItemButton,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
  Chip,
  List
} from '@mui/material'
import { blue } from '@mui/material/colors'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import MDialog from './MDialog'
import { deepCopy } from '@/@core/utils/Util'

type newTooltipProps = Omit<TooltipProps, 'title' | 'children'>

type MFilterTooltipProps<T> = {
  label: string | React.ReactNode
  header?: string | React.ReactNode
  list: { name: string; value: T }[]
  value?: T[]
  enterCallback?: (checked: T[]) => boolean | void
  cancelCallback?: () => boolean | void

  MDialog?: boolean
  TooltipParam?: newTooltipProps
}

const CustomFilterTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  // zIndex: 1001,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'transparent'
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
    marginTop: '0px'
  }
})

function MFilterTooltip<T>(props: MFilterTooltipProps<T>) {
  const [openfilter, setOpenFilter] = useState(false)
  const [checkedList, setCheckedList] = useState(props.value || [])

  useEffect(() => {
    if (openfilter) {
      setCheckedList(props.value || [])
    }
  }, [openfilter, props.value])

  function handleCheck(value: T, checked: boolean) {
    const temp = deepCopy<T[]>(checkedList)
    if (checked) {
      temp.push(value)
    } else {
      temp.splice(temp.indexOf(value), 1)
    }

    setCheckedList(temp)
  }

  function defaultEnter() {
    // console.log(checkedList);
    ;(props.enterCallback && props.enterCallback(checkedList)) || setOpenFilter(false)
  }

  function defaultCancel() {
    ;(props.cancelCallback && props.cancelCallback()) || setOpenFilter(false)
  }

  return (
    <>
      <ClickAwayListener onClickAway={defaultCancel} mouseEvent='onMouseDown'>
        <span>
          <CustomFilterTooltip
            {...props.TooltipParam}
            className={'MFILTERTOOLTIP'}
            open={openfilter}
            title={
              <Paper variant='outlined' sx={{ minWidth: 300 }}>
                <List sx={{ bgcolor: 'background.paper' }} subheader={<div></div>}>
                  <ListSubheader
                    disableSticky
                    sx={{
                      bgcolor: blue[700],
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    {props.header || props.label || ' '}
                  </ListSubheader>
                  {props.list &&
                    props.list.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton role={undefined} onClick={() => null} dense>
                          <FormControlLabel
                            sx={{ width: '100%' }}
                            control={
                              <Checkbox
                                value={item.value}
                                checked={checkedList && checkedList.includes(item.value)}
                                onChange={(e, checked) => {
                                  handleCheck(item.value, checked)
                                }}
                              />
                            }
                            label={item.name}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                </List>
                <Divider />
                <Stack direction={'row'} justifyContent={'center'} spacing={3} padding={'10px'}>
                  <Button variant='outlined' color='inherit' sx={{ fontWeight: 'bold' }} onClick={defaultCancel}>
                    キャンセル
                  </Button>
                  {props.MDialog ? (
                    <MDialog enterCallback={defaultEnter}>
                      <Button variant='contained' color='info' sx={{ fontWeight: 'bold' }}>
                        反映する
                      </Button>
                    </MDialog>
                  ) : (
                    <Button variant='contained' color='info' sx={{ fontWeight: 'bold' }} onClick={defaultEnter}>
                      反映する
                    </Button>
                  )}
                </Stack>
              </Paper>
            }
          >
            <Chip
              variant='outlined'
              // color="info"
              size='small'
              onClick={() => setOpenFilter(!openfilter)}
              sx={{ fontWeight: 'bold', padding: '0 20px' }}
              icon={<FilterAltIcon />}
              label={props.label}
            ></Chip>
          </CustomFilterTooltip>
        </span>
      </ClickAwayListener>
    </>
  )
}

export default MFilterTooltip
