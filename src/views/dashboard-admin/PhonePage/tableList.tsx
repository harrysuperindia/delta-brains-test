import { Grid, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import AlertItemDelete from 'views/application/kanban/Board/AlertItemDelete';
import { PhoneProfile } from 'types/phone';
import ReactPaginate from 'react-paginate';
import { itemsPerPage } from 'constant/data-delta-brain';
import { useDispatch } from 'store';
import { getDeletePhone } from 'store/slices/phone';

export default function TableList(props: {
  [x: string]: any;
  projectItem: any;

}) {

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState<PhoneProfile>();
  const handleModalClose = (status: boolean) => {
    setOpenModal(false);
    if(status){
      dispatch(getDeletePhone(props.projectItem, Number(data?.id)));
    }
  };
  const handleModalOpen = (dataP: any) => {
    setOpenModal(true);
    setData(dataP)
  };

  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(1);
  const [currentItems, setCurrentItems] = React.useState([]);
  // panigate
  function MovetoTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % props.projectItem.length;
    setItemOffset(newOffset);
  };
  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(props.projectItem.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.projectItem.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, props.projectItem]);
  React.useEffect(() => {
    setItemOffset(0);
  }, [props.projectItem]);

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
      <Grid container justifyContent='space-around'>
        {props.projectItem.length !== 0 ?
          <>
            {currentItems.map((items: any, index: number) => (
              <CsGridContainer key={index}>
                <Grid sx={{ width: '300px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={items.image} alt="phone" style={{ width: '70%', height: 'auto' }} />
                </Grid>
                <GridInfo sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <GridItems sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TyInfo fontSize='18px'>Tên sản phẩm</TyInfo>
                    <TyItems color='#000' fontWeight={900} fontSize='24px'>{items.nameProduct}</TyItems>
                  </GridItems>
                  <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TyInfo fontSize='18px'>Giá sản phẩm</TyInfo>
                    <TyItems color='#000' fontWeight={900} fontSize='26px'>{items.price.toLocaleString('en-US')}</TyItems>
                  </Grid>
                  <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TyInfoEdit fontSize='18px'>Chỉnh sửa</TyInfoEdit>
                    <GridEdit sx={{ display: 'flex', gap: '30px' }}>
                      <CsBorderColorIcon sx={{ color: 'blue' }} onClick={() => navigate(`/phone-page/edit/${items.id}`)} />
                      <CsDeleteForeverIcon sx={{ color: 'red' }} onClick={(e) => handleModalOpen(items)} />
                    </GridEdit>
                  </Grid>
                </GridInfo>
                <AlertItemDelete title={data?.nameProduct.toString()} open={openModal} handleClose={handleModalClose} />
              </CsGridContainer>
            ))}
          </>
          :
          <Grid mt={2}>
            No Data
          </Grid>
        }
      </Grid>
      <CustomFlex>
        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          onClick={MovetoTop}
        />
      </CustomFlex>
    </Grid>
  );
};

const CsGridContainer = styled(Grid)`
width: 100%;
height: 200px;
border-radius: 8px;
padding: 10px;
margin-top: 10px;
display: flex;
position: relative;
box-shadow: 0px 0px 5px 0px rgba(175,161,161,0.75);
-webkit-box-shadow: 0px 0px 5px 0px rgba(175,161,161,0.75);
-moz-box-shadow: 0px 0px 5px 0px rgba(175,161,161,0.75);
`
const CsBorderColorIcon = styled(BorderColorIcon)`
 &:hover{
  transform: scale(1.3);
 }
`
const CsDeleteForeverIcon = styled(DeleteForeverIcon)`
 &:hover{
  transform: scale(1.3);
 }
`
const CustomFlex = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 62px;
    margin-top: 2rem;
    margin-right: 2.5rem;
    ul {
      list-style: none;
      }
    .pagination{
        display:flex;
        flex-direction: row;
        width:340px;
        justify-content:space-around;
        align-items:center;
        *{
            list-style-type: none;
        }
    }
    .page-link {
        background: #49A2F2;
        padding:12px;
        border-radius:5px !important;
        border:none !important;
        color: #fff;
        &:focus {
            box-shadow:none !important;
        }
        &:hover{
            background: #21f8b7;
            cursor: pointer;
        }
    }
    .page-item.disabled .page-link{
        background: #aeadae;
        cursor: not-allowed! important;
        opacity: 0.8;
        pointer-events:none;
    }
    .page-item.active .page-link{
        background: #21f8b7;
        color:#fff;
    }
`
const GridInfo = styled(Grid)`
  @media screen and (max-width: 769px){
    flex-direction: column;
  }
`
const GridItems = styled(Grid)`
  @media screen and (max-width: 769px){
    gap: 10px;
  }
`
const GridEdit = styled(Grid)`
  @media screen and (max-width: 769px){
    position: absolute;
    right: 30px;
    bottom: 10px;
  }
  @media screen and (max-width: 669px){
    position: absolute;
    left: 30px;
    bottom: 10px;
  }
`
const TyInfo = styled(Typography)`
  @media screen and (max-width: 769px){
    font-size: 16px;
  }
`
const TyInfoEdit = styled(Typography)`
  @media screen and (max-width: 769px){
    display: none;
  }
`
const TyItems = styled(Typography)`
  @media screen and (max-width: 769px){
    font-size: 16px;
  }
`
