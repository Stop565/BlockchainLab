import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { GetSetValue, InputAdress } from "./ComponentForms/ComponentForms";
import { daiAbi as ABI } from "../assets/values";
import { Preloader } from "./Preloader/Preloader";
import st from "./Content.module.css";

export const Content = () => {
  const [value, setValue] = useState(0);
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
      setValue(Number(await daiContract.get()));
      //встановити флаг закінчення операції
      setflag(true);
    })();
  }, [flag, adress]);

  const btnClick = async (value) => {
    setIsfetching(true);
    try {
      await (await daiContract.set(value)).wait();
      setValue(Number(await daiContract.get()));
      setflag(false);
    } catch {
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
          <GetSetValue value={value} setValue={btnClick} readOnly={readOnly} />
        </div>
      </main>
    </div>
  );
};
