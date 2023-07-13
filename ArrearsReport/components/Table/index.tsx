import * as React from "react";
import * as styles from './index.scss';
import TableLeft from "./components/TableLeft";
import TableRight from "./components/TableRight";
import * as statusData from "../../statusData";
interface IProps {
  data: any,
  dataType: any,
  active?: any,
  total?: any,
  isLoading?: any,
  pageType?: any
}

const { useState, useEffect } = React
export default React.memo((props: IProps) => {
  const [isFixedTop, setIsFixedTop] = useState(0)
  const [isFixedLeft, setIsFixedLeft] = useState(0)
  const [list, setList] = useState([])
  
  const {
    data,
    dataType,
    active = 0,
    total,
    isLoading = false,
    pageType,
  } = props;

  // const titles = [];

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleBodyScrollTop  = (e: any) => {
    const { scrollTop } = e.target

     setIsFixedTop(scrollTop)
  }
  const handleBodyScrollLeft  = (e: any) => {
    // const { scrollLeft } = e.target
    // setIsFixedLeft(scrollLeft)
  }

  const bindLeftClick = (index) => {
    data[index].show = !data[index].show
    setList([...data])
  }

  return isLoading ? (
    <div className={styles.noData}>努力加载中...</div>
  ) : data && data.length > 0 ? (
    <>
      <div
        className={styles.tableWrap}
        onScroll={event => handleBodyScrollTop(event)}
      >
        <div className={styles.leftContent}>
          <TableLeft
            active={active}
            titles={statusData.ARREARSTITLE}
            fixedTop={isFixedTop}
            fixedleft={isFixedLeft}
            data={list}
            dataType={dataType}
            bindClick={bindLeftClick}
            total={total}
          />
        </div>
        <div
          className={styles.right}
          onScroll={event => handleBodyScrollLeft(event)}
        >
          <div className={styles.rightContent}>
            <TableRight
              titles={statusData.ARREARSTITLE}
              active={active}
              fixedTop={isFixedTop}
              fixedleft={isFixedLeft}
              data={list}
              total={total}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className={styles.noData}>
      <div className={styles.nodataTips}>暂无数据</div>
    </div>
  );
})