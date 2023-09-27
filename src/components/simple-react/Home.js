import React, { useMemo, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from "reactstrap";
import { FaStar } from "react-icons/fa6";
import { HomeCardList } from './HomeCardList';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

function Home({navbar}) {

  const [HomeCards] = useState(HomeCardList);
  const [numberOfCardShow, setNumberOfCardsShow] = useState(8);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const showmore = () => {

    if(numberOfCardShow + 8){
      setNumberOfCardsShow(numberOfCardShow + 8 );
    }
    else{
      setNumberOfCardsShow(numberOfCardShow.length);
      setShowMoreBtn(true);
    }
  }

  const itemsToShow = useMemo(() => {
      return (
        HomeCards.slice(0, numberOfCardShow)
        )}, [HomeCards, numberOfCardShow])

  return (
    <>

      <div className={`${navbar ? '' : 'custom-bg-Home'}`} style={{cursor: 'pointer'}}>
        
        <Container className='bg-white py-4' fluid>
        <Row className='mx-md-3 mx-1'>
          {itemsToShow?.map((item, index)=>{
            return(
              <Col key={index} lg={3} md={4} className='my-1'>
                <Card className="border-0" >
                    <Swiper cssMode={true} navigation={true} pagination={true} mousewheel={true} keyboard={true} modules={[Navigation, Pagination, Mousewheel, Keyboard]} 
                    className='mySwiper' >
                  {item?.images?.map((image, idx) => {
                    return(
                          <SwiperSlide key={idx}><img src={image} className="w-100" /></SwiperSlide>
                          )
                        })
                      }
                      </Swiper>
                  <CardBody className="px-1">
                    <CardTitle tag="h6" className="d-flex justify-content-between mb-1 w-100">
                      <span className="text-truncate">{item?.PlaceName}</span>
                      <span className="fsw-400 fs-6 text-nowrap"><FaStar className="mb-1" style={{width: '14px', height: 'auto'}}/>{item.Rating}</span>
                    </CardTitle>
                    <CardSubtitle className="card-subtitle text-muted text-truncate fsw-400 fs-6">
                      {item.AwayInKilometers}
                      <p className="mb-1 text-muted fcs-15"> {item?.MonthStart} {item?.DateStart} - {item?.MonthEnd} {item.DateEnd} </p>
                    </CardSubtitle>
                    <a className=""><span className="text-dark fcs-600">${item.AmountPerDay}</span><span className="mx-1 text-dark">night</span></a>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>

        <Row className="d-flex justify-content-center align-items-center mx-0 my-4 text-center w-100">
        <Col className="px-2">
          <p className="text-dark h5 text-wrap">Continue to exploring More Places</p>
          {showMoreBtn === false ? 
              <Button className='btn-dark' onClick={showmore}>{numberOfCardShow >= HomeCards.length ? 'No More Data' : 'Show More'}</Button>
              :  null }
            {numberOfCardShow >8 && <Button className='btn-dark mx-3' onClick={()=>setNumberOfCardsShow(8)}>Show Less</Button> }
          
        </Col>
      </Row>

        </Container>
        
      </div>

    </>
  );
}

export default Home;