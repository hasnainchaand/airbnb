import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Input, Row } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import {
  FaAirbnb,
  FaBars,
  FaCircleUser,
  FaGlobe,
  FaMinus,
  FaPlus,
  FaSistrix,
  FaSliders,
  FaXmark,
} from "react-icons/fa6";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import location from "../assests/location-icon.png";
import { countriesList } from "./CountriesList";
import { SelectedLocation } from "./SelectedLocation";

function Navbar() {
  const [showTab1, setshowTab1] = useState(true);
  const [showTab2, setshowTab2] = useState(false);
  const [filtercountries, setFiltercountries] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [crossBtn, setCrossBtn] = useState(false);

  const filterCountryName = (input) => {
    const filtered = countriesList.filter((country) =>
      country.countryName.toLowerCase().includes(input.toLowerCase())
    );
    return filtered;
  };

  const handleInputCountries = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      const filteredvalue = filterCountryName(value);
      setFiltercountries(filteredvalue);
      setCrossBtn(true);

      if (filteredvalue.length === 0) {
        setshowTab1(false);
        setshowTab2(false);
      } else {
        setshowTab1(false);
        setshowTab2(true);
      }
    } else {
      setshowTab1(false);
      setshowTab2(false);
      setFiltercountries();
      setCrossBtn(false);
    }
  };
  const handleSelectInputCountry = (country) => {
    setFiltercountries([country]);
    setshowTab2(true);
    setCurrentActiveTab("2");
    setCrossBtn(false);
  };

  const handleClearField = () => {
    setInputValue("");
    setshowTab1(true);
    setshowTab2(false);
    setCrossBtn(false);
  };

  const handleSelectedLocation = (target) => {
    const selecteditem = SelectedLocation[0];
    if (target != selecteditem) {
      setInputValue(target.countryName);
      setCrossBtn(true);
      setCurrentActiveTab("2");
      setCrossBtn(false);
    } else {
      setInputValue("");
      setCrossBtn(false);
    }
  };

  const [disableAdult, setDisableAdult] = useState(false);

  const [adultcounter, setAdultcounter] = useState(0);
  const AdultIncrement = () => {
    if (adultcounter < 16) {
      setAdultcounter(adultcounter + 1);
    }
  };
  const AdultDecrement = () => {
    if (adultcounter > 0) {
      setAdultcounter(adultcounter - 1);
    }
  };

  const [childcounter, setChildcounter] = useState(0);
  const ChildIncrement = () => {
    if (childcounter < 15) {
      setChildcounter(childcounter + 1);
    }
    if (adultcounter == 0) {
      setAdultcounter(adultcounter + 1);
      setDisableAdult(true);
    }
    setDisableAdult(false);
  };
  const ChildDecrement = () => {
    if (childcounter > 0) {
      setChildcounter(childcounter - 1);
    }
  };

  const [infantcounter, setInfantcounter] = useState(0);
  const InfantIncrement = () => {
    if (infantcounter < 5) {
      setInfantcounter(infantcounter + 1);
    }
    if (adultcounter == 0) {
      setAdultcounter(adultcounter + 1);
      setDisableAdult(true);
    }
    setDisableAdult(false);
  };
  const InfantDecrement = () => {
    if (infantcounter > 0) {
      setInfantcounter(infantcounter - 1);
    }
  };

  const [petcounter, setPetcounter] = useState(0);
  const PetIncrement = () => {
    if (petcounter < 5) {
      setPetcounter(petcounter + 1);
    }
    if (adultcounter == 0) {
      setAdultcounter(adultcounter + 1);
      setDisableAdult(true);
    }
    setDisableAdult(false);
  };
  const PetDecrement = () => {
    if (petcounter > 0) {
      setPetcounter(petcounter - 1);
    }
  };

  const [navbar, setNavbar] = useState(true);

  const toggleShowLocation = () => {
    setNavbar(false);
    setCurrentActiveTab("1");
  };
  const toggleShowDate = () => {
    setNavbar(false);
    setCurrentActiveTab("2");
  };
  const toggleGuests = () => {
    setNavbar(false);
    setCurrentActiveTab("4");
  };

  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) {
      setCurrentActiveTab(tab);
      if (tab === "1" && inputvalue.length > 0) {
        setCrossBtn(true);
      } else {
        setCrossBtn(false);
      }
    } else {
      setCurrentActiveTab("");
      setCrossBtn(false);
    }
  };

  const [subcoreStay, setSubcoreStay] = useState(true);
  const [subcoreExperience, setSubcoreExperience] = useState(false);

  const toggleStay = () => {
    setSubcoreStay(true);
    setSubcoreExperience(false);
    setCurrentActiveTab("");
    setCrossBtn(false);
  };

  const toggleExperience = () => {
    setSubcoreStay(false);
    setSubcoreExperience(true);
    setCurrentActiveTab("");
    setCrossBtn(false);
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);

  const wrapperRef = useRef(null);
  useEffect(() => {

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setNavbar(true);
        setCurrentActiveTab('');
        console.log("close Navbar!", setNavbar);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
    
      <div className="px-4 bg-white d-md-block d-none px-0 border-bottom">
        <div className="py-3 px-md-4 d-flex align-items-center">
          <Col lg={4} md={1} className="my-1 my-md-0">
            <span
              className="d-flex color-primary fw-bold fs-4 justify-content-md-start justify-content-center"
              style={{ height: 40 }}
            >
              <FaAirbnb className="custom-font-icon" />
              <span className="d-lg-block d-md-none">airbnb</span>
            </span>
          </Col>

          {navbar ? (
            <Col
            ref={wrapperRef}
              lg={4}
              md={6}
              className={`my-1 my-md-0 ${navbar ? "" : "transition-itr show"}`}
            >
              <div className="custom-main-border rounded-pill d-flex flex-nowrap justify-content-between align-items-center py-1 px-3">
                <p
                  className=" border-0 text-dark fcw-medium text-truncate"
                  onClick={toggleShowLocation}
                >
                  Anywhere
                </p>
                <p
                  className=" text-dark fcw-medium custom-btn-border text-truncate px-4"
                  onClick={toggleShowDate}
                >
                  Any week
                </p>
                <p
                  className=" border-0 text-secondary fcw-medium text-truncate"
                  onClick={toggleGuests}
                >
                  Add guests
                </p>
                <Button className="bg-custom-primary rounded-custom-pill border-0 text-white">
                  <FaSistrix height={15} width={15} className="my-1" />
                </Button>
              </div>
            </Col>
          ) : (
            <Col
            ref={wrapperRef}
              lg={4}
              md={6}
              className={`my-1 my-md-0 ${navbar ? "" : "transition-itr show"}`}
            >
              <div className="text-center  d-flex flex-nowrap justify-content-center align-items-center py-1">
                <p
                  className={`mx-3 text-dark fcw-normal menuitem text-truncate ${
                    subcoreStay ? "active" : ""
                  }`}
                  onClick={toggleStay}
                >
                  Stays
                </p>
                <p
                  className={`mx-3 text-dark fcw-normal menuitem text-truncate ${
                    subcoreExperience ? "active" : ""
                  }`}
                  onClick={toggleExperience}
                >
                  Experiences
                </p>
                <p
                  className={`mx-3 text-dark fcw-normal menuitem text-truncate`}
                >
                  Online Experiences
                </p>
              </div>
            </Col>
          )}

          <Col lg={4} md={5} className="my-1 my-md-0">
            <div className="d-flex text-center justify-content-md-end justify-content-center ">
              <Button className="bg-navbar-transparent border-0 rounded-pill text-dark fcw-medium py-2 px-lg-3 px-md-2 mx-lg-1">
                Airbnb your home
              </Button>
              <Button className="bg-navbar-transparent border-0 rounded-pill text-dark fcw-medium mx-lg-1">
                <FaGlobe className="my-1" />
              </Button>
              <div className="custom-profile-border rounded-pill">
                <Button className="bg-transparent rounded-pill border-0 text-secondary btn btn-secondary px-2 pt-2 d-flex align-items-center justify-content-center">
                  <FaBars className="mx-2" style={{ fontSize: "12px" }} />
                  <span
                    className="mx-1 text-secondary"
                    style={{ fontSize: "18px", marginTop: "-4px" }}
                  >
                    <FaCircleUser height={"auto"} />
                  </span>
                </Button>
              </div>
            </div>
          </Col>
        </div>

        {/* Tab --Start */}
        {navbar ? null : (
            <Row className="custom-main-border rounded-pill mb-2 d-flex justify-content-center align-items-center m-auto custom-width-100 main-submenu">
            <Nav tabs className="border-0 pe-0 ">
              <NavItem className="w-35">
                <NavLink
                  className={classnames({ active: currentActiveTab === "1" })}
                >
                  <Row className="d-flex align-items-center">
                    <Col xs={10} className="active">
                      <p
                        className="fcw-medium text-dark text-start"
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Where
                      </p>
                      <Input
                        type="text"
                        bsSize="sm"
                        className="bg-transparent border-0 p-0 text-secondary "
                        placeholder="Search destinations"
                        value={inputvalue}
                        onChange={handleInputCountries}
                      />
                    </Col>
                    <Col
                      xs={2}
                      className={`text-end ${
                        crossBtn === true ? "d-block" : "d-none"
                      }`}
                      onClick={handleClearField}
                    >
                      <FaXmark className="bg-light-sec custom-w-h rounded-pill text-dark p-1" />
                    </Col>
                  </Row>
                </NavLink>
              </NavItem>

              {subcoreStay ? (
                <>
                  <NavItem className="w-15">
                    <NavLink
                      className={classnames({
                        active: currentActiveTab === "2",
                      })}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      <Col className=" text-start ">
                        <div className="fcw-medium text-dark text-start">
                          Check in <br />
                          <Input
                            type="text"
                            bsSize="sm"
                            className="bg-transparent border-0 p-0 text-secondary "
                            disabled
                            placeholder="Add dates"
                          />
                        </div>
                      </Col>
                    </NavLink>
                  </NavItem>

                  <NavItem className="w-15">
                    <NavLink
                      className={classnames({
                        active: currentActiveTab === "3",
                      })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      <Col className="text-start ">
                        <div className=" fcw-medium text-dark text-start">
                          Check out <br />
                          <Input
                            type="text"
                            bsSize="sm"
                            className="bg-transparent border-0 p-0 text-secondary "
                            disabled
                            placeholder="Add dates"
                          />
                        </div>
                      </Col>
                    </NavLink>
                  </NavItem>
                </>
              ) : null}

              {!subcoreExperience ? null : (
                <NavItem className="w-30">
                  <NavLink
                    className={classnames({ active: currentActiveTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    <Col className="text-start ">
                      <div className=" fcw-medium text-dark text-start">
                        Date <br />
                        <Input
                          type="text"
                          bsSize="sm"
                          className="bg-transparent border-0 p-0 text-secondary "
                          disabled
                          placeholder="Add dates"
                        />
                      </div>
                    </Col>
                  </NavLink>
                </NavItem>
              )}
              <NavItem className="w-35">
                <NavLink
                  className={classnames({ active: currentActiveTab === "4" })}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <Col xs={6} className="text-start">
                      <p className="mb-0 fcw-medium text-dark">
                        Who <br />
                        <Input
                          type="text"
                          bsSize="sm"
                          className="bg-transparent border-0 p-0 text-secondary "
                          placeholder="Add guests"
                        />
                      </p>
                    </Col>
                    <Col xs={6} className="text-end">
                      <Button className="bg-custom-primary rounded-pill border-0 text-white px-4 py-2 text-truncate">
                        <FaSistrix height={15} width={15} className="me-2" />
                        Search
                      </Button>
                    </Col>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </Row>
        )}

        {navbar ? null : (
          <div className="custom-bg">
            <TabContent
              activeTab={currentActiveTab}
              className="d-flex justify-content-center align-items-center"
            >
              {showTab1 === true || showTab2 === false ? (
                <TabPane tabId="1" className="custom-tab1">
                  <Row>
                    <Col sm="12">
                      <Card
                        className="bg-white p-4 pb-lg-4 pb-md-0 overflow-auto"
                        style={{ height: "410px" }}
                      >
                        <p className="mb-0 text dark fsw-600">
                          Search by region
                        </p>
                        <Row className="d-flex justify-content-center align-items-center py-3">
                          {SelectedLocation.map((item, id) => {
                            return (
                              <Col key={id} xs={4} className="py-3">
                                <a
                                  className=""
                                  href="#"
                                  onClick={() => handleSelectedLocation(item)}
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
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              ) : (
                <TabPane tabId="1" className="custom-subTab1">
                  <Row>
                    <Col sm="12">
                      <Card
                        body
                        className="bg-white py-4 px-0 pb-lg-4 pb-md-0 overflow-auto"
                        style={{ height: "360px" }}
                      >
                        {filtercountries.map((country, index) => {
                          return (
                            <a
                              key={index}
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
                              <Col xs={10} className="fs-6 px-3 text-dark">
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
                </TabPane>
              )}

              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Card
                      body
                      className="bg-white overflow-auto"
                      style={{ height: "400px" }}
                    >
                      <DateRangePicker
                        onChange={(item) => setState([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Card
                    body
                    className="bg-white overflow-auto"
                    style={{ height: "400px" }}
                  >
                    <DateRangePicker
                      onChange={(item) => setState([item.selection])}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={state}
                      direction="horizontal"
                    />
                  </Card>
                </Row>
              </TabPane>
              <TabPane tabId="4" className="custom-tab4">
                <Row>
                  <Col sm="12">
                    <Card body className="bg-white overflow-auto">
                      <div className="d-flex justify-content-between border-bottom p-3">
                        <p className="fcw-medium  text-start fs-6">
                          Adults <br />
                          <span className="text-secondary fsw-400">
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
                          <span className="text-secondary fsw-400">
                            Ages 2-12
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <Button
                            className="bg-transparent border-0 text-dark"
                            disabled={childcounter <= 0 || adultcounter >= 16}
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
                            disabled={childcounter >= 15 || adultcounter >= 16}
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
                          <span className="text-secondary fsw-400">
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
                          <a className="text-secondary text-truncate fsw-400">
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
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        )}

        {/* Tab - -End */}
      </div>

      <div className="mx-2 d-md-none d-block">
        <Row className="my-2 mx-1 d-flex justify-content-center align-items-center">
          <Col className="custom-main-border rounded-pill d-flex justify-content-center align-items-center py-1 px-3">
            <p className="mb-0 rounded-custom-pill text-dark fs-5">
              <FaSistrix className="my-1" />
            </p>
            <div className="d-flex justify-content-start flex-column align-items-center px-3">
              <p className="mb-0 text-dark fcw-medium py-0">
                Anywhere
                <br />
                <span className="text-secondary text-truncate">
                  Any week . Add guests
                </span>
              </p>
            </div>
            <Button className="bg-transparent rounded-custom-pill border-1 border-dark text-dark fs-6">
              <FaSliders height={12} width={12} className="my-1" />
            </Button>
          </Col>
        </Row>
      </div>

    </>
  );
}

export default Navbar;
