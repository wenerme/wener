<!-- title: 概述getopt.h的使用 -->
<!-- tag: C/C++ -->
<!-- date: 2012/2/23 -->
<!-- state: published -->

<h1>概述</h1>
c语言控制台编程时，经常都要接受命令行传递来的选项，而getopt是专门用来解析命令行选项的一套函数。

简单的说一下getopt，她已经有相当长的历史了，早期是在Unix中使用，现在已经移植到了个个不同的语言（Shell,Java,Php,.NET...），为接受命令行选项提供了很大的便利。同时也指定了一套传递选项和参数的标准。

<!--more-->

<h1>参数传递标准</h1>
如今的选项有两种模式，短选项和长选项，选项又分为带参数和不带参数。

比如：

gcc -V 是短选项，且不带参数

gcc --version 是长选项，不带参数。与gcc -V相同

gcc -o exc 是短选项 带参数，与gcc --output exc相同

而多个短选项可直接连接，例如gcc -so FILE 与 gcc -s -o FILE相同

短选项的参数可直接紧接在其后,例如gcc -oFILE = gcc -oFILE

长选项的参数可以以空格分隔或者=分隔，例如 gcc --output FILE = gcc --output=FILE
<h1>实现</h1>
getopt中的内容：

具体讲解在实例中。
- 已定义的变量 
  - int opterr;
  - int optopt;
  - int optind;
  - char *optarg;

- 已定义的函数 
```c
int getopt (int argc, char **argv, const char *options)
int getopt_long (int argc, char *const *argv, const char *shortopts, const struct option *longopts, int *indexptr)
int getopt_long_only (int argc, char *const *argv, const char *shortopts, const struct option *longopts, int *indexptr)
```
- 数据类型 
```struct option```

## 实例1.实现短参数

```c
#include <ctype .h>
#include <stdio .h>
#include <stdlib .h>
/* getopt时必须包含 unistd头文件 */
#include <unistd .h>

int main (int argc, char **argv)
{
    int index;
    int c;

    opterr = 0;
 /* getopt 用来解析短选项，第一二个参数基本都是相同的 */
 /* 第三个选项传入能接受的参数,':'代表需要值 '::'代表值为可选*/
 /* 如果传入了值，其值保存在optarg当中，当其值为必须是，若没有传入值则会报错 缺少值 */
 /* getopt返回匹配的选项&nbsp;例如a/b/c */
 /* 未匹配值时返回？ 解析完时，会返回-1 跳出 */ 
    while ((c = getopt (argc, argv, "abc:")) != -1)
        switch (c)
        {
        case 'a':
            printf("检测到-a选项\n");
            break;
        case 'b':
            printf("检测到-b选项\n");
            break;
        case 'c':
            printf("检测到-c选项，其参数为：%s\n", optarg);
            break;
        /* 用来检测其他意外的值 */
        case '?':
         /* optopt为在没有匹配任何选项时，保存的选项值 */
         /* 例如-n，没有与上面匹配，则此时optopt=c */ 
            if (optopt == 'c')
                fprintf (stderr, "选项 -%c 需要一个参数.\n", optopt);
            else if (isprint (optopt))
                fprintf (stderr, "`-%c'未定义\n", optopt);
            else
                fprintf (stderr,
                         " `\\x%x' 未定义\n",
                         optopt);
            return 1;
        default:
            abort ();
        }
 /*
 最后检测命令行给的选项是否已经解析完
  optind是当前解析到选项的索引
  判断依据是如果解析的个数小于argc，那么就是没有解析完 
 */ 
    for (index = optind; index < argc; index++)
        printf ("未定义的参数： %s\n", argv[index]);
    return 0;
}
```

## 实例2.实现长选项

```c
#include <stdio .h>
#include <stdlib .h>
/* 使用getopt_long时不需要unistd*/
#include <getopt .h>

/* 用来作为一个标志的值. */
static int verbose_flag;

