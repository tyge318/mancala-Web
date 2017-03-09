<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Play Mancala with AI</title>
<link rel="stylesheet" href="Mancala.css">
<script src="http://code.jquery.com/jquery-1.10.2.js"
	type="text/javascript"></script>
<script src="js/app-ajax.js" type="text/javascript"></script>
</head>
<body>
	<div id="log"></div>
	<div id="ajaxGetUserServletResponse" align="center">
		<h2><strong>Let's play Mancala!</strong></h2>
		<div id="begin-section" ><button type="button" id="buttonBegin">Begin</button></div>
	</div>
	
	<div id="responseSection" align="center">
	</div>
</body>
</html>