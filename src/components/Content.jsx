import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { GetSetValue, InputAdress } from "./ComponentForms/ComponentForms";
import { daiAbi as ABI } from "../assets/values";
import { Preloader } from "./Preloader/Preloader";
import st from "./Content.module.css";

import Form from "react-bootstrap/Form";
import { Container, Col, Card } from "react-bootstrap";

export const Content = () => {
  const [res, setRes] = useState(false);

  const [adress, setAdress] = useState("0x64a8538a4EFF9ac80249D23F964b0a17D7ce171C");
  const [isFetching, setIsfetching] = useState(false);

  let provider;
  let daiContract;
  const [flag, setflag] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  useEffect(() => {
    //асинхронна функція, що викликає сама себе
    (async () => {
      //перевірка, чи має користувач доступ до MetaМask
      if (window.ethereum == null) {
        //якщо доступу до MetaМask немає - вивести повідомлення
        alert("MetaMask не встановлено; використовуючи значення за замовчуванням лише для читання");
        //задати флаг тільки для читання
        setReadOnly(true);
        //встановити стандартний провайдер
        provider = ethers.getDefaultProvider("goerli");
        //встановити контакт із смарт контрактом
        daiContract = new ethers.Contract(adress, ABI, provider);
      } else {
        //якщо доступу до MetaМask присутній отримати провайдера
        provider = new ethers.BrowserProvider(window.ethereum);
        //встановити контакт із смарт контрактом
        daiContract = new ethers.Contract(adress, ABI, await provider.getSigner());
      }
      //викликати функцію getCount() у контракта
      setRes(await daiContract.isSubscriberActive());
      console.log(res);
      //встановити флаг закінчення операції
      setflag(true);
    })();
  }, [flag, adress]);

  const btnClick = async (value1, value2, operFunc) => {
    setIsfetching(true);
    console.log(operFunc, value1, value2);
    try {
      //if (operFunc === "add") await (await daiContract.add(value1, value2)).wait();
      //if (operFunc === "divide") await (await daiContract.divide(value1, value2)).wait();
      //if (operFunc === "multiply") await (await daiContract.multiply(value1, value2)).wait();
      //if (operFunc === "subtract") await (await daiContract.subtract(value1, value2)).wait();

      //await (await daiContract.add(`a:${Number(value1)}, b:${Number(value2)}`)).wait();
      setRes(await daiContract.isSubscriberActive());
      setflag(false);
    } catch (e) {
      console.log(e);
      alert("Транзакція відхилена");
    }
    setIsfetching(false);
  };
  const getUserCheck = async (ad) => {
    try {
      ethers.getAddress(ad);
      const rez = await daiContract.subscribers(ad);
      console.log(rez["2"] + " - Ви підписані");
      alert(rez["2"]);
    } catch (e) {
      console.log(e);
      alert("Ви не підписані або адрес не вірний");
    }
  };

  return isFetching ? (
    <Preloader />
  ) : (
    <Container
      className="d-flex justify-content-center align-items-center mt=100px"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <InputAdress value={adress} setValue={setAdress} />
        <GetSetValue
          value={res}
          setValue1={btnClick}
          //setValue2={btnClick}
          //setOperation={btnClick}
          readOnly={readOnly}
          getUserCheck={getUserCheck}
        />
      </Card>
    </Container>
  );
};
