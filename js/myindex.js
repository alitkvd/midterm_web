// after click on the Submit button this function execute
async function mySubmit(e) 
{
  e.preventDefault();
  const username = document.getElementById("username").value;
  // queries that are already fetched and saved in local storage
  const queries = window.localStorage.getItem("queries")
  if(queries)
  {
    JSON.parse(window.localStorage.getItem("queries"))
  }
  else
  {
    new Map();
  } 
  document.getElementById("message-text").innerHTML = "";
  if (!queries[username]) //user does not exists in local
  {
    // fetch data from github api
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        // check if user does not exists in Github
        if (data.message) 
        {
          set_Empty_Html();
          document.getElementById("message-text").innerHTML = "User not found";
        } 
        // check if user exists in Github
        else 
        {
          setHtml(data);
          queries[username] = data;
          window.localStorage.setItem("queries", JSON.stringify(queries));
        }
      });
  } 
  else //user was saved in local
  {
    setHtml(JSON.parse(window.localStorage.getItem("queries"))[username]);
  }
}

// set innerHTML of elements to empty string (initial state of webpage)
function set_Empty_Html() 
{
  document.getElementById("fullname").innerHTML = "";
  document.getElementById("image-container").innerHTML = "";
  document.getElementById("blog_address").innerHTML = "";
  document.getElementById("bio").innerHTML = "";
  document.getElementById("location").innerHTML = "";
}

// set innerHTML of elements with fetched data
function setHtml(data) 
{
  document.getElementById("fullname").innerHTML = data.name;
  if (data.avatar_url) 
  {
    document.getElementById("image-container").innerHTML =
      '<img src="' + data.avatar_url + '" alt="avatar" class="avatar"/>';
  } 
  else 
  {
    document.getElementById("image-container").innerHTML = "";
  }
  document.getElementById("blog_address").innerHTML = data.blog;
  if (data.bio) 
  {
    document
      .querySelector(".info-frame")
      .appendChild(document.createElement("div"));

    document.getElementById("bio").innerHTML = "<pre>" + data.bio + "</pre>";
  } 
  else 
  {
    document.getElementById("bio").innerHTML = "";
  }
  document.getElementById("location").innerHTML = data.location;
}

