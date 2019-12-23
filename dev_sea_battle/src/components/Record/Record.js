import React, {useEffect, useState} from "react";
import {config} from "../../Config";
import {convertTime} from "../../utils/Routing";

const Record = () => {
    const [records, update] = useState([]);
    const [interval, start] = useState(null);

    useEffect(() => {
        start(setInterval(() => loadRecords(), config.timeLoadRecords));
    }, []);

    const loadRecords = () => {
        fetch('/api/records', {
            headers: { ...config.defaultHeaders }
        }).then(res => {
            if (res.status === 200) {
                console.log('Successfully loaded records');
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(data => {
            update(data.filter(record => record.game === 'Морской бой'));
        }).catch(e => console.log(e));
    };

    const parseTime = (time) => {
        const { hours, minutes, seconds } = convertTime(time);
        return `${hours} : ${minutes} : ${seconds}`;
    };

    return (
        <div>
            {
                records.length ? (
                    <table>
                        <tbody>
                            <tr>
                                <th className="record_header">Игрок</th>
                                <th className="record_header">Очки</th>
                                <th className="record_header">Время</th>
                            </tr>
                            {
                                records.map((record, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{record.user}</td>
                                            <td>{record.score}</td>
                                            <td>{parseTime(record.time)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : (
                    <p>Никто еще не решился попробовать свои силы.</p>
                )
            }
        </div>
    )
};

export default Record;