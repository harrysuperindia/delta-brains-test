import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Grid, Typography } from '@mui/material';
import { itemsPerPage } from 'constant/data-delta-brain';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'store';
import { getDeletePhone } from 'store/slices/phone';
import styled from 'styled-components';
import { PhoneProfile } from 'types/phone';
import AlertItemDelete from 'views/application/kanban/Board/AlertItemDelete';

export default function TableGrid(props: {
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
    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container justifyContent='space-around'>
        {props.projectItem.length !== 0 ?
          <>
            {
              currentItems.map((items: any) => (
                <CsGridContainer mt={2} sx={{ width: '300px', height: '500px' }}>
                  <Grid sx={{ width: '300px', height: '300px' }}>
                    <img src={items.image} alt="phone" style={{ width: '100%', height: '100%' }} />
                  </Grid>
                  <Grid sx={{ width: '300px', height: '200px', padding: '1rem 2rem 0rem 2rem' }}>
                    <Typography fontSize='24px'>{items.nameProduct}</Typography>
                    <Typography fontSize='26px'>{items.price.toLocaleString('en-US')}</Typography>
                  </Grid>
                  <CsGrid sx={{ display: 'flex', gap: '50px' }}>
                    <CsBorderColorIcon sx={{ color: 'blue' }} onClick={() => navigate(`/phone-page/edit/${items.id}`)} />
                    <CsDeleteForeverIcon sx={{ color: 'red' }} onClick={() => handleModalOpen(items)} />
                  </CsGrid>
                  <AlertItemDelete title={data?.nameProduct} open={openModal} handleClose={handleModalClose} />
                </CsGridContainer>
              ))
            }
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
  padding-top: 2rem;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 0px 5px 0px rgba(175,161,161,0.75);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(175,161,161,0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(175,161,161,0.75);
  &:hover{
    /* transform: scale(1.1); */
    box-shadow: 0px 0px 19px 8px rgba(190,190,190,0.64);
  -webkit-box-shadow: 0px 0px 19px 8px rgba(190,190,190,0.64);
  -moz-box-shadow: 0px 0px 19px 8px rgba(190,190,190,0.64);
  cursor: pointer;
 }
`
const CsBorderColorIcon = styled(BorderColorIcon)`
  transform: scale(1.4);
 &:hover{
  transform: scale(1.5);
 }
`
const CsDeleteForeverIcon = styled(DeleteForeverIcon)`
  transform: scale(1.5);
 &:hover{
  transform: scale(1.6);
 }
`
const CsGrid = styled(Grid)`
  position: absolute;
  bottom: 5%;
  left: 32%;
`
const CustomFlex = styled(Grid)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 62px;
    margin-top: 2rem;
    margin-left: -1rem;
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