import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { gridSpacing } from "store/constant";
import { KeyedObject } from "types";
import IBreadcrumsCustom from "ui-component/breadcrums";
import MainCardV2 from "ui-component/cards/MainCard";

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable(props: {
  [x: string]: any;
  projectItem: any;

}) {
  const navigate = useNavigate();

  const handleToggle = async (username: string) => {
    navigate({
      pathname: `/all-users/${username}`
    });
  }

  return (
    <>
      <IBreadcrumsCustom profile="Trắc nghiệm tính cách" mainProfile="Trắc nghiệm tính cách" link="/tracnghiemtinhcach" />
      <MainCardV2 title={`Danh sách câu hỏi của`}>
            <Grid
              container
              spacing={gridSpacing}
              sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
            >
            </Grid>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell >SỐ THỨ TỰ</TableCell>
                    <TableCell align="left">Họ và Tên</TableCell>
                    <TableCell align="left">Email</TableCell>
                    <TableCell align="left">Hình Ảnh</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.projectItem
                    .map((row: KeyedObject, index: number) => (
                      <TableRow
                        sx={{ py: 3 }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        onClick={() => handleToggle(row.username)}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{row.username}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">
                          {row.image !== '' &&
                          <img style={{width: '50px', height: '50px'}} src={row.image} alt="image"/>
                        }
                        </TableCell>
                        
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCardV2>
    </>
  );
}
