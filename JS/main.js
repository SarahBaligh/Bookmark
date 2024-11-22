var SiteNameInput = document.getElementById("name");
var SiteUrlInput = document.getElementById("url");

var allsites = [];

if (localStorage.getItem("all")) {
  allsites = JSON.parse(localStorage.getItem("all"));
  displayValues();
}

function getValues() {
  if (validationName() && validationUrl()) {
    var site = {
      name: SiteNameInput.value,
      url: SiteUrlInput.value,
    };
    allsites.push(site);
    localStorage.setItem("all", JSON.stringify(allsites));
    clearValues();
    displayValues();
  } else {
    Swal.fire({
      html: `
        <div class="text-start py-3">
        <i class="fa-solid fa-circle me-2 fa-sm text-danger"></i
        ><i class="fa-solid fa-circle me-2 fa-sm text-warning"></i
        ><i class="fa-solid fa-circle me-2 fa-sm text-success"></i>
        </div>
        <h4 class="text-black text-start">
        <b>Site Name or Url is not valid, Please follow the rules below :</b>
        </h4>

        <div class="text-start mb-2">
        <i class="fa-regular fa-circle-right text-danger"></i>
        Site name must contain at least 3 characters
        </div>
        <div class="text-start">
        <i class="fa-regular fa-circle-right text-danger"></i>
        Site URL must be a valid one
        </div>
        `,
    });
  }
}

function clearValues() {
  (SiteNameInput.value = ""), (SiteUrlInput.value = "");
}

function displayValues() {
  var cartona = "";
  for (var i = 0; i < allsites.length; i++) {
    cartona += `
    <tr>
      <td>${i + 1}</td>
      <td>${allsites[i].name}</td>
      <td>
        <button id="visitBtn" class="btn" onclick="visitSite(${i})">
            <i class="fa-solid fa-eye"></i> Visit
          </button>
      </td>
      <td>
        <button id="deleteBtn" onclick="deleteBookmarks(${i})" class="btn">
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function deleteBookmarks(index) {
  allsites.splice(index, 1);
  localStorage.setItem("all", JSON.stringify(allsites));

  displayValues();
}

function visitSite(index) {
  if (
    !allsites[index].url.startsWith("http://") &&
    !allsites[index].url.startsWith("https://")
  ) {
    allsites[index].url = "https://" + allsites[index].url;
    window.open(allsites[index].url);
  } else {
    window.open(allsites[index].url);
  }
}

function validationUrl() {
  var urlRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (urlRegex.test(SiteUrlInput.value)) {
    return true;
  } else {
    return false;
  }
}

function validationName() {
  var nameRegex = /[a-zA-Z0-9_]{3,}/g;
  if (nameRegex.test(SiteNameInput.value)) {
    return true;
  } else {
    return false;
  }
}
