import React from 'react';

type Props = {
    currentColor: 'yellow' | 'rose' | 'white';
    onChange: (color: 'yellow' | 'rose' | 'white') => void;
};

const ColorPicker: React.FC<Props> = ({ currentColor, onChange }) => {
    return (
        <div className="color-picker">
            <button 
                className={`color-button yellow ${currentColor === 'yellow' ? 'active' : ''}`}
                onClick={() => onChange('yellow')}
                title="Yellow Gold"
            />
            <button 
                className={`color-button white ${currentColor === 'white' ? 'active' : ''}`}
                onClick={() => onChange('white')}
                title="White Gold"
            />
            <button 
                className={`color-button rose ${currentColor === 'rose' ? 'active' : ''}`}
                onClick={() => onChange('rose')}
                title="Rose Gold"
            />
        </div>
    );
};

export default ColorPicker;
