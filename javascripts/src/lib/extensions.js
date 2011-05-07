Array.wrap = function (obj) {
  if (Array.isArray(obj)) {
    return obj
  } else if (typeof(obj) == "undefined") {
    return []
  } else {
    return [obj]
  };
}