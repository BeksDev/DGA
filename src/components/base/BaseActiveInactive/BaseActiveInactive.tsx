import styles from './BaseActiveInactive.module.css';
interface BaseActiveInactiveProps {
  active?: boolean;
  rolename?: string;
  code?: string;
  level?: string;
  label?: boolean;
  labeltext?: string;
}

const BaseActiveInactive: React.FC<BaseActiveInactiveProps> = ({ active, rolename, code, level, label, labeltext }) => {
  return (
    <>
      {label && (
        <div className={styles.lableWrapper}>
          <span className={`${styles.labelSpan} caseon`}>{labeltext}</span>
        </div>
      )}
      <div className={styles.activeInactiveWrapper}>
        <div>
          <span
            className={`${styles.activeInactiveSpan} ${active ? `${styles.activeSpan}` : `${styles.inactiveSpan}`} `}
          >
            {active ? 'აქტიური' : 'გაუქმებული'}
          </span>
        </div>
        <div className="py-[4px]">
          <h1 className={styles.title}>{rolename}</h1>
        </div>
        <div className={styles.spanFlexWrapper}>
          <span className={styles.spanFlexWrapperSpans}>{code}</span>
          <span className={styles.spanFlexWrapperSpans}>{level}</span>
        </div>
      </div>
    </>
  );
};

export default BaseActiveInactive;
