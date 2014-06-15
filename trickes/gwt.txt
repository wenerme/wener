

# Gwt maven archtype http://mojo.codehaus.org/gwt-maven-plugin/
mvn archetype:generate \
   -DarchetypeGroupId=org.codehaus.mojo \
   -DarchetypeArtifactId=gwt-maven-plugin \
   -DarchetypeVersion=2.6.1
   
<plugin>
	<groupId>org.codehaus.mojo</groupId>
	<artifactId>gwt-maven-plugin</artifactId>
	<version>2.6.1</version>
</plugin>


# 默认提供的 dtd 不存在, 可以使用这个,直接下载就ok
https://google-web-toolkit.googlecode.com/svn/trunk/distro-source/core/src/gwt-module.dtd