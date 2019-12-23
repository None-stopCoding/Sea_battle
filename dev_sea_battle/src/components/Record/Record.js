import React, {useEffect, useState} from "react";
import {config} from "../../Config";
import {convertUnix} from "../../utils/Routing";

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
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(data => {
            update(data.filter(record => record.game === 'Морской бой'));
        }).catch(e => console.log(e));
    };

    return (
        <div>
            {
                records.length ? (
                    <table>
                        <tbody>
                            <tr>
                                <th>Игрок</th>
                                <th>Очки</th>
                                <th>Время</th>
                            </tr>
                            {
                                records.map((record, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{record.user}</td>
                                            <td>{record.score}</td>
                                            <td>{convertUnix(record.time)}</td>
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