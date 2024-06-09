import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

export let options = {
  stages: [
    { duration: '1s', target: 1000 }, // 10분동안 1,000,000명의 사용자가 동시에 요청하는 상황을 가정
  ],
};

export default function() {
  // __VU : Virtual User의 고유 ID
  // __ITER : 현재 시나리오에서의 반복 횟수
  const memberId = (__VU - 1) * 10000 + __ITER + 1;
  const vote = Math.random() < 0.5; // Math.random()은 0.0 ~ 1.0 사이의 난수를 반환


  const url = 'http://192.168.1.10:8080/json/6';
  // const url = 'http://192.168.1.10:8080/jpa/9';
  const payload = JSON.stringify({
    memberId: memberId,
    vote: vote
  });

  const params = {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
  };

  const res = http.post(url, payload, params);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}