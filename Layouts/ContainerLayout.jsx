import React from "react";
const styles = {
  parentContainer: "w-full h-full overflow-x-hidden md:overflow-x-auto",
  container: "2xl:container 2xl:mx-auto",
  chiefCenter:
    "max-w-[1300px] w-full px-2 md:px-10 2xl:px-0 mx-auto overflow-x-hidden",
};
const ContainerLayout = ({ children }) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.chiefCenter}>{children}</div>
      </div>
    </div>
  );
};

export default ContainerLayout;
