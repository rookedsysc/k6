import http from "k6/http";
import { check, sleep } from "k6";

const env = JSON.parse(open("./env.json"));
const authorizationToken = env.authorizationToken;
const baseUrl = env.baseUrl;

export let options = {
  vus: 100, // 동시에 실행할 가상 사용자 수
  iterations: 100, // 반복 횟수 (총 요청 수 : 반복 횟수 / 동시 사용자 수)
  duration: "10m", // 최대 테스트 지속 시간
};

export default function () {
  const apiUrl = baseUrl + "/api/comments";
  const params = {
    headers: {
      Authorization: "Bearer " + authorizationToken,
      "Content-Type": "application/json",
    },
  };

  // 151부터 650까지 임의의 postId 생성
  const postId = __VU + 150;
  const payload = JSON.stringify({
    content: "Test 1",
    postId: postId,
  });

  const res = http.post(apiUrl, payload, params);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
