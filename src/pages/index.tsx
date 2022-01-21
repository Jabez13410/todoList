import { connect } from 'umi';
import Todos from './Todos';
import 'normalize.css';
import styles from './index.less';

const IndexPage = ({ loading }) => (
  <>
    {loading.global && (
      <div className={styles.loading}>
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.third} />
      </div>
    )}
    <div className={styles.wrapper}>
      <header className={styles.header}>Demo</header>
      <main>
        <Todos />
      </main>
    </div>
  </>
);
export default connect((state) => state)(IndexPage);
