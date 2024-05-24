import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { GetSetValue, InputAdress } from "./ComponentForms/ComponentForms";
import { daiAbi as ABI } from "../assets/values";
import { Preloader } from "./Preloader/Preloader";
import st from "./Content.module.css";

export const Content = () => {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(1);
  const [value, setValue] = useState({ a: "7", b: "8" });

  const [res, setRes] = useState(0);
  const [operation, setOperation] = useState("add");

  const [adress, setAdress] = useState("0x9221cF19575265fca6cf413944ccD4497E456ccB");
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
      setRes(Number(await daiContract.result()));
      //встановити флаг закінчення операції
      setflag(true);
    })();
  }, [flag, adress]);

  const btnClick = async (value1, value2, operFunc) => {
    setIsfetching(true);
    console.log(operFunc, value1, value2);
    try {
      if (operFunc === "add") await (await daiContract.add(value1, value2)).wait();
      if (operFunc === "divide") await (await daiContract.divide(value1, value2)).wait();
      if (operFunc === "multiply") await (await daiContract.multiply(value1, value2)).wait();
      if (operFunc === "subtract") await (await daiContract.subtract(value1, value2)).wait();

      //await (await daiContract.add(`a:${Number(value1)}, b:${Number(value2)}`)).wait();
      setRes(Number(await daiContract.result()));
      setflag(false);
    } catch (e) {
      console.log(e);
      alert("Транзакція відхилена");
    }
    setIsfetching(false);
  };

  return isFetching ? (
    <Preloader />
  ) : (
    <div className="Content">
      <main className={st.main}>
        <div className={st.centerForm}>
          <InputAdress value={adress} setValue={setAdress} />
          <GetSetValue
            value={res}
            setValue1={btnClick}
            //setValue2={btnClick}
            //setOperation={btnClick}
            readOnly={readOnly}
          />
        </div>
      </main>
    </div>
  );
};
