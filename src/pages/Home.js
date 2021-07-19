import React, { useState, useEffect, useRef, Fragment } from "react";
import CopyAlert from "../components/CopyAlert";
import Navbar from "../components/Navbar";
import { Container, Row, Col, Button } from "reactstrap";
import RangeSlider from "react-bootstrap-range-slider";
import { IoCopyOutline } from "react-icons/io5";

const Home = () => {
  const [value, setValue] = useState(12);
  const [finalValue, setFinalValue] = useState(12);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [symbol, setSymbol] = useState(true);
  const [number, setNumber] = useState(true);
  const [password, setPassword] = useState("");
  const [isCopy, setIsCopy] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    newPassword();
  }, [lowercase, uppercase, symbol, number, finalValue]);

  useEffect(() => {
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  }, [isCopy]);

  const newPassword = () => {
    let chPassword = "";
    let password = "";

    const characters = {
      lowercase: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
      uppercase: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
      symbol: "! # $ % & * @ ^",
      number: "0 1 2 3 4 5 6 7 8 9",
    };

    if (lowercase) {
      chPassword += characters.lowercase;
    }
    if (uppercase) {
      chPassword += characters.uppercase;
    }
    if (symbol) {
      chPassword += characters.symbol;
    }
    if (number) {
      chPassword += characters.number;
    }

    chPassword = chPassword.split(" ");

    for (let i = 0; i < finalValue; i++) {
      password += chPassword[Math.floor(Math.random() * chPassword.length)];
    }

    setPassword(password);
  };

  const handleCopy = () => {
    const input = inputRef.current;
    input.disabled = false;
    input.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    input.disabled = true;
    setIsCopy(true);
  };

  return (
    <Fragment>
      <Navbar />
      <Container fluid={true}>
        <Row>
          <Col
            xs={{ size: 10, offset: 1 }}
            md={{ size: 4, offset: 4 }}
            className="div-options bg-green-light border border-dark"
          >
            <h3 className="text-center">Contraseña Personalizada</h3>
            <Col
              md={{ size: 12, offset: 0 }}
              xs={{ size: 8, offset: 2 }}
              className="div-custom"
            >
              <Col md={{ size: 6, offset: 0 }} xs="12">
                <h5 className="text-center">Longitud:</h5>
                <RangeSlider
                  className="w-75 mx-auto"
                  value={value}
                  onChange={(changeEvent) => setValue(changeEvent.target.value)}
                  onAfterChange={(e) => setFinalValue(e.target.value)}
                  size="sm"
                  min={8}
                  max={20}
                  variant="dark"
                  tooltip="off"
                />
                <input
                  className="form-control text-center input-switch mx-auto"
                  value={value}
                  disabled
                />
              </Col>
              <Col md={{ size: 6, offset: 0 }}>
                <h5 className="text-center h5-options">Opciones</h5>
                <Col md={{ size: 6, offset: 3 }} sm={{ size: 12 }}>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="lowercase"
                      name="lowercase"
                      value={lowercase}
                      onChange={() => setLowercase(!lowercase)}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="lowercase">
                      Minúsculas
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="uppercase"
                      value={uppercase}
                      onChange={() => setUppercase(!uppercase)}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="uppercase">
                      Mayúsculas
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="symbol"
                      value={symbol}
                      onChange={() => setSymbol(!symbol)}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="symbol">
                      Símbolos
                    </label>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="number"
                      value={number}
                      onChange={() => setNumber(!number)}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="number">
                      Números
                    </label>
                  </div>
                </Col>
              </Col>
              <Col
                md={{ size: 6, offset: 3 }}
                xs={{ size: 6, offset: 3 }}
                className="mb-3 mt-3"
              >
                <div className="d-grid gap-2">
                  <Button
                    onClick={() => newPassword()}
                    className="btn btn-dark"
                  >
                    Generar
                  </Button>
                </div>
              </Col>
            </Col>
          </Col>
        </Row>

        <Row>
          <Col
            md={{ size: 4, offset: 4 }}
            xs={{ size: 12 }}
            className="div-password"
          >
            <div className="mx-auto bg-success p-3">
              <input
                type="input"
                value={password}
                className="text-center w-100 input-password"
                ref={inputRef}
                disabled
              />
            </div>
          </Col>
          <Col
            md={{ size: 2, offset: 5 }}
            xs={{ size: 6, offset: 3 }}
            className="justify-content-center mb-4"
          >
            <Button color="dark" className="w-100 mt-2" onClick={handleCopy}>
              <span className="pt-2">Copiar</span>
              <IoCopyOutline size="1.3rem" />
            </Button>
          </Col>
          <Col
            md={{ size: 2, offset: 5 }}
            xs={{ size: 6, offset: 3 }}
            className="pt-5 div-iscopy"
          >
            {isCopy && <CopyAlert />}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
