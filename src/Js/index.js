function sum() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var result = document.getElementById("result");
  console.log(num1);
  console.log(num2);
  if (isFinite(num1) && isFinite(num2)) {
    console.log("true")
    result.value = parseInt(num1) + parseInt(num2);
  }
}

