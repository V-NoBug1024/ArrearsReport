import * as React from "react";
import * as qs from "query-string";
import * as styles from './index.scss';
import GroupsTag from "../../components/GroupsTag";
import Table from "./components/Table";
import * as api from "../../services/arrearsWarning";

const { useState, useEffect } = React;
export default React.memo(() => {
	const [msgid, setMsgid] = useState(null);
	const [isLoading, setIsloading] = useState(false);
	const [data, setData] = useState(null);
	const [tagTitle, setTagTitle] = useState(null);
	const [dataType, setDataType] = useState('');
	const [reportDate, setReportDate] = useState('');

	

	useEffect(() => {
		const params = qs.parse(window.location.search);
		const { msgid = null } = params || {};
		setMsgid(msgid)
		fetchData(msgid)
	}, [])

	const fetchData = (msgid) => {
		// setLoading(true);
		api.getSuppSummary({ msgid }, true).then((res: any) => {
      if (res) {
        const {
          title,
          suppSummaryDataTypeList = null,
          reportDate,
          pageTitle,
          dataType
        } = res;
				document.title = pageTitle;
				setReportDate(reportDate);
				setTagTitle(title);
				setDataType(dataType);
        setData(suppSummaryDataTypeList);
      }
    });
	};

	return (
    <>
      <div className={styles.reportWrap}>
        {reportDate && <div className={styles.date}>{reportDate}</div>}
        {tagTitle && <GroupsTag name={tagTitle} width="160" />}
        <Table data={data} dataType={dataType} />
      </div>
    </>
  );
});

