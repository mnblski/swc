import styles from "./LayoutDefault.module.scss";

interface LayoutDefaultProps {
  children: React.ReactNode;
  noBackground?: boolean;
}

const LayoutDefault: React.FC<LayoutDefaultProps> = ({
  children,
  noBackground,
}) => {
  return (
    <div className={styles.layout} data-no-background={noBackground}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default LayoutDefault;
