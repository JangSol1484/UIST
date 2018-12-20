1. 외부 프로그램을 설치합니다. mysql, ffmpeg

2. mysql의 table 생성 쿼리는 같은 경로에 첨부합니다.

3. mysql의 dbconfig는 다음과 같습니다.
{
  "hostname": "localhost",
  "user": "root",
  "password": "1111",
  "database": "uist",
  "charset": "utf8"
}

4. \client와 \server에서 npm 명령어를 수행합니다.
npm install

5. 루트 디렉터리(UIST)에서 npm 명령어를 수행합니다.
npm run client
npm run server

6.localhost:8080
(3000번은 api서버로 사용, \client에서 npm run build 명령어 수행 후 3000번 포트에서도 웹페이지 동작하지만 불안전함)
