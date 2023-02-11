import { Materials } from "../../Components";

import style from "./MaterialSection.module.scss";

const MatetialSection = () => {
  return (
    <section className={style.material}>
      <Materials />
    </section>
  );
};

export default MatetialSection;
