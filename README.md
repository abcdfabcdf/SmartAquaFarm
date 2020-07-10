# Smart AquaFarm

## 소개
센서를 통해 그에 맞는 값을 측정하여 모니터링하고 생육환경에 맞지 않으면 스마트폰으로 간편하게 원격제어를 통해
최적의 생육환경을 만들어 줄 수 있는 IoT 제품입니다.

## 내용
* 프로젝트명 : Smart AquaFarm
* 개발기간 : 2019.02 ~ 2019.06
* 프로젝트 참여 인원 : 9명 (웹/어플리케이션 3명, 하드웨어 3명, 서버 3명)
* 담당 역할 : 웹/어플리케이션(통신부분 담당)
             
## 개발 환경
* MCU : ESP8266 (NodeMCU)
* OS : Windows
* 서버 : MQTT Broker(Mosquitto)
* 언어 : Java, HTML5, CSS3, JavaScript, node.js
* 데이터베이스 : MYSQL
* 프레임워크 : Eclipse, BootStrap, Cordova, Arduino Sketch
* 디자인 툴 : FreeCAD

## FlowChart
![FlowChart](https://user-images.githubusercontent.com/50040251/87128934-77a9fc80-c2cb-11ea-80e2-017b246c1578.png)


## 구현 기능 소개
### 통신

> ### MQTT Broker Server 연결
(사진)
- MQTT Library를 사용하여 MQTT 통신을 할 수 있게 하였습니다.
- URL과 Port를 각각 맞춰 Broker Server와 연결시켜주는 작업을 하였습니다.
- Publish Topic과 Subscribe Topic을 정하여 데이터를 브로커 서버로 하여금 주고받을 수 있도록 구현하였습니다.

### 데이터 송수신

> ### 수신(센서 -> 웹/어플)
(사진)
- 총 5가지의 데이터를 입력받을 수 있습니다. 데이터 형식은 JSON형식입니다.
- 센서로부터 데이터가 들어오면 화면에 각 데이터들이 해당 위치에 맞게끔 출력됩니다.

> ### 송신(웹/어플 -> 센서)
> LED
(사진)
- ON/OFF로 작동시키며, ON버튼 누를 시 IoT 제품의 UV LED에서 불이 켜지고, OFF버튼를 누를 시 UV LED의 불이 꺼집니다.
> PUMP
(사진)
- ON/OFF로 작동시키며, ON버튼 누를 시  IoT 제품의 PUMP로 어항의 있는 물을 끌어올려 작물에게 물을 줄 수 있으며, OFF버튼를 누를 시 PUMP의 작동이 멈추게 됩니다.
