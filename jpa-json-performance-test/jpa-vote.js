import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// export let options = {
//   stages: [
//     { duration: '1s', target: 1000 }, // 10분동안 1,000,000명의 사용자가 동시에 요청하는 상황을 가정
//   ],
// };
export let options = {
  vus: 500,      // 동시에 실행할 가상 사용자 수
  iterations: 2000,  // 반복 횟수 (총 요청 수 : 반복 횟수 / 동시 사용자 수)
  duration: '20m', // 최대 테스트 지속 시간
};


export default function() {
  // __VU : Virtual User의 고유 ID
  // __ITER : 현재 시나리오에서의 반복 횟수
  const memberId = (__VU - 1) * 10000 + __ITER + 1;
  const vote = Math.random() < 0.5; // Math.random()은 0.0 ~ 1.0 사이의 난수를 반환


  const url = 'http://192.168.1.12:8080/json/21';
  // const url = 'http://192.168.1.12:8080/jpa/12';
  const payload = JSON.stringify({
    memberId: memberId,
    vote: vote
  });

  const params = {
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json'
    },
    timeout: '600s', // 600초 (10분) 이내에 응답이 없으면 타임아웃으로 처리
  };

  const res = http.post(url, payload, params);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}