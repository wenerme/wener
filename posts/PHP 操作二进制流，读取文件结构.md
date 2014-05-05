<!-- title: PHP 操作二进制流，读取文件结构。 -->
<!-- tag: PHP -->
<!-- date: 2011/1/1 -->
<!-- state: published -->

本文包含的内容：详细的pack和unpack调用详解，16进制数字字符串保存到文件，读取文件返回值，等

<!-- more -->

<!--StartFragment-->
<div class="Section0">

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">本文包含的内容：详细的pack和unpack调用详解，</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">16</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制数字字符串保存到文件，读取文件返回值，等</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">包含实例：读取</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">BMP</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">图片信息</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">函数：</span>

<span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">//</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">将</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">16</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制字符串转换为此值的字符串。</span>

<span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;"> </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">function </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">hexstr_str</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: '&amp;amp;amp;">//两个版本，一个是pack实现，一个是</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">chr</span><span style="color: #007700; font-size: 10.5000pt; font-family: '&amp;amp;amp;">方法实现</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: '&amp;amp;amp;"><!--more-->
</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">曾经为了处理源文件就百度了下</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">php 2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制文件，结果出来的貌似都是一个人写的，别人复制和转载的，而且我也偏偏没有看懂。挺郁闷的。因此就有了下文，我就自己搞打，研究研究。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">Php处理</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制无非就是使用</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">和</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">unpack</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">，在后文讲讲其他的办法。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">函数原型：</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">string </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> ( string $format [, </span>[<span style="color: #0000ff; font-size: 10.5pt; font-family: 'Times New Roman'; text-decoration: underline;">mixed</span>](http://cn2.php.net/manual/en/language.pseudo-types.php#language.types.mixed)<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> $args [, </span>[<span style="color: #0000ff; font-size: 10.5pt; font-family: 'Times New Roman'; text-decoration: underline;">mixed</span>](http://cn2.php.net/manual/en/language.pseudo-types.php#language.types.mixed)<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> $... ]] )</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">array </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">unpack</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> ( string $format , string $data )</span>

<span style="font-weight: bold; font-size: 18.0000pt; font-family: '&amp;amp;amp;">Pack</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">是讲所给的参数更具所给的格式打包成</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制字符串。手册上说这个函数和</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">Perl</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">的基本相同，只是在格式上去掉了</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">s,u</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">等。</span><span style="color: #ff0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">这里有一点要注意的是，有符号和无符号的数由</span><span style="color: #ff0000; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #ff0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">转换出来的结果相同，但是会影响</span><span style="color: #ff0000; font-size: 10.5000pt; font-family: 'Times New Roman';">unpack</span><span style="color: #ff0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">的结果。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">先看一个小小的实例：</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"N"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0x12345</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">var_dump</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fn </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'out.text'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fp </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">fopen</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fn</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">,</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'w'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">fwrite</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fp</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">,</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

[![](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-899.png "php处理2进制文件-899")](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-899.png)

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">结果很明了，用法很简单。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">关于</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">N</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">模式：</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">unsigned long (always 32 bit, big endian byte order)</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">无符号长整型，总是返回32位</span>

<span style="font-weight: bold; font-size: 15.0000pt; font-family: '&amp;amp;amp;">格式：</span>

<table>
<tbody>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">a</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">将字符串空白以 <span style="font-family: Times New Roman;">NULL </span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字符填满</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">A</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">将字符串空白以 <span style="font-family: Times New Roman;">SPACE </span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字符 </span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">空格</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">) </span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">填满</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">h</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">十六进位字符串，低位在前</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">H</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">十六进位字符串，高位在前</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">c</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">有号字符</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">C</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号字符</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">s</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">有号短整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">十六位，依计算机的位顺序</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">S</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号短整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">十六位，依计算机的位顺序</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">n</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号短整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">十六位</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">高位在后的顺序</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">v</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号短整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">十六位</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">低位在后的顺序</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">i</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">有号整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">依计算机的顺序及范围</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">I</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">依计算机的顺序及范围</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">l</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">有号长整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">32</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">位，依计算机的位顺序<span style="font-family: Times New Roman;">)</span></span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">L</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号长整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">32</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">位，依计算机的位顺序<span style="font-family: Times New Roman;">)</span></span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">N</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号短整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">32</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">位<span style="font-family: Times New Roman;">, </span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">高位在后的顺序</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">V</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">无号短整数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">32</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">位<span style="font-family: Times New Roman;">, </span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">低位在后的顺序</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">f</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">单精确浮点数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">依计算机的范围</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">d</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">倍精确浮点数 <span style="font-family: Times New Roman;">(</span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">依计算机的范围</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">x</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">空位</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">X</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">倒回一位</span>

</td>
</tr>
<tr>
<td width="27" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">@</span>

</td>
<td width="289" valign="center">

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">填入 <span style="font-family: Times New Roman;">NULL </span></span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字符到绝对位置</span>

</td>
</tr>
</tbody>
</table>
<table>
<tbody>
<tr>
<td width="576" valign="center" bgcolor="#001919">
<table>
<tbody>
<tr>
<td width="568" valign="center" bgcolor="#001919"></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">关于pack的调用方法。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">因为</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">是支持多个不定个数参数的，所以每个参数都要指定一个转换的模式。</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"Nn"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0x12345</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0x12345</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">当你参数的个数多于格式的个数时，出现：</span>

<span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">Warning</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">: pack() [</span>[<span style="color: #0000ff; font-size: 10.5pt; font-family: 'Times New Roman'; text-decoration: underline;">function.pack</span>](http://localhost/lab/function.pack)<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">]: 1 arguments unused in </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">E:\host\htdocs\Lab\Binary.php</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> on line </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">4</span>

<span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">Warning</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">级错误。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">这个还有个注意的是</span><span style="color: #ff0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">*</span><span style="color: #000000; font-weight: normal; font-size: 10.5000pt; font-family: '&amp;amp;amp;">模式。</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"Nn*"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0x12345</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0x12345</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0x12345</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span><span style="color: #007700; font-size: 10.5000pt; font-family: '&amp;amp;amp;">\\最后两个是</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">16</span><span style="color: #007700; font-size: 10.5000pt; font-family: '&amp;amp;amp;">位，所以输出里面是</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="color: #007700; font-size: 10.5000pt; font-family: '&amp;amp;amp;">字节</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">var_dump</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fn </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'out.text'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fp </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">fopen</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fn</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">,</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'w'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">fwrite</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$fp</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">,</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">输出：</span>

[![](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-1934.png "php处理2进制文件-1934")](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-1934.png)

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">看出来了最后两个是一样的。因为手册上没说，但是我猜测</span><span style="color: #ff0000; font-size: 10.0000pt; font-family: '&amp;amp;amp;">*</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">模式就是“同上”的意思吧。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">基础知识： </span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">1字节 </span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">=  8</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">位 </span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">= 2^8</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;"> =  256</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">一个gb2312字符</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字节，一个</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">ascii</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字符</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字节。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">关于模式的选择都由个人使用的情况决定，这里我给出我自己写的一个函数。</span>

<span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">//</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">将</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">16</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制字符串转换为此值的字符串。</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">function </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">hexstr_str</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> {</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">''</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> for( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">; isset( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">[ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">+ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">4</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">]); </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">+= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">4</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">//echo substr( $hetstr, $i, 2);</span>

<span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'n'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, ( </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0x'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">substr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">4</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)) * </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$len </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">strlen</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">) - </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0x'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">substr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">strlen</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">) - </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.= ( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$len </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">% </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">) ? </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">:</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">''</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$format </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$len </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">&lt; </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">3 </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">? </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'v'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">: </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'n'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$format</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hetstr </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">* </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> return </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> }</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">测试：</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">hexstr_str</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'ABCDc'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">输出：</span>

[![](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-2766.png "php处理2进制文件-2766")](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-2766.png)

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">有点遗憾的是它都要用0来补满</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">16</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">位。不过总的来说还是很不错的啦。</span>

<span style="font-weight: bold; font-size: 18.0000pt; font-family: '&amp;amp;amp;">Unpack的使用</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">，我觉得用着这个感觉挺揪心的。</span>

<span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">unpack()</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> works slightly different from Perl as the unpacked data is stored in an associative array. To accomplish this you have to name the different format codes and separate them by a slash /.</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">Unpack的运行和</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">Perl</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">的有些微不同，在</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">php</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">中</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">unpack</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">的结果是由一个数组返回的。因此你需要接受这些数据就要给格式命名，以</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">/</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">分隔。</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">手册上的实例；</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">&lt;?php</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$array </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">unpack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"c2chars/nint"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$binarydata</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">?&gt;</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">看一个我个人的调用实例：</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">pack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"n"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, (</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0x'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'abc' </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">) * </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">hexstr_str</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'ABCDc'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$array </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">unpack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"Nwen/n2stort"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">输出结果：</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">array(3) {</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> ["wen"]=&gt;</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> int(-1412579328)</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> ["stort1"]=&gt;</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> int(43981)</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> ["stort2"]=&gt;</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> int(49152)</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">}</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">上式结果也就是</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">wen:abcdc000</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">stort1:abcd</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">stort2:c000</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">看着这样的结果和输入的格式我觉得很揪心的。不过这里还是有点好处的，这个我们可以格式化输出一个文件的头信息什么的。</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">详细讲讲</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">uppack</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">的格式和输入的关系。</span>

<span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"Nwen/n2stort"</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">即第一个解析以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">N</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">为格式，以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">wen</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">为名字。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;"> 第二个解析以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">n</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">为格式解析两次，以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">为名字。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">生成的</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">的名字是以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short1</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">，</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">，……</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">shortn</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">这样的形式增长的。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">解析的方法：</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">N，先在输入（</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">）中读入</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">32</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">位长，即</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">4</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">字节。然后再用</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">N</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">转换，此时指向</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">指针的位置已经到了4了，第一个</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">已经读完了，因此要是输入是</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$s</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">的话会报错：</span>

<span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">Warning</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">: unpack() [</span>[<span style="color: #0000ff; font-size: 10.5pt; font-family: 'Times New Roman'; text-decoration: underline;">function.unpack</span>](http://localhost/lab/function.unpack)<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">]: Type n: not enough input, need 2, have 0 in </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">E:\host\htdocs\Lab\Binary.php</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';"> on line </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">7</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">bool(false)</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">此时的返回值为false。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">在解析完第一个</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">N</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">后遇到了“</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">/</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">”进入下一组的解析，解析的格式为</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">n</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">，有</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">组，名字为</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">所以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short1</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">为输入的第</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">4-6</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">解析的结果，而</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">short2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">为</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">6-8</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">的结果。都是一一对应的。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">这样看来也不是很难嘛是吧。</span>

<span style="font-weight: bold; font-size: 18.0000pt; font-family: '&amp;amp;amp;">个人方法</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">：</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">Perl思想中有一条是：</span>

<span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">T</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">here's </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">M</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">ore </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">T</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">han </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">O</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">ne </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">W</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">ay </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">T</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">o </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">D</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">o </span><span style="font-weight: bold; font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">I</span><span style="font-style: italic; font-size: 10.5000pt; font-family: 'Times New Roman';">t</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">.</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">我也觉得如此。</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: '&amp;amp;amp;">Php</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">中有个函数叫做</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">String</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;"> </span><span style="font-weight: bold; font-size: 10.5000pt; font-family: 'Times New Roman';">chr</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">( int $ascii )</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">返回一个字节，以ascii值为参数。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">原本的</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">ascii</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">只有</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">127</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">的，但是后来扩展到了</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">255</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">加上</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">0</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">那就是</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">256 </span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;"> 很好 这样就都能表示了。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">把上面那个函数稍微改造一下就是：</span>

<span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">//</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">将</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: 'Times New Roman';">16</span><span style="color: #ff8000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">进制字符串转换为此值的字符串。</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">function </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">hexstr_str</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hexstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">{</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">''</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> for( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">0</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">; isset( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hexstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">[ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">+</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">]); </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">+= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">2</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">chr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( (</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0x'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hexstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">[ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">].</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hexstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">[ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">+ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">]) * </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> if( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">strlen</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hexstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">) &gt; </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">chr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( (</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0x'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">.</span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$hexstr</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">[ </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$i</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">].</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'0'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">) * </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">1</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> return </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$re</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">}</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">代码简洁了很多啊。看起来顺眼多了。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">置于我为啥研究这个玩意儿，我最开始也就是为了用啦读取</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">BMP</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">源文件的。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">这里我们来简单写个读取</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">BMP</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">头信息的函数。</span>

<span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">注意，这里是以</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">24/32</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">位图举例，</span><span style="font-size: 10.5000pt; font-family: 'Times New Roman';">16/8/2</span><span style="font-size: 10.5000pt; font-family: '&amp;amp;amp;">位位图在这里可能行不通的，因为数据结构不同。</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">BMP文件结构：</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">Begin</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">//文件头</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">section</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"BMP File Header"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">read-only char[2]</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"BMP_ID"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 00</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"File size"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 02</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"Reserved"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 06</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32  "ImageDataOffset"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 0A</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">endsection</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">//信息头</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">section</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"BMP Info Header"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"HeaderSize"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 0E</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"Width"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 12</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"Height"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 16</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint16</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"Planes"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 1A</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint16</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"BPP"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 1C</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"CompessionMethod"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 1E</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"ImageSize"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 22</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"XPixelsPerMeter"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 26</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"YPixelsPerMeter"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 2A</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"PaletteSize"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 2E</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">uint32</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"ColorsImportant"</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">// 32</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">endsection</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">//调色板信息</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">section</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">"Palette(If PaletteSize=0 then no palette)"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">numbering 0</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">{</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">byte "B[~]"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">byte "G[~]"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">byte "R[~]"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">byte "A[~]"</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">} [PaletteSize]</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;"> </span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">endsection</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">end</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">实现的代码如下：</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">file_get_contents</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'Wener.bmp'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$array </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">= </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">unpack</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">(</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"nBMP_ID/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">文件大小</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">保留字</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">图片信息偏移</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">头大小</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">宽</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">高</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/vPlanes/vBPP/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">压缩方法</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">图片大小</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">横轴上每像素宽</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">竖轴上每像素宽</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">调色板大小</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">/V</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: '&amp;amp;amp;">重要的颜色</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">"</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">, </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$data</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">echo </span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'&lt;pre&gt;'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">var_dump</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$array</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">);</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">foreach( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$array </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">as </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$k </span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">=&gt; </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$v</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">)</span>

<span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';"> echo </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$k</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">,</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">':'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">,( </span><span style="color: #0000bb; font-size: 10.5000pt; font-family: 'Times New Roman';">$v</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">),</span><span style="color: #dd0000; font-size: 10.5000pt; font-family: 'Times New Roman';">'&lt;br&gt;'</span><span style="color: #007700; font-size: 10.5000pt; font-family: 'Times New Roman';">;</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">请更改为你自己的图片地址后测试。我的输入如下：</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">BMP_ID:16973</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">文件大小<span style="font-family: Times New Roman;">:307254</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">保留字<span style="font-family: Times New Roman;">:0</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">图片信息偏移<span style="font-family: Times New Roman;">:54</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">头大小<span style="font-family: Times New Roman;">:40</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">宽<span style="font-family: Times New Roman;">:240</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">高<span style="font-family: Times New Roman;">:320</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">Planes:1</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">BPP:32</span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">压缩方法<span style="font-family: Times New Roman;">:0</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">图片大小<span style="font-family: Times New Roman;">:307200</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">横轴上每像素宽<span style="font-family: Times New Roman;">:0</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">竖轴上每像素宽<span style="font-family: Times New Roman;">:0</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">调色板大小<span style="font-family: Times New Roman;">:0</span></span>

<span style="font-size: 10.5000pt; font-family: 'Times New Roman';">重要的颜色<span style="font-family: Times New Roman;">:0</span></span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">我的测试文件：</span>

[![](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-6007-225x300.png "php处理2进制文件-6007")](http://www.wener.me/wp-content/uploads/2011/01/php处理2进制文件-6007.png)

<span style="font-weight: bold; font-size: 22.0000pt; font-family: '&amp;amp;amp;">总结：</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">总的，来说，</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">php<span style="font-family: 宋体;">的这两个函数无疑是很强大的。用来分析文件也很好用。</span></span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">或许不足的就是缺少这方面的案例吧，没见到很多人用过这个。</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">以后自己学习文件的结构也会常常用到这个函数，有时候觉得<span style="font-family: Times New Roman;">unpack</span><span style="font-family: 宋体;">比</span><span style="font-family: Times New Roman;">pack</span><span style="font-family: 宋体;">更有魅力。</span></span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">关于更详细的BMP文件结构和信息的获取我会另外写一篇文章的。这篇只是略微的涉及，作为一个例子而已。</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">我还是觉得</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">Php</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">处理</span><span style="font-size: 10.0000pt; font-family: 'Times New Roman';">2</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">进制流的魅力</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">是非常强大的</span><span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">。</span>

<span style="font-size: 10.0000pt; font-family: '&amp;amp;amp;">置于建立在这个之上写更多的运用（加密，协议，破解，获取文件信息）什么的就看个人发挥了。</span>

</div>
<!--EndFragment-->