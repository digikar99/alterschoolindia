<?php


	// echo $email;
	// echo $name;
		// echo phpversion();

try{
	$con = new mysqli('localhost','shubham-db','Sba000', 'emaildb');
	if ($con->connect_error) {
  		die("Connection failed: " . $con->connect_error);
	} 

	$stmt = $con->prepare("INSERT INTO email_and_name (email, name) VALUES (?, ?)");
	$stmt->bind_param("ss", $email, $name);

	$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
	$name = filter_var($_POST["name"], FILTER_SANITIZE_STRING);

	$stmt->execute();

	$stmt->close();
	$con->close();
}
catch (Exception $e){
	echo $e->errorMessage();
}
	echo Hello;
	header("Location: index.php");

?>
