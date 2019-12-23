import React, {useEffect, useState} from "react";
import {config} from "../../Config";

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
        <table>
            {
                !!records.length ? (
                    <tr>
                        <th>Игрок</th>
                        <th>Очки</th>
                        <th>Время</th>
                    </tr>
                ) : (
                    <tr>
                        <td>
                            Никто еще не решился попробовать свои силы.
                        </td>
                    </tr>
                )
            }
        </table>
    )
};

export default Record;