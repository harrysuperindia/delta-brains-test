import {
  Grid
} from "@mui/material";
import React from "react";
import { gridSpacing } from "store/constant";
import { PhoneProfile } from "types/phone";
import IBreadcrumsCustom from "ui-component/breadcrums";
import MainCardPhone from "ui-component/cards/MainCardPhone";
import TableGrid from "./tableGrid";
import TableList from "./tableList";

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable(props: {
  [x: string]: any;
  projectItem: any;

}) {

  const [listData, setListData ] = React.useState<PhoneProfile[]>([])
  const [valueTable, setValueTable] = React.useState(1)
  const [valueFind, setValueFind] = React.useState('')
  
  React.useEffect(() => {
    const newData = props.projectItem.filter((data:any) => data.nameProduct.toLowerCase().includes(valueFind.toLowerCase()));
    if(valueFind === ''){
      setListData(props.projectItem)
    }else{
      setListData(newData)
    }

}, [valueFind, props.projectItem]);

React.useEffect(() => {
  const isActive = localStorage.getItem('activeGrid')
  if(isActive === '1'){
      setValueTable(1)
  }
  if(isActive === '2'){
      setValueTable(2)
  }
}, []);

  return (
    <>
      <IBreadcrumsCustom profile="Trang chủ" mainProfile="Điện thoại di động" link="#" />
      <MainCardPhone title={`Thông tin điện thoại`}
        valueActive={(newValue: number) => setValueTable(newValue)}
        valueFind={(newValue: string) => setValueFind(newValue)}
      >
        <Grid
          container
          spacing={gridSpacing}
          sx={{ flexWrap: "nowrap", justifyContent: "space-between" }}
        >
        </Grid>
        <Grid>
          {valueTable === 1 && <TableGrid projectItem={listData} />}
          {valueTable === 2 && <TableList projectItem={listData} />}
        </Grid>
      </MainCardPhone>
    </>
  );
}