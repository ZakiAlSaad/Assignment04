// Job Application Tracker Script
let interviewList = [];
let rejectedList = [];
let currentStatus = "all";

// DOM elements

let totalCount = document.getElementById("total-display");
let interviewCount = document.getElementById("interview-display");
let rejectedCount = document.getElementById("rejected-display");
let allJobQuantity = document.getElementById("job-quantity");
// filter buttons
const allFilterBtn = document.getElementById("show-all-btn");
const interviewFilterBtn = document.getElementById("show-interview-btn");
const rejectedFilterBtn = document.getElementById("show-rejected-btn");
// job card sections
const allCardSection = document.getElementById("all-job-container");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");
const noJobSection = document.getElementById("no-job-display");
// initial count display
function calculateCount() {
  totalCount.innerText = allCardSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
// calculate count on page load
calculateCount();

function currentJobQuantity() {
  if (currentStatus == "show-all-btn") {
    allJobQuantity.innerText = totalCount.innerText;
  } else if (currentStatus == "show-rejected-btn") {
    allJobQuantity.innerText = rejectedList.length;
  } else if (currentStatus == "show-interview-btn") {
    allJobQuantity.innerText = interviewList.length;
  }
}
// filter button event listeners
function toggleStyle(id) {
  allFilterBtn.style.background = "none";
  allFilterBtn.style.color = "black";

  interviewFilterBtn.style.background = "none";
  interviewFilterBtn.style.color = "black";

  rejectedFilterBtn.style.background = "none";
  rejectedFilterBtn.style.color = "black";

  const selected = document.getElementById(id);
  currentStatus = id;

  selected.style.color = "#fff";
  selected.style.backgroundColor = "#3b82f6";

  if (id == "show-interview-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id == "show-all-btn") {
    allCardSection.classList.remove("hidden");
    noJobSection.classList.add("hidden");
    filteredSection.classList.add("hidden");

    calculateCount();
    if (totalCount.innerHTML == 0) {
      noJobSection.classList.remove("hidden");
    }
  } else if (id == "show-rejected-btn") {
    allCardSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  }
}
// check if there is no job to display
function noJobBadge() {
  if (currentStatus !== "show-all-btn") {
    if (filteredSection.children.length === 0) {
      noJobSection.classList.remove("hidden");
    } else {
      noJobSection.classList.add("hidden");
    }
  } else {
    noJobSection.classList.add("hidden");
  }
}
// event delegation for dynamically added buttons
mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    parentNode.querySelector(".job-status").innerText = event.target.innerText;

    const jobName = parentNode.querySelector(".job-name").innerText;
    const jobRole = parentNode.querySelector(".job-role").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDetail = parentNode.querySelector(".job-detail").innerText;

    const cardInfo = {
      jobName,
      jobRole,
      jobLocation,
      jobStatus,
      jobDetail,
    };

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    calculateCount();

    if (currentStatus == "show-rejected-btn") {
      renderRejected();
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    parentNode.querySelector(".job-status").innerText = event.target.innerText;

    const jobName = parentNode.querySelector(".job-name").innerText;
    const jobRole = parentNode.querySelector(".job-role").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDetail = parentNode.querySelector(".job-detail").innerText;

    const cardInfo = {
      jobName,
      jobRole,
      jobLocation,
      jobStatus,
      jobDetail,
    };

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    if (currentStatus == "show-interview-btn") {
      renderInterview();
    }
    calculateCount();
  }

  currentJobQuantity();
});
// event delegation for delete button
mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-trash-can")) {
    totalCount.innerText -= 1;
    allJobQuantity.innerText -= 1;
    event.target.parentNode.parentNode.remove();
    calculateCount();
    if (totalCount.innerHTML == 0) {
      noJobSection.classList.remove("hidden");
    }
  }
// event delegation for interview and rejected buttons in dynamically rendered cards
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    parentNode.querySelector(".job-status").innerText = event.target.innerText;

    const jobName = parentNode.querySelector(".job-name").innerText;
    const jobRole = parentNode.querySelector(".job-role").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDetail = parentNode.querySelector(".job-detail").innerText;

    const cardInfo = {
      jobName,
      jobRole,
      jobLocation,
      jobStatus,
      jobDetail,
    };

    const jobExist = interviewList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    calculateCount();

    if (currentStatus == "show-interview-btn") {
      renderInterview();
    }
  } else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    parentNode.querySelector(".job-status").innerText = event.target.innerText;

    const jobName = parentNode.querySelector(".job-name").innerText;
    const jobRole = parentNode.querySelector(".job-role").innerText;
    const jobLocation = parentNode.querySelector(".job-location").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDetail = parentNode.querySelector(".job-detail").innerText;

    const cardInfo = {
      jobName,
      jobRole,
      jobLocation,
      jobStatus,
      jobDetail,
    };

    const jobExist = rejectedList.find(
      (item) => item.jobName == cardInfo.jobName,
    );

    if (!jobExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.jobName != cardInfo.jobName,
    );

    if (currentStatus == "show-interview-btn") {
      renderInterview();
    }

    calculateCount();
  }
  currentJobQuantity();
});
// render functions for interview and rejected sections
function renderInterview() {
  filteredSection.innerHTML = "";

  for (const job of interviewList) {
    let div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
              <h2 class="job-name">${job.jobName}</h2>
          <p class="job-role">${job.jobRole}</p>
          <p class="job-location">${job.jobLocation}</p>
          <button class="job-status" id="card-status">${job.jobStatus}</button>
          <p class="job-detail black-p">${job.jobDetail}
          </p>

          <div class="btn-container">
            <button id="interview-btn" class="interview-btn">INTERVIEW</button>
            <button id="rejected-btn" class="rejected-btn">REJECTED</button>
          </div>

          <span id="delete-icon"><i class="fa-solid fa-trash-can"></i></span>
    `;

    filteredSection.appendChild(div);
  }
  noJobBadge();
  calculateCount();
}
// render functions for interview and rejected sections
function renderRejected() {
  filteredSection.innerHTML = "";

  for (const job of rejectedList) {
    let div = document.createElement("div");
    div.className = "job-card";
    div.innerHTML = `
              <h2 class="job-name">${job.jobName}</h2>
          <p class="job-role">${job.jobRole}</p>
          <p class="job-location">${job.jobLocation}</p>
          <button class="job-status" id="card-status">${job.jobStatus}</button>
          <p class="job-detail black-p">${job.jobDetail}
          </p>

          <div class="btn-container">
            <button id="interview-btn" class="interview-btn">INTERVIEW</button>
            <button id="rejected-btn" class="rejected-btn">REJECTED</button>
          </div>

          <span id="delete-icon"><i class="fa-solid fa-trash-can"></i></span>
    `;

    filteredSection.appendChild(div);
  }
  noJobBadge();
  calculateCount();
}
