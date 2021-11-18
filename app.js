const http = require("http");
const url = require("url");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

// Get dataset from the json file
const getDataSet = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("sample.json", "utf8", function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
};

const sortDataAscendingOrder = (filterData, sortKey) => {
  let orderedData = filterData.sort((itemOne, itemTwo) => {
    if (itemOne[sortKey] < itemTwo[sortKey]) {
      return -1;
    }
    if (itemOne[sortKey] > itemTwo[sortKey]) {
      return 1;
    }
    return 0;
  });
  return orderedData;
};
const sortDatadescendingOrder = (filterData, sortKey) => {
  let orderedData = filterData.sort((itemOne, itemTwo) => {
    if (itemOne[sortKey] > itemTwo[sortKey]) {
      return -1;
    }
    if (itemOne[sortKey] < itemTwo[sortKey]) {
      return 1;
    }
    return 0;
  });
  return orderedData;
};

const processFilterData = (dataSet, queryParam) => {
  let filterData;
  filterData = dataSet.filter(
    (item) =>
      (queryParam.city != null ? item.city == queryParam.city : true) &&
      (queryParam.avgRating != null
        ? item.avgRating == queryParam.avgRating
        : true) &&
      (queryParam.ratingCount != null
        ? item.ratingCount == queryParam.ratingCount
        : true) &&
      // find atleast one element from the query params
      (queryParam.sports != null
        ? item.sports.some((element) => queryParam.sports.includes(element))
        : true) &&
      (queryParam.category != null
        ? item.category == queryParam.category
        : true) &&
      (queryParam.amenities != null
        ? item.amenities.some((element) =>
            queryParam.amenities.includes(element.toLowerCase())
          )
        : true)
  );
  // TO perfor search opration on filter data
  if (queryParam.search) {
    let stringToSearch = queryParam.search;
    filterData.filter(
      (item) =>
        item.name.includes(stringToSearch) ||
        item.city.includes(stringToSearch) ||
        item.area.includes(stringToSearch)
    );
  }
  // For sorting
  if (queryParam.sortBy) {
    if (["avgRating", "ratingCount"].includes(queryParam.sortBy)) {
      if (queryParam.descending) {
        filterData = sortDatadescendingOrder(filterData, queryParam.sortBy);
      } else {
        filterData = sortDataAscendingOrder(filterData, queryParam.sortBy);
      }
    }
  }
  //Pagination
  if (queryParam.startIndex) {
    filterData = filterData.slice(
      parseInt(queryParam.startIndex),
      parseInt(queryParam.startIndex) + 5
    );
  } else {
    filterData = filterData.slice(0, 5); // By default 5 elements
  }
  return filterData;
};

const server = http.createServer((req, res) => {
  const requestUrl = url.parse(req.url);
  const path = requestUrl.pathname;
  if (path == "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("welcome to home page");
  }
  if (path == "/filter") {
    const queryParam = url.parse(req.url, true).query;
    const myPromise = getDataSet();
    myPromise
      .then((dataSet) => {
        let filterData = processFilterData(JSON.parse(dataSet), queryParam);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(JSON.stringify(filterData));
      })
      .catch((err) => {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end(JSON.stringify(err));
        console.log(err);
      });
  } else {
    res.statusCode = 404;
    res.end(`Page not found.Please try http://${hostname}:${port}/`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
