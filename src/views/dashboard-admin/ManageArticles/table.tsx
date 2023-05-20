import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { gridSpacing } from "store/constant";
import { KeyedObject } from "types";
import IBreadcrumsCustom from "ui-component/breadcrums";
import MainCardV2 from "ui-component/cards/MainCard";

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable(props: {
  [x: string]: any;
  projectItem: any;

}) {

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
                    <TableCell align="left">CÂU HỎI</TableCell>
                    <TableCell align="left">ĐÁP ÁN A</TableCell>
                    <TableCell align="left">ĐÁP ÁN B</TableCell>
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
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        {/* <TableCell align="left">{row.question}</TableCell> */}
                        
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCardV2>
    </>
  );
}
