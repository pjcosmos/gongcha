// 전체 메뉴 데이터
const MENU = {
  "밀크티": [
    ["브라운슈가 쥬얼리 밀크티", 5500],
    ["블랙 밀크티", 4500],
    ["타로 밀크티", 4500],
    ["초콜렛 밀크티", 4500],
    ["우롱 밀크티", 4500],
    ["얼그레이 밀크티", 4500],
    ["자스민 밀크티", 4500],
    ["제주 그린 밀크티", 4900],
    ["딸기 듬뿍 밀크티", 5100],
    ["딸기 쥬얼리 밀크티", 5300],
    ["딸기 말차 밀크티", 5300],
    ["미니펄 망고 밀크", 5300],
    ["미니펄 딸기 밀크티", 5300],
    ["피스타치오 밀크티", 4900]
  ],
  "스무디": [
    ["청귤 요거티 크러쉬 + 핑크펄", 6000],
    ["레몬 요구르트 스무디 + 핑크펄", 5500],
    ["딸기 말차 크러쉬", 5500],
    ["딸기 쿠키 스무디", 5700],
    ["초코바른 제주 그린 스무디", 5900],
    ["초코바른 초코 스무디", 5700],
    ["초코바른 피스타치오 스무디", 5700],
    ["제주 그린 스무디", 5700],
    ["미니펄 망고 크러쉬", 5700],
    ["미니펄 딸기 크러쉬", 5700],
    ["카페스무디 with 블랙티", 5400],
    ["밀크 쿠앤크 스무디", 5300],
    ["브라운슈가 쥬얼리 치즈폼 스무디", 5700],
    ["레몬 요구르트 스무디", 4800],
    ["타로 스무디", 4800],
    ["망고 스무디", 5700],
    ["초콜렛 쿠키&크림 스무디", 5300],
    ["청포도 스무디", 5300],
    ["초코 멜로 스무디", 5700],
    ["딸기 쥬얼리 요구르트 크러쉬", 5500]
  ],
  "오리지널티": [
    ["블랙티", 4000],
    ["얼그레이티", 4000],
    ["우롱티", 4000],
    ["자스민 티", 4000],
  ],
  "프룻티": [
    ["허니 자몽 블랙티", 4800],
    ["자몽 자스민티", 4800],
    ["청포도 자스민티", 4800],
    ["망고 요구르트", 5000],
    ["망고 주스", 4600],
    ["패션 프룻 히비스커스", 4800],
    ["자몽 요구르트", 5000],
    ["자몽 주스", 4600],
    ["레몬 요구르트", 5000],
    ["레몬 자스민티", 4800],
    ["자스민 요구르트", 5000],
  ],
  "커피": [
    ["공차슈페너", 4500],
    ["아메리카노", 3900],
    ["얼그레이 아메리카노", 4400],
    ["카페라떼", 4400],
    ["바닐라 카페라떼", 4700],
    ["카페 모카", 4700]
  ]
};

// DOM
const menuGrid = document.getElementById("menuGrid");

// 메뉴 렌더링 함수
function renderMenu(category) {
  const list = MENU[category];
  menuGrid.innerHTML = "";

  list.forEach(([name, price]) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <div class="name">${name}</div>
      <div class="price">${price.toLocaleString()}원</div>
    `;
    menuGrid.appendChild(card);
  });
}

// 카테고리 이벤트
document.querySelectorAll(".category-bar button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".category-bar .active").classList.remove("active");
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    renderMenu(cat);
  });
});

// 첫 화면 기본: 밀크티
renderMenu("밀크티");


<script>
document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("optionModal");
  const btnCancel = document.getElementById("btnCancel");
  const btnAddCart = document.getElementById("btnAddCart");

  let currentMenu = { name: "", price: 0 };

  // 메뉴 클릭 시 팝업 띄우기
  document.querySelectorAll(".menu-card").forEach(card => {
    card.addEventListener("click", () => {
      const name = card.querySelector(".name").innerText;
      const price = Number(card.querySelector(".price").innerText.replace("원", "").replace(",", ""));

      currentMenu = { name, price };

      document.getElementById("optMenuName").innerText = name;
      document.getElementById("optMenuPrice").innerText = price.toLocaleString() + "원";

      resetOptions();
      modal.style.display = "flex";
    });
  });

  // 옵션 버튼 선택 토글
  function setSelectable(groupId) {
    document.querySelectorAll(`#${groupId} button`).forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(`#${groupId} button`).forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });
  }

  setSelectable("optCup");
  setSelectable("optTemp");
  setSelectable("optSugar");
  setSelectable("optIce");
  setSelectable("optTopping");

  function resetOptions() {
    document.querySelectorAll(".opt-buttons button")
      .forEach(btn => btn.classList.remove("selected"));
  }

  // 취소 버튼
  btnCancel.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 장바구니 담기
  btnAddCart.addEventListener("click", () => {

    const cup = getSelected("optCup");
    const temp = getSelected("optTemp");
    const sugar = getSelected("optSugar");
    const ice = getSelected("optIce");
    const topping = getSelected("optTopping");

    const optionText = `${cup} / ${temp} / 당도 ${sugar} / 얼음 ${ice} / ${topping}`;

    addToCartWithOption(currentMenu.name, currentMenu.price, optionText);

    modal.style.display = "none";
  });

  function getSelected(id) {
    const sel = document.querySelector(`#${id} button.selected`);
    return sel ? sel.dataset.value : "-";
  }

  // 기존 cart에 옵션 추가 버전
  function addToCartWithOption(name, price, options) {
    if (cart.length >= 6) return;
    cart.push({ name, price, options });
    renderCart();
  }

  // 기존 renderCart 개선
  function renderCart() {
    cartList.innerHTML = "";

    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "slot";
      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.justifyContent = "center";
      div.style.padding = "6px";
      div.style.fontSize = "15px";
      div.innerHTML = `
        <div style="font-weight:700;">${item.name}</div>
        <div>${item.options}</div>
        <div>${item.price.toLocaleString()}원</div>
      `;
      cartList.appendChild(div);
    });

    for (let i = cart.length; i < 6; i++) {
      cartList.appendChild(Object.assign(document.createElement("div"), { className: "slot" }));
    }

    countBox.innerText = `${cart.length}개`;
    priceBox.innerText = `${cart.reduce((a,b)=>a+b.price, 0).toLocaleString()}원`;
  }

});
</script>
