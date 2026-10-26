import { Box, Modal } from '@mui/material'
import type { JSXElementConstructor, ReactElement } from 'react';

interface CustomModalProps {
    open: boolean
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
    children: ReactElement<unknown, string | JSXElementConstructor<any>>
    label: string
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

function CustomModal({ open, onClose, children, label } : CustomModalProps) {
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby={label}
    >
        <Box sx={style}>
            {children}
        </Box>
    </Modal>
  )
}

export default CustomModal