<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes" omit-xml-declaration="yes" doctype-system="about:legacy-compat" />
<xsl:template match="/">

<html>
	<head>
		<title>Recipes</title>
		<link rel="stylesheet" type="text/css" href="recipes.css" />
	</head>

<body>
	<h1>Recipes</h1>


	<xsl:for-each select="//recipe">
	<xsl:sort select="cook_time" data-type="number"/>
	<xsl:sort select="title"/>
	
		<table>
			<thead>
				<tr>
					<th></th>
					<th><xsl:value-of select="title" /></th>
				</tr>
			</thead>
			<tbody>
			
				<tr>
					<td>Preparation time:</td>
					<td><xsl:value-of select="prep_time" /></td>
				</tr>
				<tr>
					<td>Cooking time:</td>
					<td><xsl:value-of select="cook_time" /></td>
				</tr>
					
				<tr>
					<td>Difficulty:</td>
					<td><xsl:value-of select="difficulty" /></td>
				</tr>
				<tr>
					<td>Serves:</td>
					<td><xsl:value-of select="serves" /></td>
				</tr>
				<tr>
					<td>Description:</td>
					<td><xsl:value-of select="description" /></td>
				</tr>
				<tr>
					<td>Ingredients:</td>
					<td>
						<ul>
							<xsl:for-each select="ingredients/ingredient">
								<li><xsl:value-of select="."/></li>
							</xsl:for-each>
						</ul>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<xsl:choose>
							<xsl:when test="cook_time &gt; 60">
								Slow Burn
							</xsl:when>
							<xsl:when test="cook_time &gt; 30">
								Medium Burn
							</xsl:when>
							<xsl:otherwise>
								Quick and Easy
							</xsl:otherwise>
						</xsl:choose>
					</td>
				</tr>
			</tbody>
		</table>
	</xsl:for-each>


</body>
</html>
</xsl:template>
</xsl:stylesheet>