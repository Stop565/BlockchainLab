import { useState } from "react";
import st from "./ComponentForms.module.css";
import { ethers } from "ethers";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Container, Card, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const InputAdress = (props) => {
  const [addr, setAdrr] = useState(props.value);
  const [err, setErr] = useState("");
  const cheskAdress = async (adress) => {
    //setAdrr(adress);
    try {
      ethers.getAddress(adress);
      setErr("");
      props.setValue(adress);
    } catch {
      setErr("Адрес не вірний");
    }
  };
  return (
    <>
      {" "}
      <FloatingLabel controlId="floatingInput" label="Введіть адресу смарт - контракту" className="m-3">
        <Form.Control
          type="text"
          placeholder="Введіть counter AT"
          value={addr}
          onChange={(e) => {
            cheskAdress(e.target.value);
          }}
        />
      </FloatingLabel>
      <div>{err}</div>
    </>
  );
};

export const GetSetValue = (props) => {
  const [addrUser, setAdrrUser] = useState("");

  return (
    <Container>
      <h2 className="m-auto">{props.value}</h2>
      <h2 className="m-auto">{props.getUserCheck}</h2>
      <Row>
        <FloatingLabel controlId="floatingInput" label="Введіть Вашу адресу" className="m-2">
          <Form.Control
            type="text"
            value={addrUser}
            onChange={(e) => {
              setAdrrUser(e.target.value);
            }}
          />
        </FloatingLabel>

        <Button
          className="m-2"
          variant="dark"
          onClick={() => {
            props.getUserCheck(addrUser);
          }}
        >
          Перевірка чи ви підписані
        </Button>
        <Col>
          <Button
            className="m-2"
            variant="success"
            onClick={() => {
              props.subscribe(addrUser);
            }}
          >
            Підписатися
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2"
            variant="danger"
            onClick={() => {
              props.unsubscribe(addrUser);
            }}
          >
            Відписатися
          </Button>
        </Col>
        <Button
          className="m-2"
          variant="secondary"
          onClick={() => {
            props.makePay(addrUser);
          }}
        >
          Оплатити підписку
        </Button>
      </Row>
    </Container>
  );
};
