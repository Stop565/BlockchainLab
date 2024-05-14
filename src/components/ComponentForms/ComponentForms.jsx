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
  const [inpValue, setInputValue] = useState(0);
  return (
    <div className={st.getSetValue}>
      <div className={st.getSetValue__getValue}>{props.value}</div>
      <div className={st.getSetValue__setValue}>
        <input
          type="number"
          value={inpValue}
          disabled={props.readOnly}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            props.setValue(inpValue);
          }}
          disabled={props.readOnly}
        >
          set Value
        </button>
      </div>
    </div>
  );
};
