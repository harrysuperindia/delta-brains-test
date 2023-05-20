// material-ui
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

// types
interface Props {
    title: any;
    open: boolean;
    handleClose: (status: boolean) => void;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function AlertItemDelete({ title, open, handleClose }: Props) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="xs"
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            {open && (
                <>
                    <DialogTitle id="item-delete-title">Bạn có chắc chắn xóa? - {title} </DialogTitle>
                    <DialogActions sx={{ mr: 2 }}>
                        <Button onClick={() => handleClose(false)} color="error">
                            Hủy bỏ
                        </Button>
                        <Button variant="contained" size="small" onClick={() => handleClose(true)} autoFocus>
                            Xác nhận
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
