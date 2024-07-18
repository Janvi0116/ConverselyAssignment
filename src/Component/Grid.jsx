import {useEffect, useState} from 'react';

function Grid () {
    const [boxColours, changeBoxColours] = useState(['','','','','','','','','']);
    const [clickOrder, setClickOrder] = useState([]);

    function handleClick (index) {
      if(clickOrder.includes(index))
        return;
      changeBoxColours((previousBoxesClicked) => {
        let newBoxesClicked = [...previousBoxesClicked];
        newBoxesClicked[index] = 'green';
        return newBoxesClicked;
      })
      setClickOrder((previousClickOrder) => {
        let newClickOrder = [...previousClickOrder];
        newClickOrder.push(index);
        return newClickOrder;
      });
    }

    useEffect(() => {
      if(clickOrder.length === 9){
        for (let i = 0; i < clickOrder.length; i++) {
          setTimeout(() => {
            changeBoxColours(prevBoxes => {
              const newBoxes = [...prevBoxes];
              newBoxes[clickOrder[i]] = 'orange';
              return newBoxes;
            });
          }, 1000 + ( 100 * i )); // since react do state updates by batching If I give fixed time all updates come at the same time
        }
      }
    },[clickOrder])

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px', }}>
        {
          boxColours.map((box, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: (box === 'green') ?
                  ('green') :
                  (box === 'orange') ?
                  ('orange') :
                  ('lightgray'),
                  border: '1px solid black'
                }}
              >
              </div>
          ))
        }
      </div>
  );
}
    

export default Grid;