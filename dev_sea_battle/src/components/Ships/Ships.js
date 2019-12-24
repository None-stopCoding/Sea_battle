import React from 'react';
import './Ships.css';
import _ from 'underscore';

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
                                params.destroyed
                                    .filter(boat => boat !== params.size)
                                    .map((unit, unitIndex) =>
                                        <div className="ships__unit" key={unitIndex}
                                             style={{width: `${params.size * 15}px`}}>
                                        </div>
                                    )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
};

export default Ships;