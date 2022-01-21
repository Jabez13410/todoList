import styles from './index.less';

type ButtonType = {
  text: 'text';
};
const buttonType: ButtonType = {
  text: 'text',
};
export default (props, props1) => {
  // console.log('btnProps',props);
  // console.log('btnProps1',props1);
  const { children, type, ...otherProps } = props;
  return (
    <button
      className={`${styles.btn} ${type ? styles[`btn-${type}`] : undefined} ${
        props.disabled ? styles['btn-disabled'] : undefined
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
