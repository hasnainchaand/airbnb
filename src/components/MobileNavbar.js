import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import {
  FaMinus,
  FaPlus,
  FaSistrix,
  FaSliders,
  FaXmark,
} from "react-icons/fa6";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { SelectedLocation } from "./SelectedLocation";

function MobileNavbar({
  state,
  setState,
  disableAdult,
  adultcounter,
  AdultIncrement,
  AdultDecrement,
  childcounter,
  ChildIncrement,
  ChildDecrement,
  infantcounter,
  InfantIncrement,
  InfantDecrement,
  petcounter,
  PetIncrement,
  PetDecrement,
  handleSelectedLocation,
  inputvalue,
  handleInputCountries,
  filtercountries,
  handleSelectInputCountry,
  setInputValue,
  location,
}) {
  const [MobileActiveTab, setMobileActiveTab] = useState("1");

  const [MobileSubActiveTab, setMobileSubActiveTab] = useState("1");
  const toggleSubNavbarTab = (tab) => {
    if (MobileSubActiveTab !== tab) {
      setMobileSubActiveTab(tab);
    } else {
      setMobileSubActiveTab("");
    }
  };

  const [mobileSubnavbar, setMobileSubNavbar] = useState(true);
  const [XCloseNavbar, setXCloseNavbar] = useState(true);

  const handleSubNavbarClose = () => {
   
    if (XCloseNavbar) {
      setMobileSubNavbar(true);
    } else {
      setMobileSubNavbar(false);
    }
    setXCloseNavbar(false);
  }
  
  const handleSubNavbar = () => {
    if (mobileSubnavbar) {
      setMobileSubNavbar(false);
      setXCloseNavbar(true);
    } else {
      setMobileSubNavbar(true);
    }
  }

  //   useEffect(()=>{
  // if(inputvalue==""){
  // setMobileCountryMap(true)
  // setMobilecountrylist(false)
  // }else{
  //   setMobileCountryMap(false)
  //   setMobilecountrylist(true)
  // }
  //   },[inputvalue])

  return (
    <>

{mobileSubnavbar === true ? (
      <Container
        className="bg-light py-2 d-md-none d-block mobile-navbar-sticky"
        fluid
        onClick={handleSubNavbar}
      >
        <Row className="m-2 custom-main-border rounded-pill">
          <Col>
            <Row className="py-2 justify-content-between align-items-center">
              <Col className="text-start">
                <div className="d-flex justify-content-start align-items-center">
                  <Button className="bg-transparent border-0 text-dark">
                    <FaSistrix className="my-1" style={{ fontSize: "20px" }} />
                  </Button>
                  <p className="mb-0 text-dark fcw-medium py-0">
                    Anywhere
                    <br />
                    <span className="text-secondary text-truncate">
                      Any week . Add guests
                    </span>
                  </p>
                </div>
              </Col>
              <Col className="text-end">
                <Button className="bg-transparent rounded-custom-pill border-1 border-secondary text-dark ">
                  <FaSliders className="mb-1" style={{ fontSize: "15px" }} />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
        ) : (
      XCloseNavbar === true ? (
      <Container
        className="bg-light d-md-none d-block mobile-navbar-sticky overflow-auto"
        fluid
        style={{ height: "auto" }}
      >
          <Row className="bg-light align-items-center mobile-navbar-sticky">
            <div className="custom-MobileNav-styling" onClick={handleSubNavbarClose}>
              <FaXmark
                className="border border-secondary bg-light rounded-pill p-2"
                style={{ fontSize: "30px" }}
              />
            </div>
            <div className="w-100 py-2">
              <Nav className="border-0 justify-content-center" tabs>
                <NavItem className="custom-pointer">
                  <NavLink
                    className={`text-muted fcw-600 fs-6 py-2 px-3 border-0 bg-transparent ${
                      MobileActiveTab === "1" ? "Mobile popular-Active" : ""
                    }`}
                    onClick={() => setMobileActiveTab("1")}
                  >
                    Stays
                  </NavLink>
                </NavItem>
                <NavItem className="custom-pointer">
                  <NavLink
                    className={`text-muted fcw-600 fs-6 py-2 px-3 border-0 bg-transparent ${
                      MobileActiveTab === "2" ? "Mobile popular-Active" : ""
                    }`}
                    onClick={() => setMobileActiveTab("2")}
                  >
                    Experiences
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Row>
          <Row className="overflow-auto" style={{ height: "100vh" }}>
            <TabContent activeTab={MobileActiveTab} className="my-3">
              <TabPane tabId="1">
                {/* Mobile-SubNavbar-Tabs-- start */}

                <Nav tabs className="flex-column">
                  <TabContent activeTab={MobileSubActiveTab} className="w-100">
                    <NavItem>
                      <NavLink
                        className={
                          MobileSubActiveTab === "1"
                            ? "bg-transparent px-0"
                            : "bg-transparent px-0"
                        }
                        onClick={() => toggleSubNavbarTab("1")}
                      >
                        {/* Tab-1 */}

                        <Row className="mx-1 my-2">
                          <Col className="bg-white custom-main-border brd-radius p-3">
                            <div className="d-flex justify-content-between">
                              <div className="">
                                <p className="mb-0 fcw-medium text-secondary">
                                  Where
                                </p>
                              </div>
                              <div className="">
                                <p className="mb-0 fcw-medium text-dark">
                                  {inputvalue || "I`m flexible"}
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {/* Tab-1 */}
                      </NavLink>
                      {MobileSubActiveTab === "1" && (
                        <TabPane tabId="1">
                          {/* Selected Map -- Start */}
                          <Row className="bg-white custom-main-border brd-radius flex-column mx-1 my-2 px-3">
                            <p className="mb-0 py-3 fsw-600 fs-4">Where To ?</p>

                            <Col className="bg-white custom-main-border brd-radius p-3">
                              <div className="input-group align-items-center">
                                <span className="bg-transparentinput-group-text border-0">
                                  <FaSistrix
                                    className="my-1"
                                    style={{ fontSize: "20px" }}
                                  />
                                </span>
                                <input
                                  type="text"
                                  className="form-control border-0 text-secondary fcw-500 py-2 px-3"
                                  placeholder="Search destinations"
                                  value={inputvalue}
                                  onChange={handleInputCountries}
                                />
                              </div>
                            </Col>

                            {/* Select CountryMap  --Start */}
                            {inputvalue == "" && (
                              <Row className="flex-nowrap align-items-center overflow-auto my-4">
                                {SelectedLocation?.map((item, id) => {
                                  return (
                                    <Col key={id} xs={5} className="py-3">
                                      <a
                                        className=""
                                        href="#"
                                        onClick={() =>
                                          handleSelectedLocation(item)
                                        }
                                      >
                                        <img
                                          src={item.image}
                                          className="w-100 custom-img-brd"
                                          alt=""
                                        />
                                        <p className="mb-0 ps-1 fsw-400 text-truncate text-secondary">
                                          {item.countryName}
                                        </p>
                                      </a>
                                    </Col>
                                  );
                                })}
                              </Row>
                            )}

                            {/* Select CountryMap  --End */}

                            {/* Select CountryByName  --Start */}
                            {inputvalue !== "" && (
                              <Row className="my-3">
                                <Col sm="12">
                                  <Card
                                    body
                                    className="my-3 p-0 pb-lg-4 pb-md-0 border-0 overflow-auto"
                                    style={{ height: "200px" }}
                                  >
                                    {filtercountries?.map((country, idx) => {
                                      return (
                                        <a
                                          key={idx}
                                          className="d-flex justify-content-center align-items-center custom-SubTab py-2"
                                          onClick={() => {
                                            handleSelectInputCountry(country);
                                            setInputValue(country.countryName);
                                          }}
                                        >
                                          <Col xs={2} className="text-end">
                                            <img
                                              src={location}
                                              className="custom-img-icon"
                                            />
                                          </Col>
                                          <Col
                                            xs={10}
                                            className="fs-6 px-3 text-dark"
                                          >
                                            <p className="mb-0 fs-6 text-dark">
                                              {country.countryName}
                                            </p>
                                          </Col>
                                        </a>
                                      );
                                    })}
                                  </Card>
                                </Col>
                              </Row>
                            )}
                            {/* Select CountryByName  --End */}
                          </Row>
                          {/* Selected Map -- End */}
                        </TabPane>
                      )}
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={
                          MobileSubActiveTab === "2"
                            ? "bg-transparent px-0"
                            : "bg-transparent px-0"
                        }
                        onClick={() => toggleSubNavbarTab("2")}
                      >
                        {/* Tab-2 */}
                        <Row className="mx-1 my-2">
                          <Col className="bg-white custom-main-border brd-radius p-3">
                            <div className="d-flex justify-content-between">
                              <div className="">
                                <p className="mb-0 fcw-medium text-secondary">
                                  When
                                </p>
                              </div>
                              <div className="">
                                <p className="mb-0 fcw-medium text-dark">
                                  Add dates
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {/* Tab-2 */}
                      </NavLink>

                      {MobileSubActiveTab === "2" && (
                        <TabPane tabId="2">
                          {/* Date Pick er -- Start */}
                          <Row className="mx-1 my-2">
                            <div className="m-auto w-100 px-0">
                              <Card
                                body
                                className="bg-white overflow-auto"
                                style={{ width: "100%", height: "auto" }}
                              >
                                <DateRangePicker
                                  onChange={(item) =>
                                    setState([item.selection])
                                  }
                                  showSelectionPreview={true}
                                  moveRangeOnFirstSelection={false}
                                  months={2}
                                  ranges={state}
                                  direction="horizontal"
                                />
                              </Card>
                            </div>
                          </Row>
                          {/* Date Picker -- End */}
                        </TabPane>
                      )}
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={
                          MobileSubActiveTab === "3"
                            ? "bg-transparent px-0"
                            : "bg-transparent px-0"
                        }
                        onClick={() => toggleSubNavbarTab("3")}
                      >
                        {/* Tab-3 */}
                        <Row className="mx-1 my-2">
                          <Col className="bg-white custom-main-border brd-radius p-3">
                            <div className="d-flex justify-content-between">
                              <div className="">
                                <p className="mb-0 fcw-medium text-secondary">
                                  Who
                                </p>
                              </div>
                              <div className="">
                                <p className="mb-0 fcw-medium text-dark">
                                  Add guests
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {/* Tab-3 */}
                      </NavLink>

                      {MobileSubActiveTab === "3" && (
                        <TabPane tabId="3">
                          {/* Pick You Guests --Start */}
                          <Row className="mx-1 my-2">
                            <Card body className="bg-white overflow-auto">
                              <div className="d-flex justify-content-between border-bottom p-3">
                                <p className="fcw-medium  text-start fs-6">
                                  Adults <br />
                                  <span className="text-secondary text-wrap fsw-400">
                                    Ages 13 or above
                                  </span>
                                </p>
                                <div className="d-flex align-items-center">
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={adultcounter <= 0 || disableAdult}
                                  >
                                    <FaMinus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        adultcounter <= 0 || disableAdult
                                          ? "disabled"
                                          : ""
                                      }`}
                                      onClick={AdultDecrement}
                                    />
                                  </Button>
                                  <p
                                    className="mb-0 text-center"
                                    style={{ width: "30px" }}
                                  >
                                    {adultcounter}
                                    {adultcounter >= 16 ? <span>+</span> : null}
                                  </p>
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={adultcounter >= 16}
                                  >
                                    <FaPlus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        adultcounter >= 16 ? "disabled" : ""
                                      }`}
                                      onClick={AdultIncrement}
                                    />
                                  </Button>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between border-bottom p-3">
                                <p className="fcw-medium  text-start fs-6">
                                  Children
                                  <br />
                                  <span className="text-secondary text-wrap fsw-400">
                                    Ages 2-12
                                  </span>
                                </p>
                                <div className="d-flex align-items-center">
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={
                                      childcounter <= 0 || adultcounter >= 16
                                    }
                                  >
                                    <FaMinus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        childcounter <= 0 || adultcounter >= 16
                                          ? "disabled"
                                          : ""
                                      }`}
                                      onClick={ChildDecrement}
                                    />
                                  </Button>
                                  <p
                                    className="mb-0 text-center"
                                    style={{ width: "30px" }}
                                  >
                                    {childcounter}
                                  </p>
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={
                                      childcounter >= 15 || adultcounter >= 16
                                    }
                                  >
                                    <FaPlus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        childcounter >= 15 || adultcounter >= 16
                                          ? "disabled"
                                          : ""
                                      }`}
                                      onClick={ChildIncrement}
                                    />
                                  </Button>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between border-bottom p-3">
                                <p className="fcw-medium  text-start fs-6">
                                  Infants
                                  <br />
                                  <span className="text-secondary text-wrap fsw-400">
                                    Under 2
                                  </span>
                                </p>
                                <div className="d-flex align-items-center">
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={infantcounter <= 0}
                                  >
                                    <FaMinus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        infantcounter <= 0 ? "disabled" : ""
                                      }`}
                                      onClick={InfantDecrement}
                                    />
                                  </Button>
                                  <p
                                    className="mb-0 text-center"
                                    style={{ width: "30px" }}
                                  >
                                    {infantcounter}
                                  </p>
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={infantcounter >= 5}
                                  >
                                    <FaPlus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        infantcounter >= 5 ? "disabled" : ""
                                      }`}
                                      onClick={InfantIncrement}
                                    />
                                  </Button>
                                </div>
                              </div>
                              <div className="d-flex justify-content-between p-3">
                                <p className="fcw-medium  text-start fs-6">
                                  Pets
                                  <br />
                                  <a className="text-secondary text-wrap fsw-400">
                                    Bringing a Service animal?
                                  </a>
                                </p>
                                <div className="d-flex align-items-center">
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={petcounter <= 0}
                                  >
                                    <FaMinus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        petcounter <= 0 ? "disabled" : ""
                                      }`}
                                      onClick={PetDecrement}
                                    />
                                  </Button>
                                  <p
                                    className="mb-0 text-center"
                                    style={{ width: "30px" }}
                                  >
                                    {petcounter}
                                  </p>
                                  <Button
                                    className="bg-transparent border-0 text-dark"
                                    disabled={petcounter >= 5}
                                  >
                                    <FaPlus
                                      className={`rounded-pill border cst-brd text-dark p-2 custom-icon ${
                                        petcounter >= 5 ? "disabled" : ""
                                      }`}
                                      onClick={PetIncrement}
                                    />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </Row>
                          {/* Pick You Guests --End */}
                        </TabPane>
                      )}
                    </NavItem>
                  </TabContent>
                </Nav>

                {/* Mobile-SubNavbar-Tabs-- End */}
              </TabPane>
            </TabContent>
          </Row>

      </Container>
         )  : false
        )}
    </>
  );
}

export default MobileNavbar;
