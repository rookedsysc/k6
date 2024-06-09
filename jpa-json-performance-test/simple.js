import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const url = 'http://192.168.1.10:8080/jpa/9';
  const payload = JSON.stringify({
    memberId: 5342,
    vote: true
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