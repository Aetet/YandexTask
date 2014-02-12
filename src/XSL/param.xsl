 <xsl:stylesheet 
    type="text/xml" 
    version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head></head>
            <body>

                <xsl:apply-templates select="Parameters/Param">
                    <xsl:apply-templates select="Param"></xsl:apply-templates>
                </xsl:apply-templates>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="/Parameters/Param">
        <xsl:call-template name="param-name">
            <xsl:with-param name="paramName" select="@name"/>
        </xsl:call-template>
    </xsl:template>

    <xsl:template name="param-name">
        <xsl:param name="paramName"/>
        <xsl:value-of select="$paramName"></xsl:value-of>
        <xsl:value-of select="/Parameters/Param[@name = $paramName]"/>
        <br />
    </xsl:template>
</xsl:stylesheet>