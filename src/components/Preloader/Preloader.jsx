import st from "./Preloader.module.css";

export const Preloader = () => {
  return (
    <div className={st.preloader}>
      <div className={st.preloader__body}>Loading...</div>
    </div>
  );
};
