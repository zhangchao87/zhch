import React from 'react'
import { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  IconButton,
  Alert,
  Typography
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import type { DialogProps } from '@mui/material'

type newDialogProps = Omit<DialogProps, 'open'>

type MDialogProps = {
  beforeClose?: () => void // closeCallback
  /**
   * enterCallback
   * @returns 戻り値がtrueの場合、ダイアログは閉じられない。
   */
  enterCallback?: () => boolean | void
  /**
   * Callback function used by external components to control the visibility of this component.
   *
   * notice: returns should base on useState-hook.The child component is wrapped by an empty tag.
   *
   * @param {...any[]} args - Any function arguments
   * @returns {boolean} - Indicates whether the component should be shown or not
   */
  isOpenCallback?: <T>(...args: T[]) => boolean
  dialogParams?: newDialogProps // MUIダイアログのプロパティ

  type?: 'info' | 'warning' | 'error' // @default warning
  title?: React.ReactNode
  text?: string
  innerNode?: React.ReactNode
  children: JSX.Element // target
  /**
   * cancel -> キャンセル
   * confirm -> 確定
   */
  hiddenButtons?: ('cancel' | 'confirm')[]
}

enum colors {
  default = '#0000',
  info = '#eff7fe',
  warning = '#fdf7ed',
  error = '#fcf1f1'
}

export default function MDialog(props: MDialogProps) {
  // const { theme } = useTheme()
  const [open, setOpen] = useState(false)

  function defaultClose() {
    props.beforeClose && props.beforeClose()
    setOpen(false)
  }

  function defaultEnter() {
    ;(props.enterCallback && props.enterCallback()) || setOpen(false)
  }

  // const bgColor = theme != 'DARK' ? colors[props.type || 'default'] : undefined
  const bgColor = colors[props.type || 'default']

  return (
    <>
      {props.isOpenCallback ? (
        <>{props.children}</>
      ) : (
        <span
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.stopPropagation()
            setOpen(true)
          }}
        >
          {props.children}
        </span>
      )}
      <Dialog
        fullWidth
        maxWidth={'sm'}
        {...props.dialogParams}
        open={props.isOpenCallback ? props.isOpenCallback() : open}
        onClose={(e, reason) => {
          if (reason == 'backdropClick') {
            // ダイアログの後ろの空白をクリックすると
            console.log(reason)
          }
        }}
      >
        {props.type ? (
          <DialogTitle sx={{ m: 0, p: 0 }} whiteSpace={'pre-wrap'}>
            <Alert variant='standard' severity={props.type}>
              <b>{props.title || 'メッセージ'}</b>
            </Alert>
          </DialogTitle>
        ) : (
          <DialogTitle whiteSpace={'pre-wrap'}>
            <b>{props.title || 'メッセージ'}</b>
          </DialogTitle>
        )}

        <IconButton
          aria-label='close'
          onClick={defaultClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider></Divider>
        <DialogContent sx={{ bgcolor: bgColor }}>
          {props.innerNode ? (
            <React.Fragment>{props.innerNode}</React.Fragment>
          ) : (
            <DialogContentText whiteSpace={'pre-wrap'}>{props.text || '本当に続けるのか？'}</DialogContentText>
          )}
        </DialogContent>
        <Divider></Divider>
        <DialogActions sx={{ bgcolor: bgColor }}>
          {!props.hiddenButtons?.includes('cancel') && props.type != 'error' ? (
            <Button onClick={defaultClose} variant='outlined'>
              <Typography variant='button' color={'#666'}>
                キャンセル
              </Typography>
            </Button>
          ) : (
            <></>
          )}
          {!props.hiddenButtons?.includes('confirm') && (
            <Button onClick={defaultEnter} variant='contained' color={props.type} autoFocus>
              確定
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
