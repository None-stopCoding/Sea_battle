import React from 'react';
import './Ships.css';

const Ships = ({ fleet, name, player }) => {
    const justifyContent = `${player === 'AI' ? 'flex-start' : 'flex-end'}`;
    return (
        <div className="info_ships">
            <div className="name" style={{justifyContent: justifyContent}}>
                {name}
            </div>
            <div className="ships">
                {
                    Object.entries(fleet).map(([ship, params], index) =>
                        <div className="ships__same_type" key={index}
                            style={{justifyContent: justifyContent}}>
                            {
                                params.units.map((unit, unitIndex) => {
                                    return (
                                        <div className="ships__unit" key={unitIndex}
                                             style={{width: `${unit.length * 15}px`}}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default Ships;