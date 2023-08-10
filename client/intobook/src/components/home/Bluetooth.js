import React from 'react';
import { useRecoilState } from 'recoil';
import { BluetoothAtom, BookmarkStatusAtom, ReadingBookAtom } from './../../recoil/bookmark/bookmarkAtom';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import { styled } from 'styled-components';
import { createBookHistory, completeBookHistory } from '../../api/historyApi';
import { HistoryPkAtom } from '../../recoil/history/historyAtom';
// import BluetoothConnect from '../../utils/bluetooth/BluetoothConnect';

const Bluetooth = () => {

  //블루투스 연결상태 상태 및 책갈피 상태 가져오기(둘 다 초기상태 false)
  const [isBluetoothConnected, setIsBluetoothConnected] = useRecoilState(BluetoothAtom);
  const [bookmark, setBookmark] = useRecoilState(BookmarkStatusAtom);
  const [nowBook,setNowBook] = useRecoilState(ReadingBookAtom)
  const [historyPkAtom, setHistoryPkAtom] = useRecoilState(HistoryPkAtom)

  let bluetoothDevice;
  let Bcharacteristic;

  const BluetoothConnect = () => {
    
    //블루투스 연결상태가 false일 때, 연결
    if (!isBluetoothConnected) {
        setIsBluetoothConnected(true); //bluetooth 연결 상태 변경

        navigator.bluetooth.requestDevice({
            // filters: [{ services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }]
            acceptAllDevices: true
        })
            .then(device => {
                // Human-readable name of the device.
                console.log('Connecting to GATT Server...');
                bluetoothDevice = device;
                console.log('여긴잘나오면서',bluetoothDevice)
                // Attempts to connect to remote GATT Server.
                return bluetoothDevice.gatt.connect();
            })
            .then(server => {
                // Getting Service…
                console.log('Getting Service...');
                return server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
            })
            .then(service => {
                // Getting Characteristic…
                console.log('Getting Characteristic...');
                return service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
            })
            .then(characteristic => {
                Bcharacteristic = characteristic;
                return Bcharacteristic.startNotifications().then(_ => {
                    console.log('> Notifications started');
                    Bcharacteristic.addEventListener('characteristicvaluechanged', HandleNotifications);
                });
            })
            .catch(error => { console.error(error); });
    } else {
      setIsBluetoothConnected(false);
      console.log('왜안나옴?',bluetoothDevice)
    }
}

const HandleNotifications = async (event) => {
    let value = event.target.value;
    
    let a = [];

    let tmp2 = "";
    for (let i = 0; i < value.byteLength; i++) { // 압력센서값

        if (value.getUint8(i) == 32) { // 공백의 ASCII 코드값 32
            a.push(('0000' + tmp2).slice(-4)); // 항상 4자리수로 출력하도록 맞춰서 넣음
            tmp2 = "";
        } else {
            tmp2 += String.fromCharCode(value.getUint8(i));
        }
    }

    console.log('> ' + a.join(' '));

    // 조건에 따른 BookmarkAtom 상태 업데이트

    const illuminance1 = a[0];
    const illuminance2 = a[1];
    const pressure = parseFloat(a[2]); // 문자열을 숫자로 변환
    
    //책을 펼쳤을 때 history api 요청(response로 pk를 받아와서 저장)
    //책을 덮었을 때 history api 요청(params에 pk와 pressure를 넘겨줄 것)
    if (illuminance1 === illuminance2 && pressure <= 10) {
        const res = await createBookHistory(nowBook?.userBookPk)
        console.log('성공하면 받는 historyPk',res)
        setHistoryPkAtom(res)
        setBookmark(true);
    } else if (illuminance1 !== illuminance2 && pressure >= 10) {
        const res = await completeBookHistory(historyPkAtom,pressure)
        setBookmark(false);
    }
}

  return (
    <BluetoothDiv
      style={{
        color: isBluetoothConnected ? 'var(--main-color)' : 'var(--bg-gray)',
        fontSize: isBluetoothConnected ? 'var(--font-h4)' : 'var(--font-h2)',
      }}
    >
      <IconWrapper>
        <BluetoothIcon onClick={BluetoothConnect}/>
      </IconWrapper>
      <span>
        {isBluetoothConnected ? '북갈피 블루투스 연결중' : '북갈피 블루투스 미연결'}
      </span>
    </BluetoothDiv>
  );
};

const BluetoothDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 30px auto;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export default Bluetooth;