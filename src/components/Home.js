import React, { useState } from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from "reactstrap";
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

  return (
    <>

      <div className={`${navbar ? '' : 'custom-bg-Home'}`} style={{cursor: 'pointer'}}>
        <Container className='bg-white py-4' fluid>
        <Row className='mx-md-3 mx-1'>
          {HomeCardList.map((item, index)=>{
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
                    <CardTitle tag="h6" className="d-inline-block mb-1 w-100">
                      <span className="float-start">{item?.PlaceName}</span>
                      <span className="float-end fsw-400 fs-6"><FaStar className="mb-1" style={{width: '14px', height: 'auto'}}/>{item.Rating}</span>
                    </CardTitle>
                    <CardSubtitle className="card-subtitle text-muted fsw-400 fs-6">
                      {item.AwayInKilometers}
                      <p className="mb-1 text-muted fcs-15"> {item?.Month} {item?.DateStart} - {item.DateEnd} </p>
                    </CardSubtitle>
                    <a className=""><span className="text-dark fcs-600">${item.AmountPerDay}</span><span className="mx-1 text-dark">night</span></a>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
        </Container>
      </div>

    </>
  );
}

export default Home;
