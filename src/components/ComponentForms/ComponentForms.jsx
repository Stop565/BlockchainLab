import { useState } from "react";
import st from "./ComponentForms.module.css";
import { ethers } from "ethers";
export const InputAdress = (props) => {
  const [addr, setAdrr] = useState(props.value);
  const [err, setErr] = useState("");
  const cheskAdress = (adress) => {
    setAdrr(adress);
    try {
      ethers.getAddress(adress);
      setErr("");
      props.setValue(adress);
    } catch {
      setErr("Адрес не вірний");
    }
  };
  return (
    <div className={st.input}>
      <div className={st.input__title}>Введіть адресу смарт - контракту</div>
      <input
        type="text"
        placeholder="Введіть counter AT"
        value={addr}
        onChange={(e) => {
          cheskAdress(e.target.value);
        }}
      />
      <div className={st.input__error}>{err}</div>
    </div>
  );
};
export const GetSetValue = (props) => {
  const [inpValue1, setInputValue1] = useState(1);
  const [inpValue2, setInputValue2] = useState(1);

  return (
    <div className={st.getSetValue}>
      <div className={st.getSetValue__getValue}>{props.value}</div>
      <div className={st.getSetValue__setValue}>
        <input
          type="number"
          value={inpValue1}
          disabled={props.readOnly}
          onChange={(e) => {
            setInputValue1(e.target.value);
          }}
        />
        <input
          type="number"
          value={inpValue2}
          disabled={props.readOnly}
          onChange={(e) => {
            setInputValue2(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.setValue1(inpValue1, inpValue2, "add");
            //props.setValue2(inpValue2);
            //props.setOperation("add");
          }}
          disabled={props.readOnly}
        >
          Додати
        </button>
        <button
          onClick={() => {
            props.setValue1(inpValue1, inpValue2, "divide");
            //props.setValue1(inpValue1);
            //props.setValue2(inpValue2);
            props.setOperation("divide");
          }}
          disabled={props.readOnly}
        >
          Поділити
        </button>
        <button
          onClick={() => {
            props.setValue1(inpValue1, inpValue2, "multiply");

            //props.setValue1(inpValue1);
            //props.setValue2(inpValue2);
            props.setOperation("multiply");
          }}
          disabled={props.readOnly}
        >
          Помножити
        </button>
        <button
          onClick={() => {
            props.setValue1(inpValue1, inpValue2, "subtract");

            // props.setValue1(inpValue1);
            //props.setValue2(inpValue2);
            props.setOperation("subtract");
          }}
          disabled={props.readOnly}
        >
          Відняти
        </button>
      </div>
    </div>
  );
};
