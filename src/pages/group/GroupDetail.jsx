import items from "../../mock/group.json";
import React from "react";

useEffect(() => {
  fetch("data/mockData.json")
    .then((res) => res.json()) // javascript객체로 변환
    .then(setList); // list에 저장
}, []);
