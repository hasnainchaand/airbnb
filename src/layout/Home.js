import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { FaStar } from "react-icons/fa6";
import { HomeCardList } from "../data_files/HomeCardList";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import dayjs from "dayjs";
var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
dayjs.extend(isSameOrAfter);
var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

function Home({ navbar, searchData }) {
  const [HomeCards] = useState(HomeCardList);
  const [numberOfCardShow, setNumberOfCardsShow] = useState(8);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const showmore = () => {
    if (numberOfCardShow + 8 <= HomeCards.length) {
      setNumberOfCardsShow(numberOfCardShow + 8);
    } else {
      setNumberOfCardsShow(HomeCards.length);
      setShowMoreBtn(true);
    }
  };

  const itemsToShow = useMemo(() => {
    if (searchData) {
      // When you filtering another 2 array and 2nd is particularly Date Picker
      // Make concept date take length and 1st is array So when its see date are not selected 
      // and have null array then when you select country its return false b/c array.length is null 
      // thats why we using this
      const isOnlyCountry = searchData.startSelectedDate?.length === 0;
      
      const selectedStartDate = dayjs(searchData.startSelectedDate, {
        format: "MM/DD/YYYY",
      });
      const selectedEndDate = dayjs(searchData.endSelectedDate, {
        format: "MM/DD/YYYY",
      });

      // Filter by Country if a country is Matched
      const filteredByCountry = HomeCards.filter(
        (item) =>
          item.PlaceName.split(", ")[1]?.toLowerCase() === searchData.inputvalue
      );

      // Filter by Date Range if Date is Matched
      const filteredByDateRange = HomeCards.filter((item) => {
        const CardDateStart = dayjs(item.startDate, { format: "MM/DD/YYYY" });
        const CardDateEnd = dayjs(item.endDate, { format: "MM/DD/YYYY" });

        // Check if CardDateStart is after or equal to selectedStartDate
        // and CardDateEnd is before or equal to selectedEndDate
        return (
          // CardDateStart.isSameOrAfter(selectedStartDate) && CardDateEnd.isSameOrBefore(selectedEndDate)
          CardDateStart >= selectedStartDate && CardDateEnd <= selectedEndDate
        );
      });

      // Combine filters based on user selections
      let finalFilteredResults = [];
      // If Array is null/ Empty then it returns True value that why
      // We write with that if array has length is zero then show false otherwise true return

      if (
        !isOnlyCountry &&
        searchData.inputvalue &&
        searchData.startSelectedDate &&
        searchData.endSelectedDate
      ) {
        // If both country and date are selected, show results matching both
        finalFilteredResults = filteredByCountry.filter((item) => {
          return (
            filteredByDateRange.includes(item) &&
            item.PlaceName.split(", ")[1]?.toLowerCase() ===
              searchData.inputvalue
          );
        });
      } else if ( !isOnlyCountry && searchData.startSelectedDate && searchData.endSelectedDate) {
        // If only date range is selected, show date range-specific results
        finalFilteredResults = filteredByDateRange;
      } else {
        // If only country is selected, show country-specific results
        finalFilteredResults = filteredByCountry;
      }

      return finalFilteredResults.slice(0, numberOfCardShow);
    } else {
      return HomeCards.slice(0, numberOfCardShow);
    }
  }, [HomeCards, numberOfCardShow, searchData]);

  return (
    <>
      <div
        className={`${navbar ? "" : "custom-bg-Home"}`}
        style={{ cursor: "pointer" }}
      >
        <Container className="bg-white py-4" fluid>
          <Row className="mx-md-3 mx-1">
            {itemsToShow?.map((item, index) => {
              return (
                <Col key={index} lg={3} md={4} className="my-1">
                  <Card className="border-0">
                    <Swiper
                      cssMode={true}
                      navigation={true}
                      pagination={true}
                      mousewheel={true}
                      keyboard={true}
                      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                      className="mySwiper"
                    >
                      {item?.images?.map((image, idx) => {
                        return (
                          <SwiperSlide key={idx}>
                            <img src={image} className="w-100" />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <CardBody className="px-1">
                      <CardTitle
                        tag="h6"
                        className="d-flex justify-content-between mb-1 w-100"
                      >
                        <span className="text-truncate">{item?.PlaceName}</span>
                        <span className="fsw-400 fs-6 text-nowrap">
                          <FaStar
                            className="mb-1"
                            style={{ width: "14px", height: "auto" }}
                          />
                          {item.Rating}
                        </span>
                      </CardTitle>
                      <CardSubtitle className="card-subtitle text-muted text-truncate fsw-400 fs-6">
                        {item.AwayInKilometers}
                        <p className="mb-1 text-muted fcs-15">
                          {" "}
                          {item?.MonthStart} {item?.DateStart} -{" "}
                          {item?.MonthEnd} {item.DateEnd}{" "}
                        </p>
                      </CardSubtitle>
                      <a className="">
                        <span className="text-dark fcs-600">
                          ${item.AmountPerDay}
                        </span>
                        <span className="mx-1 text-dark">night</span>
                      </a>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Row className="d-flex justify-content-center align-items-center mx-0 my-4 text-center w-100">
            <Col className="px-2">
              <p className="text-dark h5 text-wrap">
                Continue to exploring More Places
              </p>
              {showMoreBtn === false ? (
                <Button className="btn-dark" onClick={showmore}>
                  {numberOfCardShow >= HomeCards.length
                    ? "No More Data"
                    : "Show More"}
                </Button>
              ) : null}
              {numberOfCardShow > 8 && (
                <Button
                  className="btn-dark mx-3"
                  onClick={() => setNumberOfCardsShow(8)}
                >
                  Show Less
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
