const tweets = document.querySelector(".tweets");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");

const tweetsNum = Number(tweets.innerHTML.replace(",", ""));
const follwersNum = Number(followers.innerHTML.replace(",", ""));
const followingNum = Number(following.innerHTML.replace(",", ""));

// Define delay method
const delay = (time) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

// Define Number with commas method
const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Cal the total of number
const sum = async (ele, num) => {
  let addNum = Math.ceil(Math.random() * 10) || 1;

  while (addNum < num) {
    addNum += addNum;

    await delay(50);

    if (addNum < num) {
      ele.innerHTML = addNum;
    }
  }

  // ele.innerHTML = numberWithCommas(num);
  ele.innerHTML = num.toLocaleString();
};

// Create Element List
const eleList = [
  { ele: tweets, num: tweetsNum },
  { ele: followers, num: follwersNum },
  { ele: following, num: followingNum },
];

// Auto run the calculate method
(async () => {
  await Promise.all(eleList.map(({ ele, num }) => sum(ele, num)));
})();
