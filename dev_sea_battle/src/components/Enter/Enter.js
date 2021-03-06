import React, {useState} from 'react';
import './Enter.css';
import {config} from "../../Config";

/* Модальное окно */
const modal = document.getElementById('id01');
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

const EnterPage = ({ logIn }) => {
    const [userName, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/users',{
            method:'POST',
            headers:{ ...config.defaultHeaders },
            body: JSON.stringify({name: userName})
        }).then(res => {
            if (res.status === 200) {
                console.log(`login for ${userName} is successful`);
                logIn(userName);
        } else if (res.status === 400) {
            throw new Error("Польователь с таким именем уже существует")
        } else {
            throw new Error(res.statusText);
        }
        }).catch(e => alert(e));
    };

    return(
        <div>
            <button onClick={() => document.getElementById('id01').style.display='block'}
                    className="ENT">Играть &laquo;Морской Бой&raquo;</button>

            <div id="id01" className="modal">
                <form className="modal-content animate" onSubmit={handleSubmit}>
                    <div className="imgcontainer">
                        <span onClick={ () => document.getElementById('id01').style.display='none'}
                              className="close" title="Close Modal">×</span>
                        <img src="https://thumbs.gfycat.com/FrankFreeAmericankestrel-size_restricted.gif"
                             alt="Avatar" className="avatar" />
                    </div>

                    <div className="container">
                        <label htmlFor="uname" style={{fontSize: "2vh"}}><b>Привет, я Smart, а ты...</b></label><br /><br />
                        <input className='form-row' type="text" placeholder="Введите имя" name="uname"
                               autoComplete="off" value={userName} onChange={e => setName(e.target.value)} required /><br /><br />
                        <button type="submit" className="button1">ИГРАТЬ</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnterPage;