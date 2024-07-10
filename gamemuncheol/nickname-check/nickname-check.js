import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,      // 동시에 실행할 가상 사용자 수
  iterations: 10,  // 반복 횟수 (총 요청 수 : 반복 횟수 / 동시 사용자 수)
  duration: '10m', // 최대 테스트 지속 시간
};

export default function() {
  const url = 'https://api.gamemuncheol.com:8080/open-api/members/nickname/m1kk2j1I29';

  const params = {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    timeout: '600s', // 600초 (10분) 이내에 응답이 없으면 타임아웃으로 처리
  };

  const res = http.get(url, params);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}