int
main (argc, argv)
int argc;
char **argv;
{
    int c;

    while (1)
    { 
     /*
 结构说明
  struct option {
 const char *name; //匹配的长选项名 
 int  has_arg; //指定参数选项no_argument required_argument optional_argument 
  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// 无值 值必须 值可选 
 int *flag; //标志位,数据类型为 int* 
 int val; //值，标志位不为0时，如果该选项指定，那么flag=val 此时val不可作为case值 
 //否则val可以作为短选项 也就相当于case 
 };
 */ 
        static struct option long_options[] =
        {
            /* 如果指定了-verbose 那么verbose_flag = 1*/ 
            {"verbose", no_argument,       &verbose_flag, 1},
            /* 如果指定了-brief 那么verbose_flag = 0*/ 
            {"brief",   no_argument,       &verbose_flag, 0},
            /* --add = -a 不带参数*/ 
            {"add",     no_argument,       0, 'a'},
            {"append",  no_argument,       0, 'b'},
            /* --delete=XX = -dXX 带参数*/ 
            {"delete",  required_argument, 0, 'd'},
            {"create",  required_argument, 0, 'c'},
            {"file",    required_argument, 0, 'f'},
            /* 很明显5438不可能用一个ANSCI表示出来，那么这个可以直接用case就可以*/ 
            {"a_very_long_arg",    no_argument, 0, 5438},
            /* 最后为空值，来标识结束 */
            {0, 0, 0, 0}
        };
        /* 因为没有了optind，那么就要用一个值来存储当前索引 */
        int option_index = 0;
 
 /* 前三个参数与getopt相同，第四个为option，第五个为存索引int的指针*/ 
        c = getopt_long (argc, argv, "abc:d:f:",
                         long_options, &option_index);

        /* 当解析完返回-1 跳出循环 */
        if (c == -1)
            break;

        switch (c)
        {
        case 0:
            /* 当 flag不为0时，遇到那些选项 getopt_long返回0*/
            if (long_options[option_index].flag != 0)
                break;
            printf ("选项 %s", long_options[option_index].name);
            if (optarg)
                printf (" 值 %s", optarg);
            printf ("\n");
            break;

        case 'a':
            puts ("选项 -a\n");
            break;

        case 'b':
            puts ("选项 -b\n");
            break;
        //长选项 
        case 5438:
            puts ("选项 --a_very_long_arg\n");
            break;
            break;
        case 'c':
            printf ("选项 -c 值为 `%s'\n", optarg);
            break;

        case 'd':
            printf ("选项 -d 值为 `%s'\n", optarg);
            break;

        case 'f':
            printf ("选项 -f 值为 `%s'\n", optarg);
            break;

        case '?':
            /* getopt_long 会自动输出错误，不像getopt需要自己检测 */
            break;

        default:
            abort ();
        }
    }

    /* 检测是否设置了标志位 */
    if (verbose_flag)
        puts ("verbose 标志已被设置");

    /* 输入未解析完的选项. */
    if (optind < argc)
    {
        printf ("无效选项： ");
        while (optind < argc)
            printf ("%s ", argv[optind++]);
        putchar ('\n');
    }

    exit (0);
}
```

## 实例3.**getopt_long_only**

这个函数的参数和getopt_long相同，只是接受长参数时，可以只用一个'-'来替代'--'。当-xx没有检测到xx的长参数时会检测-x短参数。

同时'--'也能够使用,也就是说-xx=--xx
<h1>结尾</h1>
不得不说，getopt是一个很实用的工具，对于编程能提供很多的便利。gnu也有开源的实现在gnulib和libc中。

参考：

- GNU Libc手册[http://www.gnu.org/software/libc/manual/html_node/Getopt.html#Getopt](http://www.gnu.org/software/libc/manual/html_node/Getopt.html#Getopt)

- Getopt英文维基页面[http://en.wikipedia.org/wiki/Getopt](http://en.wikipedia.org/wiki/Getopt)

